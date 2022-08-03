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
import './addNewUser.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewUser = () => {
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
  const [pickedImgFront, setPickedImgFront] = useState('')
  const [pickedImgBack, setPickedImgBack] = useState('')
  const [categories, setCategories] = useState([])
  const [upData, setUpData] = useState({

    userName: '',
    phone: '',
    email: '',
    active: '',
    password: '',
    confirmPassword: '',
    userPosition: '',
    role: '',
    profit_percentage: 10,
    fixed_profit_value: 0,
    category_id: ''
  })
  const { userName,
    email,
    password,
    confirmPassword,
    userPosition,
    role,
    active,
    phone, profit_percentage,
    fixed_profit_value,
    category_id
  } = upData;

  useEffect(async () => {
    const fetchitems = async (e) => {



      try {
        const responsee = await fetch(
          `${global.apiUrl}api/categories??paginate=0`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },
          }
        );
        const response = await responsee.json();

        console.log('faqs', response);
        if (response.success) {
          setCategories(response.payload)

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

    fetchitems()
  }, [])

  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
  const [phones, setPhones] = useState([""])

  const handlePhones = (i) => (e) => {
    setPhones(
      ...[phones, (phones[i] = e.target.value)]
    );
    console.log('phones', phones)

  };




  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')
    var data = new FormData()
    data.append('name', userName)
    data.append('category_id', category_id)
    data.append('active', active)
    data.append('email', email)
    data.append('password', password)
    data.append('password_confirmation', confirmPassword)
    data.append('admin', role)
    data.append('customer[phone]', phone)
    pickedImgFront && data.append('IDPhoto_face', pickedImgFront)
    pickedImgBack && data.append('IDPhoto_back', pickedImgBack)
    data.append('fixed_profit_value', fixed_profit_value)
    data.append('profit_percentage', profit_percentage)
    // data.append('key', key)


    try {
      const responsee = await fetch(
        `${global.apiUrl}api/users`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
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
        if (response.payload.admin == 0) { setSuccessAdd("User added successfully") }
        if (response.payload.admin == 1) { setSuccessAdd("Admin added successfully") }
        setPickedImgFront('')
        setPickedImgBack('')

        setUpData({
          userName: '',
          phone: '',
          email: '',
          active: '',
          password: '',
          confirmPassword: '',
          userPosition: '',
          role: '',
          profit_percentage: 10,
          fixed_profit_value: 0,
          category_id: ''
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




  const handleImgFront = (e) => {
    if (e.target.files[0]) { setPickedImgFront(e.target.files[0]) }
  }
  const handleImgBack = (e) => {
    if (e.target.files[0]) { setPickedImgBack(e.target.files[0]) }
  }
  console.log('data', upData)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>Add New User</strong>
              </CCol>

              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >  Back
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

                        <CCol md='12'> <strong>User Information</strong></CCol>
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
                              <CLabel htmlFor="text-input">Phone   </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="phone"
                                required
                                onChange={handleData}
                                placeholder={`Phone`}
                                value={upData.phone} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input"> Email  </CLabel>
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
                              <CLabel htmlFor="text-input"> Profit Percentage   ( Default 10%)</CLabel>
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
                              <CLabel htmlFor="text-input">   Fixed Profit Value (Default 0)</CLabel>
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
                              <CLabel htmlFor="text-input">{`Password`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="password"
                                required
                                onChange={handleData}
                                placeholder={`Password`}
                                value={upData.password} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                Confirm Password
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="confirmPassword"
                                required
                                onChange={handleData}
                                placeholder={`Confirm Password`}
                                value={upData.confirmPassword} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="4" lg="4" xl="4">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                Category</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="category_id" id="select"
                                required value={upData.category_id} onChange={(e) => handleData(e)}>
                                <option value='' >Select Category</option>

                                {categories.length > 0 && categories.map((cat) => {
                                  return (<option value={cat.id} key={cat.id}>
                                    {cat.name_en}
                                  </option>)
                                })}


                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="4" lg="4" xl="4">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                Account Type </CLabel>
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

                        <CCol md="4" lg="4" xl="4">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                Account Status </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="active" id="select"
                                required value={upData.active} onChange={(e) => handleData(e)}>
                                <option value='' >Select</option>

                                <option value='1'>Active</option>
                                <option value='0'> Not Active  </option>


                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md='6'  ><CCol md='12'  >
                          <CFormGroup row >
                            <CLabel col md={12}> ID photo (front side)</CLabel>
                            <CCol xs="12" md="12">
                              {/* accept="image/*" */}
                              <CInputFile required custom id="custom-file-input" accept="image/*"
                                onChange={(e) => { handleImgFront(e) }} />

                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {pickedImgFront ? pickedImgFront.name : `Choose a file ...`}

                              </CLabel>
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        </CCol>
                        <CCol md='6'  ><CCol md='12'  >
                          <CFormGroup row >
                            <CLabel col md={12}>ID photo (back side)</CLabel>
                            <CCol xs="12" md="12">
                              {/* accept="image/*" */}
                              <CInputFile required custom id="custom-file-input" accept="image/*"
                                onChange={(e) => { handleImgBack(e) }} />

                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {pickedImgBack ? pickedImgBack.name : `Choose a file ...`}

                              </CLabel>
                            </CCol>
                          </CFormGroup>
                        </CCol>
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

        </CCard>







      </CContainer>
    </div>
  )
}

export default AddNewUser
