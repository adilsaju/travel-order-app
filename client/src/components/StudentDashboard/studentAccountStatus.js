import React from 'react'
import { useState,useEffect, useContext } from 'react';
import StudentUpload from './studentUpload';
import { Link } from "react-router-dom";
import SideMenu from '../Navbar/SideMenu';
import {UserContext} from '../../Contexts/UserContext'
import { useNavigate } from "react-router-dom";

//Fetch Data using API

const fetchTasks = async (loggedInUser) => {
  let url = `/students/${loggedInUser.id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log("fetch works")
  return data;
};
const StudentAccountStatus = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
}

useEffect(() => {
  // let isLoggedIn  = true
  
  // if (!isLoggedIn){
  //   handleClick();
  // }
  if(localStorage.getItem("isLoggedIn") !== "true"){
    handleClick();
    }

}, []);

  const {loggedInUser, isLoggedIn} = useContext(UserContext)

            const [students,setStudents] = useState([]);
            useEffect(() => {
                const getTasks = async () => {
                const tfs = await fetchTasks(loggedInUser);
                setStudents(tfs);
                };
                getTasks();
            }, []);
            // const isEmpty = Object.keys(students).length === 0;
            // console.log(isEmpty);
  return (
    <div>
       <div className='fullpage'>
       <SideMenu/>
      <div className='division'>
      
      <div className='maindiv'>
      <h1 className='studentAccountName'>{students.name}</h1>
     
        <div className='studentimage'>
          <img src= {students.photo}/>
          <div className='studentviews'>
          {students.length===0? console.log("Nothing") : <h2>Hours Flown : {students.studentRequirements.flownHours}</h2>  }
          
          <h2>Student ID : {students.studentNumber}</h2>
          <h2>Course : {students.program}</h2>
          {students.length===0? console.log("Nothing") : <h2>Account Balance : {students.studentRequirements.balance}</h2>  }
          {/* {students.length===0 ? console.log("Nothing") : <h2>Hours Flown : {students.requests[0].isApproved? students.requests[0].isApproved : "No upcoming flights"}</h2>  } */}
          </div>
        </div>
      {students.length===0? console.log("Nothing") : <StudentUpload starry = {students} />  }
      </div>
      </div>
      </div>
      </div>
  )
}
export default StudentAccountStatus;