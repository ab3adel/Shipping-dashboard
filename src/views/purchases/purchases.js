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
  CButton
} from '@coreui/react'
import '../../globalVar'
import './purchases.scss'



const Purchases = () => {
  const history = useHistory()

  
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



  useEffect(async()=>{
    const fetchFAQs=async(e)=>{
  
  
    
    try {
      const responsee = await fetch(
        `${global.apiUrl}/purchases/viewAllPurchases`,
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
      console.log('Purchases',response);
    if(response.message== "Purchases retrieved successfully!"){
     setData(response.payload)
    //  setTotalPages(response.payload.last_page)
  
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
  
    fetchFAQs()
  },[refresh])

  
const handleAcivate=async(id)=>{
  document.getElementById('root').style.opacity=0.75;
   try {
     const responsee = await fetch(
       `${global.apiUrl}/users/activateUser?user_id=${id}`,
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
 const [activeUser,setActiveUser]=useState('')
 const handleShow=(item)=>{
   setActiveUser(item)
   setPageStatus(1)
 }
 const handleBack=(item)=>{
  setActiveUser('')
  setPageStatus(0)
}
  return (
    
    <CRow>
      {pageStatus==0&&
       <CCol xl={12}>
       <CCard>
         <CCardHeader>
         Purchases
     
         </CCardHeader>
         <CCardBody className='usersTabel'>
    { data&&    <CDataTable
           items={data}
           fields={['id','user_id','user','total_cost', 'checked_out','offer_used','orders','actions']}
           hover
           striped
           sorter
           itemsPerPage={12}
           pagination
           columnFilter
          
           // clickableRows
           // onRowClick={(item) => history.push(`/users/${item.id}`)}
           scopedSlots = {{
             'checked_out':
               (item)=>(
                 <td>
                   {item.checked_out==1?  <CBadge color='primary'>
                     Yes 
                   </CBadge>
                   :
                   <CBadge color='dark'>
                No
                 </CBadge>
                   }
      
                 </td>
               ),
               'offer_used':
               (item)=>(
                 <td>
                   {item.is_offer_used==1?  <CBadge color='primary'>
                         Yes 
                   </CBadge>
                   :
                   <CBadge color='dark'>
                          No
                 </CBadge>
                   }
      
                 </td>
               ),
               'orders':
               (item)=>(
                 <td>
                   {item.orders?  <>
                        {item.orders.length}
                  </>
                   :
               <>-</>
                   }
      
                 </td>
               ),
               'user':
               (item)=>(
                 <td>
                  
                {item.user.first_name+' '+item.user.last_name}
                 </td>
               ),
               'actions':
               (item)=>(
                 <td>
               <CBadge className="p-1  m-1 badg-click" color="info"  onClick={()=>handleShow(item)}  >Show....</CBadge> 
                  
                 </td>
               ),

           }}
         />}
        {totalPages&&      <CPagination
           align="center"
           addListClass="some-class"
           activePage={currentPage}
           pages={totalPages}
           onActivePageChange={setCurrentPage}
           className='faqsPage'
         />}
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
            {/* {activeUser.first_name+' ' +activeUser.last_name} */}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>handleBack()} >Back
                  </CButton>
         
            </CCol>
            </CRow>
      
          </CCardHeader>
          <CCardBody className=''>
        

          <CRow>
          <CCol lg={6}>
        <strong>Purchase informations</strong>
              <table className="table table-striped table-hover">
                <tbody>
                      
                        <tr >
                          <td>Purchase ID</td>
                          <td><strong>{activeUser.id}</strong></td>
                        </tr>
                        <tr >
                          <td>Total Cost</td>
                          <td><strong>{activeUser.total_cost}</strong></td>
                        </tr>
                        <tr >
                          <td>Checked Out</td>
                          <td><strong>     {activeUser.checked_out==1?  'Yes':'No'}</strong></td>
                    </tr>
                        <tr >
                          <td>Offer</td>
                          <td><strong>     {activeUser.is_offer_used==1?'Yes':'No'}</strong></td>
                        </tr>
                    
                        <tr >
                          <td>Orders</td>
                          <td><strong>{activeUser.orders? <>{activeUser.orders.length}</>:<>-</>}</strong></td>
                        </tr>
                        <tr >
                          <td>Created At</td>
                          <td><strong>{activeUser.orders? <>{activeUser.created_at.slice(0,10)}</>:<>-</>}</strong></td>
                        </tr>
                    

                  
                </tbody>
              </table>
              </CCol>
      <CCol lg={6}>
        <strong>User informations</strong>
              <table className="table table-striped table-hover info_table">
                <tbody>
                      
                        <tr >
                          <td>User ID</td>
                          <td><strong>{activeUser.user_id}</strong></td>
                        </tr>
                        <tr >
                          <td>User Name</td>
                          <td><strong> {activeUser.user.first_name+' '+activeUser.user.last_name}</strong></td>
                        </tr>
                        <tr >
                          <td>Middle Name</td>
                          <td><strong>{activeUser.user.middle_name?`${activeUser.user.middle_name}`:'-'}</strong></td>
                        </tr>
                        <tr >
                          <td>Email</td>
                          <td><strong>{activeUser.user.email}</strong></td>
                        </tr>
                        <tr >
                          <td>Phone</td>
                          <td><strong>{activeUser.user.phone}</strong></td>
                        </tr>
                        <tr >
                          <td>Email Verificaton</td>
                          <td><strong>{activeUser.user.is_email_verified==1?'Verified':'Not Verified'}</strong></td>
                        </tr>

                  
                </tbody>
              </table>
              </CCol>
          
    </CRow>  
<CRow>
  <CCol md='12'><strong>Order Informations</strong></CCol>

</CRow>

{activeUser.orders&&activeUser.orders.map((order,index)=>{
  return(
    <CRow className='orderRow' key={order.id}>
     <CCol lg={6}>
        <strong>Order{' '+(index+1)}</strong>
              <table className="table table-striped table-hover info_table">
                <tbody>
                      
                        <tr >
                          <td>ID</td>
                          <td><strong>{order.id}</strong></td>
                        </tr>
                        <tr >
                          <td>Link</td>
                          <td><strong>{order.link?
                          <a target="_blank" rel="noopener noreferrer" href={order.link}>{order.link}</a>
                          
                          :'-'}</strong></td>

                        </tr>
                        <tr >
                          <td>Delay</td>
                          <td><strong>{order.delay}</strong></td>
                        </tr>
                        <tr >
                          <td>Details</td>
                          <td><strong>{order.details?`Charge: ${order.details.charge}`:'-'}</strong>
                         {' , '} <strong>{order.details?`Start Count: ${order.details.start_count}`:'-'}</strong>{' , '}
                          
                          <strong>{order.details?`status: ${order.details.status}`:'-'}</strong>{' , '}
                          <strong>{order.details?`Remains: ${order.details.remains}`:'-'}</strong>{' , '}
                          </td>
                        </tr>
                        <tr >
                          <td>Created_At</td>
                          <td><strong>{order.created_at.slice(0,10)}</strong></td>
                        </tr>
                     

                  
                </tbody>
              </table>
              </CCol>
              <CCol lg={6}>
        <strong>Order{' '+(index+1) +' service'}</strong>
              <table className="table table-striped table-hover info_table">
                <tbody>
                      
                        <tr >
                          <td> ServiceID</td>
                          <td><strong>{order.service.id}</strong></td>
                        </tr>
                        <tr >
                          <td>Name</td>
                          <td><strong>{order.service.name_en}</strong></td>

                        </tr>
                        <tr >
                          <td>Quantity</td>
                          <td><strong>{order.service.quantity}</strong></td>
                        </tr>
                     
                        <tr >
                          <td>Description</td>
                          <td><strong>{order.service.short_description_en}</strong></td>
                        </tr>
                        <tr >
                          <td>Price</td>
                          <td><strong>Price:{' '+order.service.old_price} {order.service.new_price?' , New Price :'+order.service.new_price:null  }</strong></td>
                        </tr> 
                        {/* <tr >
                          <td>Email Verificaton</td>
                          <td><strong>{activeUser.user.is_email_verified==1?'Verified':'Not Verified'}</strong></td>
                        </tr> */}

                  
                </tbody>
              </table>
              </CCol>
    
    </CRow>
  )
})}
<CRow>


</CRow>
          </CCardBody>
        </CCard>
      </CCol>


      }
     
    </CRow>
  )
}

export default Purchases
