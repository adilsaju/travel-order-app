import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import {  useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Last 30 days Requests',
    },
  },
};




const fetchTasks = async () => {
  let url = `/past30daysRequests`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("hahaha",data);

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labels1 = data.map((a)=>a._id)
const labels = labels1.sort()
 
  const data2 = {
    labels,
    datasets: [
      {
        label: 'Number of students',
        data: data.map((a)=>a.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return data2;
};


const Home = () => {
  const {loggedInUser, isLoggedIn} = useContext(UserContext)

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
}

useEffect(() => {
  // let isLoggedIn  = true
  
  if (!isLoggedIn){
    handleClick();
  }

}, []);


  const [data, setData] = useState(false);

  useEffect(() => {
    
    const getTasks = async () => {
      const tfs = await fetchTasks();
      setData(tfs);
    };
    getTasks();
  }, []);

  return ( <>
  <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
  {
    
 data && <Bar options={options} data={data} />
  } 
  </div>
  </div>
  </>)

}

export default Home