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

import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './AddNewCity.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewCity = () => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')


  const [upData, setUpData] = useState({
    name_en: '',
    name_ar: '',

    code: ""


  })
  const { name_en,
    name_ar,
    code

  } = upData;
  useEffect(async () => {

    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(`${global.apiUrl}api/countries`,
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
          setCountries(response.payload)

        }

      } catch (err) { console.log(err); }

    }

    fetchCountries()


  }, [])

  const handleCountry = async (value) => {
    setCountry(value)
  }


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
        `${global.apiUrl}api/cities/addNewCity`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': 'https://localhost:3000',
            // 'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: JSON.stringify({
            name_ar: name_ar,
            name_en: name_en,
            country_id: country.id,
            code: code

          })
          ,

        }
      );
      const response = await responsee.json();
      console.log('response', response);
      console.log(response);
      setVisible(10)
      if (response.success) {
        await setVisible(6)
        setSuccessAdd("City has been added successfully")


        setUpData({
          name_ar: '',
          name_en: '',

          code: ""
        })

      }
      else {

        setVisible(10)
        setErrorMessage(response.errors)


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
                <strong>  Add New City</strong>
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
              <CForm onSubmit={(e) => { handleAddCity(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >


                        {/* className="justify-content-center" */}

                        <CCol md='12'> <strong>  City Information:</strong></CCol>


                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`English Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={`English Name`}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`Arabic Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_ar"

                                onChange={handleData}
                                placeholder={`Arabic Name`}
                                value={upData.name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`Country`}</CLabel>
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
                                      value={country}
                                      onChange={(event, newValue) => {
                                        handleCountry(newValue);
                                      }}
                                      autoComplete='off'
                                      getOptionLabel={(option) => option.country_name_en + "  " + option.country_code}
                                      renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                          <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
                                            alt=""
                                          />
                                          {option.country_name_en} ({option.country_code})
                                        </Box>
                                      )}
                                      renderInput={(params) => (
                                        <TextField
                                          required
                                          {...params}
                                          label={"Choose Country"}
                                          inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off', // disable autocomplete and autofill
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
                              <CLabel htmlFor="text-input">{`City Code`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="code"

                                onChange={handleData}
                                placeholder={`City Code`}
                                value={upData.code} />
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
                            {Object.keys(errorMessage).map((item, i) => (

                              <>{errorMessage[item]}<br /></>



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

export default AddNewCity
