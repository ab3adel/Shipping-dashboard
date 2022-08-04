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
import './userUpdate.scss'
import CustomerUpdate from './CustomerUpdate'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const UserUpdate = ({ match }) => {
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


  const [upData, setUpData] = useState({
    userName: '',
    email: '',
    role: '',
    customer: '',
    profit_percentage: "",
    fixed_profit_value: ''
  })
  const { userName, email, role, profit_percentage,
    fixed_profit_value } = upData;

  useEffect(async () => {
    const getUser = async (id) => {

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
        if (responsee.status == 204) {

        }
        const response = await responsee.json();
        console.log('response', response);
        console.log(response);
        if (response.success == true) {
          setUpData({
            ...response.payload.filter(item => item.id == id)[0],
            userName: response.payload.filter(item => item.id == id)[0].name,
            email: response.payload.filter(item => item.id == id)[0].email,
            role: response.payload.filter(item => item.id == id)[0].admin,
            profit_percentage: response.payload.filter(item => item.id == id)[0].profit_percentage,
            fixed_profit_value: response.payload.filter(item => item.id == id)[0].fixed_profit_value,
            customer: response.payload.filter(item => item.id == id)[0].customer
          })

        }
      } catch (err) {
        console.log(err);

      }
    }
    getUser(match.params.id)
  }, [refresh])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/users/${match.params.id}`,
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
            _method: 'put',
            name: userName,
            email: email,
            admin: role,
            profit_percentage: profit_percentage,
            fixed_profit_value: fixed_profit_value,
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
        setSuccessAdd("User updated successfully")

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





  const handleImg = (e) => {
    if (e.target.files[0]) { setPickedImg(e.target.files[0]) }
  }
  console.log('data', upData)
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


                        {/* className="justify-content-center" */}

                        <CCol md='12'> <strong>   Account Information </strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="userName"
                                required
                                onChange={handleData}
                                placeholder={`Name`}
                                value={upData.userName} />
                            </CCol>
                          </CFormGroup>
                        </CCol>


                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`Email`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="email"

                                type='email'
                                onChange={handleData}
                                placeholder={`Email`}
                                value={upData.email} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="3" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">   {`Profit Percentage`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="profit_percentage"
                                required
                                type='number' min='0' max='100'
                                onChange={handleData}
                                placeholder={`Profit Percentage`}
                                value={upData.profit_percentage} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="3" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`Fixed Profit Value`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="fixed_profit_value"
                                required
                                type='number' min='0'
                                onChange={handleData}
                                placeholder={`Fixed Profit Value`}
                                value={upData.fixed_profit_value} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                Account Type  </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="role" id="select"
                                required value={upData.role} onChange={(e) => handleData(e)}>
                                <option value='' >Select</option>

                                <option value='1'>Admin</option>
                                <option value='0'>Normal User</option>


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

          {upData.admin == 0 && <CustomerUpdate customer={upData.customer} setRefresh={setRefresh}
            refresh={refresh} />}

        </CCard>







      </CContainer>
    </div>
  )
}

export default UserUpdate
