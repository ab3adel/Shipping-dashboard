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
import './settings.scss'
import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../../globalVar'
const Settings = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [value, setValue] = useState()
  const[fetchedData,setfetchedData]=useState('')
  const[fetchedBalance,setfetchedBalance]=useState('')
  const[refresh,setRefresh]=useState('')
  const [errorMessage, setErrorMessage] = useState();
  
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const userId = localStorage.getItem("user_id");
  const user_id = JSON.parse(userId);
  const [pageStatus,setPageStatus]=useState(0)
const [upData,setUpData]=useState({
  facebook:'',
twitter:'',
linkedin:'',
instagram:'',
email:'',
address:'',phone:''
})
const{ facebook,
twitter,
linkedin,
instagram,
email,
address,phone
}=upData;



useEffect(async()=>{
  const fetchSettings=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/settings/viewWebsiteSettings`,
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
  if(response.message== "Website settings retrieved successfully!"){
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
},[refresh])

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


const handleData=(e)=>{
  setUpData({...upData,[e.target.name]:e.target.value})

  setErrorMessage('')
  setSuccessAdd('')
}

const handleUpdateProfile=async(e)=>{
  e.preventDefault()
  setLoading(true)
  
  setErrorMessage('')
  setSuccessAdd('')


  const data = new FormData();
facebook&& data.append('facebook', facebook);
twitter&& data.append('twitter', twitter);
linkedin&& data.append('linkedin', linkedin);
instagram&& data.append('instagram', instagram);
email&& data.append('email', email);
address&& data.append('address', address);
value&& data.append('phone', value);


try {
  const responsee = await fetch(
    `${global.apiUrl}/settings/updateWebsiteSettings`,
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
  if(response.message&&response.message=="Website settings updated successfully!"){
   
    setSuccessAdd("Website settings updated successfully!")
 setRefresh(!refresh)
 setVisible(5)
  }
  else{
   
    setVisible(5)
  setErrorMessage(response.errors)
  }
 
} catch (err) {
  console.log(err);
 
}

setLoading(false)
}



  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>

     {pageStatus==0&&<>
      {fetchedData&&   <CCard>
          <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            Settings
            </CCol>
            <CCol md="6" lg="6" xl="6" >
            {/* className="row-gap-15 col-gap-15 " */}
                  <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(1)} >Update
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
                          <td>Balance</td>
                       { fetchedBalance&&  <td><strong>{fetchedBalance.balance +' '+fetchedBalance.currency}</strong></td>}
                        </tr>
                        <tr >
                          <td>Email</td>
                          <td><strong>{fetchedData.email}</strong></td>
                        </tr>
                        <tr >
                          <td>Phone</td>
                          <td><strong>{fetchedData.phone}</strong></td>
                        </tr>
                        <tr >
                          <td>Address</td>
                          <td><strong>{fetchedData.address}</strong></td>
                        </tr>
                      

                  
                </tbody>
              </table>
              </CCol>
              <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
             
                        <tr >
                          <td>Facebook</td>
                          <td><strong>{fetchedData.facebook}</strong></td>
                        </tr>
                        <tr >
                          <td>Instagram</td>
                          <td><strong>{fetchedData.instagram}</strong></td>
                        </tr>
                        <tr >
                          <td>Twitter</td>
                          <td><strong>{fetchedData.twitter}</strong></td>
                        </tr>
                        <tr >
                          <td>Linkedin</td>
                          <td><strong>{fetchedData.linkedin}</strong></td>
                        </tr>
                </tbody>
              </table>
              </CCol>
    </CRow>  
          </CCardBody>
        </CCard>
       
}
     </>}
    


{fetchedData&&pageStatus==1&&<>


         {/* mx-4 */}
            <CCard className="">

            <CForm onSubmit={(e)=>{handleUpdateProfile(e)}}>

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           Update Settings
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
                        F
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.facebook}
                    
                    name='facebook'
                    type="url" placeholder="Facebook"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        T
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.twitter}
                    
                    name='twitter'
                    type="url" placeholder="Twitter"  />
                  </CInputGroup>
               
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                       L
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.linkedin}
                    
                    name='linkedin'
                    type="url" placeholder="Linked in"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                       L
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.instagram}
                    
                    name='instagram'
                    type="url" placeholder="Instagram"  />
                  </CInputGroup>
                 </CCol>
          <CCol md="6" lg="6" xl="6">
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        @
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.email}
                    
                    name='email'
                    type="email" placeholder="Email"  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    defaultValue={fetchedData.address}

                    name='address'
                    type="text" placeholder="Address"  />
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
      value={fetchedData.phone}
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
                   show={visible}
                   // closeButton
                   onShowChange={setVisible}
              > 
               {     Object.keys(errorMessage).map((item, i) => (
              
         <>{errorMessage[item]}<br/></>  
            
                      
                
          ))}
          </CAlert>
          
          }
          

                { succesAdd&& 
                
                
                <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                color="success"
                show={visible}
                // closeButton
                onShowChange={setVisible}
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
    






     
      </CContainer>
    </div>
  )
}

export default Settings
