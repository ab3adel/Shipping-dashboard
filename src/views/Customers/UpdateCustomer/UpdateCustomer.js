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
import './UpdateCustomer.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'

// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewCustomer = ({match}) => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [phones, setPhones] = useState([""])
  const [fetchedPhones, setFetchedPhones] = useState([""])
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);
  const [country,setCountry]=useState('')
  const [city,setCity]=useState('')
  const [fetchedCities, setfetchedCities] = useState([])
  const [fetchedAreas, setfetchedAreas] = useState([])
  const [upData, setUpData] = useState({
    name: '',
    email: '',
    civil_id: '',
    notes: '',
    area_id: '',
    avenue: '',
    street: '',
    building: '',
    floor: '',
    flat: '',
  


  })
  const { name,
    email,
    civil_id,
    notes,
    area_id,
    avenue,
    street,
    building,
    floor,
    flat,



  } = upData;
  useEffect(async () => {
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
          setUpData({
            name: response.payload.name,
            email: response.payload.email,
            civil_id: response.payload.civil_id,
            notes: response.payload.notes,
            area_id: response.payload.area_id,
            avenue: response.payload.avenue,
            street: response.payload.street,
            building: response.payload.building,
            floor: response.payload.floor,
            flat: response.payload.flat,
         
           
          })
       
          setFetchedPhones(response.payload.phones)
        }
      } catch (err) {
        console.log(err);
       
      }
    }
    getCustomer(match.params.id)
  }, [refresh])
  useEffect(async () => {
    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/countries`,
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
  }, [])
  useEffect(async () => {
    setCity('')
    if(country!=''){
      const fetchCities = async (e) => {
      
        try {
          const responsee = await fetch(
            `${global.apiUrl}/cities?country=${country}`,
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
          
            setfetchedAreas('')
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
setCity('')
setfetchedAreas('')
      }
  
  }, [country])
  useEffect(async () => {
    if(city!=''){
      const fetchAreas = async (e) => {
      
        try {
          const responsee = await fetch(
            `${global.apiUrl}/areas?city=${city}`,
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
            setfetchedAreas(response.payload)
      
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
  
      fetchAreas()
    }
      else{

setfetchedAreas('')
      }
  
  }, [city])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
 
  
  const handlePhones = (i,e) => {
    setPhones(...[phones, (phones[i] = e.target.value)]);
    console.log('phones', phones)
    console.log('i', i)
    console.log('e', e.target.value)

  };

  // add row
  const [addRow, setaddrow] = useState([]);
  const handladdRow = (e) => {
    setaddrow([...addRow, 1]);
    // setPhones([...phones, '']);
  };



  const handleAddCustomer = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    const data = new FormData();
    name && data.append("name", name);
    email && data.append("email", email);
    civil_id && data.append("civil_id", civil_id);
    notes && data.append("notes", notes);
    area_id && data.append("area_id", area_id);
    avenue && data.append("avenue", avenue);
    street && data.append("street", street);
    building && data.append("building", building);
    floor && data.append("floor", floor);
    flat && data.append("flat", flat);
   
    phones.map((item, index) => {
      phones[index] != '' && data.append("phones[]", phones[index]);
    });



    try {
      const responsee = await fetch(
        `${global.apiUrl}/customers/${match.params.id}?_method=put`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            //  "Content-Type": "application/json",
            //'Access-Control-Allow-Origin': 'https://localhost:3000',
            // 'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: data
          ,

        }
      );
      const response = await responsee.json();
      console.log('response', response);
      console.log(response);
      setVisible(10)
      if (response.success) {
        await setVisible(6)
        setSuccessAdd(i18n.language == 'ar' ? "تم تعديل معلومات زبون بنجاح" : "Customer Informations Updated Successfuly")
document.getElementById('phone1').value=''

    //     setUpData({
    //       name: '',
    // email: '',
    // civil_id: '',
    // notes: '',
    // area_id: '',
    // avenue: '',
    // street: '',
    // building: '',
    // floor: '',
    // flat: '',
    //     })
    //     setPhones([""])
   
    //     setaddrow([])
        setVisible(6)
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

  const handleDelete=async(id)=>{
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity=0.75;
  
   
  
  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/customers/${match.params.id}/phones/${id}`,
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
  console.log('data', upData)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong> {i18n.language == 'ar' ? "إضافة زبون جديد" : "Add New Customer"}</strong>
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
              <CForm onSubmit={(e) => { handleAddCustomer(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                        <CCol md='12'> <strong>
                          {i18n.language == 'ar' ? "معلومات الزبون :" : "Company Informations :"}
                          </strong></CCol>

                        {/* className="justify-content-center" */}
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "اسم الزبون" : "Customer Name"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? "اسم الزبون" : "Customer Name"}
                                value={upData.name} />
                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="email"
                                required
                                type='email'
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                                value={upData.email} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Civil Id')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="civil_id" required
                                onChange={handleData}

                                placeholder={t('Civil Id')} value={upData.civil_id} />


                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Avenue')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="avenue" required
                                onChange={handleData}

                                placeholder={t('Avenue')} value={upData.avenue} />


                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Street')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="street" required
                                onChange={handleData}

                                placeholder={t('Street')} value={upData.street} />


                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Building')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="building" required
                                onChange={handleData}

                                placeholder={t('Building')} value={upData.building} />


                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Floor')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="floor" required
                                onChange={handleData}

                                placeholder={t('Floor')} value={upData.floor} />


                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Flat')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="flat" required
                                onChange={handleData}

                                placeholder={t('Flat')} value={upData.flat} />


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
       value={country} onChange={(e) => setCountry(e.target.value)}>
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
                                 value={city} onChange={(e) => setCity(e.target.value)}>
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
                       
                        <CCol md="6" lg="6" xl="6">

<CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">
      {i18n.language == 'ar' ? "المنطقة" : "Area"}
    </CLabel>
  </CCol>
  <CCol xs="12" md="12">
    <CSelect custom name="area_id"
       value={upData.area_id} onChange={(e) => handleData(e)}>
        {city==''?
        <option value='' >
        {i18n.language == 'ar' ? "اختر مدينة أولاً" : "Select City First"}
      </option>
      :
      <>
      {fetchedAreas.length>0?
        <option value='' >
        {i18n.language == 'ar' ? "اختر منطقة" : "Select Area"}
      </option>
      :
      <option value='' >
      {i18n.language == 'ar' ? " لا يوجد مناطق" : "No Areas"}
    </option>
      }
      </>
      }
    
      {fetchedAreas.length > 0 && fetchedAreas.map((area) => {
        return (<option value={area.id} key={area.id}>
          {i18n.language == 'ar' ? area.name_ar : area.name_en}
        </option>)
      })}

    </CSelect>
  </CCol>
</CFormGroup>

</CCol>
{fetchedPhones&&fetchedPhones.map((phone,index)=>{
                         return(<CCol md="6" lg="6" xl="6" key={phone.id}>
                      
                         <CFormGroup  row>
                           <CCol md="12">
                             <CLabel htmlFor="text-input">
                             {i18n.language == 'ar' ? `هاتف (${(index +1)})` : `Phone (${(index + 1)})`}
                             </CLabel>
                           </CCol>
                           <CCol xs="9" md="9">

                             <CInput disabled
                               defaultValue={phone.number}
                               onChange={(e)=>handlePhones(index,e)}
                               placeholder={i18n.language == 'ar' ? `هاتف (${(index +1)})` : `Phone (${(index + 1)})`} />
                           </CCol>
                           <CCol md='3'>
                         {/* className='col-lg-3  col-md-3 col-sm-3 col-xs-3' updatebtn */}
                         <CButton color="danger"  type='button' className='col-md-12'
           onClick={()=>handleDelete(phone.id)} ><i class="fa fa-trash" aria-hidden="true"></i>
                  </CButton>

                         </CCol>
                         </CFormGroup>
                     
                       </CCol>)
                       })}
                        
                        {addRow.length > 0 &&
                          addRow.map((row, index) => {
                            return (
                              <CCol md="6" lg="6" xl="6" key={index}>

                                <CFormGroup row>
                                  <CCol md="12">
                                    <CLabel htmlFor="text-input">
                                      {i18n.language == 'ar' ? ` هاتف جديد (${(index +1)})` : `New Phone (${(index +1)})`}</CLabel>
                                  </CCol>
                                  <CCol xs="12" md="12">

                                    <CInput name="name_en"
                                      onChange={(e)=>handlePhones((index ),e)}
                                      placeholder={i18n.language == 'ar' ? ` هاتف جديد (${(index +1)})` : `New Phone (${(index +1)})`}
                                    />
                                  </CCol>
                                </CFormGroup>

                              </CCol>
                            );
                          })}
                     
                        <CCol md="12" lg="12" xl="12">
                          <br></br>
                          <CButton className='col-md-2'
                            onClick={handladdRow}
                            color="info" block type='button'>
                            {i18n.language == 'ar' ? `إضافة هاتف آخر` : `Add More Phones`}
                          </CButton>
                          <br></br>
                        </CCol>
                    

                        <CCol md="12" lg="12">
                          <CFormGroup row className=''>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{t('Notes')}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CTextarea name="notes" required rows='3'
                                onChange={handleData}

                                placeholder={t('Notes')} value={upData.notes} />


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

                            {errorMessage && errorMessage.map((item, i) => (

                              <>{errorMessage[i]}<br /></>

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

export default AddNewCustomer
