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
import './ALLCustomers.scss'

import { useTranslation } from 'react-i18next';



const ALLCustomers = () => {
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
 
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const [pageStatus,setPageStatus]=useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  const [visible, setVisible] = useState(10)





  useEffect(async()=>{
    const fetchCustomers=async(e)=>{
    try {
      const responsee = await fetch(
        `${global.apiUrl}/customers?paginate=0`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },

        }
      );
      const response = await responsee.json();
      // console.log('response',response);
      console.log('faqs',response);
    if(response.success){
     setData(response.payload)
    //  setTotalPages(response.payload.last_page)
    if(activeUser.id){getCustomer(activeUser.id)}
  
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
  
    fetchCustomers()
  },[currentPage,refresh])

 
  
 const [activeUser,setActiveUser]=useState('')

 const handleShow=(item)=>{
  //  setActiveUser(item)
   getCustomer(item.id)
   
   setPageStatus(1)
 }

 const handleBack=(item)=>{
  setActiveUser('')
  setPageStatus(0)
}



const  getCustomer=async(id)=>{
  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/customers/${id}`,
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
    `${global.apiUrl}/customers/${itemToDelete.id}`,
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

  return (
    
    <CRow>
      {pageStatus==0&&
       <CCol xl={12}>
       <CCard>
         <CCardHeader>
         <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            {i18n.language == 'ar' ? "الزبائن" : "Customers"}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>history.push('/customers/AddNewCustomer')} >
             {i18n.language == 'ar' ? "إضافة زبون" : "Add New Customer"}
                  </CButton>
         
            </CCol>
            </CRow>
        
         </CCardHeader>
         <CCardBody className='usersTabel'>
      { data&&  <CDataTable
           items={data}
           fields={['id','name','email', 'phones','company_id','company_name','actions']}
           hover
           striped
           pagination
        
           sorter
itemsPerPage={12}
 columnFilter
           clickableRows
          //  onRowClick={(item) => handleShow(item)}
           scopedSlots = {{
            'phones':
            (item)=>(
              <td>
             {item.phones?item.phones.map((phone,index)=>{ 
               return(<React.Fragment key={index}>{phone.number}<br/></React.Fragment>)
             })
            :
            '-'
            }
              </td>
            ),
               'actions':
               (item)=>(
                 <td>  <CBadge className="p-1 m-1 badg-click" color="danger"
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
            {activeUser.name}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="info"  className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
onClick={()=>history.push(`/customers/UpdateCustomer/${activeUser.id}`)} >{i18n.language == 'ar' ? `تعديل` : `Update`}
      </CButton>
                  <CButton color="success"  className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
           onClick={()=>handleBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>
         
            </CCol>
            </CRow>
      
          </CCardHeader>
          <CCardBody className=''>
     
        
         
          <CRow>
            <CCol md='12'><strong>{i18n.language == 'ar' ? `معلومات الزبون` : `Customer Informations`}</strong></CCol>
            
            <CCol className=' p-1' md='6' >

<ul className=" card list-group list-group-flush">
<li className="list-group-item"><strong>Id : {' '}</strong>{activeUser.id}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `الاسم :` :   `Name :`}
 {' '}</strong> {activeUser.name}</li>
<li className="list-group-item"><strong>
{i18n.language == 'ar' ? `رقم الهوية المدنية :` :   `Civil Id :`}
   {' '}</strong>{activeUser.civil_id}</li>
   <li className="list-group-item"><strong>{i18n.language == 'ar' ? `البريد الالكتروني :` :   `Email : `}{' '}</strong>{activeUser.email}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `معرف الشركة :` :   `Company Id : `}{' '}</strong>{activeUser.company_id}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `اسم الشركة :` :   `Company Name : `}{' '}</strong>{activeUser.company_name}</li>

<li className="list-group-item"><strong>{i18n.language == 'ar' ? ` هواتف : ` :   `Phones :`} {' '}</strong>
{activeUser.phones?
<>{'/ '}{
  activeUser.phones.map((phone,index)=>{ 
    return(<React.Fragment key={index}>{phone.number+' / '}</React.Fragment>)
  })
}
</>

:
            '-'
            }</li>
</ul>


          </CCol>
          <CCol className=' p-1' md='6' >

<ul className=" card list-group list-group-flush">
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `الجادة :` :   `Avenue :`} {' '}
</strong>{activeUser.avenue?activeUser.avenue:'-'}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `الشارع :` :   `Street :`} {' '}
</strong>{activeUser.street?activeUser.street:'-'}</li>
<li className="list-group-item"><strong>
{i18n.language == 'ar' ? `الكتلة :` :   `Block :`}
   {' '}</strong>{activeUser.block?activeUser.block:'-'}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `البناء :` :   `Building :`} {' '}
</strong>{activeUser.building?activeUser.building:'-'}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `الطابق :` :   `Floor :`} {' '}
</strong>{activeUser.floor?activeUser.floor:'-'}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `الشقة :` :   `Flat :`} {' '}
</strong>{activeUser.flat?activeUser.flat:'-'}</li>
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `معرف المنطقة :` :   `Area Id :`}
 {' '}</strong> {activeUser.area_id}</li>

  </ul>


          </CCol>
          {activeUser.notes &&
          <CCol className=' p-1'  md='12'>
          <ul className=" card list-group list-group-flush">
<li className="list-group-item"><strong>
{i18n.language == 'ar' ? "ملاحظات :" : "Notes : "}
   {' '}</strong>{activeUser.notes}</li>



</ul>
          </CCol>}
    {activeUser.blocking_reason &&
          <CCol className=' p-1'  md='12'>
          <ul className=" card list-group list-group-flush">
<li className="list-group-item"><strong>
{i18n.language == 'ar' ? " سبب الحظر : " : " Block Reason : "}
   {' '}</strong>{activeUser.blocking_reason}</li>



</ul>
          </CCol>}
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
                <CModalTitle>{i18n.language == 'ar' ? "حذف زبون" : "Delete Customer"}</CModalTitle>
              </CModalHeader>
              <CModalBody>
              {i18n.language == 'ar' ? `هل انت متأكد أنك تريد حذف زبون (${itemToDelete.name})` 
              : `Are you sure you want to delete a Customer (${itemToDelete.name})`}
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() =>handleDelete()}>{i18n.language == 'ar' ? "حذف" : "Delete"}</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>{i18n.language == 'ar' ? "الغاء" : "Cancel"}</CButton>
              </CModalFooter>
            </CModal>
     
    </CRow>
  )
}

export default ALLCustomers
