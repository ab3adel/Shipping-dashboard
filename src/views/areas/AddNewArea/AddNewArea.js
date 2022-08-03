import React, { useState, useEffect } from 'react'
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
import './AddNewArea.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewArea = () => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])
  const [fetchedCities, setfetchedCities] = useState([])
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);
const [country,setCountry]=useState('')
  const [upData, setUpData] = useState({
    name_en: '',
    name_ar: '',
    city_id: '',
    // criteriaDigits: '',
    // countryId: '',
})
  const { name_en,
    name_ar,
    city_id

  } = upData;

  useEffect(async () => {
    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/super/countries?paginate=0`,
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

        if (response.success) {
          setfetchedData(response.payload)
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

    fetchCountries()
  }, [refresh])
//   useEffect(async () => {
//     if(country!=''){
//       const fetchCities = async (e) => {
      
//         try {
//           const responsee = await fetch(
//             `${global.apiUrl}/super/cities?country=${country}&paginate=0`,
//             {
//               method: "GET",
//               headers: {
//                 Authorization: "Bearer " + userToken,
  
//                 Accept: "application/json",
//               },
//             }
//           );
//           if(responsee.status==204){setfetchedCities([])}
//           const response = await responsee.json();
//           console.log(response);
  
//           if (response.success) {
//             setfetchedCities(response.payload)
//           }
  
  
//           if (response.message && response.message == "Unauthenticated.") {
//             localStorage.removeItem("token");
//             localStorage.clear()
  
//             history.push("/login");
//           }
  
//         } catch (err) {
//           console.log(err);
  
//         }

//       }
  
//       fetchCities()
//     }
//       else{
// setfetchedCities('')
//       }
  
//   }, [refresh])
  useEffect(async () => {
    if(country!=''){
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

  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
 


 


  const handleAddCity = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/areas`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
             "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'https://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: JSON.stringify({
             name_ar: name_ar,
            name_en: name_en,
            city_id: city_id
                            }) ,

        }
      );
      const response = await responsee.json();
      console.log('response', response);
      console.log(response);
      setVisible(10)
      if (response.success) {
        await setVisible(6)
        setSuccessAdd(i18n.language == 'ar' ? "تمت اضافة منطقة بنجاح" : "New Area Added Successfuly")


        setUpData({
          name_ar: '',
          name_en: '',
          city_id:''
        })
        setCountry('')
      
      }
      else {

        setVisible(10)
        setErrorMessage(response.messages)


      }


    } catch (err) {
      console.log(err);

    }

    setLoading(false)
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center justify-content-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>{i18n.language == 'ar' ? "إضافة منطقة جديدة" : "Add New Area"}</strong>
              </CCol>
              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
          
          <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
         onClick={()=>history.goBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                </CButton>
             
          </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddCity(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                     

                        {/* className="justify-content-center" */}
                       
                        <CCol md='12'> <strong>{i18n.language == 'ar' ? `معلومات المنطقة :` : `Area Informations :`}</strong></CCol>
                        
                      
<CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_ar"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}
                                value={upData.name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "الدولة" : "Country"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="country_id"
                                required value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value='' >
                                  {i18n.language == 'ar' ? "اختر دولة" : "Select Country"}
                                </option>
                                {fetchedData.length > 0 && fetchedData.map((country) => {
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
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "المدينة" : "City"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="city_id"
                                required value={upData.city_id} onChange={(e) => handleData(e)}>
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
      {     Object.keys(errorMessage).map((item, i) => (
        
        <>{errorMessage[item]}<br/></>  
           
                     
               
         ))}
                            {/* {errorMessage && errorMessage.map((item, i) => (

                              <>{errorMessage[i]}<br /></>

                            ))} */}
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
                          {<CButton color="success" block type='submit'>
                            {t('Save')}
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

export default AddNewArea
