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
import { CAlert } from '@coreui/react'
import '../../../globalVar'
import './cities.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useTranslation } from 'react-i18next';
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const Cities = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();
  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)


  const [countries, setCountries] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [cities, setCities] = useState([])
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  const [visible, setVisible] = useState(10)
  const [country, setCountry] = useState(null)

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
    if (value != null) {
      fetchCities(value.id)
    }
    else {
      setCities([])
    }

  }

  const fetchCities = async (id) => {
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/cities/getCityByCountryId?country_id=${id}`,
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
      if (response.success) {

        let temp = []

        await response.payload.map((item, index) => {

          temp.push({
            ...item,
            'الرمز': item.code ? item.code : "-",
            'الاسم العربي': item.name_ar ? item.name_ar : "-",
            'الاسم الانكليزي': item.name_en,

          })

        })
        setCities(temp)


      }

    } catch (err) { console.log(err); }

  }





  const [itemToDelete, setItemToDelete] = useState('')
  const handleShowModal = (item) => {
    setSmall(!large)
    setItemToDelete(item)
  }
  const handleDelete = async () => {
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity = 0.75;

    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/cities/${itemToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userToken,

            Accept: "application/json",
          },


        }
      );
      const response = await responsee.json();
      console.log('response', response);
      console.log(response);
      if (response.success == true && response.payload) {
        setSmall(!small)
        document.getElementById('root').style.opacity = 1;

        setRefresh(!refresh)

      }
      // else{
      // setErrorMessage(response.errors)
      // }

    } catch (err) {
      console.log(err);

    }
    document.getElementById('root').style.opacity = 1;

  }

  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow className=" row-gap-15">
                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  {i18n.language == 'ar' ? "المدن" : "Cities"}
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>



                </CCol>

              </CRow>

            </CCardHeader>
            <CCardBody className='usersTabel'>
              <CRow >
                <CCol md="6" lg="6" xl="6">

                  <CFormGroup row>
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
                                  label={"اختر دولة"}
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

              </CRow>
              {cities.length > 0 ?


                <CDataTable
                  items={cities}
                  fields={['id', 'الاسم الانكليزي', "الاسم العربي", "الرمز", "عمليات"]}
                  hover
                  striped
                  pagination

                  sorter
                  itemsPerPage={20}
                  columnFilter
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                // scopedSlots={{
                //   'actions':
                //     (item) => (
                //       <td>
                //         <CBadge className="p-1 m-1 badg-click" color="danger"
                //           onClick={() => handleShowModal(item)}
                //         >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>
                //         <br />
                //         <CBadge className="p-1  m-1 badg-click" color="info"
                //           onClick={() => history.push(`/Country/${country}/CityUpdate/${item.id}`)}  >
                //           {i18n.language == 'ar' ? "تعديل ....." : "Update...."}</CBadge>

                //       </td>
                //     ),

                // }}
                />

                :
                null
              }
              {!country && <CRow>
                <CCol md='12'>
                  <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                    color="warning"
                  // closeButton
                  // show={visible}
                  // closeButton
                  // onShowChange={setVisible}
                  >
                    {i18n.language == 'ar' ? "اختر دولة لعرض المدن الخاصة بها" : "Select a country to view its cities"}
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
          <CModalTitle>{i18n.language == 'ar' ? "حذف مدينة" : "Delete City"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {i18n.language == 'ar' ? `هل انت متأكد أنك تريد حذف مدينة (${itemToDelete.name_ar})`
            : `Are you sure you want to delete a City (${itemToDelete.name_en})`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>{i18n.language == 'ar' ? "حذف" : "Delete"}</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>{i18n.language == 'ar' ? "الغاء" : "Cancel"}</CButton>
        </CModalFooter>
      </CModal>

    </CRow>
  )
}

export default Cities
