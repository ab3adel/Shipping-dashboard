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
import './apiKey.scss'
import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../../globalVar'
const Settings = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [value, setValue] = useState()
  const[fetchedData,setfetchedData]=useState('')
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
  api_key:'',

})
const{ api_key,}=upData;







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
api_key&& data.append('api_key', api_key);



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
   
    setSuccessAdd("API Key updated successfully!")
    document.getElementById('apikey').value=''
setUpData({api_key:''})
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

    





         {/* mx-4 */}
            <CCard className="">

            <CForm onSubmit={(e)=>{handleUpdateProfile(e)}}>

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="12" lg="12" xl="12" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           Update API Key
            </CCol>
         
            </CRow>
          </CCardHeader>

              <CCardBody className="p-4">
          
              <CRow className="justify-content-center">
              <CCol md="8" lg="8" xl="8">
              <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-code" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                    onChange={handleData}
                    required
                    id='apikey'
                    defaultValue={api_key}
                    name='api_key'
                    type="text" placeholder="*API Key" autoComplete="off"/>
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
       
       



    






     
      </CContainer>
    </div>
  )
}

export default Settings
