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
  CPagination,
  CDataTable,
  CSelect,
  CFormText,
CTextarea,
CFormGroup,
CLabel,
CInputFile,
  CLink,
  CFade,
  CCollapse,
  CBadge,
  CRow,
  CSwitch
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './offer.scss'

import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../../globalVar'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const StoredServices = ({match}) => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const[fetchedData,setfetchedData]=useState([])
  const[fetchedUsers,setfetchedUsers]=useState([])
  const[refresh,setRefresh]=useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [collapsed, setCollapsed] = useState(true)
  const [showCard, setShowCard] = useState(true)
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const[activeAmount,setActiveAmount]=useState(false)


  const [pageStatus,setPageStatus]=useState(0)

  const [upData,setUpData]=useState({
    name_en:'',
  name_ar:'',
  code:'',
  amount:'',
  percentage:'',
  description_en:'',
  description_ar:'',
  expiration_date:'',
  user_id:'',
  times_used:'',
  
  })
  const{name_en,
    name_ar,
    code,
    amount,
    percentage,
    description_en,
    description_ar,
    expiration_date,
    user_id,
    times_used,
  
  }=upData;
const [accordion, setAccordion] = useState()

const [types,setTypes]=useState([])
const [activeType,setActiveType]=useState('0')
const [categories,setCategories]=useState([])
const [activeCat,setActiveCat]=useState('0')
const [activeOffer,setActiveOffer]=useState('')
const [activeOfferId,setActiveOfferId]=useState(match.params.id)
const [withUser,setWithUser]=useState(false)



useEffect(async()=>{
  const fetchOffers=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/offers/searchOffers`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,

          Accept: "application/json",
        },

    
      }
    );
    console.log(responsee.status);
    if(responsee.status=='204'){setfetchedData([])}
    const response = await responsee.json();
    
    console.log(responsee);
  
    if(response.payload){
      let temp=[]
     
     await response.payload.map((offer,index)=>{
      
      temp.push({
       
        index:index+1,
        id:offer.id,
        name_en: offer.name_en,
        name_ar: offer.name_ar,
        code: offer.code,
        amount: offer.amount,
        percentage: offer.percentage,
        description_en:offer.description_en,
        description_ar:offer.description_ar,
        expiration_date:offer.expiration_date,
        user_id:offer.user_id,
        times_used:offer.times_used,
         active:offer.active,
     
      })
  
     })
     await setTotalPages(Math.ceil(response.length/12))
        setfetchedData(temp)

        if(activeOfferId){
          setActiveOffer(response.payload.filter(item=>item.id==activeOfferId)&&response.payload.filter(item=>item.id==activeOfferId)[0])
        }
     
     }

    if(response.message&&response.message=="Unauthorized or invalid token!"){
    localStorage.removeItem("token");
    localStorage.clear()
 
  history.push("/login");
    }
   
  } catch (err) {
    console.log(err);
   
  }


  
  
  }

  fetchOffers()
},[])



  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>



{fetchedData&&activeOffer&&<>


         {/* mx-4 */}
            <CCard className="">

        

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           <strong>{activeOffer.name_en}</strong>
            </CCol>
          
            <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
          
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>history.goBack()} >Back
                  </CButton>
               
            </CCol>
            </CRow>
          </CCardHeader>

              <CCardBody className="p-4 ps-0">
                <CRow>
                <CCol xs="12" sm="12" md="12" className=''>
          <CFade in={showCard}>
         
              <CRow className=''>
             <CCol className=' p-1' md='6' >
  
  <ul className=" card list-group list-group-flush">
  <li className="list-group-item"><strong>Id : {' '}</strong>{activeOffer.id}</li>
  <li className="list-group-item"><strong>Status : {' '}</strong>{activeOffer.active==1?'Active':'Deactive'}</li>
  <li className="list-group-item"><strong>Code : {' '}</strong>{activeOffer.code}</li>
   <li className="list-group-item"><strong>Expiration Date : {' '}</strong>{activeOffer.expiration_date}</li>

    <li className="list-group-item"><strong>English Name:{' '}</strong><br/> {activeOffer.name_en}</li>
   <li className="list-group-item"><strong>Description En : {' '}<br/></strong>{activeOffer.description_en}</li>

  </ul>
  

             </CCol>
             <CCol className=' p-1'  md='6'>
             <ul className=" card list-group list-group-flush">
             <li className="list-group-item arabic-align"><strong>اسم عربي :{' '}</strong><br/>{activeOffer.name_ar}</li>
   <li className="list-group-item arabic-align"><strong>وصف عربي :{' '}</strong><br/>{activeOffer.description_ar}</li>

    <li className="list-group-item"><strong>Percentage : {' '}</strong>{activeOffer.percentage?activeOffer.percentage+' %':'-'}</li>
    <li className="list-group-item"><strong>Amount : {' '}</strong>{activeOffer.amount?activeOffer.amount:'-'}</li>
    <li className="list-group-item"><strong>User Id : {' '}</strong>{activeOffer.user_id?activeOffer.user_id:'-'}</li>
    <li className="list-group-item"><strong>Times Used : {' '}</strong>{activeOffer.times_used?activeOffer.times_used:'-'}</li>
   
   

  </ul>
             </CCol>

              </CRow>
    
          </CFade>
        </CCol>
                </CRow>


                  
              </CCardBody>
   
             
              


            </CCard>
       
       



</>}
    

      </CContainer>
    </div>
  )
}

export default StoredServices
