import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
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
  CInputRadio,
  CFormGroup,
  CLabel,
  CSelect,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCardFooter
} from '@coreui/react'
import { CAlert } from '@coreui/react'
import '../../globalVar'
import Address from '../Address/Address'
import './ShippingOffers.scss'

import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const queryString = require('query-string');

const ShippingOffers = ({ location }) => {
  const parsed = queryString.parse(location.search);
  const history = useHistory()
  const [t, i18n] = useTranslation();
  const [pages, setPages] = useState(1)
  const [data, setData] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [allCustomers, setAllCustomers] = useState([])
  const [filters, setFilters] = useState({
    accepted: parsed && parsed.accepted ? parsed.accepted : '',
    active: parsed && parsed.active ? parsed.active : '',
    paid: parsed && parsed.paid ? parsed.paid : '',
    company_id: parsed && parsed.company_id ? parsed.company_id : '',
    shipment_id: parsed && parsed.payer ? parsed.payer : '',
    payer: parsed && parsed.payer ? parsed.payer : '',
    payment_method: parsed && parsed.payment_method ? parsed.payment_method : '',
    user_id: parsed && parsed.user_id ? parsed.user_id : '',
    page: parsed && parsed.page ? parseInt(parsed.page) : 1,
    pagination: parsed && parsed.pagination ? parseInt(parsed.pagination) : 15,
    from_date: parsed && parsed.from_date ? parsed.from_date : '',
    to_date: parsed && parsed.to_date ? parsed.to_date : '',
  })
  const [visible, setVisible] = useState(10)
  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [errorMessage, setErrorMessage] = useState();


  useEffect(async () => {
    const fetchOffers = async (e) => {

      setErrorMessage('')
      setRefresh(true)
      history.push(`/ShippingOffers?page=${filters.page}${filters.to_date ? `&to_date=${filters.to_date}` : ""}${filters.from_date ? `&from_date=${filters.from_date}` : ""}${filters.pagination ? `&pagination=${filters.pagination}` : ""}${filters.user_id ? `&user_id=${filters.user_id}` : ""}&company_id=${filters.company_id}&shipment_id=${filters.shipment_id}&paid=${filters.paid}&accepted=${filters.accepted}&active=${filters.active}${filters.payer ? `&payer=${filters.payer}` : ``}&payment_method=${filters.payment_method}`)
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/offers?page=${filters.page}${filters.to_date ? `&to_date=${filters.to_date}` : ""}${filters.from_date ? `&from_date=${filters.from_date}` : ""}${filters.pagination ? `&pagination=${filters.pagination}` : ""}${filters.user_id ? `&user_id=${filters.user_id}` : ""}&company_id=${filters.company_id}&shipment_id=${filters.shipment_id}&paid=${filters.paid}&accepted=${filters.accepted}&active=${filters.active}${filters.payer ? `&payer=${filters.payer}` : ``}&payment_method=${filters.payment_method}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },

          }
        );
        if (responsee.status == 204) {
          setData([])
          setRefresh(false)
        }

        const response = await responsee.json();
        // console.log('response',response);
        console.log('faqs', response);
        if (response.success) {
          if (response.payload && response.payload.data) {
            setRefresh(false)
            let temp = []
            setPages(response.payload.last_page)
            await response.payload.data.map((item, index) => {

              temp.push({


                ...item,
                _classes: item.paid == 1 ? "greenBak" : "redBack",
                "Shipment Number": item.shipment_id ? item.shipment_id : "-",
                "Pay": item.paid == 1 ? "Paid" : "Not Paid",
                "Accept": item.accepted == 1 ? "Accepted" : "Not Accepted",
                "Status": item.active ? "Active" : "inactive",
                "Weight": item.weight,
                "Company": item.company.name_en,
                "Offer Expiration Time": item.offer_expiration_date,
                "Customer Name": item.customer.user.name,
                "Sender Address": `${item.shipper.city.country.country_name_en} / ${item.shipper.city.name_en}`,
                "Recipient Address": `${item.recipient.city.country.country_name_en} / ${item.recipient.city.name_en}`,
                "Recipient Name": `${item.recipient.recipient.name_en ? item.recipient.recipient.name_en : '-'}`,



              })

            })
            setData(temp)
          }

          else {
            setRefresh(false)
            setData([])
          }

        }
        if (response.messages) {
          setRefresh(false)
          setData([])
          setVisible(10)
          setErrorMessage(response.messages)
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

    fetchOffers()
  }, [filters])

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
          setAllCustomers(response.payload.filter(item => item.admin == 0))
          if (filters.user_id)
            setCustomer(response.payload.filter(item => item.customer && item.id == filters.user_id)[0])

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

    fetchUsers()

  }, [])
  const handleCustomerChange = (val) => {
    setCustomer(val)
    if (val) {

      setFilters({ ...filters, user_id: val.id })
    } else {
      setFilters({ ...filters, user_id: "" })
    }
  }





  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })

  }




  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>

              {/* <CRow className=" row-gap-15">

                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  <strong>العروض</strong>
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>



                </CCol>
                <hr className='col-md-12' />




              </CRow> */}
              <CRow className=" ">
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input"> Company</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="company_id" value={filters.company_id}
                        onChange={(e) => handleFilter(e)}>
                        <option value='' >All</option>
                        <option value='1'>FedEx</option>
                        <option value='2'>Aramex</option>
                        <option value='3'>	DHL</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">Accepted</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="accepted" id="select" value={filters.accepted}
                        onChange={(e) => handleFilter(e)}>
                        <option value='' >All</option>
                        <option value='1'>Accepted</option>
                        <option value='0'>Not Accepted</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input"> Status</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="active" value={filters.active}
                        onChange={(e) => handleFilter(e)}>
                        <option value='' >All</option>
                        <option value='1'>Active</option>
                        <option value='0'> Inactive  </option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input"> Paid</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="paid" value={filters.paid}
                        onChange={(e) => handleFilter(e)}>
                        <option value='' >All</option>
                        <option value='1'>Paid</option>
                        <option value='0'>Not Paid</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input"> Payer</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="payer" value={filters.payer}
                        onChange={(e) => handleFilter(e)}>
                        <option value='' >All</option>
                        <option value='sender'>Sender</option>
                        <option value='recipient'>Recipient</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">PAyment Method</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="payment_method" value={filters.payment_method}
                        onChange={(e) => handleFilter(e)}>
                        <option value='' >All</option>
                        <option value='cash'>Cash</option>
                        <option value='online'>Online</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">Shipment Number</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CInput name="shipment_id"

                        onChange={(e) => handleFilter(e)}
                        placeholder={`Shipment Number`}
                        value={filters.shipment_id} />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="4" lg="3" xl="3" >
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">     Items Per Page      </CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CInput name="pagination"
                        type='number'
                        min={1}
                        onChange={(e) => handleFilter(e)}
                        placeholder={`Items Number`}
                        value={filters.pagination} />

                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md='12'><strong>Fillter By Date{" : "}</strong></CCol>

                <CCol md="4" lg="4">
                  <CFormGroup row className=''>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">
                        From Date</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CInput
                        onChange={(e) => handleFilter(e)}
                        type='date'
                        name='from_date'

                        value={filters.from_date != null ? filters.from_date : ''}
                      />
                    </CCol>
                  </CFormGroup>

                </CCol>
                <CCol md="4" lg="4">
                  <CFormGroup row className=''>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">
                        To date</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CInput
                        onChange={(e) => handleFilter(e)}
                        type='date'
                        name='to_date'

                        value={filters.to_date != null ? filters.to_date : ''}
                      />


                    </CCol>
                  </CFormGroup>

                </CCol>


                <CCol md="12" lg="12" xl="12">

                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">Filter By Customer{" : "} </CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      {/* <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}> */}
                      <div  >
                        <Autocomplete
                          id="country-select-demo"
                          size="small"
                          options={allCustomers}
                          autoHighlight
                          autoComplete='off'
                          dir='rtl'
                          rtl='true'
                          value={customer}
                          onChange={(event, newValue) => {
                            handleCustomerChange(newValue)
                          }}
                          getOptionLabel={(option) => option.name + ` ( Phone : ${option.customer.phone ? option.customer.phone : '-'})`}
                          // + ' ( id : ' + option.id + ' )'
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                              Name : {option.name} / ( Email :{option.email}) / ( Phone : {option.customer.phone ? option.customer.phone : '-'})
                            </Box>
                          )}
                          // / ( Id: {option.customer.id})
                          renderInput={(params) => (
                            <TextField
                              {...params}

                              label={i18n.language == 'ar' ? "اختر زبون" : "Select Customer"}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                            />
                          )}

                        />

                      </div>
                      {/* </ThemeProvider>
                      </CacheProvider> */}




                    </CCol>
                  </CFormGroup>

                </CCol>
                {errorMessage &&
                  <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                    color="danger"
                    // closeButton
                    show={visible}
                    // closeButton
                    onShowChange={setVisible}
                  >

                    {errorMessage.map((item, i) => (

                      <>{item}<br /></>



                    ))}
                  </CAlert>}
              </CRow>
            </CCardHeader>
            <CCardBody className='usersTabel offerTable'>
              {data && <CDataTable
                items={data}
                fields={['id', "Shipment Number", "Accept", "Company", "Customer Name", "Sender Address", "Recipient Name", "Recipient Address", "Weight", "Status", "Offer Expiration Time", "Pay",]}
                hover
                striped
                // pagination
                size="sm"
                sorter
                loading={refresh}
                // itemsPerPage={20}
                columnFilter
                clickableRows
                onRowClick={(item) => history.push(`/ShippingOffers/ShippingOffer/${item.id}`)}

              />}
              <CPagination
                align="center"
                addListClass="some-class"
                activePage={filters.page}
                pages={pages}
                onActivePageChange={(e) => {
                  setFilters({ ...filters, page: e })


                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      }


    </CRow>
  )
}

export default ShippingOffers
