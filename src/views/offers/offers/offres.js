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
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './offers.scss'

import {CAlert} from '@coreui/react'
import { useHistory } from "react-router-dom";
  
import '../../../globalVar'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const StoredServices = () => {
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
  const notify = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose:7000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    className: 'toast-error-container toast-error-container-after',
    draggable: true,
    colored:true,
    progress: undefined,
    });

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
const [activeOfferId,setActiveOfferId]=useState('')
const [url,setUrl]=useState(`offers/searchOffers`)
const [withUser,setWithUser]=useState(false)
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
  const fetchOffers=async(e)=>{


  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/${url}`,
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

  // setLoading(false)
  
  
  }

  fetchOffers()
},[url,refresh])

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
  

        setfetchedUsers(response.payload)
     
     
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
},[])
// console.log('procceed',fetchedData);

const handleUrlFilter=(e)=>{
  if(e.target.value=='0'){setUrl(`offers/searchOffers`)}
  else if(e.target.value=='active'){setUrl(`offers/searchOffers?active=1`)}

  else if(e.target.value=='notActive'){setUrl(`offers/searchOffers?active=0`)}

  else {setUrl(`offers/searchOffers`)}
  
}
const handleAcivate=async(id)=>{
 document.getElementById('root').style.opacity=0.75;
  try {
    const responsee = await fetch(
      `${global.apiUrl}/offers/activateOffer?offer_id=${id}`,
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

    if(response.message){
     setRefresh(!refresh)
 document.getElementById('root').style.opacity=1;
   
     }
if(response.error){notify(response.error)}
  // if(response){
  //  setfetchedData(response)
  //  setTotalPages(Math.ceil(response.length/12))
  //  console.log(Math.ceil(response.length/12))
  // }
    if(response.message&&response.message=="Unauthorized or invalid token!"){
 document.getElementById('root').style.opacity=1;

    localStorage.removeItem("token");
    localStorage.clear()
 
  history.push("/login");
    }
   
  } catch (err) {
    console.log(err);
   
  }
  document.getElementById('root').style.opacity=1;

}

const handleData=(e)=>{
  setUpData({...upData,[e.target.name]:e.target.value})

  setErrorMessage('')
  setSuccessAdd('')
}

const handleCat=(e)=>{
 setActiveCat(e.target.value)
 setActiveType('0')
  // setErrorMessage('')
  // setSuccessAdd('')
}
const handleType=(e)=>{
  setActiveType(e.target.value)
  setActiveCat('0')
   // setErrorMessage('')
   // setSuccessAdd('')
 }
 


const handleUpdateOffer=async(e)=>{
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
 user_id&& data.append("user_id",user_id);
  times_used&& data.append("times_used", times_used);
  activeOfferId&& data.append("offer_id", activeOfferId);
 





try {
  const responsee = await fetch(
    `${global.apiUrl}/offers/updateOffer`,
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
  if(response.message&&response.message=="Offer updated successfully!"){
    await  setVisible(6)
    setSuccessAdd("Offer updated successfully!")

 setRefresh(!refresh)
//  setUpData({
//   name_en:'',
//   name_ar:'',
//   code:'',
//   amount:'',
//   percentage:'',
//   description_en:'',
//   description_ar:'',
//   expiration_date:'',
//   user_id:'',
//   times_used:'',
// })


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

  
  const handleDeleteOffer=async(id)=>{
 document.getElementById('root').style.opacity=0.75;
  try {
    const responsee = await fetch(
      `${global.apiUrl}/offers/deleteOffers?offer_ids[0]=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userToken,

          Accept: "application/json",
        },

    
      }
    );
    const response = await responsee.json();
    
    console.log(response);

    if(response.message=='Offers deleted successfully!'){
     setRefresh(!refresh)
 document.getElementById('root').style.opacity=1;
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

setActiveOffer('')
setActiveOfferId('')
setPageStatus(0)
   
     }

    if(response.message&&response.message=="Unauthorized or invalid token!"){
 document.getElementById('root').style.opacity=1;

    localStorage.removeItem("token");
    localStorage.clear()
 
  history.push("/login");
    }
   
  } catch (err) {
    console.log(err);
   
  }
  document.getElementById('root').style.opacity=1;

}

  
  const setFilter=()=>{
  if ( activeCat=='0'&&activeType=='0'){
    return  fetchedData
  }
  else if(activeCat=='0'&&activeType!=='0'){
    return fetchedData.filter(item=>item.original_type==activeType)
  }
  else if(activeCat!=='0'&&activeType=='0'){
    return fetchedData.filter(item=>item.original_category==activeCat)
  }
   else{
    return  fetchedData
   }
    

  }
  
  const handleSetUpdate=(item)=>{
   
    setActiveOffer(item)
    setUpData(item)
    setActiveOfferId(item.id) 
    console.log(item)
    setCollapsed(false)
    setAccordion()
     setPageStatus(1)
    if(item.user_id){
      setWithUser(true)
    
    }else{
      setWithUser(false)
      
    }
    if(item.percentage){
      setActiveAmount(true)
      setUpData({...item,amount:'',percentage:item.percentage})
    }
    else{
      setActiveAmount(false)
      setUpData({...item,percentage:'',amount:item.amount}) 
    }

  }
  
  console.log(errorMessage)
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
 
  const handleAddUser=()=>{
    setWithUser(!withUser)
    setUpData({...upData,user_id:'',times_used:''})
  }
console.log(upData)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   <ToastContainer
position="top-right"
autoClose={7000}
hideProgressBar
className="toast-container"
newestOnTop={false}
closeOnClick
rtl={false}
colored={true}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <CContainer>

     {pageStatus==0&&<>
      {fetchedData&&   <CCard>
          <CCardHeader>
          <CRow className=" row-gap-15 ">
          
            <CCol md="12" lg="12" xl="12" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
          Offers
            </CCol>
        
       
          <CCol md="4" lg="4" xl="4" >
          
             <CSelect custom name="select"   onChange={(e)=>handleUrlFilter(e)}>
               <option value='0' >Filter (Defaul All Offers) </option>
               <option value='active' >Active</option>
           
                <option value='notActive' >Deactive</option>
              
            </CSelect>
          
    
          </CCol>
          <CCol md="4" lg="4" xl="4" >
            {categories.length>0&&
             <CSelect custom name="select" id="select" value={activeCat} onChange={(e)=>handleCat(e)}>
               <option value='0' >All Categories</option>
         {   categories.map((item)=>{
              return(
                <option key={item.original_category} value={item.original_category}>{item.original_category}</option>
              )
            })}
            
            </CSelect>
            }

          </CCol>
          <CCol md="4" lg="4" xl="4" >
         
       {types.length>0&&
             <CSelect custom name="select" value={activeType} onChange={(e)=>handleType(e)}>
               <option value='0' >All Types</option>
         {   types.map((item)=>{
              return(
                <option key={item.original_type} value={item.original_type}>{item.original_type}</option>
              )
            })}
            
            </CSelect>
            }

          </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
          <CRow>
 
    </CRow>  
    


          <CRow className='servicesTabel'>
   { fetchedData.length>0&&      <CDataTable
              items={
                setFilter()
           
                }
              fields={['index','id','name_en','description_en','user_id', 'expiration_date','status','actions']}
              bordered
             striped 
             hover
             sorter
              itemsPerPage={12}
              pagination
              columnFilter
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>

                      {item.active?
                   
                      <> <CBadge className="" color="primary">Active</CBadge> </>:<CBadge className="" color="danger">Deactive</CBadge>}
                    </td>
                  ),
                  'actions':
                  (item)=>(
                    <td>
                     
                     {item.active?<> <CBadge className="p-1 m-1 badg-click" color="dark" onClick={()=>handleAcivate(item.id)}>Deactivate</CBadge>
                                                   <br/> <CBadge className="p-1 m-1 badg-click" color="info" onClick={()=>handleSetUpdate(item)}>Update/Show</CBadge> 
                                                      </>
                                                      :
                                                      <> <CBadge className="p-1 m-1 badg-click" color="success" onClick={()=>handleAcivate(item.id)}>Activate</CBadge>
                                                      <br/> <CBadge className="p-1 m-1 badg-click" color="info" onClick={()=>handleSetUpdate(item)}>Update/Show</CBadge> 
                                                         </>
                                                      }
                 </td>
                  ),
                  'user_id':
                  (item)=>(
                    <td>
                     
                {item.user_id?item.user_id:'-'}
                 </td>
                
                  )
                }
                
                }
            />
}


          </CRow>
          </CCardBody>
        </CCard>
       
}
     </>}
    


{fetchedData&&pageStatus==1&&activeOffer&&<>


         {/* mx-4 */}
            <CCard className="">

        

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           <strong>{activeOffer.name_en}</strong>
            </CCol>
          
            <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
            <CButton color="danger"  className='col-lg-3  col-md-3 col-sm-6 col-xs-6 updatebtn'
           onClick={()=>handleDeleteOffer(activeOffer.id)} ><i class= "fa fa-trash" aria-hidden= "true" ></i>
                  </CButton>
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>setPageStatus(0)} >Back
                  </CButton>
               
            </CCol>
            </CRow>
          </CCardHeader>

              <CCardBody className="p-4 ps-0">
                <CRow>
                <CCol xs="12" sm="12" md="12" className='p-0'>
          <CFade in={showCard}>
            <CCard>
              <CCardHeader>
                {activeOffer.name_en}
                <div className="card-header-actions">
              
                  <CLink className="card-header-action" 
                                   onClick={() => setAccordion(accordion ===0 ? null :0)}
                  // onClick={() => setCollapsed(!collapsed)}
                  >
                   
                  {accordion ===0?'Hide Details':'Show Details'} <CIcon name={accordion ===0 ? 'cil-chevron-bottom':'cil-chevron-top'} />
                  </CLink>
              
                </div>
              </CCardHeader>
              <CCollapse
                             show={accordion === 0}
              // show={collapsed}
              >
                <CCardBody>
              <CRow className='p-0'>
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
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
                </CRow>
                <CRow>
                <CCol xs="12" sm="12" md="12" className='p-0'>
          <CFade in={showCard}>
            <CCard>
              <CCardHeader   onClick={() => setAccordion(accordion ===1 ? null :1)}>
         
                 Update Form
                  
              
                <div className="card-header-actions">
              
                  <CLink className="card-header-action"
                  
                  onClick={() => setAccordion(accordion ===1 ? null :1)}
                  
                  // onClick={() => setCollapsed(!collapsed)}
                  
                  >
              
                   {accordion ===1?'Hide Update Form':'Show Update Form'}
                  <CIcon name={accordion ===1 ? 'cil-chevron-bottom':'cil-chevron-top'} />
                   
            


                  </CLink>
              
                </div>
              </CCardHeader>
              <CCollapse
              //  show={collapsed}
               show={accordion === 1}
               >
                 <CForm onSubmit={(e)=>{handleUpdateOffer(e)}}>
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
                   onChange={(e)=>handleData(e)}
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
  {fetchedUsers.length>0&&
             <CSelect custom name="user_id" id="select"
             required value={upData.user_id} onChange={(e)=>handleData(e)}>
               <option value='' >Select User</option>
         {   fetchedUsers.map((item)=>{
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
               {   <CButton color="success" block type='submit'>{'Update'}
                  {loading&&<>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>}
                  </CCol>
                
                </CRow>
              </CCardFooter>
              </CForm>
              </CCollapse>
            </CCard>
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
