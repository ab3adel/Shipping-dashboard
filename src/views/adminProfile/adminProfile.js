import React,{useState,useEffect} from 'react'
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
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './adminProfile.scss'
import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../globalVar'
const AdminProfile = () => {
  let history = useHistory();
  const [value, setValue] = useState()
  const[profileData,setProfileData]=useState('')
  const[refresh,setRefresh]=useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [errorPass, setErrorPass] = useState();
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const userId = localStorage.getItem("user_id");
  const user_id = JSON.parse(userId);
  const [pageStatus,setPageStatus]=useState(0)
const [adminData,setAdminData]=useState({
  first_name:'',
middle_name:'',
last_name:'',
phone:'',
address:'',
postal_code:'',
})
const{ first_name,
middle_name,
last_name,
phone,
address,
postal_code,
}=adminData;
const[adminPass,setAdminPass]=useState({
  old_password:'',
  new_password:'',
new_password_confirmation:'',})
const[errorMessagePass,setErrorMessagePass]=useState('')
const[successPass,setSuccessPass]=useState('')
const[loadingPass,setLoadingPass]=useState('')
const{  old_password,
new_password,
new_password_confirmation,
  }=adminPass;



useEffect(async()=>{
  const fetchAdmin=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/users/profile?user_id=${user_id}`,
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
  if(response.message== "Profile retrieved successfully!"){
   setProfileData(response.payload)
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

  fetchAdmin()
},[refresh])




const handleData=(e)=>{
  setAdminData({...adminData,[e.target.name]:e.target.value})

  setErrorMessage('')
  setSuccessAdd('')
}
const handlePassword=(e)=>{
  setAdminPass({...adminPass,[e.target.name]:e.target.value})
  setErrorPass('')
  setErrorMessagePass('')
  setSuccessPass('')
}

const handleUpdateProfile=async(e)=>{
  e.preventDefault()
  setLoading(true)
  // setErrorPass('')
  setErrorMessage('')
  setSuccessAdd('')


// if(password!==password_confirmation){
//   setErrorPass(true)
// }


  const data = new FormData();
first_name&& data.append('first_name', first_name);
middle_name&& data.append('middle_name', middle_name);
last_name&& data.append('last_name', last_name);
address&& data.append('address', address);
postal_code&& data.append('postal_code', postal_code);
value&& data.append('phone', value);


try {
  const responsee = await fetch(
    `${global.apiUrl}/users/updateProfile`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
                   // "Content-Type": "application/json",
                  //'Access-Control-Allow-Origin': 'https://localhost:3000',
                  // 'Access-Control-Allow-Credentials': 'true',
        Accept: "application/json",
      },
      body:data,
  
    }
  );
  const response = await responsee.json();
  console.log('response',response);
  console.log(response);
  if(response.message&&response.message=="Profile updated successfully!"){
   
    setSuccessAdd("Profile updated successfully!")
 setRefresh(!refresh)
   
  }
  else{
  setErrorMessage(response.errors)
  }
 
} catch (err) {
  console.log(err);
 
}

setLoading(false)
}

const handleUpdatePass=async(e)=>{
  e.preventDefault()
  setLoadingPass(true)
  // setErrorPass('')
  setErrorMessagePass('')
  setSuccessPass('')


if(new_password!==new_password_confirmation){
  setErrorPass(true)
}
else{

  const data = new FormData();
old_password&& data.append('old_password', old_password);
new_password&& data.append('new_password', new_password);
new_password_confirmation&& data.append('new_password_confirmation', new_password_confirmation);



try {
  const responsee = await fetch(
    `${global.apiUrl}/authentication/changePassword`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
                   // "Content-Type": "application/json",
                  //'Access-Control-Allow-Origin': 'https://localhost:3000',
                  // 'Access-Control-Allow-Credentials': 'true',
        Accept: "application/json",
      },
      body:data,
  
    }
  );
  const response = await responsee.json();
  console.log('response',response);
  console.log(response);
  if(response.message&&response.message=="Password changed successfully!"){
   
    setSuccessPass("Password changed successfully")

   setRefresh(!refresh)
  }
  else if(response.message&&response.message=="Unauthorized or invalid token!"){
    localStorage.removeItem("token");
    localStorage.clear()
 
  history.push("/login");
    }
  else{
  setErrorMessagePass(response.errors)
  }
 
} catch (err) {
  console.log(err);
 
}
}


setLoadingPass(false)
}


console.log('adminregister',adminData)
console.log('adminregister',value)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>

     {pageStatus==0&&<>
      {profileData&&   <CCard>
          <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            {profileData.first_name+' '+profileData.last_name}
            </CCol>
            <CCol md="6" lg="6" xl="6" className="justify-content-center row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 '
           onClick={()=>setPageStatus(2)} >Change Password
                  </CButton>
                  <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 '
           onClick={()=>setPageStatus(1)} >Update Profile
                  </CButton>
            </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
          <CRow>
      <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
             
                        <tr >
                          <td>First Name</td>
                          <td><strong>{profileData.first_name}</strong></td>
                        </tr>
                        <tr >
                          <td>Middle Name</td>
                          <td><strong>{profileData.middle_name}</strong></td>
                        </tr>
                        <tr >
                          <td>Last Name</td>
                          <td><strong>{profileData.last_name}</strong></td>
                        </tr>
                        <tr >
                          <td>Address</td>
                          <td><strong>{profileData.address}</strong></td>
                        </tr>

                  
                </tbody>
              </table>
              </CCol>
              <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
             
                        <tr >
                          <td>Email</td>
                          <td><strong>{profileData.email}</strong></td>
                        </tr>
                        <tr >
                          <td>Phone</td>
                          <td><strong>{profileData.phone}</strong></td>
                        </tr>
                        <tr >
                          <td>Postal Code</td>
                          <td><strong>{profileData.postal_code}</strong></td>
                        </tr>
                </tbody>
              </table>
              </CCol>
    </CRow>  
          </CCardBody>
        </CCard>
       
}
     </>}
    


{profileData&&pageStatus==1&&<>


         {/* mx-4 */}
            <CCard className="">

            <CForm onSubmit={(e)=>{handleUpdateProfile(e)}}>

            <CCardHeader>
          <CRow className="justify-content-center row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           Update {' '+profileData.first_name+' '}Profile
            </CCol>
            <CCol md="6" lg="6" xl="6">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(0)} >Back
                  </CButton>
            </CCol>
            </CRow>
          </CCardHeader>

              <CCardBody className="p-4">
          
              <CRow className="justify-content-center">
            
          <CCol md="6" lg="6" xl="6">
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={profileData.first_name}
                    
                    name='first_name'
                    type="text" placeholder="First Name"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={profileData.middle_name}

                    name='middle_name'
                    type="text" placeholder="Middle Name"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={handleData}
                    name='last_name'
                    defaultValue={profileData.last_name}

                    type="text" placeholder="Last Name"  />
                  </CInputGroup>
          
                  </CCol>
      
                  <CCol md="6" lg="6" xl="6">
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                         <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={profileData.address}
                    name='address'
                    type="text" placeholder="*Address"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        P
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                   
                   onChange={handleData}
                   defaultValue={profileData.postal_code}
                    name='postal_code'
                    type="text" placeholder="*Postal Code"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText> <CIcon name="cil-phone" />
                       </CInputGroupText>
                    </CInputGroupPrepend>
                    
                    <PhoneInput className='form-control'
                    // onChange={handleData}
                       
                    name='phone'
      placeholder="Phone Number"
      value={profileData.phone}
      // defaultCountry="SA"
      onChange={setValue}
      
      />
                  </CInputGroup>
     

                  </CCol>
                 </CRow>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow className="justify-content-center">
         
                   { errorMessage&& 
                   <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                   color="danger"
                   // closeButton
              > 
               {     Object.keys(errorMessage).map((item, i) => (
              
         <>{errorMessage[item]}<br/></>  
            
                      
                
          ))}
          </CAlert>
          
          }
          
              
              
              
                { succesAdd&& 
                
                
                <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                color="success"
                // closeButton
              >
            {succesAdd}
              </CAlert>
              
              
              }
            
                  <CCol  md="6" lg="6" xl="6" xs="12" sm="12" >
                  <CButton color="success" block type='submit'>Save
                  {loading&&<>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>
                  </CCol>
                
                </CRow>
              </CCardFooter>
              </CForm>
            </CCard>
       
       



</>}
    
{profileData&&pageStatus==2&&<>


{/* mx-4 */}
   <CCard className="">

   <CForm onSubmit={(e)=>{handleUpdatePass(e)}}>

   <CCardHeader>
 <CRow className="justify-content-center row-gap-15">
   
   <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
  Change {' '+profileData.first_name+' '}Password
   </CCol>
   <CCol md="6" lg="6" xl="6">
   <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
  onClick={()=>setPageStatus(0)} >Back
         </CButton>
   </CCol>
   </CRow>
 </CCardHeader>

     <CCardBody className="p-4">
 
     <CRow className="justify-content-center">
   
 

         <CCol md="6" lg="6" xl="6">
    
         <CInputGroup className="mb-3">
           <CInputGroupPrepend>
             <CInputGroupText>
               <CIcon name="cil-lock-locked" />
             </CInputGroupText>
           </CInputGroupPrepend>
           <CInput
           onChange={handlePassword}

            name='old_password'
           type="password" placeholder="Password" required autoComplete="new-password" />
         </CInputGroup>
         <CInputGroup className="mb-3">
           <CInputGroupPrepend>
             <CInputGroupText>
               <CIcon name="cil-lock-locked" />
             </CInputGroupText>
           </CInputGroupPrepend>
           <CInput
           onChange={handlePassword}

            name='new_password'
           type="password" placeholder="New Password" required autoComplete="new-password" />
         </CInputGroup>
         <CInputGroup className="mb-4">
           <CInputGroupPrepend>
             <CInputGroupText>
               <CIcon name="cil-lock-locked" />
             </CInputGroupText>
           </CInputGroupPrepend>
           <CInput
              onChange={handlePassword}
           name='new_password_confirmation'
           type="password" placeholder="Confirm New password" required autoComplete="new-password" />
         </CInputGroup>


         </CCol>
        </CRow>
     </CCardBody>
     <CCardFooter className="p-4">
       <CRow className="justify-content-center">
       { errorPass&& 
       
       
       <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
       color="danger"
       // closeButton
     >
   Password and confirm password do not match
     </CAlert>
     
     
     }
          { errorMessagePass&& 
          <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
          color="danger"
          // closeButton
     > 
      {     Object.keys(errorMessagePass).map((item, i) => (
     
<>{errorMessagePass[item]}<br/></>  
   
             
       
 ))}
 </CAlert>
 
 }
 
     
     
     
       { successPass&& 
       
       
       <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
       color="success"
       // closeButton
     >
   {successPass}
     </CAlert>
     
     
     }
   
         <CCol  md="6" lg="6" xl="6" xs="12" sm="12" >
         <CButton color="success" block type='submit'>Save
         {loadingPass&&<>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>
         </CCol>
       
       </CRow>
     </CCardFooter>
     </CForm>
   </CCard>





</>}





     
      </CContainer>
    </div>
  )
}

export default AdminProfile
