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
import './addNewCompany.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewCompany = () => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)


  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);

  const [upData, setUpData] = useState({
    name_en: '',
    name_ar: '',


  })
  const { name_en,
    name_ar,


  } = upData;




  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }



  const handleAddCompany = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    const data = new FormData();
    name_en && data.append("name_en", name_en);

    name_ar && data.append("name_ar", name_ar);

    pickedImg && data.append('logo', pickedImg);


    try {
      const responsee = await fetch(
        `${global.apiUrl}api/companies`,
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
        setSuccessAdd("Company added successfully.")


        setUpData({
          name_en: '',
          name_ar: '',

        })

        setPickedImg('')

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
                <strong>Add New Company</strong>
              </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddCompany(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                        <CCol md='12'> <strong>
                          {"Company Information:"}
                        </strong></CCol>

                        {/* className="justify-content-center" */}
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {"English Name"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={"English Name"}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>

                        </CCol>

                        <CCol md="6" lg="6">
                          <CFormGroup row className='arabic-align'>
                            <CCol md="12">
                              <CLabel htmlFor="text-input"></CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="name_ar" required
                                onChange={handleData}

                                placeholder="Arabic Name" value={upData.name_ar} />


                            </CCol>
                          </CFormGroup>

                        </CCol>





                        <CCol md='6'  ><CCol md='12'  >
                          <CFormGroup row >
                            <CLabel col md={12}>{i18n.language == 'ar' ? `الشعار` : `Logo`}</CLabel>
                            <CCol xs="12" md="12">

                              <CInputFile required accept="image/*" custom id="custom-file-input" onChange={(e) => { handleImg(e) }} />

                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {pickedImg ? pickedImg.name : i18n.language == 'ar' ? `اختر صورة ...` : `Choose image ...`}

                              </CLabel>
                            </CCol>
                          </CFormGroup>
                        </CCol>  </CCol>
                        <CCol md='6'>
                          {pickedImg ? <img className="imgLogo" src={URL.createObjectURL(pickedImg)}></img> :
                            null}
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

export default AddNewCompany
