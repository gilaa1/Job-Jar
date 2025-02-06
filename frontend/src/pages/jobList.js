import React, { useContext, useState, useRef, useEffect } from "react";
import Job from "../components/Job";
import { JobContext, UserContext } from "../App";
import axios from "axios";
import Pagination from "../components/Pagination";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import { calculateDistance } from "../services/distanceService";

const JobList = ({ pages, onLogout, onDeleteJob, onEditJob }) => {
    const jobs = useContext(JobContext);
    const user = useContext(UserContext);
    const [pageJobs, setPageJobs] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(pages);
    const [sortBy, setSortBy] = useState("default");
    const [totalJobs, setTotalJobs] = useState(0);
    const cache = useRef({
        default: {},
        date: {},
        payment: {},
        title: {},
        distance: {}
    });

    const MAX_JOBS_PER_PAGE = 2;

 

    useEffect(() => {
        const fetchJobs = async (page) => {
            let res;
            if (cache.current[sortBy][page])
                return cache.current[sortBy][page].jobs;
            else{
                console.log("fetching jobs");
                const lat = user.lat;
                const lng = user.lng;
                res = await axios.get(`http://localhost:3001/api/jobs`, {
                    params: { page: page, sortBy: sortBy, userLat: lat, userLng: lng }
                });
            }
            
           
            const fetchedJobs = res.data.jobs;
            setTotalJobs(res.data.totalJobs);
            cache.current[sortBy][page] = { jobs: fetchedJobs };
            console.log(cache.current);
            return fetchedJobs;
        };

        const initializeJobs = async () => {
            const fetchedJobs = await fetchJobs(activePage);
            setPageJobs(fetchedJobs);
        };

        initializeJobs();
    }, [activePage, jobs, sortBy]);

    useEffect(() => {
        async function updateJobsWithDistances() {
            if (!cache.current[sortBy][activePage]) return;
            const jobsForPage = cache.current[sortBy][activePage].jobs;
            const updatedJobs = await Promise.all(
                jobsForPage.map(async (job) => ({
                    ...job,
                    distance: await calculateDistance(user.address, job.user.address),
                }))
            );
            setPageJobs(updatedJobs);
            cache.current[sortBy][activePage] = { jobs: updatedJobs };
        }
    
        updateJobsWithDistances();
    }, [sortBy, activePage, user.address]);
    

    const handlePageChange = (page) => {
        if (page < 1 || page > Math.ceil(totalJobs / MAX_JOBS_PER_PAGE)) return;
        setActivePage(page);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        console.log(e.target.value);
        setActivePage(1);
    };
    
    const getPaginationRange = (activePage, totalJobs) => {
        const maxNumOfPages = 5;
        const totalPages = Math.ceil(totalJobs / MAX_JOBS_PER_PAGE);
        let start = Math.max(1, activePage - 2);
        let end = Math.min(totalPages, activePage + 2);

        if (activePage < 3) {
            end = Math.min(totalPages, maxNumOfPages);
        } else if (activePage > totalPages - 2) {
            start = Math.max(1, totalPages - maxNumOfPages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const paginationRange = getPaginationRange(activePage, totalJobs);

    return (
        <div className="job-list">
            <Navbar onLogout={onLogout} />
            <h1>Job List</h1>
            <div className="job-list-content">
                <div className="sort">
                    <label htmlFor="sort">Sort By: </label>
                    <select id="sort" value={sortBy} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="date">Date</option>
                        <option value="payment">Payment</option>
                        <option value="title">Title</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>
                <div className="job-list-jobs">        
                    {pageJobs?.map((job) => (
                        <Job
                            key={job._id}
                            job={job}
                            onDeleteJob={onDeleteJob}
                            onEditJob={onEditJob}
                        />
                    ))}
                </div>
                <Pagination
                    activePage={activePage}
                    totalPages={Math.ceil(totalJobs / MAX_JOBS_PER_PAGE)}
                    onPageChange={handlePageChange}
                    paginationRange={paginationRange}
                />
                <Map pageJobs={pageJobs}/>
            </div>
        </div>
    );
};

export default JobList;
