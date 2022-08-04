import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCollapse,
  CPagination,
  CProgress,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './faqs.scss'
import { CAlert } from '@coreui/react'
import '../../globalVar'
import { DocsLink } from 'src/reusable'
import { useHistory } from "react-router-dom";

const FAQs = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [small, setSmall] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState()
  const [totalPages, setTotalPages] = useState()
  const [accordion, setAccordion] = useState()
  const [data, setData] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [errorPass, setErrorPass] = useState();
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [faqData, setfaqData] = useState({
    question_ar: '', question_en: '', answer_ar: '', answer_en: ''
  })
  const { question_ar,
    question_en,
    answer_ar,
    answer_en,

  } = faqData;
  const [faqUpdate, setfaqUpdate] = useState({
    question_ar: '', question_en: '', answer_ar: '', answer_en: ''
  })
  const [errorMessageUpdate, setErrorMessageUpdate] = useState();
  const [succesAddUpdate, setSuccessAddUpdate] = useState()
  const [itemUpdate, setItemUpdate] = useState()
  const [loadingUpdate, setLoadingUpdate] = useState('')

  const handleDataUpdate = (e) => {
    setfaqUpdate({ ...faqUpdate, [e.target.name]: e.target.value })

    setErrorMessageUpdate('')
    setSuccessAddUpdate('')
  }

  const handleData = (e) => {
    setfaqData({ ...faqData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
  const [itemToDelete, setItemToDelete] = useState('')
  const handleShowModal = (item) => {
    setSmall(!small)
    setItemToDelete(item)
  }
  const handleDelete = async () => {
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity = 0.75;

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/faqs/${itemToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userToken,

            Accept: "application/json",
          },


        }
      );
      const response = await responsee.json();

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
  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    setLoadingUpdate(true)

    setErrorMessageUpdate('')
    setSuccessAddUpdate('')


    const data = new FormData();
    if (itemUpdate && faqUpdate.question_ar !== '') { data.append('question_ar', faqUpdate.question_ar); }
    if (itemUpdate && faqUpdate.question_en !== '') { data.append('question_en', faqUpdate.question_en); }
    if (itemUpdate && faqUpdate.answer_ar !== '') { data.append('answer_ar', faqUpdate.answer_ar); }
    if (itemUpdate && faqUpdate.answer_en !== '') { data.append('answer_en', faqUpdate.answer_en); }
    if (itemUpdate && itemUpdate.id) { data.append('_method', 'put'); }

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/faqs/${itemUpdate.id}`,
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
      console.log('response', response);
      console.log(response);
      if (response.success) {

        setSuccessAddUpdate("Question has been updated successfully")
        setRefresh(!refresh)
        //  setInterval(() => {setSuccessAddUpdate('')}, 3000)
        //  setInterval(() => {setItemUpdate('')}, 3000)
        //  setInterval(() => {setPageStatus(0)}, 3000)
        setVisible(4)
        setfaqUpdate({
          question_ar: '', question_en: '', answer_ar: '', answer_en: ''
        })
      }
      else {
        setErrorMessageUpdate(response.messages)
        // setInterval(() => {setErrorMessageUpdate('')}, 4000)
        setVisible(4)
      }

    } catch (err) {
      console.log(err);

    }


    setLoadingUpdate(false)


  }




  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')


    const data = new FormData();
    data.append('question_ar', question_ar);
    data.append('question_en', question_en);
    data.append('answer_ar', answer_ar);
    data.append('answer_en', answer_en);


    try {
      const responsee = await fetch(
        `${global.apiUrl}api/faqs`,
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
      console.log('response', response);
      console.log(response);
      if (response.success) {
        setVisible(10)
        setSuccessAdd("Question has been added successfully")
        setfaqData({
          question_ar: '', question_en: '', answer_ar: '', answer_en: ''
        })
        setRefresh(!refresh)
      }
      else {
        setErrorMessage(response.messages)
      }

    } catch (err) {
      console.log(err);

    }






    setLoading(false)


  }



  useEffect(async () => {
    // setErrorMessage('')
    // setSuccessAdd('')
    const fetchFAQs = async (e) => {



      try {
        const responsee = await fetch(
          `${global.apiUrl}api/faqs`,
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
        if (responsee.status == 204) {
          setData([])
        }


        const response = await responsee.json();
        // console.log('response',response);


        if (response.success) {
          setData(response.payload)


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

    fetchFAQs()
  }, [currentPage, refresh])
  const handleBack = () => {
    setErrorMessage('')
    setSuccessAdd('')
    setPageStatus(0)
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
      <CContainer className='p-0'>

        {pageStatus == 0 &&
          <CCard className="">

            <CCardHeader>
              <CRow className="justify-content-center row-gap-15 ">

                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  Common Questions
                </CCol>
                <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
                  <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => setPageStatus(1)} >Add Question</CButton>

                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody className="p-1">
              <CRow className="justify-content-center">
                <CCol md="12">
                  <CCard>

                    <CCardBody>
                      <div id="accordion">

                        {data && data.map((item, index) => {
                          return (
                            <CCard className="mb-2">
                              <CCardHeader id="headingOne">
                                <CRow className="  row-gap-15 ">

                                  <CCol md="7" lg="7" xl="7" className="textStart text-capitalize">
                                    <CButton
                                      block
                                      color="link"
                                      className=" m-0 p-0"
                                      onClick={() => setAccordion(accordion === index ? null : index)}
                                    >
                                      <h5 className="textStart ">{item.question_en}</h5>
                                    </CButton>
                                  </CCol>
                                  <CCol md="5" lg="5" xl="5" className="justify-content-flex-end row-gap-15 col-gap-15 ">
                                    <CButton color="danger" className='col-lg-3  col-md-3 col-sm-6 col-xs-6 updatebtn'
                                      onClick={() => handleShowModal(item)}
                                    ><i class="fa fa-trash" aria-hidden="true" ></i>
                                    </CButton>
                                    <CButton color="success" className='col-lg-4  col-md-4 col-sm-6 col-xs-6 updatebtn '
                                      onClick={() => { { setErrorMessageUpdate('') } { setSuccessAddUpdate('') } { setItemUpdate(item) } { setPageStatus(2) } }}
                                    >Update
                                    </CButton>
                                  </CCol>
                                </CRow>
                              </CCardHeader>
                              <CCollapse show={accordion === index}>
                                <CCardBody>
                                  <div className=' text-left qustionParent p-english'>
                                    <div className='question' ><strong>Question :</strong>{' ' + item.question_en}</div>
                                    <div className='question' ><strong>Answer :</strong>{' ' + item.answer_en}</div>
                                  </div>
                                  <div className='qustionParent p-arab'>
                                    <div className='question' ><strong>السؤال :</strong>{' ' + item.question_ar}</div>
                                    <div className='question' ><strong>الجواب :</strong>{' ' + item.answer_ar}</div>
                                  </div>
                                </CCardBody>
                              </CCollapse>
                            </CCard>

                          )

                        })}



                      </div>

                    </CCardBody>
                  </CCard>
                </CCol>

              </CRow>
            </CCardBody>

          </CCard>}

        {pageStatus == 1 &&
          <CCard className="">

            <CForm onSubmit={(e) => { handleSubmit(e) }}>
              <CCardHeader>
                <CRow className="justify-content-center row-gap-15 ">

                  <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                    Add New Question
                  </CCol>
                  <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
                    <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                      onClick={() => handleBack()} >Back
                    </CButton>

                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody className="p-4">

                <CRow className="justify-content-center">

                  <CCol className="text-left" md="12" lg="12" xl="12">

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          Q
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleData}
                        required

                        value={faqData.question_en}
                        name='question_en'
                        type="text" placeholder="English Question" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          A
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleData}
                        required
                        value={faqData.answer_en}
                        name='answer_en'
                        type="text" placeholder="English Answer" />
                    </CInputGroup>

                  </CCol>

                  <CCol md="12" lg="12" xl="12">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          س
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleData}
                        value={faqData.question_ar}
                        required
                        name='question_ar'
                        type="text" placeholder="السؤال بالعربية" style={{ direction: 'rtl' }} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          ج
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleData}
                        required
                        value={faqData.answer_ar}
                        name='answer_ar'
                        type="text" placeholder="الجواب بالعربية" style={{ direction: 'rtl' }} />
                    </CInputGroup>

                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow className="justify-content-center">

                  {errorMessage &&
                    <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                      color="danger"
                    // closeButton
                    >
                      {Object.keys(errorMessage).map((item, i) => (

                        <>{errorMessage[item]}<br /></>



                      ))}
                    </CAlert>

                  }




                  {succesAdd &&
                    <CAlert
                      color="success"
                      className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                      show={visible}
                      // closeButton
                      onShowChange={setVisible}
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
        }

        {pageStatus == 2 && itemUpdate &&
          <CCard className="">

            <CForm onSubmit={(e) => { handleSubmitUpdate(e) }}>
              <CCardHeader>
                <CRow className="justify-content-center row-gap-15 ">

                  <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                    Update Question
                  </CCol>
                  <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
                    <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                      onClick={() => handleBack()} >Back
                    </CButton>

                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody className="p-4">

                <CRow className="justify-content-center">

                  <CCol md="12" lg="12" xl="12" style={{ direction: 'ltr' }} >

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          Q
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleDataUpdate}

                        defaultValue={itemUpdate.question_en}
                        name='question_en'
                        type="text" placeholder="English Question" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          A
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleDataUpdate}
                        defaultValue={itemUpdate.answer_en}
                        name='answer_en'
                        type="text" placeholder="English Answer" />
                    </CInputGroup>

                  </CCol>

                  <CCol md="12" lg="12" xl="12">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          س
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleDataUpdate}

                        defaultValue={itemUpdate.question_ar}
                        name='question_ar'
                        type="text" placeholder="السؤال بالعربية" style={{ direction: 'rtl' }} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          ج
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleDataUpdate}
                        defaultValue={itemUpdate.answer_ar}

                        name='answer_ar'
                        type="text" placeholder="الجواب بالعربية" style={{ direction: 'rtl' }} />
                    </CInputGroup>

                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow className="justify-content-center">

                  {errorMessageUpdate &&
                    <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                      color="danger"
                    // closeButton

                    >
                      {Object.keys(errorMessageUpdate).map((item, i) => (

                        <>{errorMessageUpdate[item]}<br /></>



                      ))}
                    </CAlert>

                  }




                  {succesAddUpdate &&
                    <>  <CAlert
                      color="success"
                      className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                      show={visible}
                      // closeButton
                      onShowChange={setVisible}
                    >
                      {succesAddUpdate}

                      {/* <CProgress
            striped
            color="warning"
            value={Number(visible) * 10}
            size="xs"
            className="mb-3"
          /> */}
                    </CAlert>

                    </>


                  }

                  <CCol md="6" lg="6" xl="6" xs="12" sm="12" >
                    <CButton color="success" block type='submit'>Save
                      {loadingUpdate && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>
                  </CCol>

                </CRow>
              </CCardFooter>
            </CForm>
          </CCard>
        }







      </CContainer>
      <CModal
        show={small}
        onClose={() => setSmall(!small)}
        size="sm"
        color='danger'
      >
        <CModalHeader closeButton>
          <CModalTitle></CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete ({itemToDelete.question_en})

        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>Delete</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default FAQs
