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
  CInputFile,
CLabel,
CFormGroup,
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './aboutUs.scss'
import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";

import '../../../globalVar'
import Editor from './editor'
const AboutUs = (props) => {
  let history = useHistory();

  const [visible, setVisible] = useState(10)
  // const [value, setValue] = useState()
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
const [pickedImg,setPickedImg]=useState('')
const[dataText,setDataText]=useState('')

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
   setDataText(response.payload.about_us_ar)
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
dataText&& data.append('about_us_ar',dataText );
pickedImg&& data.append('about_us_photo',pickedImg );


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

const handleImg=(e)=>{
  if(e.target.files[0])
 { setPickedImg(e.target.files[0])}
}
console.log('p',dataText)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>

     {pageStatus==0&&<>
      {fetchedData&&   <CCard>
          <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           About Us
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
            <CCol md='12'>
             {fetchedData&& <img className='aboutUSImg' src={fetchedData.about_us_photo} />}
            </CCol>
          <CCol md='12' className='arbicJustfiy' dangerouslySetInnerHTML={{__html: fetchedData.about_us_ar}} >
            {/* {toHtml()} */}
            
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
           Update About Us
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
              <CCol md='6'>       <CFormGroup row>
                  <CLabel col md={12}>Change About Us Image</CLabel>
                  <CCol xs="12" md="12">
                  
                    <CInputFile accept="image/*" custom id="custom-file-input" onChange={(e)=>{handleImg(e)}}  />

                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                     {pickedImg?pickedImg.name:'Choose file...'}
                      
                    </CLabel>
                  </CCol>
                </CFormGroup></CCol>
                 <CCol md='6'>
                   {pickedImg?<img className="card-img-top" src={URL.createObjectURL(pickedImg)}></img>:
                   <img className="card-img-top" src={fetchedData.about_us_photo}></img>}
                 </CCol>
                 
              <CCol md="12" lg="12" xl="12">
              
              <Editor className='col-md-12' setDataText={setDataText} dataText={dataText} />
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

export default AboutUs
