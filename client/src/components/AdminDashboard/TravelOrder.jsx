import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from "moment";
import Filters from './Filters';
import "./TravelOrder.css"

const TravelOrder = () => {


  const [requests,setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [filterTextvalue,updatefilterText] = useState('SelectFilter')
  
    useEffect(() => {
 setTimeout(() => {
  fetch(`/pendingRequests`).then(res => {
    if(!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    console.log("TOOO: data");
    setRequests(data);
    setError(null);
  }).catch(err => {
    setError(err.message)
  })
 },1000)

    }, []);
let count = 1;

 requests.sort((a,b) => {
  if(filterTextvalue === 'SelectFilter') {
    return new Date(a.flightDate).getTime() - new Date(b.flightDate).getTime() ;
  }
  if(filterTextvalue === 'NameASC')
  {
    return a.requestedStudent.name > b.requestedStudent.name ?1:-1
  }
  if(filterTextvalue === 'NameDES')
  {
    return a.requestedStudent.name < b.requestedStudent.name ?1:-1
  }
  if(filterTextvalue === 'DateASC')
  {
    return new Date(a.flightDate).getTime() - new Date(b.flightDate).getTime() ;
  }
  if(filterTextvalue === 'DateDES')
  {
    return new Date(b.flightDate).getTime() - new Date(a.flightDate).getTime() ;
  }
})

function onFilterValueSelected(filterValue) {
updatefilterText(filterValue);
}



return (
    <>
  <div className='fullpage'>
    <SideMenuAdmin/>
    <div className='division'>
                      <div>
                            <Search/>
       <Filters FilterValueSelected={onFilterValueSelected}/>
                            <table className="myTable">
                              <thead>
                              { error && <div>{ error }</div> }
                              <tr className="heading">
                                          <th>No.</th>
                                          <th>Requested ID</th>
                                          <th>Name</th>
                                          <th className=''>Student Id</th>
                                          <th className=''>Travel Date</th>
                                          <th className=''>Action</th>
                                        </tr>
                                        </thead>
                                        
                              {requests.map((request,id) => {
                                                    if ( 'requestedStudent' in request && request.isApproved === false)
                                                    {
                                                      return(
                                                        <tbody key={id}>
                              <tr className='tay'>
                                <td>{count++}</td>
                                <td>{request._id}</td>
                                <td>{request.requestedStudent && request.requestedStudent.name}</td>
                                <td>{request.requestedStudent && request.requestedStudent.studentNumber}</td>
                                <td>{moment(request.flightDate).format("MMMM Do , YYYY")}</td>
                                <td><Link to={ `/travel-order/profile/${request._id}` }>View Profile</Link></td>
                              </tr>
                              </tbody>
                              ) }
                                                })
                                              }
                           
                          </table>
                    
                      </div>
                          <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.
                          </div>
    </div>
    </div>
    </>
  )
}

export default TravelOrder