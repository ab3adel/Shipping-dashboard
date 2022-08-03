import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup, 
CLabel,
CSelect,
CInput,
CInputGroup,
CInputGroupPrepend,
CInputGroupText,
CCardFooter
} from '@coreui/react'
import {CAlert} from '@coreui/react'
import '../../globalVar'
import './Priorities.scss'

import { useTranslation } from 'react-i18next';



const Priorities = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
   const [danger, setDanger] = useState(false)
  const [data,setData]=useState('')
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const [pageStatus,setPageStatus]=useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const[amount,setAmount]=useState('')
  const [visible, setVisible] = useState(10)
 const [companies,setCompanies]=useState('')
const[company,setCompany]=useState('')
const[depts,setDepts]=useState([])
const[dept,setDept]=useState('')
const[extNumber,setExtNumber]=useState('')
const[activeCompany,setActiveCompany]=useState('')
  useEffect(async()=>{
    const fetchPriorities=async(e)=>{
    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/ticketPriorities?paginate=0`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },

        }
      );
      if(responsee.status==204){
        setData([])
      }
      const response = await responsee.json();
      
      // console.log('response',response);
      console.log('faqs',response);
    if(response.success){
     setData(response.payload)
    //  setTotalPages(response.payload.last_page)
    if(activeUser.id){setActiveUser(response.payload.filter(item=>item.id==activeUser.id)[0])}
  
    }
      if(response.message&&response.message=="Unauthenticated."){
      localStorage.removeItem("token");
      localStorage.clear()
   
    history.push("/login");
      }
     
    } catch (err) {
      console.log(err);
     
    }

    
    
    }
  
    fetchPriorities()
  },[currentPage,refresh])

  
  
 const [activeUser,setActiveUser]=useState('')
 const[charge,setCharge]=useState([])
const[nocharge,setNoCharge]=useState(false)
 const handleShow=(item)=>{
   setActiveUser(item)
  //  getUser(item.id)
  //  setExtNumber(item.extension_number?item.extension_number.slice(4,7):'')
   setPageStatus(1)
 }

 const handleBack=(item)=>{
  setActiveUser('')
  setPageStatus(0)
  setAmount('')
  setCharge([])
  setCompany('')
  setDept('')
  setExtNumber('')
  setNoCharge(false)
}




const [itemToDelete,setItemToDelete]=useState('')
const handleShowModal=(item)=>{
  setSmall(!large)
  setItemToDelete(item)
}
const handleDelete=async()=>{
  setErrorMessage('')
  setSuccessAdd('')
  document.getElementById('root').style.opacity=0.75;

try {
  const responsee = await fetch(
    `${global.apiUrl}/super/ticketPriorities/${itemToDelete.id}`,
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
  if(response.success==true&& response.payload){
    setSmall(!small)
    document.getElementById('root').style.opacity=1;
   
   setRefresh(!refresh)
  
  }
  // else{
  // setErrorMessage(response.errors)
  // }
 
} catch (err) {
  console.log(err);
 
}
document.getElementById('root').style.opacity=1;

}
const handleCompany=(val)=>{
  setCompany(val)
  setDept('')
  if(val==''){
    setDepts('')
  }
  else{
    setDepts(companies.filter(item=>item.id==val)[0].departments)
  }

}

const handleActiveCompany=(val)=>{
  setActiveCompany(val)
 
  if(val==''){
    setData('')
  }
  else{
    setData(companies.filter(item=>item.id==val)[0].departments)
  }

}
  return (
    
    <CRow>
      {pageStatus==0&&
       <CCol xl={12}>
       <CCard>
         <CCardHeader>
         <CRow className=" row-gap-15">
         <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
         {i18n.language == 'ar' ? "الأولويات" : "Priorities"}
              </CCol>
        
         <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
          
          <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
         onClick={()=>history.push('/Priorities/AddNewPriority')} >
           {i18n.language == 'ar' ? `إضافة أولوية جديدة` : `Add New Priority`}
                </CButton>
             
          </CCol>

         </CRow>
           
         </CCardHeader>
         <CCardBody className='usersTabel'>

         <CRow >
       

                      </CRow>


      { data?  <CDataTable
           items={data}
           fields={['id','name_en','name_ar','color','time_to_resolve' ,'days_to_resolve' ,'actions']}
           hover
           striped
           pagination
        
           sorter
itemsPerPage={12}
 columnFilter
           // clickableRows
           // onRowClick={(item) => history.push(`/users/${item.id}`)}
           scopedSlots = {{
            'color':
            (item)=>(
              <td>
             <span className='colDiv' style={{backgroundColor:item.color}}></span>{item.color}
              </td>
            ),
               'time_to_resolve':
               (item)=>(
                 <td>
                {item.time_to_resolve.slice(0,5)}
                 </td>
               ),
               'actions':
               (item)=>(
                 <td>
                 <CBadge className="p-1 m-1 badg-click" color="danger"
                     onClick={() =>handleShowModal(item) }
                      >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>
                    <br/>
                     <CBadge className="p-1  m-1 badg-click" color="info" 
                      onClick={()=>history.push(`/Priorities/Update/${item.id}`)}  >
                     {i18n.language == 'ar' ? "تعديل ....." : "Update...."}</CBadge> 
                  
                 </td>
               ),

           }}
         />
        :
        
       null}

         </CCardBody>
       </CCard>
     </CCol>
      }
      {
        pageStatus==1&&activeUser&&
        <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">


        

            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
           {i18n.language == 'ar' ? activeUser.name_ar : activeUser.name_en}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="info"  className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>history.push(`/Departments/Update/${activeUser.id}`)} >{i18n.language == 'ar' ? `تعديل` : `Update`}
                  </CButton>
                  <CButton color="success"  className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
           onClick={()=>handleBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>
         
            </CCol>
            </CRow>
      
          </CCardHeader>
          <CCardBody className=''>
     
       
         
          <CRow>
            <CCol md='12'><strong>{i18n.language == 'ar' ? `معلومات القسم` : `Department Informations`}</strong></CCol>
      <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
                         <tr >
                          <td>ID</td>
                          <td><strong>{activeUser.id}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}</td>
                          <td><strong>{activeUser.name_en}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}</td>
                          <td><strong>{activeUser.name_ar}</strong></td>
                        </tr>
                     

                  
                </tbody>
              </table>
              </CCol>
              <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
             
                        <tr >
                          <td>{i18n.language == 'ar' ? `Company Id` : `Company Id`}</td>
                          <td><strong>{activeUser.company_id}</strong></td>
                        </tr>
                        
                        <tr >
                          <td>{i18n.language == 'ar' ? `الشركة` : `Company`}</td>
                          <td><strong>{activeUser.company_name}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `تاريخ الانشاء` : `Created At`}</td>
                          <td><strong> {activeUser.created_at&&activeUser.created_at.slice(0,10)}</strong></td>
                        </tr>
                        
                      
                        
                </tbody>
              </table>
              </CCol>
    </CRow>  


          </CCardBody>
        </CCard>
      </CCol>


      }
       <CModal 
              show={small} 
              onClose={() => setSmall(!small)}
              size="sm"
              color='danger'
            >
              <CModalHeader closeButton>
                <CModalTitle>{i18n.language == 'ar' ? "حذف أولوية" : "Delete Priority"}</CModalTitle>
              </CModalHeader>
              <CModalBody>
              {i18n.language == 'ar' ? `هل انت متأكد أنك تريد حذف أولوية (${itemToDelete.name_ar})` 
              : `Are you sure you want to delete a priority (${itemToDelete.name_en})`}
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() =>handleDelete()}>{i18n.language == 'ar' ? "حذف" : "Delete"}</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>{i18n.language == 'ar' ? "الغاء" : "Cancel"}</CButton>
              </CModalFooter>
            </CModal>
     
    </CRow>
  )
}

export default Priorities
