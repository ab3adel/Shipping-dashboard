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
import '../../../globalVar'
import './Departments.scss'

import { useTranslation } from 'react-i18next';



const Departments = () => {
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
  // useEffect(async()=>{
  //   const fetchUsers=async(e)=>{
  //   try {
  //     const responsee = await fetch(
  //       `${global.apiUrl}/super/users?paginate=0`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + userToken,
  //           Accept: "application/json",
  //         },

  //       }
  //     );
  //     const response = await responsee.json();
  //     // console.log('response',response);
  //     console.log('faqs',response);
  //   if(response.success){
  //    setData(response.payload)
  //   //  setTotalPages(response.payload.last_page)
  //   if(activeUser.id){setActiveUser(response.payload.filter(item=>item.id==activeUser.id)[0])}
  
  //   }
  //     if(response.message&&response.message=="Unauthenticated."){
  //     localStorage.removeItem("token");
  //     localStorage.clear()
   
  //   history.push("/login");
  //     }
     
  //   } catch (err) {
  //     console.log(err);
     
  //   }

    
    
  //   }
  
  //   fetchUsers()
  // },[currentPage,refresh])

  useEffect(async()=>{
 const fetchcompanies=async(e)=>{
  try {
      const responsee = await fetch(
        `${global.apiUrl}/admin/departments?paginate=0`,
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
      console.log('companies',response);
    if(response.success){
     setData(response.payload)
     if(activeUser){
      // setData(response.payload.filter(item=>item.id==activeCompany)[0].departments)
     }
  
    }
      if(response.message&&response.message=="Unauthorized."){
      localStorage.removeItem("token");
      localStorage.clear()
   
    history.push("/login");
      }
     
    } catch (err) {
      console.log(err);
     
    }

    }
  
    fetchcompanies()
  },[i18n.language,refresh])
  
 const [activeUser,setActiveUser]=useState('')
 const[charge,setCharge]=useState([])
const[nocharge,setNoCharge]=useState(false)
 const handleShow=(item)=>{
  //  setActiveUser(item)
   getUser(item.id)
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

const handleAddToDept=async(e)=>{
  e.preventDefault()
  setLoading(true)
  setVisible(7)
  setErrorMessage('')
  setSuccessAdd('')
if(activeUser.id){
  const data = new FormData();
  dept&& data.append('department_id', dept);
  
  !activeUser.extension_number&&data.append('extension_number', extNumber);
  // JSON.stringify({
  //   "department_id" : dept,
  //   "extension_number": extNumber
  // })
  try {
    const responsee = await fetch(
      `${global.apiUrl}/super/attach/users/${activeUser.id}/departments`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
          //  "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'https://localhost:3000',
          // 'Access-Control-Allow-Credentials': 'true',
          Accept: "application/json",
        },
        body: data
        ,
    
      }
    );
    const response = await responsee.json();
    console.log('response',response);
    console.log(response);
    if(response.success){
     
      setSuccessAdd(i18n.language == 'ar' ? "تمت اضافة المستخدم الى القسم بنجاح" 
      : "User has been added to department successfully")
    // setRefresh(!refresh)
    // setAmount('')
    // getAmount(activeUser.id)
  // setUpData({api_key:''})
   setVisible(7)
    }
    else{
     
      setVisible(7)
    setErrorMessage(response.messages)
    }
   
  } catch (err) {
    console.log(err);
   
  }
  
  setLoading(false)

}

}


const  getUser=async(id)=>{
  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/admin/departments/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
                 
          Accept: "application/json",
        },
     }
    );
    if(responsee.status==204){
     
    }
    const response = await responsee.json();
    console.log('response',response);
    console.log(response);
    if(response.success==true){
      setActiveUser(response.payload)
    }
  } catch (err) {
    console.log(err);
   
  }
}
const  removeFromDept=async(dept,user)=>{
  document.getElementById('root').style.opacity=0.75;


  try {
    const responsee = await fetch(
      `${global.apiUrl}/admin/detach/users/${user}/departments/${dept}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
                 
          Accept: "application/json",
        },
     }
    );
    if(responsee.status==204){
     
    }
    const response = await responsee.json();
    console.log('response',response);
    console.log(response);
    if(response.success==true){
      getUser(activeUser.id)
      document.getElementById('root').style.opacity=1;

    }
  } catch (err) {
    console.log(err);
   
  }
  document.getElementById('root').style.opacity=1;
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
    `${global.apiUrl}/admin/departments/${itemToDelete.id}`,
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
         {i18n.language == 'ar' ? "الاقسام" : "Departments"}
              </CCol>
        
         <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
          
          <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
         onClick={()=>history.push('/Admin/Departments/AddNewDepartment')} >
           {i18n.language == 'ar' ? `إضافة قسم جديد` : `Add New Department`}
                </CButton>
             
          </CCol>

         </CRow>
           
         </CCardHeader>
         <CCardBody className='usersTabel'>

      


      { data&&  <CDataTable
           items={data}
           fields={['id','name_en','name_ar','company_name', 'actions']}
           hover
           striped
           pagination
        
           sorter
itemsPerPage={12}
 columnFilter
           // clickableRows
           // onRowClick={(item) => history.push(`/users/${item.id}`)}
           scopedSlots = {{
     
               'name':
               (item)=>(
                 <td>
                {item.first_name+' '+item.last_name}
                 </td>
               ),
               'actions':
               (item)=>(
                 <td>
                 <CBadge className="p-1 m-1 badg-click" color="danger"
                     onClick={() =>handleShowModal(item) }
                      >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>
                    <br/>
                     <CBadge className="p-1  m-1 badg-click" color="info"  onClick={()=>handleShow(item)}  >
                     {i18n.language == 'ar' ? "عرض ....." : "Show...."}</CBadge> 
                  
                 </td>
               ),

           }}
         />
        
        
        }

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
           onClick={()=>history.push(`/Admin/Departments/Update/${activeUser.id}`)} >{i18n.language == 'ar' ? `تعديل` : `Update`}
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
<CRow>

{activeUser.employees.length==0&& <CCol md='12'>
<CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                   color="info"
                > 
     <strong>{i18n.language == 'ar' ? `لا يوجد موظفون في هذا القسم` : `No Employees In This Department`}</strong>
          </CAlert>
</CCol>
                
          
          }

{activeUser.employees.length>0&& <><CCol md='12'>
  <strong>{i18n.language == 'ar' ? `الموظفون في هذا القسم` : `Employees In This Department`}</strong>
</CCol>
<CCol md='12' className='usersTabel'>
{ activeUser.employees&&  <CDataTable
           items={activeUser.employees}
           fields={['id','email','username', 'position','actions']}
           hover
           striped
           pagination
        sorter
itemsPerPage={12}
 columnFilter
           // clickableRows
           // onRowClick={(item) => history.push(`/users/${item.id}`)}
           scopedSlots = {{
           
            'actions':
            (item)=>(
              <td>
           
                  <CBadge className="p-1  m-1 badg-click" color="danger" 
                   onClick={()=>removeFromDept(activeUser.id,item.id)}  >
                  {i18n.language == 'ar' ? "إزالة ..." : "Remove..."}</CBadge> 
               
              </td>
            ),

              

           }}
         />}

</CCol>
</>
}
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
                <CModalTitle>{i18n.language == 'ar' ? "حذف قسم" : "Delete Department"}</CModalTitle>
              </CModalHeader>
              <CModalBody>
              {i18n.language == 'ar' ? `هل انت متأكد أنك تريد حذف قسم (${itemToDelete.name_ar})` 
              : `Are you sure you want to delete a department (${itemToDelete.name_en})`}
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() =>handleDelete()}>{i18n.language == 'ar' ? "حذف" : "Delete"}</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>{i18n.language == 'ar' ? "الغاء" : "Cancel"}</CButton>
              </CModalFooter>
            </CModal>
     
    </CRow>
  )
}

export default Departments
