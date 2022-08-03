import React,{useState,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import './adminRegister.scss'
import {CAlert} from '@coreui/react'
import '../../globalVar'
const Register = () => {
  const [value, setValue] = useState()
  const [errorMessage, setErrorMessage] = useState();
  const [errorPass, setErrorPass] = useState();
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
const [adminData,setAdminData]=useState({
  first_name:'',
middle_name:'',
last_name:'',
email:'',
phone:'',
address:'',
postal_code:'',
password:'',
password_confirmation:'',
})
const{ first_name,
middle_name,
last_name,
email,
phone,
address,
postal_code,
password,
password_confirmation,
}=adminData;

const handleData=(e)=>{
  setAdminData({...adminData,[e.target.name]:e.target.value})
  setErrorPass('')
  setErrorMessage('')
  setSuccessAdd('')
}

const handleSubmit=async(e)=>{
  e.preventDefault()
  setLoading(true)
  setErrorPass('')
  setErrorMessage('')
  setSuccessAdd('')


if(password!==password_confirmation){
  setErrorPass(true)
}

else{
  const data = new FormData();
data.append('first_name', first_name);
data.append('middle_name', middle_name);
data.append('last_name', last_name);
data.append('address', address);
data.append('postal_code', postal_code);
data.append('phone', value);
data.append('email', email);
data.append('password', password);
data.append('password_confirmation', password_confirmation);

try {
  const responsee = await fetch(
    `${global.apiUrl}/users/adminRegister`,
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
  if(response.message&&response.message=="Admin user created successfully!"){
   
    setSuccessAdd("Admin user created successfully!")
 
   
  }
  else{
  setErrorMessage(response.errors)
  }
 
} catch (err) {
  console.log(err);
 
}




}

setLoading(false)


}


console.log('adminregister',adminData)
console.log('adminregister',value)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
      <CContainer>
      <CForm onSubmit={(e)=>{handleSubmit(e)}}>
         {/* mx-4 */}
            <CCard className="">
              <CCardBody className="p-4">
              <h1>Register</h1>
                  <p className="text-muted">Create admin account</p>
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
                    name='first_name'
                    type="text" placeholder="*First Name" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}

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
                    type="text" placeholder="*Last Name" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}

                    name='email'
                    type="email" placeholder="*Email" autoComplete="email" required />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText> <CIcon name="cil-phone" />
</CInputGroupText>
                    </CInputGroupPrepend>
                    
                    <PhoneInput className='form-control'
                    // onChange={handleData}
                       required
                    name='phone'
      placeholder="Phone Number"
      value={value}
      // defaultCountry="SA"
      onChange={setValue}
      
      />
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

                    name='address'
                    type="text" placeholder="*Address" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        P
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}

                    name='postal_code'
                    type="text" placeholder="*Postal Code" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}

                     name='password'
                    type="password" placeholder="Password" required autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                       onChange={handleData}
                    name='password_confirmation'
                    type="password" placeholder="Confirm password" required autoComplete="new-password" />
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
                  <CButton color="success" block type='submit'>Create Account
                  {loading&&<>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>
                  </CCol>
                
                </CRow>
              </CCardFooter>
      
            </CCard>
       
        </CForm>
      </CContainer>
    </div>
  )
}

export default Register
