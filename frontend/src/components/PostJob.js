import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../App";




const PostJob = ({ onAddJob }) => {
    const user = useContext(UserContext);
    const [data, setData] = useState({ title: '', time: '', description: '', payment: ''});
    const [isPosting, setIsPosting] = useState(false);


    const handleCancel = (e) => {
        e.preventDefault();
        setData({ title: '', time: '', description: '', payment: ''});
        setIsPosting(false);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            console.log('data:', data);
            console.log('user:', user);
            const response = await axios.post(
                'http://localhost:3001/api/jobs',
                {user, data},
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            const newJob = response.data;
            console.log('newJob', newJob);
            onAddJob(newJob);
            setData({ title: '', time: '', description: '', payment: ''});
            setIsPosting(false);
        } catch (err) {
            const error = err.response.data.error;
            alert(error);
            console.error('Error posting job:', err);
            setIsPosting(false);
        }
    };


    return (
        <div className="post-job">
            {!isPosting && 
            <div className="not-posting">
                <button onClick={() => setIsPosting(true)}>Post a Job</button>
            </div>}
            {isPosting && (
                <div className="posting">
                    <h1>Post a Job</h1>
                    <form onSubmit={handlePost}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={data.title} onChange={handleChange} required />
                        <label htmlFor="time">Time:</label>
                        <input type="text" name="time" value={data.time} onChange={handleChange} required />
                        <label htmlFor="description">Description:</label>
                        <input type="text" name="description" value={data.description} onChange={handleChange} required />
                        <label htmlFor="payment">Payment:</label>
                        <input type="text" name="payment" value={data.payment} onChange={handleChange} required />
                        <button type="submit">Post</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostJob;
