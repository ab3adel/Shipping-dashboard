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
import './ReciepientUpdate.scss'
import CustomerUpdate from './CustomerUpdate'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});



const ReciepientUpdate = ({ match }) => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')
  const [customer, setCustomer] = useState(null)
  const [allCustomers, setAllCustomers] = useState([])
  const [countries, setCountries] = useState([])
  const [addresses, setAddresses] = useState([])
  const [upData, setUpData] = useState({

    name_ar: '',
    name_en: '',

  })
  const { name_ar,
    name_en,
  } = upData;

  const [doneCountries, setDoneCountries] = useState(false)
  const [doneUsers, setDoneUsers] = useState(false)



  useEffect(async () => {
    const fetchUsers = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/users?paginate=0`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },

          }
        );
        const response = await responsee.json();


        if (response.success) {


          await setAllCustomers(response.payload.filter(item => item.admin == 0))

          setDoneUsers(true)
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

    await fetchUsers()
    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/shipping/countries`,
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


        if (response.success) {
          setCountries(response.payload)
          setDoneCountries(true)
        }
        if (response.message && response.message == "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.clear()
          history.push("/login");
        }
      } catch (err) { console.log(err); }

    }

    await fetchCountries()

  }, [])
  useEffect(async () => {


    if (doneCountries == true && doneUsers == true) {
      const getUser = async (id) => {

        try {
          const responsee = await fetch(
            `${global.apiUrl}api/reciepients/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + userToken,

                Accept: "application/json",
              },
            }
          );
          if (responsee.status == 204) {

          }
          const response = await responsee.json();

          if (response.success == true) {
            setAddresses([])
            setUpData({
              name_ar: response.payload.name_ar,
              name_en: response.payload.name_en,
            })

            setCustomer(allCustomers.filter(item => item.customer.id == response.payload.customer_id)[0])
            let temp = {}
            let arr = []
            await response.payload.addresses.map(async (item, index) => {
              temp = {
                ...item,
                city: item.city ? item.city : null,
                country: countries.filter(itemm => itemm.Code == item.country_code)[0],
                cities: await fetchCitiesForStart(item.country_code),
                new: false
              }
              arr.push({ ...temp })
              setAddresses([...arr])
              setAddresses([...arr])

            })

            console.log("temp", temp);

          }
        } catch (err) {
          console.log(err);

        }
      }
      await getUser(match.params.id)
    }

  }, [doneCountries, doneUsers, refresh])




  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
  const [phones, setPhones] = useState([""])






  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')
    let temp = []
    let data = {}
    addresses.filter(item => item.new == true).length > 0 && addresses.filter(item => item.new == true).map(item => {
      temp.push(item)
    })
    if (temp.length > 0) {
      data = JSON.stringify({
        _method: 'put',
        customer_id: customer.customer.id, name_ar,
        name_en, addresses: temp
      })
    } else {
      data = JSON.stringify({
        _method: 'put',
        customer_id: customer.customer.id, name_ar,
        name_en
      })
    }
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/reciepients/${match.params.id}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'https://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: data
          ,

        }
      );
      const response = await responsee.json();


      setVisible(10)
      if (response.success) {
        await setVisible(6)
        setSuccessAdd("تمت تعديل مستلم بنجاح")

        setRefresh(!refresh)
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
  const fetchCitiesForStart = async (code) => {
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/shipping/cities?code=${code}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },
        }
      );
      if (responsee.status == 204) {
        return []
      }
      const response = await responsee.json();
      if (response.success) {
        return response.payload;

      }

    } catch (err) { console.log(err); }

  }

  const fetchCities = async (code, index) => {
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/shipping/cities?code=${code}&paginate=0`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,

            Accept: "application/json",
          },
        }
      );
      if (responsee.status == 204) {
        let temp = [...addresses]
        temp[index].cities = []
        setAddresses(...temp)
      }
      const response = await responsee.json();

      if (response.success) {
        let temp = [...addresses]
        temp[index].cities = response.payload
        setAddresses([...temp])

      }

    } catch (err) { console.log(err); }

  }

  const handleCountry = async (value, index) => {
    let temp = [...addresses]
    temp[index].country = value
    temp[index].city = null
    if (value != null) {
      fetchCities(value.Code, index)
      temp[index].country_code = value.Code
    }
    else {
      temp[index].cities = []
      temp[index].country_code = ''
    }

    setAddresses([...temp])

  }
  const handleCity = async (value, index) => {


    let temp = [...addresses]
    temp[index].city = value
    setAddresses([...temp])
  }
  const handleAddressData = async (e, index) => {

    let temp = [...addresses]
    temp[index][e.target.name] = e.target.value
    setAddresses([...temp])
  }

  const handleMoreAddress = async () => {

    let temp = [...addresses]
    temp.push({
      id: Math.floor(Math.random() * (10000 + 1)),
      line_1: '',
      line_2: '',
      line_3: '',
      city: null,
      state_code: '',
      post_code: '',
      country_code: null,
      country: null,
      type: '',
      main: '',
      new: true,
      cities: []
    })
    setAddresses([...temp])
  }
  const removeAddress = async (id) => {

    let temp = [...addresses].filter((item => item.id != id))

    setAddresses([...temp])
  }


  console.log('adresss', addresses.length, addresses)



  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>{i18n.language == 'ar' ? "تعديل مستخدم" : "Update User"}</strong>
              </CCol>
              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                </CButton>

              </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddUser(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                        <CCol md='12'> <strong>معلومات المستلم</strong></CCol>
                        <CCol md="12" lg="12" xl="12">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">الزبون</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                  <div dir="rtl">
                                    <Autocomplete
                                      id="country-select-demo"
                                      size="small"
                                      options={allCustomers}
                                      autoHighlight

                                      dir='rtl'
                                      rtl='true'
                                      value={customer}
                                      onChange={(event, newValue) => {
                                        setCustomer(newValue);
                                      }}
                                      getOptionLabel={(option) => option.name + ' ( id : ' + option.id + ' )'}
                                      renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                          اسم : {option.name} / ( ايميل :{option.email}) / ( هاتف : {option.customer.phone ? option.customer.phone : '-'}) / ( Id: {option.id})
                                        </Box>
                                      )}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          required
                                          label={i18n.language == 'ar' ? "اختر زبون" : "Select Country"}
                                          inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                          }}
                                        />
                                      )}
                                      required={true}
                                    />

                                  </div>
                                </ThemeProvider>
                              </CacheProvider>




                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">اسم المستلم بالعربية</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_ar"
                                required
                                onChange={handleData}
                                placeholder={`اسم المستلم بالعربية`}
                                value={upData.name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">اسم المستلم بالانكليزية</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={`اسم المستلم بالانكليزية`}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        {addresses.length > 0 && countries && allCustomers &&
                          <>
                            <CCol md='12'>
                              <strong>العناوين</strong>
                            </CCol>
                            {
                              addresses.length > 0 && countries && allCustomers && addresses.map((item, index) => {
                                return (<React.Fragment key={item.id}>
                                  <hr className='fullWidth' />

                                  <CCol md='12'>
                                    <CRow className=" row-gap-15">
                                      <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                                        <strong>{`عنوان ${index + 1} ${item.new == true ? "(جديد)" : ''}`}</strong>
                                      </CCol>

                                      <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                                        {index > 0 && item.new == true && <CButton color="danger" className='col-lg-3  col-md-3 col-sm-12 col-xs-12 updatebtn'
                                          onClick={() => removeAddress(item.id)} >  حذف عنوان
                                        </CButton>}

                                      </CCol>
                                    </CRow>



                                  </CCol>
                                  <CCol md="6" lg="6" xl="6">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">الدولة </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CacheProvider value={cacheRtl}>
                                          <ThemeProvider theme={theme}>
                                            <div dir="rtl">
                                              <Autocomplete
                                                id="country-select-demo"
                                                size="small"
                                                options={countries}
                                                required
                                                autoHighlight
                                                dir='rtl'
                                                rtl='true'
                                                value={item.country ? item.country : null}
                                                onChange={(event, newValue) => {
                                                  handleCountry(newValue, index);
                                                }}
                                                getOptionLabel={(option) => option.Name + "  " + option.Code}
                                                renderOption={(props, option) => (
                                                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                    <img
                                                      loading="lazy"
                                                      width="20"
                                                      src={`https://flagcdn.com/w20/${option.Code.toLowerCase()}.png`}
                                                      srcSet={`https://flagcdn.com/w40/${option.Code.toLowerCase()}.png 2x`}
                                                      alt=""
                                                    />
                                                    {option.Name} ({option.Code}) +{option.InternationalCallingNumber}
                                                  </Box>
                                                )}
                                                renderInput={(params) => (
                                                  <TextField
                                                    required
                                                    {...params}
                                                    label={i18n.language == 'ar' ? "اختر دولة" : "Select Country"}
                                                    inputProps={{
                                                      ...params.inputProps,
                                                      autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                  />
                                                )}
                                              />

                                            </div>
                                          </ThemeProvider>
                                        </CacheProvider>
                                      </CCol>
                                    </CFormGroup>

                                  </CCol>
                                  <CCol md="6" lg="6" xl="6">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">المدينة </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CacheProvider value={cacheRtl}>
                                          <ThemeProvider theme={theme}>
                                            <div dir="rtl">
                                              <Autocomplete
                                                id="country-select-demo"
                                                size="small"
                                                options={item.cities}
                                                autoHighlight
                                                dir='rtl'
                                                rtl='true'
                                                value={item.city}
                                                onChange={(event, newValue) => {
                                                  handleCity(newValue, index);
                                                }}
                                                getOptionLabel={(option) => option}

                                                renderInput={(params) => (
                                                  <TextField
                                                    required
                                                    {...params}
                                                    label={i18n.language == 'ar' ? "اختر مدينة" : "Select Country"}
                                                    inputProps={{
                                                      ...params.inputProps,
                                                      autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                  />
                                                )}
                                              />

                                            </div>
                                          </ThemeProvider>
                                        </CacheProvider>




                                      </CCol>
                                    </CFormGroup>

                                  </CCol>
                                  <CCol md="12" lg="12" xl="12">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">         السطر 1    </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="line_1"
                                          required
                                          autoComplete='off'
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`السطر 1`}
                                          value={item.line_1} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="12" lg="12" xl="12">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">   السطر 2</CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="line_2"
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`السطر 2`}
                                          value={item.line_2} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="12" lg="12" xl="12">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">      السطر 3    </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="line_3"
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`السطر 3`}
                                          value={item.line_3} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="3" lg="3" xl="3">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">  رمز الولاية   </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="state_code"
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`رمز الولاية`}
                                          value={item.state_code} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="3" lg="3" xl="3">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">الرمز البريدي  </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="post_code"

                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`الرمز البريدي`}
                                          value={item.post_code} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>

                                  <CCol md="3" lg="3" xl="3">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">
                                          حالة العنوان </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CSelect custom name="main" id="select"
                                          required value={item.main} onChange={(e) => handleAddressData(e, index)}>
                                          <option value='' >اختر</option>

                                          <option value='1'>رئيسي</option>
                                          <option value='0'> فرعي </option>


                                        </CSelect>
                                      </CCol>
                                    </CFormGroup>

                                  </CCol>

                                  <CCol md="3" lg="3" xl="3">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">
                                          النوع   </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CSelect custom name="type" id="select"
                                          required value={item.type} onChange={(e) => handleAddressData(e, index)}>
                                          <option value='' >اختر</option>

                                          <option value='home'>منزل</option>
                                          <option value='work'> عمل </option>
                                          <option value='other'> مكان آخر </option>


                                        </CSelect>
                                      </CCol>
                                    </CFormGroup>

                                  </CCol>

                                  <hr className='fullWidth' />
                                </React.Fragment>)
                              })
                            }

                          </>
                        }

                        <CCol md="12" lg="12" xl="12" className='row-gap-15 col-gap-15'>

                          <CButton color="primary" type='button' className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                            onClick={() => handleMoreAddress()} >  اضافة عنوان جديد
                          </CButton>

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
                          {<CButton color="success" block type='submit'>
                            حفظ
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

export default ReciepientUpdate 
