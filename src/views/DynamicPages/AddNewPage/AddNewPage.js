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
  CFormGroup,
  CLabel,

  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddNewPage.scss'
import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";

import '../../../globalVar'
import Editor from './editor'
const AddNewPage = (props) => {
  let history = useHistory();

  const [visible, setVisible] = useState(10)
  // const [value, setValue] = useState()
  const [fetchedData, setfetchedData] = useState('')
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const userId = localStorage.getItem("user_id");
  const user_id = JSON.parse(userId);
  const [pageStatus, setPageStatus] = useState(0)
  const [upData, setUpData] = useState({
    title_ar: '',
    title_en: '',



  })
  const { title_ar,
    title_en,

  } = upData;

  const [dataText, setDataText] = useState(' ')
  const [dataTextArabic, setDataTextArabic] = useState(' ')
  // useEffect(async()=>{
  //   const fetchSettings=async(e)=>{



  //   try {
  //     const responsee = await fetch(
  //       `${global.apiUrl}/settings/viewWebsiteSettings`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + userToken,
  //                      // "Content-Type": "application/json",
  //                     //'Access-Control-Allow-Origin': 'https://localhost:3000',
  //                     // 'Access-Control-Allow-Credentials': 'true',
  //           Accept: "application/json",
  //         },


  //       }
  //     );
  //     const response = await responsee.json();
  //     // console.log('response',response);
  //     console.log(response);
  //   if(response.message== "Website settings retrieved successfully!"){
  //    setfetchedData(response.payload)
  //    setDataText(response.payload.terms_and_conditions_ar)
  //   }
  //     if(response.message&&response.message=="Unauthorized or invalid token!"){
  //     localStorage.removeItem("token");
  //     localStorage.clear()

  //   history.push("/login");
  //     }

  //   } catch (err) {
  //     console.log(err);

  //   }

  //   // setLoading(false)


  //   }

  //   fetchSettings()
  // },[refresh])


  const [reload, setReload] = useState(true)
  const reloader = async () => {

    await setDataText(' ')
    await setDataTextArabic(' ')
    await setReload(!reload)
  }
  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }

  const addNewPage = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    if (dataText == 'ُEnter English Content . . .' || dataTextArabic == 'أدخل المحتوى العربي ...') {


      setVisible(5)
      setErrorMessage({ "content_en": ["أدخل محتوى عربي  ومحتوى انكليزي"], })
      setLoading(false)
      return
    }
    const data = new FormData();
    title_ar && data.append('title_ar', title_ar);
    title_en && data.append('title_en', title_en);
    dataTextArabic && data.append('content_ar', dataTextArabic);
    dataText && data.append('content_en', dataText);

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/pages`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            // "Content-Type": "application/json",
            //'Access-Control-Allow-Origin': 'https://localhost:3000',
            // 'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: data,

        }
      );
      const response = await responsee.json();

      if (response.success) {

        setSuccessAdd("New page has been added successfully")
        // setRefresh(!refresh)
        setVisible(5)
        setUpData({ title_ar: '', title_en: '', })


        reloader()
      }
      else {

        setVisible(5)
        setErrorMessage(response.messages)
      }

    } catch (err) {
      console.log(err);

    }

    setLoading(false)


  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>

        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>Add New Page</strong>
              </CCol>

              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >  Back
                </CButton>

              </CCol>
            </CRow>
          </CCardHeader>
          <CForm onSubmit={(e) => { addNewPage(e) }}>
            <CCardBody className="p-4">
              <CRow>
                <CCol md="6" lg="6" xl="6">
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">English Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">

                      <CInput name="title_en"
                        required
                        onChange={handleData}
                        placeholder="English Name"
                        value={upData.title_en} />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol md="6" lg="6" xl="6">
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">Arabic Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">

                      <CInput name="title_ar"
                        required
                        onChange={handleData}
                        placeholder="Arabic Name"
                        value={upData.title_ar} />
                    </CCol>
                  </CFormGroup>
                </CCol>


              </CRow>
              <hr />
              <CRow className="justify-content-center" style={{ direction: 'ltr' }}>
                <CCol md="12" lg="12" xl="12">

                  <h5>English Cntent</h5>
                </CCol>

                <CCol md="12" lg="12" xl="12">
                  {reload == true ?
                    <Editor className='col-md-12' setDataText={setDataText} dataText={dataText} />
                    :
                    <Editor className='col-md-12' setDataText={setDataText} dataText={dataText} />
                  }

                </CCol>


              </CRow>
              <hr />
              <CRow className="justify-content-center" style={{ direction: 'ltr' }}>
                <CCol md="12" lg="12" xl="12" style={{ direction: 'rtl' }}>

                  <h5>Arabic Cntent</h5>
                </CCol>

                <CCol md="12" lg="12" xl="12">
                  {
                    reload == true ?
                      <Editor className='col-md-12' setDataText={setDataTextArabic} dataText={dataTextArabic} />

                      :
                      <Editor className='col-md-12' setDataText={setDataTextArabic} dataText={dataTextArabic} />

                  }
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
                  </CAlert>

                }




                {succesAdd &&


                  <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                    color="success"
                    show={visible}
                    // closeButton
                    onShowChange={setVisible}
                  // closeButton
                  >
                    {succesAdd}
                  </CAlert>


                }

                <CCol md="6" lg="6" xl="6" xs="12" sm="12" >
                  <CButton color="success" block type='submit'>Save
                    {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>
                </CCol>

              </CRow>
            </CCardFooter>
          </CForm>
        </CCard>








      </CContainer>
    </div>
  )
}

export default AddNewPage
