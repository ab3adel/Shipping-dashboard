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
CSwitch,
CInputFile,
  CLink,
  CFade,
  CCollapse,
  CBadge,
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './addNewOffer.scss'

import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewOffer = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const[fetchedData,setfetchedData]=useState([])
  const[refresh,setRefresh]=useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [collapsed, setCollapsed] = useState(true)
  const [showCard, setShowCard] = useState(true)
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);
  const [pageStatus,setPageStatus]=useState(0)
  const[activeAmount,setActiveAmount]=useState(false)
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
const [activeService,setActiveService]=useState('')
const [activeServiceId,setActiveServiceId]=useState('')
const [url,setUrl]=useState(`services/searchServices`)
function getUnique(array, key) {
  if (typeof key !== 'function') {
    const property = key;
    key = function(item) { return item[property]; };
  }
  return Array.from(array.reduce(function(map, item) {
    const k = key(item);
    if (!map.has(k)) map.set(k, item);
    return map;
  }, new Map()).values());
}



useEffect(async()=>{
  const fetchUsers=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/users/getAllUsersNames`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,

          Accept: "application/json",
        },

    
      }
    );
    const response = await responsee.json();
    
    console.log(response);

    if(response.message&&response.message=='Here are all users name in the website!'){
  

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

  fetchUsers()
},[url,refresh])

// console.log('procceed',fetchedData);

const handleUrlFilter=(e)=>{
  if(e.target.value=='0'){setUrl(`services/searchServices`)}
  else if(e.target.value=='active'){setUrl(`services/searchServices?active=1`)}
  else if(e.target.value=='confirmeed'){setUrl(`services/searchServices?confirmed=1`)}
  else if(e.target.value=='notActive'){setUrl(`services/searchServices?active=0`)}
  else if(e.target.value=='notConfirmed'){setUrl(`services/searchServices?confirmed=0`)}
  else {setUrl(`services/searchServices`)}
  
}

const handleData=(e)=>{
  setUpData({...upData,[e.target.name]:e.target.value})

  setErrorMessage('')
  setSuccessAdd('')
}





const handleAddOffer=async(e)=>{
  e.preventDefault()
  setLoading(true)
  
  setErrorMessage('')
  setSuccessAdd('')

  const data = new FormData();
  name_en&& data.append("name_en", name_en);
  name_ar&& data.append("name_ar", name_ar);
  code&& data.append("code", code);
  amount&& data.append("amount", amount);
  percentage&& data.append("percentage", percentage);
  description_en&& data.append("description_en", description_en);
  description_ar&& data.append("description_ar", description_ar);
  expiration_date&& data.append("expiration_date", expiration_date);
  user_id&& data.append("user_id", user_id);
  times_used&& data.append("times_used", times_used);
 

  





try {
  const responsee = await fetch(
    `${global.apiUrl}/offers/storeOffer`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
                  //  "Content-Type": "application/json",
                  //'Access-Control-Allow-Origin': 'https://localhost:3000',
                  // 'Access-Control-Allow-Credentials': 'true',
        Accept: "application/json",
      },
      body:data
      ,
  
    }
  );
  const response = await responsee.json();
  console.log('response',response);
  console.log(response);
  setVisible(10)
  if(response.message&&response.message=="Offer created successfully!"){
    await  setVisible(6)
    setSuccessAdd("Offer created successfully!")


 setUpData({
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


 setVisible(6)
  }
  else{
   
     setVisible(10)
     setErrorMessage(response.errors)

    
    }
  
 
} catch (err) {
  console.log(err);
 
}

setLoading(false)
}

 

  const handleAmount=(e)=>{
    if(e.target.checked){
      setActiveAmount(true)
      setUpData({...upData,amount:''})
    }
    else{
      setActiveAmount(false)
      setUpData({...upData,percentage:''}) 
    }
  }

  
  console.log(errorMessage)
  const [withUser,setWithUser]=useState(false)
  const handleAddUser=()=>{
    setWithUser(!withUser)
    setUpData({...upData,user_id:'',times_used:''})
  }
  const fields = ['checked','index','id','name','type','rate','min','max','dripfeed', 'refill', 'category']
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>

     
            <CCard className="">

        

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           <strong>Add New Offer</strong>
            </CCol>
                  </CRow>
          </CCardHeader>

                <CRow>
                <CCol xs="12" sm="12" md="12" className=''>
                <CForm onSubmit={(e)=>{handleAddOffer(e)}}>
                <CCardBody>
            <CCard>
                <CCardBody>
                <CRow className="justify-content-center">
              <CCol md="12" lg="12" xl="12">
               
              <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">English Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                   
                    <CInput name="name_en" 
                   required
                   onChange={handleData}
                    placeholder="Englsih Name" value={upData.name_en} />
                  </CCol>
                </CFormGroup>
               
           

                  
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">English  Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">

                  
                      <CTextarea name="description_en" required  rows="4"
                   onChange={handleData}

                      placeholder="English Description" value={upData.description_en} />
                   
                  
                  </CCol>
                </CFormGroup>

                 </CCol>

                 <CCol md="12" lg="12">
                 <CFormGroup row className='arabic-align'>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">الاسم العربي</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">

                   
                      <CInput name="name_ar" required
                   onChange={handleData}

                      placeholder="الاسم العربي" value={upData.name_ar} />
      
                  
                  </CCol>
                </CFormGroup>
    <CFormGroup row className='arabic-align'>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">الوصف العربي</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">

                      <CTextarea name="description_ar" required  rows="4"
                      onChange={handleData}
                    placeholder="الوصف العربي" value={upData.description_ar} />
                  
                  </CCol>
                </CFormGroup>
                 </CCol>
          <CCol md="4" lg="4" xl="4">
                
          <CFormGroup row>
                  <CCol md="12" className='justify-content-center'>
                    <CLabel htmlFor="text-input" className='switch_label'>Change Amount or Percentage
                    <CSwitch className={'mx-1 sw-amount'} shape={'pill'} color={'info'}
                    onChange={(e)=>handleAmount(e)}
                     />
                    </CLabel>
                    
                  </CCol>
                  <CCol xs="12" md="12">
                    {activeAmount?
  <CInput id="text-input" 
  required
  onChange={handleData}
  type='number'
   name="percentage" placeholder="percentage" value={upData.percentage} />:
   <CInput id="text-input" 
   required
   onChange={handleData}
   type='number'
    name="amount" placeholder="Amount" value={upData.amount} />
                    }
                  
                   
                  </CCol>
                </CFormGroup>
             

           
                  </CCol>
                  <CCol md="4" lg="4" xl="4">
                
                <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Expiration Date</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CInput id="text-input"
                             onChange={handleData}
                             type='date'
                             required
                              name="expiration_date"  value={upData.expiration_date} />
                        
                        </CCol>
                      </CFormGroup>
                   
      
                 
                        </CCol>
                        <CCol md="4" lg="4" xl="4">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Code</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput
                                onChange={handleData}
                                type='text'

                                id="text-input" name="code"

                                placeholder={`Code 6 charechtes (Optinal )`}

                               value={upData.code} />

                            </CCol>
                      </CFormGroup>
                   
                        </CCol>
                   
                        <CCol md="12" lg="12" xl="12">
                        <br></br>
                        <CButton className='col-md-2'
                        onClick={()=>{handleAddUser()}}
                        color="info" block type='button'>Add User
                            </CButton>
                            <br></br>
                        </CCol>
                  {withUser&&<>
                  
                    <CCol md="6" lg="6" xl="6">

<CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">Select User</CLabel>
  </CCol>
  <CCol xs="12" md="12">
  {fetchedData.length>0&&
             <CSelect custom name="user_id" id="select"
             required value={upData.user_id} onChange={(e)=>handleData(e)}>
               <option value='' >Select User</option>
         {   fetchedData.map((item)=>{
              return(
                <option key={item.id} value={item.id}>{item.first_name+' '+item.last_name+' (id:'+item.id+')' }</option>
              )
            })}
            
            </CSelect>
            }

  </CCol>
</CFormGroup>

</CCol>
<CCol md="6" lg="6" xl="6">

<CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">Times Used</CLabel>
  </CCol>
  <CCol xs="12" md="12">
    <CInput
       onChange={handleData}
       type='number'
       required
       id="text-input" name="times_used"
       placeholder={`Times Used`}
      value={upData.times_used} />

  </CCol>
</CFormGroup>

</CCol>
                  
                  </>}     




          
                 </CRow> 
               

                </CCardBody>
                    <CCardFooter className="p-4">
                      <CRow className="justify-content-center">

                        {errorMessage &&
                          <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                            color="danger"
                            // closeButton
                            show={visible}
                            // closeButton
                            onShowChange={setVisible}
                          >

                            {Object.keys(errorMessage).map((item, i) => (

                              <>{errorMessage[item]}<br /></>

                            ))}
                          </CAlert>}

                        {succesAdd &&

                          <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                            color="success"
                            show={visible}
                            // closeButton
                            onShowChange={setVisible}
                          // closeButton
                          >
                            {succesAdd}
                          </CAlert>}

                        <CCol md="6" lg="6" xl="6" xs="12" sm="12" >
                          {<CButton color="success" block type='submit'>Save
                            {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>}
                        </CCol>

                      </CRow>
                    </CCardFooter>
            </CCard>
            
       
            
                </CCardBody>
              
              </CForm>
        </CCol>
                </CRow>

            </CCard>
       
       




     
      </CContainer>
    </div>
  )
}

export default AddNewOffer
