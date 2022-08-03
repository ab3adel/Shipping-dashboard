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
  CInputFile,
  CLink,
  CFade,
  CCollapse,
  CBadge,
  CRow,
  CSwitch
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './company.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import UpdateCompany from '../updateCompany/updateCompany'
import '../../../globalVar'

const Company = ({ match }) => {
  let history = useHistory();
  const [t, i18n] = useTranslation();

  const [visible, setVisible] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [fetchedData, setfetchedData] = useState([])
  const [fetchedUsers, setfetchedUsers] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [collapsed, setCollapsed] = useState(true)
  const [showCard, setShowCard] = useState(true)
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [activeAmount, setActiveAmount] = useState(false)


  const [pageStatus, setPageStatus] = useState(0)


  const [accordion, setAccordion] = useState()

  const [types, setTypes] = useState([])
  const [activeType, setActiveType] = useState('0')
  const [categories, setCategories] = useState([])
  const [activeCat, setActiveCat] = useState('0')
  const [activeOffer, setActiveOffer] = useState('')
  const [activeOfferId, setActiveOfferId] = useState(match.params.id)
  const [withUser, setWithUser] = useState(false)



  useEffect(async () => {
    console.log('refreshed parent')

    const fetchCompany = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/admin/company`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,

              Accept: "application/json",
            },
          }
        );
        console.log(responsee.status);
        if (responsee.status == '204') { setfetchedData([]) }
        const response = await responsee.json();

        console.log(response);

        if (response.payload) {
          setfetchedData(response.payload)

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

    await fetchCompany()
  }, [i18n.language, refresh])



  return (

    <>
      {pageStatus == 0 ? <div className="c-app c-default-layout flex-row align-items-center register-cont">

        <CContainer>



          {fetchedData && <>


            {/* mx-4 */}
            <CCard className="">



              <CCardHeader>
                <CRow className=" row-gap-15">

                  <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                    <strong>{i18n.language == 'ar' ? fetchedData.name_ar : fetchedData.name_en}</strong>
                  </CCol>

                  <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
                    <CButton color="info" className='col-lg-3  col-md-3 col-sm-6 col-xs-6 updatebtn'
                      onClick={() => setPageStatus(1)} > {i18n.language == 'ar' ? `تعديل` : `Update`}
                    </CButton>
                    <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                      onClick={() => history.goBack()} > {i18n.language == 'ar' ? `رجوع` : `Back`}
                    </CButton>

                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody className="p-4 ps-0">
                <CRow>
                  <CCol xs="12" sm="12" md="12" className=''>
                    <CFade in={showCard}>

                      {fetchedData &&
                        <CRow className=''>
                          <CCol className=' p-1' md='12' >

                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item">
                                <strong>{i18n.language == 'ar' ? `الشعار  :` : `Logo :`} {'      '}</strong>
                                <img className='detLogo' src={fetchedData.logo_url} /></li>

                            </ul>


                          </CCol>
                          <CCol className=' p-1' md='6' >

                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item"><strong>Id : {' '}</strong><br />{fetchedData.id}</li>
                              <li className="list-group-item"><strong>{i18n.language == 'ar' ? `اسم انكليزي :` : `English Name :`}
                                {' '}</strong><br /> {fetchedData.name_en}</li>
                              <li className="list-group-item"><strong>
                                {i18n.language == 'ar' ? ` الرمز الخاص  :` : `Code :`}
                                {' '}</strong>{fetchedData.code}</li>
                              <li className="list-group-item"><strong>{i18n.language == 'ar' ? ` معرف الدولة : ` : `Country Id : `}{' '}</strong>{fetchedData.country_id}</li>
                              <li className="list-group-item"><strong>{i18n.language == 'ar' ? ` الدولة : ` : `Country Name :`} {' '}</strong>{fetchedData.country_name}</li>
                            </ul>


                          </CCol>
                          <CCol className=' p-1' md='6'>
                            <ul className=" card list-group list-group-flush">

                              <li className="list-group-item arabic-align"><strong>اسم عربي :{' '}</strong><br />{fetchedData.name_ar}</li>
                              {fetchedData.phones && <li className="list-group-item ">
                                <strong>{i18n.language == 'ar' ? "هواتف : " : "Phones :"}</strong><br /> {' / '}
                                {fetchedData && fetchedData.phones.length > 0 && fetchedData.phones.map((phone, index) => {
                                  return (<React.Fragment key={index}>{phone.number + ' / '}</React.Fragment>)
                                })}
                              </li>}

                              {fetchedData.created_at && <li className="list-group-item"><strong>
                                {i18n.language == 'ar' ? " تاريخ الانشاء : " : "Created At : "}
                                {' '}</strong>  {fetchedData.created_at.slice(0, 10)}</li>}
                              <li className="list-group-item"><strong>
                                {i18n.language == 'ar' ? "ارقام المعايير : " : "Criteria Digits : "}
                                {' '}</strong>{fetchedData.criteria_digits}</li>
                              <li className="list-group-item"><strong>
                                {i18n.language == 'ar' ? "اتجاه المعايير : " : "  Criteria Direction : "}
                                {' '}</strong>{i18n.language == 'ar' ? <>
                                  {fetchedData.criteria_direction == 'left' ? 'يسار' : 'يمين'}
                                </> : fetchedData.criteria_direction}</li>



                            </ul>
                          </CCol>
                          <CCol className=' p-1' md='12'>
                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item"><strong>
                                {i18n.language == 'ar' ? " العنوان : " : " Address : "}
                                {' '}</strong>{fetchedData.address}</li>



                            </ul>
                          </CCol>

                        </CRow>}

                    </CFade>
                  </CCol>
                </CRow>

              </CCardBody>
            </CCard>

          </>}


        </CContainer>
      </div>
        :
        <UpdateCompany
          setPageStatus={setPageStatus}
          updatefetchedData={fetchedData}
          refresh={refresh}
          setRefresh={setRefresh} />
      }
    </>
  )
}

export default Company
