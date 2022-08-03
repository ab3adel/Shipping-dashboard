import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CPagination,
  CDataTable,
  CSelect,
  CFormText,
  CTextarea,
  CFormGroup,
  CLabel,
  CSwitch,
  CInputFile,
  CLink,
  CFade,
  CCollapse,
  CBadge,
  CRow
} from '@coreui/react'
import {CAlert} from '@coreui/react'
import '../../globalVar'
import './ExtremeCRM.scss'

import { useTranslation } from 'react-i18next';



const ExtremeCRM = ({match}) => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

 const [loading,setLoading]=useState('')
 const [error,setError]=useState(false)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const user_roles = localStorage.getItem("user_roles");



  
  useEffect(()=>{
    setLoading(true)
    console.log(tokenString)
  if(!tokenString||!user_roles){
    history.push("/login")
  }
  else{
    if(JSON.parse(user_roles)[0]=='admin'){
      if(match.params.tel){
        if(match.params.tel.split(':').length==2){
          console.log(match.params.tel.split(':'))
          if(match.params.tel.split(':')[0]=='tel'&&match.params.tel.split(':')[1])
          {
            setLoading(true)
            console.log('success')
            const fetchCustomer=async(e)=>{
  
  
    
              try {
                const responsee = await fetch(
                  `${global.apiUrl}/admin/call-center/tel:0944383746`,
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
                if(responsee.status==404){
                  history.push({pathname: "/customers/AddNewCustomer"
            ,
              state: {tel:match.params.tel.split(':')[1]}})
                  }
                const response = await responsee.json();
                // console.log('response',response);
                console.log('faqs',response);
              if(response.success){
             
            
              }
             
                if(response.message&&response.message=="Unauthenticated."){
                localStorage.removeItem("token");
                localStorage.clear()
             
              history.push("/login");
                }
               
              } catch (err) {
                console.log(err);
               
              }
            
              // setLoading(false)
              
              
              }
            
              fetchCustomer()


            
          }else{
            
            setError(true)}
            setLoading(false)
         
        }
        else{
          setLoading(false)
          setError(true)
        }
       
       
      }
      else{
        setLoading(false)
          setError(true)
      }
     
    }
    else{

      setLoading(false)
      setError(true)
      localStorage.removeItem("token");
      localStorage.clear()
   
    history.push("/login");
    }
    

  }
  },[])

  return (<>

  {loading?

<div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">
    <i className="fa fa-spinner fa-spin" ></i>
    </div>
  </div>
  :


<div className="c-app c-default-layout flex-row align-items-center register-cont">

<CContainer>


  <CCard className="">
  <CRow>
 <CCardBody>
 
  {error&&
  
  <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
  color="danger"
  // closeButton

  // closeButton
  
>
  {i18n.language == 'ar' ?
  <>صيغة الرابط خاطئة <br/>
  يحب ان يكون الرابط مثل : ExtremeCRM/tel:phoneNumber
  </>
  : <>Wrong Call Center Integration URL <br/>
URL Must Be like : /ExtremeCRM/tel:phoneNumber</>}


</CAlert>
  
  
  }



          </CCardBody>
    </CRow>

  </CCard>


</CContainer>
</div>
}


  
  
  </>
  
  )
}

export default ExtremeCRM
