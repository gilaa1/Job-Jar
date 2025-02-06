import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { calculateDistance } from "../services/distanceService";
import axios from "axios";

const Job = ({ job, onDeleteJob, onEditJob }) => {
    const user = useContext(UserContext);
    const [distance, setDistance] = useState("Calculating...");
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({ title: job.title, time: job.time, description: job.description, payment: job.payment });

    useEffect(() => {
        const fetchDistance = async () => {
            if (user.address && job.user.address) {
                try {
                    const result = await calculateDistance(user.address, job.user.address);
                    setDistance(result);
                } catch {
                    setDistance("N/A");
                }
            }
        };

        fetchDistance();
    }, [user.address, job.user.address]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/jobs`, {
                headers: { Authorization: `Bearer ${user.token}` },
                data: { id: job._id },
            });
            onDeleteJob(job);
        } catch (err) {
            console.error("Error deleting job:", err);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/jobs/${job._id}`, {
                title: data.title,
                time: data.time,
                description: data.description,
                payment: data.payment,
            }, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            console.log(response.data);
            onEditJob(response.data);
            toggleEdit();
        } catch (err) {
            console.error("Error editing job:", err);
        }

    }

    const convertDate = (date) => {
        const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    return (
        <div className="job">
            {!isEditing && <div className="not-editing">
                <h2>{job.title}</h2>
                <small>{job.description}</small>
                <p>Payment: {job.payment}</p>
                <p>Location: {job.user.address}</p>
                <p>Distance: {distance}</p>
                <p>Posted by: {job.user.firstName}</p>
                <p>Posted on: {convertDate(job.datePosted)}</p>
                {user && user.id === job.user.id && 
                <div className="job-buttons">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={toggleEdit}>Edit</button>
                </div>
                }
            </div>
            }
            {isEditing && <div className="editing">
                <form onSubmit={handleEditSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" value={data.title} onChange={handleChange} required />
                    <br />
                    <label htmlFor="time">Time:</label>
                    <input type="text" name="time" value={data.time} onChange={handleChange} required />
                    <br />
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" value={data.description} onChange={handleChange} required/>
                    <br />
                    <label htmlFor="payment">Payment:</label>
                    <input type="text" name="payment" value={data.payment} onChange={handleChange} required/>
                    <br />
                    <button type="submit">Submit</button>
                    <button onClick={toggleEdit}>Cancel</button>
                </form>
                </div>}

        </div>
    );
};

export default Job;
