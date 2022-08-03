import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CLink,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import './dashboard.scss'
import'../../globalVar'
const Dashboard = () => {
  let history = useHistory();
  const tokenString = localStorage.getItem("token");

  const user_roles = localStorage.getItem("user_roles");
  const userToken = JSON.parse(tokenString);
  const[fetchedData,setfetchedData]=useState('')
  const[fetchedBalance,setfetchedBalance]=useState('')
  useEffect(async()=>{
    console.log(JSON.parse(user_roles))
    const fetchSettings=async(e)=>{
  
  
    
    try {
      const responsee = await fetch(
        `${global.apiUrl}/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
                       // "Content-Type": "application/json",
                      //'Access-Control-Allow-Origin': 'https://localhost:3000',
                      // 'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
  
      
        }
      );
      const response = await responsee.json();
      // console.log('response',response);
      console.log(response.payload);
    if(response){
     setfetchedData(response.payload)
    }
      if(response.message&&response.message=="Unauthorized or invalid token!"){
      localStorage.removeItem("token");
      localStorage.clear()
   
    history.push("/login");
      }
     
    } catch (err) {
      console.log(err);
     
    }
  
    // setLoading(false)
    
    
    }
  
    fetchSettings()
  },[])

  useEffect(async()=>{
    const fetchBalance=async(e)=>{
  
  
    
    try {
      const responsee = await fetch(
        `${global.apiUrl}/getBalance`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
                       // "Content-Type": "application/json",
                      //'Access-Control-Allow-Origin': 'https://localhost:3000',
                      // 'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
  
      
        }
      );
      const response = await responsee.json();
      // console.log('response',response);
      console.log(response);
    if(response){
     setfetchedBalance(response)
    }
      if(response.message&&response.message=="Unauthorized or invalid token!"){
      localStorage.removeItem("token");
      localStorage.clear()
   
    history.push("/login");
      }
     
    } catch (err) {
      console.log(err);
     
    }
  
    // setLoading(false)
    
    
    }
  
    fetchBalance()
  },[])
  return (
    <>
   {fetchedData&&   <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard color="primary" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Balance</p>
               <br/>
                { fetchedBalance&&  <><strong>{fetchedBalance.balance +' '+fetchedBalance.currency}</strong> <br/></>}
                
                <footer><CLink className='DlINK' to='/Settings'>Settings</CLink></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="success" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
                <p>Normal Users</p>
                <br/>
                { fetchedData&&  <><strong>{fetchedData.all_normal_users +' Users' }</strong> <br/></>}
               
                <footer><CLink className='DlINK' to='/users'>Users Management</CLink></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="info" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
              <p>Global Offers</p>
                <br/>
                { fetchedData&&  <><strong>{fetchedData.global_offers +' Offers' }</strong> <br/></>}
               
                <footer><CLink className='DlINK' to='/Offers'>Offers Management</CLink></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="warning" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
              <p>Confirmed Services</p>
                <br/>
                { fetchedData&&  <><strong>{fetchedData.confirmed_services +' Services' }</strong> <br/></>}
               
                <footer><CLink className='DlINK' to='/Services'>Services Management</CLink></footer>
              </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="danger" className="text-white text-center">
            <CCardBody>
              <blockquote className="card-bodyquote">
              <p>Unseen Contact Us Requests</p>
                <br/>
                { fetchedData&&  <><strong>{fetchedData.unseen_contact_us_requests +' Requests' }</strong> <br/></>}
               
                <footer><CLink className='DlINK' to='/ContactUs'>Contact Us Requestes Management</CLink></footer>
                 </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="primary" className="text-white text-center">
            <CCardBody>
            <blockquote className="card-bodyquote">
              <p>All Purchases</p>
                <br/>
                { fetchedData&&  <><strong>{fetchedData.purchases +' Purchases' }</strong> <br/></>}
               
                <footer><CLink className='DlINK' to='/Purchases'>Purchases</CLink></footer>
                 </blockquote>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>}

    </>
  )
}

export default Dashboard
