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
  CFormGroup,
CLabel,
CSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
CInput,
CInputGroup,
CInputGroupPrepend,
CInputGroupText,
CCardFooter
} from '@coreui/react'
import {CAlert} from '@coreui/react'
import '../../globalVar'
import './areas.scss'

import { useTranslation } from 'react-i18next';


const Areas = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();
  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
  const [danger, setDanger] = useState(false)
  const [data,setData]=useState('')
  const [countries,setCountries]=useState([])
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
  const[fetchedCities,setfetchedCities]=useState([])
const[country,setCountry]=useState('')
const[city,setCity]=useState('')
  useEffect(async()=>{
    const fetchCountries=async(e)=>{
  try {
      const responsee = await fetch(
        `${global.apiUrl}/super/countries`,
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
      console.log('faqs',response);
    if(response.success){
     setCountries(response.payload)
    }
      if(response.message&&response.message=="Unauthenticated."){
      localStorage.removeItem("token");
      localStorage.clear()
   history.push("/login");
      }
     } catch (err) {console.log(err);}
 
    }
  
    fetchCountries()
  },[])
  useEffect(async () => {
    if(country!=''){
      setData('')
      const fetchCities = async (e) => {
      
        try {
          const responsee = await fetch(
            `${global.apiUrl}/super/cities?country=${country}&paginate=0`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + userToken,
  
                Accept: "application/json",
              },
            }
          );
          if(responsee.status==204){setfetchedCities([])}
          const response = await responsee.json();
          console.log(response);
  
          if (response.success) {
            setfetchedCities(response.payload)
          }
  
  
          if (response.message && response.message == "Unauthenticated.") {
            localStorage.removeItem("token");
            localStorage.clear()
  
            history.push("/login");
          }
  
        } catch (err) {
          console.log(err);
  
        }

      }
  
      fetchCities()
    }
      else{
setfetchedCities('')
      }
  
  }, [country])
  useEffect(async()=>{
    if(city!=''){
      
      const fetchAreas=async(e)=>{
        try {
            const responsee = await fetch(
              `${global.apiUrl}/super/areas?city=${city}&paginate=0`,
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
            if(responsee.status==204){
              setData([])
            }
            const response = await responsee.json();
            // console.log('response',response);
            console.log('faqs',response);
          if(response.success){
           setData(response.payload)
          }
            if(response.message&&response.message=="Unauthenticated."){
            localStorage.removeItem("token");
            localStorage.clear()
         history.push("/login");
            }
           } catch (err) {console.log(err);}
       
          }
        
          fetchAreas()
    }
    else{
      setData('')
    }
   
  },[city,refresh]) 






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
    `${global.apiUrl}/super/areas/${itemToDelete.id}`,
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
         <CRow className=" row-gap-15">
         <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
         {i18n.language == 'ar' ? "المناطق" : "Areas"}
              </CCol>
        
         <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
          
          <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
         onClick={()=>history.push('/Areas/AddNewArea')} >{i18n.language == 'ar' ? `إضافة منطقة جديدة` : `Add New Area`}
                </CButton>
             
          </CCol>

         </CRow>
     
         </CCardHeader>
         <CCardBody className='usersTabel'>
         <CRow >
 <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                             <CCol xs="12" md="12">
                              <CSelect custom name="country_id"
                                required value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value='' >
                                  {i18n.language == 'ar' ? "اختر دولة" : "Select Country"}
                                </option>
                                {countries.length > 0 && countries.map((country) => {
                                  return (<option value={country.id} key={country.id}>
                                    {i18n.language == 'ar' ? country.name_ar : country.name_en}
                                  </option>)
                                })}

                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>

                        <CCol md="6" lg="6" xl="6">

<CFormGroup row>
 
  <CCol xs="12" md="12">
    <CSelect custom name="city_id"
      required value={city} onChange={(e) => setCity(e.target.value)}>
        {country==''?
        <option value='' >
        {i18n.language == 'ar' ? "اختر دولة أولاً" : "Select Country First"}
      </option>
      :
      <>
      {fetchedCities.length>0?
        <option value='' >
        {i18n.language == 'ar' ? "اختر مدينة" : "Select City"}
      </option>
      :
      <option value='' >
      {i18n.language == 'ar' ? " لا يوجد مدن" : "No cities"}
    </option>
      }
      </>
      }
    
      {fetchedCities.length > 0 && fetchedCities.map((city) => {
        return (<option value={city.id} key={city.id}>
          {i18n.language == 'ar' ? city.name_ar : city.name_en}
        </option>)
      })}

    </CSelect>
  </CCol>
</CFormGroup>

</CCol>

                      </CRow>
      { data? <CDataTable
           items={data}
           fields={['id','name_en','name_ar','actions']}
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
                 <CBadge className="p-1 m-1 badg-click" color="danger"
                     onClick={() =>handleShowModal(item) }
                      >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>
                    <br/>
                     <CBadge className="p-1  m-1 badg-click" color="info"  
                    
                     onClick={()=>history.push(`/Country/${country}/City/${city}/AreaUpdate/${item.id}`)}  >
                     {i18n.language == 'ar' ? "تعديل ....." : "Update...."}</CBadge> 
                  
                 </td>
               ),

           }}
         />
         :
         <CRow>
           <CCol  md='12'>
           <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                            color="warning"
                            // closeButton
                            // show={visible}
                            // closeButton
                            // onShowChange={setVisible}
                          >
    {i18n.language == 'ar' ? "اختر دولة ثم اختر مدينة لعرض المناطق الخاصة بها" : "Select a country then select city to view its areas"}
                          </CAlert>
           </CCol>
         </CRow>
        }
      
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
                <CModalTitle>{i18n.language == 'ar' ? "حذف منطقة" : "Delete Area"}</CModalTitle>
              </CModalHeader>
              <CModalBody>
              {i18n.language == 'ar' ? `هل انت متأكد أنك تريد حذف منطقة (${itemToDelete.name_ar})` 
              : `Are you sure you want to delete a Area (${itemToDelete.name_en})`}
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() =>handleDelete()}>{i18n.language == 'ar' ? "حذف" : "Delete"}</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>{i18n.language == 'ar' ? "الغاء" : "Cancel"}</CButton>
              </CModalFooter>
            </CModal>
     
    </CRow>
  )
}

export default Areas
