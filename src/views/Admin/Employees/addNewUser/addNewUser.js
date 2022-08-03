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

import '../../../../globalVar'
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
  const [pickedImg, setPickedImg] = useState('')
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);
  const[depts,setDepts]=useState([])
  const [upData, setUpData] = useState({
    // name_en: '',
    // name_ar: '',
    // criteriaDirection: '',
    // criteriaDigits: '',
    // countryId: '',
    // departmentAr: '',
    // departmentEn: '',
    userName: '',
    userUserName: '',
    email: '',
    extension_number: '',
    password: '',
    confirmPassword: '',
    userPosition: '',
    role: '',
    department_id:''
    // address:''


  })
  const { userName,
    userUserName,
    email,
    password,
    confirmPassword,
    userPosition,
    role,
    department_id,
    extension_number


  } = upData;

  useEffect(async () => {
    const fetchDepts = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/admin/departments?paginat=0`,
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
          setDepts(response.payload)
        }


        if (response.message && response.message == "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.clear()

          history.push("/login");
        }

      } catch (err) {
        console.log(err);

      }

      // setLoading(false)


    }

    fetchDepts()
  }, [refresh])



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

  // add row
  const [addRow, setaddrow] = useState([]);
  const handladdRow = (e) => {
    setaddrow([...addRow, 1]);
  };



  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}/admin/users`,
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
             name: userName,
            username: userUserName,
            email: email,
            position:userPosition ,
            password: password ,
            password_confirmation: confirmPassword ,
            role: role,
            department_id:department_id,
            extension_number:extension_number
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
        setSuccessAdd(i18n.language == 'ar' ? "تم اضافة موظف بنجاح" : "New Employee Added Successfuly")


        setUpData({
          userName: '',
          userUserName: '',
          email: '',
         password: '',
          confirmPassword: '',
          userPosition: '',
          role: '',
          department_id:'',
          extension_number:''
        })
      
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
                <strong>{i18n.language == 'ar' ? "إضافة موظف جديد" : "Add New Employee"}</strong>
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
              <CForm onSubmit={(e) => { handleAddUser(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                     

                        {/* className="justify-content-center" */}
                       
                        <CCol md='12'> <strong>{i18n.language == 'ar' ? `معلومات المستخدم :` : `User Informations :`}</strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `الاسم` : `Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="userName"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `الاسم` : `Name`}
                                value={upData.userName} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `اسم المستخدم` : `User Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="userUserName"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `اسم المستخدم` : `User Name`}
                                value={upData.userUserName} />
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
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? `موقع الموظف` : `User Position`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="userPosition"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `موقع الموظف` : `User Position`}
                                value={upData.userPosition} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `كلمة السر` : `Password`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="password"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `كلمة السر` : `Password`}
                                value={upData.password} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? `تأكيد كلمة السر` : `Confirm Password`}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="confirmPassword"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `تأكيد كلمة السر` : `Confirm Password`}
                                value={upData.confirmPassword} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? `منصب الموظف` : `User Role`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="role" id="select"
                                required  value={upData.role} onChange={(e) => handleData(e)}>
                                <option value='' >{i18n.language == 'ar' ? `اختر` : `Select Role`}</option>
                                <option value='admin'>{i18n.language == 'ar' ? `مدير` : `Admin`}</option>
                                <option value='supervisor'>{i18n.language == 'ar' ? `مشرف` : `Supervisor`}</option>
                                <option value='agent'>{i18n.language == 'ar' ? `وكيل` : `Agent`}</option>
                                <option value='technician'>{i18n.language == 'ar' ? `فني` : `Technician`}</option>
                            
                            
                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6" xl="6">

<CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">
      {i18n.language == 'ar' ? " القسم" : "Department"}
    </CLabel>
  </CCol>
  <CCol xs="12" md="12">
    <CSelect custom name="department_id"
      required value={upData.department_id} onChange={(e) => handleData(e)}>
     
     
        <option value='' >
        {i18n.language == 'ar' ? "اختر قسم" : "Select Department"}
      </option>
  
    
      {depts.length > 0 && depts.map((dept) => {
        return (<option value={dept.id} key={dept.id}>
          {i18n.language == 'ar' ? dept.name_ar : dept.name_en}
        </option>)
      })}

    </CSelect>
  </CCol>
</CFormGroup>

</CCol>
<CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `الرقم الداخلي` : `Extension Number`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="extension_number"
                                required
                                value={upData.extension_number} onChange={(e) => handleData(e)}
                                placeholder={i18n.language == 'ar' ? `الرقم الداخلي` : `Extension Number`}
                                />
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

export default AddNewUser
