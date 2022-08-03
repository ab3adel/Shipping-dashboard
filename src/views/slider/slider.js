import React,{useState,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCollapse,
  CPagination,
  CInputFile,
  CFormGroup,
CLabel,
CSelect,
  CBadge,
  CRow,
  CLink
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './slider.scss'
import {CAlert} from '@coreui/react'
import '../../globalVar'
import { DocsLink } from 'src/reusable'
import { useHistory } from "react-router-dom";
 
const Slider = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState()
  const [totalPages, setTotalPages] = useState()
  const [accordion, setAccordion] = useState()
  const [data,setData]=useState('')
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [errorPass, setErrorPass] = useState();
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const [pageStatus,setPageStatus]=useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg,setPickedImg]=useState('')
const [faqData,setfaqData]=useState({
question_ar:'',question_en:'',answer_ar:'',answer_en:''
})
const{ question_ar,
question_en,
answer_ar,
answer_en,

}=faqData;
const [faqUpdate,setfaqUpdate]=useState({
  question_ar:'',question_en:'',answer_ar:'',answer_en:''
  })
  const [offers, setOffers] = useState();
  const [errorMessageUpdate, setErrorMessageUpdate] = useState();
 const[succesAddUpdate,setSuccessAddUpdate]=useState()
 const[itemUpdate,setItemUpdate]=useState()
  const[loadingUpdate,setLoadingUpdate]=useState('')
  const handleDataUpdate=(e)=>{
    setfaqUpdate({...faqUpdate,[e.target.name]:e.target.value})
  
    setErrorMessageUpdate('')
    setSuccessAddUpdate('')
  }

const handleData=(e)=>{
  setfaqData({...faqData,[e.target.name]:e.target.value})

  setErrorMessage('')
  setSuccessAdd('')
}

const handleSubmitUpdate=async(e)=>{
  e.preventDefault()
  setLoadingUpdate(true)

  setErrorMessageUpdate('')
  setSuccessAddUpdate('')


  const data = new FormData();
 if( itemUpdate&&faqUpdate.question_ar!==''){data.append('question_ar', faqUpdate.question_ar);}
if(itemUpdate&&faqUpdate.question_en!==''){data.append('question_en', faqUpdate.question_en);}
if(itemUpdate&&faqUpdate.answer_ar!==''){data.append('answer_ar', faqUpdate.answer_ar);}
if(itemUpdate&&faqUpdate.answer_en!==''){data.append('answer_en', faqUpdate.answer_en);}
if(itemUpdate&&itemUpdate.id){data.append('id', itemUpdate.id);}

try {
  const responsee = await fetch(
    `${global.apiUrl}/FAQs/updateFAQ`,
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
  if(response.message&&response.message=="Frequently asked question updated successfully!"){
   
    setSuccessAddUpdate("Frequently asked question updated successfully!")
   setRefresh(!refresh)
  //  setInterval(() => {setSuccessAddUpdate('')}, 3000)
  //  setInterval(() => {setItemUpdate('')}, 3000)
  //  setInterval(() => {setPageStatus(0)}, 3000)
  setVisible(4)
  setfaqUpdate({
    question_ar:'',question_en:'',answer_ar:'',answer_en:''
    })
  }
  else{
  setErrorMessageUpdate(response.errors)
  // setInterval(() => {setErrorMessageUpdate('')}, 4000)
  setVisible(4)
  }
 
} catch (err) {
  console.log(err);
 
}


setLoadingUpdate(false)


}




const handleSubmit=async(e)=>{
  e.preventDefault()
  setLoading(true)

  setErrorMessage('')
  setSuccessAdd('')


  const data = new FormData();
pickedImg&&data.append('photo', pickedImg);
offerId&&data.append('with_button',1);
!offerId&&data.append('with_button',0);
offerId&&data.append('offer_id', offerId);



try {
  const responsee = await fetch(
    `${global.apiUrl}/slider/storeSlider`,
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
  if(response.message&&response.message=="Slider created successfully!"){
   
    setSuccessAdd("Slider created successfully!")
   setRefresh(!refresh)
   setOfferId('')
   setPickedImg('')
  }
  else{
  setErrorMessage(response.errors)
  }
 
} catch (err) {
  console.log(err);
 
}






setLoading(false)


}
const handleDelete=async(id)=>{

  document.getElementById('root').style.opacity=0.75;


try {
  const responsee = await fetch(
    `${global.apiUrl}/slider/deleteSlider?slider_id=${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userToken,
       
        Accept: "application/json",
      },
 
  
    }
  );
  const response = await responsee.json();
  console.log('response',response);
  console.log(response);
  if(response.message&&response.message=="Slider deleted successfully!"){
   
 
   setRefresh(!refresh)
   document.getElementById('root').style.opacity=1;
  }
  // else{
  // setErrorMessage(response.errors)
  // }
 
} catch (err) {
  console.log(err);
 
}

document.getElementById('root').style.opacity=1;
}


useEffect(async()=>{
  const fetchSlider=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/slider/viewAllSliders`,
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
    console.log('Sliders',response);
  if(response.message== "Sliders retrieved successfully!"){
   setData(response.payload)
  

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

  fetchSlider()
},[refresh])
useEffect(async()=>{
  const fetchOffers=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/offers/searchOffers?active=1`,
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
  if(response.payload){
   setOffers(response.payload)
  

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

  fetchOffers()
},[])
const[ActiveSlide,setActiveSlide]=useState('')
const[offerId,setOfferId]=useState('')
const addButton=(slide)=>{
setActiveSlide(slide)
setPageStatus(1)
setOfferId('')
setErrorMessage('')
setSuccessAdd('')
}
const addNew=()=>{
  setActiveSlide('')
  setPageStatus(2)
  setOfferId('')
  setErrorMessage('')
  setSuccessAdd('')
  }
const handleSubmitAddButton=async(e)=>{
  e.preventDefault()
  setLoading(true)
 
  setErrorMessage('')
  setSuccessAdd('')


  const data = new FormData();
  offerId&&data.append('offer_id', offerId);
ActiveSlide&& data.append('slider_id', ActiveSlide.id);



try {
  const responsee = await fetch(
    `${global.apiUrl}/slider/addButtonToSlider`,
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
  if(response.message&&response.message=="Button added to the slider successfully!"){
   
    setSuccessAdd("Button added to the slider successfully!")
   setRefresh(!refresh)
 
  }
  else{
  setErrorMessage(response)
  }
 
} catch (err) {
  console.log(err);
 
}






setLoading(false)


}



const removeButton=async(id)=>{
  document.getElementById('root').style.opacity=0.75;
  const data = new FormData();
 data.append('slider_id', id);
  try {
    const responsee = await fetch(
      `${global.apiUrl}/slider/removeButtonFromSlider`,
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
    if(response.message){
     
      document.getElementById('root').style.opacity=1;
     setRefresh(!refresh)
    
    }
 
   
  } catch (err) {
    console.log(err);
   
  }
  document.getElementById('root').style.opacity=1;
  
  }
  const handleImg=(e)=>{
    if(e.target.files[0])
   { setPickedImg(e.target.files[0])}
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
      <CContainer className='p-0'>
    
 {pageStatus==0&&   
         <CCard className="">

            <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            <strong>Slider</strong>
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>addNew()} >Add New
                  </CButton>
         
            </CCol>
            </CRow>
          </CCardHeader>

              <CCardBody className="p-1">
                 <CRow className="justify-content-center">
              <CCol md="12">
        <CCard>
         
          <CCardBody>
            <CRow>
            {data&&data.map((slide,index)=>{
         return(
           <CCol key={slide.id} md='4'>
             <CCard>
            <CCardHeader>
              Slide {' '+(index+1)}
              <div className="card-header-actions">
                <CBadge 
                style={{cursor:'pointer'}}
                onClick={()=>handleDelete(slide.id)} shape="pill" color="danger" className="float-right">Delete</CBadge>
              </div>
            </CCardHeader>
            <CCardBody className='p-2'>
              
             <img src={slide.path} className='slideImg'></img>
             {slide.with_button==0?
             <CRow className="justify-content-center p-2 row-gap-15 ">
            
             <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
             <strong>No Offer</strong>
             </CCol>
             <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
             <CButton color="success"  className='updatebtn p-1'
             onClick={()=>addButton(slide)} >Add Button
             </CButton>
          
             </CCol>
             </CRow>
            : 
            <CRow className="justify-content-center p-2 row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            {/* <strong>Offer Id:{slide.offer_id}</strong> {slide.offer_id}*/}
            <CLink to={`/offer/${slide.offer_id}`}><strong>Offer</strong> </CLink>
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="danger"  className=' updatebtn'
           onClick={()=>removeButton(slide.id)} >Remove Button
                  </CButton>
         
            </CCol>
            </CRow>
            }
            </CCardBody>
          </CCard>
           </CCol>
         )
        })}
            </CRow>
     
   
          </CCardBody>
        </CCard>
      </CCol>

                 </CRow>
              </CCardBody>
      
            </CCard>}

 {pageStatus==1&&   
      <CCard className="">

      <CForm onSubmit={(e)=>{handleSubmitAddButton(e)}}>
      <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
         <strong>Add Button Slider</strong>
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(0)} >Back
                  </CButton>
         
            </CCol>
            </CRow>
          </CCardHeader>

        <CCardBody className="p-4">
    
        <CRow className="justify-content-center">
      
        <CCol md='6'>
          <CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">Select Offer</CLabel>
  </CCol>
  <CCol xs="12" md="12">
  {offers.length>0&&
             <CSelect custom name="offer_id" id="select"
             required  onChange={(e)=>setOfferId(e.target.value)}>
               <option value='' >Select Offer</option>
         {   offers.map((item)=>{
              return(
                <option key={item.id} value={item.id}>{item.name_en }</option>
              )
            })}
            
            </CSelect>
            }
          </CCol>
          </CFormGroup>
          </CCol>
          <CCol md='6'>
               <img className='slideImg' src={ActiveSlide.path}></img>
               
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
 }
      
 {pageStatus==2&&   
      <CCard className="">

      <CForm onSubmit={(e)=>{handleSubmit(e)}}>
      <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
         <strong>Add New Slider</strong>
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(0)} >Back
                  </CButton>
         
            </CCol>
            </CRow>
          </CCardHeader>

        <CCardBody className="p-4">
    
        <CRow className="justify-content-center">
      
     
   
        <CCol md='6'>
        <CFormGroup row>
                  <CLabel col md={12}>Change About Us Image</CLabel>
                  <CCol xs="12" md="12">
                  
                    <CInputFile required accept="image/*" custom id="custom-file-input" onChange={(e)=>{handleImg(e)}}  />

                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                     {pickedImg?pickedImg.name:'Choose file...'}
                      
                    </CLabel>
                  </CCol>
                </CFormGroup>
          <CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">Select Offer (Optinal)</CLabel>
  </CCol>
  <CCol xs="12" md="12">
  {offers.length>0&&
             <CSelect custom name="offer_id" id="select"
              value={offerId}  onChange={(e)=>setOfferId(e.target.value)}>
               <option value='' >No Offer (Default)</option>
         {   offers.map((item)=>{
              return(
                <option key={item.id} value={item.id}>{item.name_en }</option>
              )
            })}
            
            </CSelect>
            }
          </CCol>
          </CFormGroup>
          </CCol>

          <CCol md='6'>
                   {pickedImg?<img className="card-img-top" src={URL.createObjectURL(pickedImg)}></img>:
                  null}
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
 }
      





       
    
      </CContainer>
   </div>
  )
}

export default Slider
