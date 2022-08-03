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
import TimePicker from 'react-time-picker'
// import "react-time-picker-input/dist/components/TimeInput.css"


import './ShippingSettingsUpdate.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const ShippingSettingsUpdate = () => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState('')
  const [succesAdd, setSuccessAdd] = useState()

  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')


  const [upData, setUpData] = useState({
    aramex_email: "",
    cell_phone: "",
    city: "",
    company_name: "",
    country_code: "",
    dhl_email: "",
    fedex_email: "",
    name: "",
    phone: "",
    maximum_weight: "",
    pickup_time: "",
    postal_code: null,
    state_or_province_code: null,
    street_line_1: "",
    street_line_2: '',
    street_line_3: ''



  })
  const { aramex_email,
    cell_phone,
    city,
    company_name,
    country_code,
    dhl_email,
    fedex_email,
    name,
    phone,
    postal_code,
    state_or_province_code,
    street_line_1,
    street_line_2,
    street_line_3,
    maximum_weight,
    pickup_time,
  } = upData;
  useEffect(async () => {
    const getSetting = async () => {

      try {
        const responsee = await fetch(
          `${global.apiUrl}api/settings/settings`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },
          }
        );
        const response = await responsee.json();
        if (response.success == true) {
          setUpData(response.payload)
        }
      } catch (err) {
        console.log(err);

      }
    }
    getSetting()
  }, [refresh])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }



  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/settings/updateSettings`,
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
            aramex_email,
            cell_phone,
            company_name,
            dhl_email,
            fedex_email,
            name,
            phone,
            postal_code,
            state_or_province_code,
            street_line_1,
            street_line_2,
            street_line_3,
            maximum_weight,
            pickup_time,

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
        setSuccessAdd("Settings have been modified successfully.")

        setRefresh(!refresh)


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

  const handletime = (val) => {
    setUpData({ ...upData, pickup_time: val ? `${val}:00` : '00:00:00' })
  }



  console.log('data', upData)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>Update Settings</strong>
              </CCol>
              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >{`Back`}
                </CButton>

              </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleUpdate(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >


                        <CCol md='12'> <strong>Company Information</strong></CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name"

                                onChange={handleData}
                                placeholder={`Name`}
                                value={upData.name} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`Company Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="company_name"

                                onChange={handleData}
                                placeholder={`Company Name`}
                                value={upData.company_name} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Phone</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="phone"

                                onChange={handleData}
                                placeholder={`Phone`}
                                value={upData.phone} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Mobile</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="cell_phone"

                                onChange={handleData}
                                placeholder={`Mobile`}
                                value={upData.cell_phone} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Max Shipment Weight (KG)</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="maximum_weight"
                                type='float'
                                min='0'
                                onChange={handleData}
                                placeholder={`Max Shipment Weight`}
                                value={upData.maximum_weight} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Pickup Time for Dhl</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <TimePicker
                                onChange={handletime}
                                disableClock
                                style={{ direction: 'ltr' }}
                                // maxTime="23:59:59"
                                format="hh:mm a"
                                name="pickup_time" value={upData.pickup_time} />
                              {/* <CInput name="pickup_time"
                                type='time'
                                onChange={handleData}
                                step="3600000"
                                placeholder={`وقت تسليم الشحنات ل DHL`}
                                value={upData.pickup_time} /> */}
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <hr style={{ width: '100%' }} />
                        <CCol md='12'> <strong>Shipping Accounts</strong></CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">DHL</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="dhl_email"
                                type='email'
                                onChange={handleData}
                                placeholder={`DHL`}
                                value={upData.dhl_email} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">FEDEX</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="fedex_email"
                                type='email'
                                onChange={handleData}
                                placeholder={`FEDEX`}
                                value={upData.fedex_email} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">ARAMEX</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="aramex_email"
                                type='email'
                                onChange={handleData}
                                placeholder={`ARAMEX`}
                                value={upData.aramex_email} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        <hr style={{ width: '100%' }} />
                        <CCol md='12'> <strong>Address</strong></CCol>
                        <CCol md="6" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">  Country Code</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_code"
                                disabled
                                onChange={handleData}
                                placeholder={`Country Code`}
                                value={upData.country_code} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">City</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="city"
                                disabled
                                onChange={handleData}
                                placeholder={`City`}
                                value={upData.city} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Postal Code</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput name="postal_code"

                                onChange={handleData}
                                placeholder={`Postal Code`}
                                value={upData.postal_code} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">State Code</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput name="state_or_province_code"

                                onChange={handleData}
                                placeholder={`State Code`}
                                value={upData.state_or_province_code} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input"> Line 1</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput name="street_line_1"

                                onChange={handleData}
                                placeholder={`Line 1`}
                                value={upData.street_line_1} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input"> Line 2</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput name="street_line_2"

                                onChange={handleData}
                                placeholder={`Line 2`}
                                value={upData.street_line_2} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">  Line 3</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput name="street_line_3"

                                onChange={handleData}
                                placeholder={`Line 3`}
                                value={upData.street_line_3} />
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
                            Save
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

export default ShippingSettingsUpdate
