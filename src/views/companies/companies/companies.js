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
  CRow,
  CBadge,
  CDataTable,
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './companies.scss'
import { CAlert } from '@coreui/react'
import '../../../globalVar'
import { DocsLink } from 'src/reusable'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const Companies = () => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
  const [danger, setDanger] = useState(false)
  const [visible, setVisible] = useState(10)
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



  useEffect(async () => {
    setErrorMessage('')
    setSuccessAdd('')
    const fetchcompanies = async (e) => {



      try {
        const responsee = await fetch(
          `${global.apiUrl}api/companies`,
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
        const response = await responsee.json();
        // console.log('response',response);
        console.log('companies', response);
        if (response.success) {
          let temp = []

          await response.payload.map((item, index) => {

            temp.push({


              ...item,

              "الاسم العربي": item.name_ar,
              "الاسم الانكليزي": item.name_en,

              "التصنيف": item.categories.length > 0 ? item.categories.map((cat, index) => {
                return (cat.name_ar)
              })
                :
                "غير مصنف"


            })

          })
          setData(temp)

          setTotalPages(response.payload.last_page)

        }
        if (response.message && response.message == "Unauthorized.") {
          localStorage.removeItem("token");
          localStorage.clear()

          history.push("/login");
        }

      } catch (err) {
        console.log(err);

      }

      // setLoading(false)


    }

    fetchcompanies()
  }, [currentPage, refresh, i18n.language])
  const handleBack = () => {
    setErrorMessage('')
    setSuccessAdd('')
    setPageStatus(0)
  }
  const [itemToDelete, setItemToDelete] = useState('')
  const handleShow = (item) => {
    setSmall(!large)
    setItemToDelete(item)
  }
  const handleDelete = async () => {
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity = 0.75;

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/companies/${itemToDelete.id}`,
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
  function FindByAttributeValue(attribute, value, element_type) {
    element_type = element_type || "*";
    var All = document.getElementsByTagName(element_type);
    for (var i = 0; i < All.length; i++) {
      if (All[i].getAttribute(attribute) == value) { All[i].disabled = true; }
    }
  }
  FindByAttributeValue("aria-label", "column name: 'الشعار' filter input", "input")
  FindByAttributeValue("aria-label", "column name: 'عمليات' filter input", "input")
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">
      <CContainer className='p-0'>

        {pageStatus == 0 &&
          <CCard className="">

            <CCardHeader>
              <CRow className="justify-content-center row-gap-15 ">

                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  الشركات
                </CCol>
                <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
                  <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push('/companies/AddNewCompany')} >
                    إضافة شركة
                  </CButton>

                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody className="p-1">
              <CRow className="justify-content-center">
                <CCol md="12">
                  <CCard>

                    <CCardBody className='compTabel'>

                      {data && <CDataTable
                        items={data}
                        fields={['id', 'الاسم العربي', 'الاسم الانكليزي', 'التصنيف', 'الشعار', 'عمليات']}
                        hover
                        striped
                        pagination
                        // tableFilter={{
                        //   placeholder: ". . .",
                        //   label: "بحث:",
                        // }}
                        sorter
                        itemsPerPage={12}
                        columnFilter
                        scopedSlots={{

                          'الشعار':
                            (item) => (
                              <td>
                                <img className='logoAll' src={global.apiUrl + item.logo} />
                              </td>
                            ),


                          'عمليات':
                            (item) => (
                              <td>


                                <CBadge className="p-1 m-1 badg-click" color="danger"
                                  onClick={() => handleShow(item)}
                                >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>


                                <CBadge className="p-1  m-1 badg-click" color="info"
                                  onClick={() => history.push(`/companies/Company/${item.id}`)}
                                >{i18n.language == 'ar' ? "عرض ....." : "Show...."}</CBadge>

                              </td>
                            ),

                        }}
                      />}



                      {/* {totalPages && <CPagination
                        align="center"
                        addListClass="some-class"
                        activePage={currentPage}
                        pages={totalPages}
                        onActivePageChange={setCurrentPage}
                        className='faqsPage'
                      />} */}
                    </CCardBody>
                  </CCard>
                </CCol>

              </CRow>
            </CCardBody>

          </CCard>}










      </CContainer>

      <CModal
        show={small}
        onClose={() => setSmall(!small)}
        size="sm"
        color='danger'
      >
        <CModalHeader closeButton>
          <CModalTitle>{i18n.language == 'ar' ? "حذف شركة" : "Delete Company"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {`هل انت متأكد أنك تريد حذف شركة (  ${itemToDelete.name_ar} )`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>حذف </CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>الغاء</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Companies

