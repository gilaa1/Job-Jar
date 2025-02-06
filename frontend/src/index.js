import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const JOBS_PER_PAGE = 10;

function Root() {
  const [firstCache, setFirstCache] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3001/jobs?page=1`);
        const data = await res.json(); 
        console.log(res);
        const jobs = data.jobs;
        const totalJobs = data.totalJobs;
        setTotalPages(Math.ceil(totalJobs / JOBS_PER_PAGE));
        setFirstCache({ 1: { jobs : jobs } });
        setLoading(false);

      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }

    }
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return <App firstCache={firstCache} totalPages={totalPages} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
