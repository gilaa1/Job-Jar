const jwt = require('jsonwebtoken');
const jobsRouter = require('express').Router()
const Job = require('../models/job')

const MAX_JOBS_PER_PAGE = 2;

jobsRouter.get('/', async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const sortBy = request.query.sortBy || 'date';
        const userLat = parseFloat(request.query.userLat) || 0;
        const userLng = parseFloat(request.query.userLng) || 0;

        const limit = MAX_JOBS_PER_PAGE;
        const skipIndex = (page - 1) * limit;

        let jobs;
        let totalJobs;

        if (sortBy === 'distance') {
            console.log('sorting by distance');
            totalJobs = await Job.countDocuments();
            jobs = await Job.aggregate([
                {
                    $geoNear: {
                        near: { type: 'Point', coordinates: [userLng, userLat] }, // User's location
                        distanceField: 'distance', // Field to store calculated distance
                        spherical: true,
                        key: 'location', // Field to store job location
                    },
                },
                { $sort: { distance: 1 } },
                { $skip: skipIndex },
                { $limit: limit },
            ]);
        } else {
            totalJobs = await Job.countDocuments();
            if (sortBy === 'date' || sortBy === 'default') {
                jobs = await Job.find().sort({ datePosted: -1 }).limit(limit).skip(skipIndex).exec();
            } else if (sortBy === 'payment') {
                jobs = await Job.find().sort({ payment: -1 }).limit(limit).skip(skipIndex).exec();
            } else if (sortBy === 'title') {
                jobs = await Job.find().sort({ title: 1 }).limit(limit).skip(skipIndex).exec();
            } else {
                return response.status(400).json({ error: 'invalid sortBy parameter' });
            }
        }

        response.status(200).json({ totalJobs, jobs });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});


jobsRouter.get('/myJobs', async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const sortBy = request.query.sortBy || 'date';
        const limit = MAX_JOBS_PER_PAGE;
        const skipIndex = (page - 1) * limit;

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const totalJobs = await Job.find({"user.id": decodedToken.id}).countDocuments();
        let jobs;

        if (sortBy === 'date' || sortBy === 'default') {
            jobs = await Job.find({"user.id": decodedToken.id}).sort({ datePosted: -1 }).limit(limit).skip(skipIndex).exec();
        } else if (sortBy === 'payment') {
            jobs = await Job.find({"user.id": decodedToken.id}).sort({ payment: -1 }).limit(limit).skip(skipIndex).exec();
        } else if (sortBy === 'title') {
            jobs = await Job.find({"user.id": decodedToken.id}).sort({ title: 1 }).limit(limit).skip(skipIndex).exec();
        } else {
            return response.status(400).json({ error: 'invalid sortBy parameter' });
        }

        response.status(200).json({ totalJobs, jobs });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});


jobsRouter.post('/', async (request, response) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const { title, time, description, payment } = request.body.data;
        const user = request.body.user;

        if (!title || !time || !description || !payment || !user) {
            return response.status(400).json({ error: 'missing fields' });
        }

        const job = new Job({
            title,
            time,
            description,
            payment,
            user,
            datePosted: new Date(),
            location: {
                type: 'Point',
                coordinates: [user.lat, user.lng], // Set job location
            }
        });

        const newJob = await job.save();

        response.status(201).json(newJob);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});
    
jobsRouter.delete('/', async (request, response) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const job = await Job.findById(request.body.id);
        if (!job) {
            return response.status(404).json({ error: 'job not found' });
        }
    
        if (job.user.id !== decodedToken.id) {
            return response.status(401).json({ error: 'unauthorized' });
        }
        await job.deleteOne();
        response.status(204).end();
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}
);

jobsRouter.put('/:id', async (request, response) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const job = await Job.findById(request.params.id);
        if (!job) {
            return response.status(404).json({ error: 'job not found' });
        }

        if (job.user.id !== decodedToken.id) {
            return response.status(401).json({ error: 'unauthorized' });
        }

        const { title, time, description, payment } = request.body;
        job.title = title;
        job.time = time;
        job.description = description;
        job.payment = payment;
        
        const updatedJob = await Job.findByIdAndUpdate(request.params.id, job, { new: true });
        console.log(updatedJob);
        response.status(200).json(updatedJob);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = jobsRouter;    