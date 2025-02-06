import React, { useState, createContext, useEffect, use } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Homepage from './pages/homepage';
import MainPage from './pages/mainpage';
import JobList from './pages/jobList';
import Profile from './pages/profile';
import ResetPassword from './pages/resetPassword';
import MyJobs from './pages/myJobs';


export const UserContext = createContext(null);
export const JobContext = createContext(null);
export const ActiveNavPageContext = createContext(null);

function App({ totalPages }) {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', token: '', address: '', id: '' });
  const [jobs, setJobs] = useState([]);
  const [navPage, setNavPage] = useState('Main');



  // Check for logged-in user on initial load
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Update sessionStorage when user state changes
  useEffect(() => {
    if (user.token) {
      console.log('user changed');
      sessionStorage.setItem('user', JSON.stringify(user));
    }

  }, [user]);



  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <JobContext.Provider value={jobs}>
          <ActiveNavPageContext.Provider value={navPage}>
            <Router>
              <Routes>
                <Route path="/" element={<HomepageWithNavigation setUser={setUser}/>} />
                <Route
                  path="/main"
                  element={<ProtectedRoute element={<MainPage onLogout={handleLogout} onAddJob={handleAddJob} />} />}
                />
                <Route
                  path="/joblist"
                  element={<ProtectedRoute element={<JobList pages={totalPages} onLogout={handleLogout} onDeleteJob={handleDeleteJob} onEditJob={handleEditJob} />} />}
                />
                <Route path="/myjobs" element={<ProtectedRoute element={<MyJobs onLogout={handleLogout} onDeleteJob={handleDeleteJob} onEditJob={handleEditJob} />} />} />
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<Profile onLogout={handleLogout} onEditProfile={handleEditProfile}/>} />}
                />
                <Route path="/reset-password" element={<ResetPassword onResetPassword={onResetPassword}/>} />

              </Routes>
            </Router>
            <div className="footer">
              <p>Job-Jar © Gil Adi</p>
              <p> Logo designed with www.freepik.com </p>
            </div>
          </ActiveNavPageContext.Provider>
        </JobContext.Provider>
      </UserContext.Provider>
    </div>
  );

  // Handle logout logic
  function handleLogout(navigate) {
    setUser({ firstName: '', lastName: '', email: '', token: '', address: '' });
    navigate('/');
  }

  // Route protection wrapper
  function ProtectedRoute({ element }) {
    const navigate = useNavigate();
    return user.token ? React.cloneElement(element, { onLogout: () => handleLogout(navigate) }) : <Homepage />;
  }

  // Handle adding a job
  function handleAddJob(job) {
    setJobs((prevJobs) => [job, ...prevJobs]);
  }

  function handleDeleteJob(jobId) {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  }

  function handleEditJob(job) {
    setJobs((prevJobs) => prevJobs.map((j) => (j._id === job._id ? job : j)));
  }

  function handleEditProfile(data) {
    const userData = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      token: data.Authorization,
      address: data.user.address,
      id: data.user._id,
      lat: data.user.lat,
      lng: data.user.lng,
    };
    
    setUser(userData);
  }

  function onResetPassword(token) {
    setUser({...user, token: token});


  }
}


function HomepageWithNavigation({ setUser }) {
  const navigate = useNavigate();

  function handleLogin(data) {
    const userData = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      token: data.Authorization,
      address: data.user.address,
      id: data.user._id,
      lat: data.user.lat,
      lng: data.user.lng,
      avatar: data.user.avatar,
    };
    setUser(userData);
    navigate('/main'); // Navigate to /main after login
  }

  function handleSignup(data) {
    const userData = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      token: data.Authorization,
      address: data.user.address,
      lat: data.user.lat,
      lng: data.user.lng,
      id: data.user._id,
    };
    setUser(userData);
    navigate('/main'); // Navigate to /main after signup
  }



  

  return <Homepage onLogin={handleLogin} onSignup={handleSignup} />;
}

export default App;
