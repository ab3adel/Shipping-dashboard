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
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './storedServices.scss'

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
  const[refresh,setRefresh]=useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [collapsed, setCollapsed] = useState(true)
  const [showCard, setShowCard] = useState(true)
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const userId = localStorage.getItem("user_id");
  const user_id = JSON.parse(userId);
  const [pageStatus,setPageStatus]=useState(0)
const [upData,setUpData]=useState({
  name_en:'',
name_ar:'',
quantity:'',
old_price:'',
new_price:'',
short_description_en:'',
short_description_ar:'',
long_description_en:'',
long_description_ar:'',
})
const{name_en,
  name_ar,
  quantity,
  old_price,
  new_price,
  short_description_en,
  short_description_ar,
  long_description_en,
  long_description_ar,

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
  const fetchSettings=async(e)=>{


  
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
    const response = await responsee.json();
    
    console.log(response);

    if(response){
      let temp=[]
     
     await response.payload.map((service,index)=>{
      
      temp.push({
       
        index:index+1,
        id:service.id,
        original_id: service.original_id,
        original_name: service.original_name,
        original_type: service.original_type,
        original_category: service.original_category,
        original_rate: service.original_rate,
        original_min:service.original_min,
        original_max:service.original_max,
        original_refill:service.original_refill,
        original_dripfeed:service.original_dripfeed,
        name_en:service.name_en,
        name_ar:service.name_ar,
        quantity: service.quantity,
        old_price: service.old_price,
        new_price: service.new_price,
        short_description_en: service.short_description_en,
        short_description_ar: service.short_description_ar,
        long_description_en:service.long_description_en,
        long_description_ar:service.long_description_ar,
        avatar:service.avatar,
        confirmed:service.confirmed,
        active:service.active,
        status:'',
        actions:''
      })
  
     })
     await setTotalPages(Math.ceil(response.length/12))
        setfetchedData(temp)
        setTypes(getUnique(response.payload, 'original_type'))
        setCategories(getUnique(response.payload, 'original_category'))
        if(activeServiceId){
          setActiveService(response.payload.filter(item=>item.id==activeServiceId)&&response.payload.filter(item=>item.id==activeServiceId)[0])
        }
     
     }

  // if(response){
  //  setfetchedData(response)
  //  setTotalPages(Math.ceil(response.length/12))
  //  console.log(Math.ceil(response.length/12))
  // }
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
const handleAcivate=async(id)=>{
 document.getElementById('root').style.opacity=0.75;
  try {
    const responsee = await fetch(
      `${global.apiUrl}/services/activateService?service_id=${id}`,
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
 


const handleUpdateService=async(e)=>{
  e.preventDefault()
  setLoading(true)
  
  setErrorMessage('')
  setSuccessAdd('')

  const data = new FormData();
  name_en&& data.append("name_en", name_en);
  name_ar&& data.append("name_ar", name_ar);
  quantity&& data.append("quantity", quantity);
  old_price&& data.append("old_price", old_price);
  data.append("new_price", new_price);
  short_description_en&& data.append("short_description_en", short_description_en);
  short_description_ar&& data.append("short_description_ar", short_description_ar);
  long_description_en&& data.append("long_description_en", long_description_en);
  long_description_ar&& data.append("long_description_ar", long_description_ar);
 activeServiceId&& data.append("service_id",activeServiceId);
  pickedImg&& data.append("avatar", pickedImg);





try {
  const responsee = await fetch(
    `${global.apiUrl}/services/updateService`,
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
  if(response.message&&response.message=="Service information updated successfully!"){
    await  setVisible(6)
    setSuccessAdd("Service information updated successfully!")

 setRefresh(!refresh)
 setUpData({
  name_en:'',
name_ar:'',
quantity:'',
old_price:'',
new_price:'',
short_description_en:'',
short_description_ar:'',
long_description_en:'',
long_description_ar:'',
})
setPickedImg('')

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
const [pickedImg,setPickedImg]=useState('')
const handleImg=(e)=>{
  if(e.target.files[0])
 { setPickedImg(e.target.files[0])}
}
  const checkUnCheck=async(e,index)=>{
    setErrorMessage('')
      await setfetchedData(
        fetchedData.map(item => 
            item.index === index 
            ? 
            {...item, checked :e.target.checked} 
            
            : item 
    ))

  }
  
  const handleDeleteSercice=async(id)=>{
 document.getElementById('root').style.opacity=0.75;
  try {
    const responsee = await fetch(
      `${global.apiUrl}/services/deleteServices?service_ids[0]=${id}`,
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

    if(response.message=='Services deleted successfully!'){
     setRefresh(!refresh)
 document.getElementById('root').style.opacity=1;
 setUpData({
  name_en:'',
name_ar:'',
quantity:'',
old_price:'',
new_price:'',
short_description_en:'',
short_description_ar:'',
long_description_en:'',
long_description_ar:'',
})
setPickedImg('')
setActiveService('')
setActiveServiceId('')
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
    setPageStatus(1)
    setActiveService(item)
    setActiveServiceId(item.id) 
    console.log(item)
    setCollapsed(false)
    setAccordion()
    setPickedImg('')
  }
  
  console.log(errorMessage)
  
  const fields = ['checked','index','id','name','type','rate','min','max','dripfeed', 'refill', 'category']
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
   
      <CContainer>

     {pageStatus==0&&<>
      {fetchedData&&   <CCard>
          <CCardHeader>
          <CRow className=" row-gap-15 ">
          
            <CCol md="12" lg="12" xl="12" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            Stored Services
            </CCol>
        
       
          <CCol md="4" lg="4" xl="4" >
            {categories.length>0&&
             <CSelect custom name="select"   onChange={(e)=>handleUrlFilter(e)}>
               <option value='0' >Filter (Defaul All Services) </option>
               <option value='active' >Active</option>
                <option value='confirmeed' >Confirmed</option>
                <option value='notActive' >Not Active</option>
                <option value='notConfirmed' >Not Confirmed</option>
            </CSelect>
            }
    
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
              fields={['index','id','original_name','original_type', 'original_category','status','actions']}
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

                      {item.active&&item.confirmed?
                   
                      <> <CBadge className="" color="primary">Active</CBadge> <br></br><CBadge className="" color="primary">Confirmed</CBadge>    </>:null}
                      {!item.active&&!item.confirmed?<><CBadge className="" color="danger">Not Active</CBadge> <br></br><CBadge className="" color="danger">Not Confirmed</CBadge>   </>:null}
                      {item.active&&!item.confirmed?<><CBadge className="" color="primary">Active</CBadge>  <br></br><CBadge className="" color="primary">Confirmed</CBadge>   </>:null}
                      {!item.active&&item.confirmed?<><CBadge className="" color="danger">Not Active</CBadge><br></br><CBadge className="" color="primary">Confirmed</CBadge>    </>:null}
                    </td>
                  ),
                  'actions':
                  (item)=>(
                    <td>
                     
                     {item.active&&item.confirmed?<> <CBadge className="p-1 m-1 badg-click" color="dark" onClick={()=>handleAcivate(item.id)}>Deactivate</CBadge>
                                                   <br/> <CBadge className="p-1 m-1 badg-click" color="success" onClick={()=>handleSetUpdate(item)}>Update/Show</CBadge> 
                                                      </>:null}
                     {!item.active&&item.confirmed?<> <CBadge className="p-1 m-1 badg-click" color="success" onClick={()=>handleAcivate(item.id)} >Activate</CBadge>
                                                     <br/> <CBadge className="p-1  m-1 badg-click" color="success" onClick={()=>handleSetUpdate(item)}>Update/Show</CBadge> 
                                                       </>:null}
                     {!item.active&&!item.confirmed?<> <CBadge className="p-1 m-1 badg-click" color="info" onClick={()=>handleSetUpdate(item)}>Confirme/Show</CBadge> </>:null}
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
    


{fetchedData&&pageStatus==1&&activeService&&<>


         {/* mx-4 */}
            <CCard className="">

        

            <CCardHeader>
          <CRow className=" row-gap-15">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           <strong>{activeService.confirmed?'Update Service':'Confirm Service'}</strong>
            </CCol>
          
            <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
            <CButton color="danger"  className='col-lg-3  col-md-3 col-sm-6 col-xs-6 updatebtn'
           onClick={()=>handleDeleteSercice(activeService.id)} ><i class= "fa fa-trash" aria-hidden= "true" ></i>
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
                {activeService.original_name}
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
             <CCol className='card p-1' md='12' >
             
  <img className="card-img-top" src={activeService.avatar} />
 
  <ul className="list-group list-group-flush">
    
    <li className="list-group-item"><strong>Original Name:{' '}</strong><br/> {activeService.original_name}</li>
    <li className="list-group-item"><strong>Id : {' '}</strong>{activeService.id}</li>
    
    <li className="list-group-item"><strong>Original Id : {' '}</strong>{activeService.original_id}</li>
    <li className="list-group-item"><strong>Name En: {' '}</strong><br/>{activeService.name_en?activeService.name_en:'Need Confirme'}</li>
    <li className="list-group-item arabic-align"><strong>اسم عربي :{' '}</strong><br/>{activeService.name_ar?activeService.name_ar:'Need Confirme'}</li>
    <li className="list-group-item"><strong>Original Type : {' '}</strong>{activeService.original_type?activeService.original_type:'Need Confirme'}</li>
    <li className="list-group-item"><strong>Original Category : {' '}</strong><br/>{activeService.original_category?activeService.original_category:'Need Confirme'}</li>

    <li className="list-group-item"><strong>Original MAX : {' '}</strong>{activeService.original_max}</li>
    <li className="list-group-item"><strong>Original MIN : {' '}</strong>{activeService.original_min}</li>
    <li className="list-group-item"><strong>Original Dripfeed : {' '}</strong>{activeService.original_dripfeed}</li>
   
    <li className="list-group-item"><strong>Original Refill : {' '}</strong>{activeService.original_refill}</li>
    <li className="list-group-item"><strong>Old Price: {' '}</strong>{activeService.old_price?activeService.old_price:'Need Comfirme'}</li>
    
    <li className="list-group-item"><strong>New Price : {' '}</strong>{activeService.new_price?activeService.new_price:'-'}</li>
    <li className="list-group-item"><strong>Original Rate : {' '}</strong>{activeService.original_rate}</li>
    <li className="list-group-item"><strong>Quantity : {' '}</strong>{activeService.quantity?activeService.quantity:'Need Confirme'}</li>
  

    <li className="list-group-item"><strong>Long Description En : {' '}<br/></strong>{activeService.long_description_en?activeService.long_description_en:'Need Confirme'}</li>
    
    <li className="list-group-item"><strong>Short Description En: {' '}</strong><br/>{activeService.short_description_en?activeService.short_description_en:'Need Confirme'}</li>
 
    <li className="list-group-item arabic-align"><strong>وصف قصير عربي :{' '}</strong><br/>{activeService.short_description_ar?activeService.short_description_ar:'Need Confirme'}</li>
    <li className="list-group-item arabic-align"><strong>وصف طويل عربي :{' '}</strong><br/>{activeService.long_description_ar?activeService.long_description_ar:'Need Confirme'}</li>
  

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
              {activeService.confirmed==1?
                  <> Update Form
                  </>: <> Confirmation Form
                  </>}
              
                <div className="card-header-actions">
              
                  <CLink className="card-header-action"
                  
                  onClick={() => setAccordion(accordion ===1 ? null :1)}
                  
                  // onClick={() => setCollapsed(!collapsed)}
                  
                  >
                  {activeService.confirmed==1?
                  <> {accordion ===1?'Hide Update Form':'Show Update Form'}
                  <CIcon name={accordion ===1 ? 'cil-chevron-bottom':'cil-chevron-top'} /></>:null}
                   
                  {activeService.confirmed==0?
                  <> {accordion ===1?'Hide Confirme Form':'Show Confirme Form'}
                  <CIcon name={accordion ===1 ? 'cil-chevron-bottom':'cil-chevron-top'} /></>:null}


                  </CLink>
              
                </div>
              </CCardHeader>
              <CCollapse
              //  show={collapsed}
               show={accordion === 1}
               >
                 <CForm onSubmit={(e)=>{handleUpdateService(e)}}>
                <CCardBody>
            
            
             <CRow className="justify-content-center">
              <CCol md="12" lg="12" xl="12">
               
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">English Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {activeService.confirmed==0?
                    <CInput name="name_en"
                   required
                   onChange={handleData}
                    placeholder="Englsih Name" defaultValue={activeService.name_en} />:
                    <CInput name="name_en"
                   onChange={handleData}
                     placeholder="Englsih Name" defaultValue={activeService.name_en} />
                    }
                  </CCol>
                </CFormGroup>
               
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Arabic Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">

                    {activeService.confirmed==0?
                      <CInput name="name_ar" required
                   onChange={handleData}

                      placeholder="Arabic Name" defaultValue={activeService.name_ar} />
                    :
                    <CInput name="name_ar" 
                   onChange={handleData}

                    placeholder="Arabic Name" defaultValue={activeService.name_ar} />
                    }
                  
                  </CCol>
                </CFormGroup>

                  
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">English Short Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">

                    {activeService.confirmed==0?
                      <CTextarea name="short_description_en" required  rows="4"
                   onChange={handleData}

                      placeholder="English Short Description" defaultValue={activeService.short_description_en} />
                    :
                    <CTextarea name="short_description_en"  rows="4"
                   onChange={handleData}

                    placeholder="English Short Description" defaultValue={activeService.short_description_en} />
                    }
                  
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Arabic Short Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">

                      <CTextarea name="short_description_ar" required  rows="4"
                      onChange={handleData}
                    placeholder="Arabic Short Description" defaultValue={activeService.short_description_ar} />
                  
                  </CCol>
                </CFormGroup>
            
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">English Long Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CTextarea name="long_description_en" required  rows="6"
                   onChange={handleData}

                      placeholder="English Long Description" defaultValue={activeService.long_description_en} />
                  
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Arabic Long Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CTextarea name="long_description_ar" required  rows="6"
                   onChange={handleData}

                      placeholder="Arabic Long Description" defaultValue={activeService.long_description_ar} />
                  
                  </CCol>
                </CFormGroup>
                
                 </CCol>
          <CCol md="4" lg="4" xl="4">
                
          <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">Price</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CInput id="text-input" 
                     required
                     onChange={handleData}
                     type='number'
                      name="old_price" placeholder="Price" defaultValue={activeService.old_price} />
                   
                  </CCol>
                </CFormGroup>
             

           
                  </CCol>
                  <CCol md="4" lg="4" xl="4">
                
                <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">New Price</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CInput id="text-input"
                             onChange={handleData}
                             type='number'
                              name="new_price" placeholder="New Price" defaultValue={activeService.new_price} />
                        
                        </CCol>
                      </CFormGroup>
                   
      
                 
                        </CCol>      <CCol md="4" lg="4" xl="4">
                
                <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Quantity</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CInput 
                        onChange={handleData}
                          type='number'
                          required
                          id="text-input" name="quantity"
                          
                          placeholder={`quantity (min: ${activeService.original_min}) , (max:${activeService.original_max})`}
                       
                          defaultValue={activeService.quantity} />
                      
                        </CCol>
                      </CFormGroup>
                   
      
                 
                        </CCol>
                        <CCol md='6'>       <CFormGroup row>
                  <CLabel col md={12}>Change Service Image</CLabel>
                  <CCol xs="12" md="12">
                    {activeService.confirmed==0?
                    <CInputFile accept="image/*" required custom id="custom-file-input" onChange={(e)=>{handleImg(e)}}  />
                    :
                    <CInputFile accept="image/*" custom id="custom-file-input" onChange={(e)=>{handleImg(e)}}  />

                  }
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                     {pickedImg?pickedImg.name:'Choose file...'}
                      
                    </CLabel>
                  </CCol>
                </CFormGroup></CCol>
                 <CCol md='6'>
                   {pickedImg?<img className="card-img-top" src={URL.createObjectURL(pickedImg)}></img>:
                   <img className="card-img-top" src={activeService.avatar}></img>}
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
               {   <CButton color="success" block type='submit'>{activeService.confirmed?'Update':'Confirm'}
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
