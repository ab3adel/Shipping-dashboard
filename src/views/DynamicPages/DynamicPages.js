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
import './DynamicPages.scss'

import { useTranslation } from 'react-i18next';



const DynamicPages = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();


  const [small, setSmall] = useState(false)


  const [data, setData] = useState('')
  const [refresh, setRefresh] = useState(false)



  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  useEffect(async () => {
    const fetchpages = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/getPageByTitle?paginate=0`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },

          }
        );
        const response = await responsee.json();
        // console.log('response',response);
        console.log('faqs', response);
        if (response.success) {


          let temp = []

          await response.payload.map((item, index) => {

            temp.push({


              ...item,
              "الاسم الانكليزي": item.title_en,
              "الاسم العربي": item.title_ar,





            })

          })
          setData(temp)
          //  setTotalPages(response.payload.last_page)
          if (activeUser.id) { setActiveUser(response.payload.filter(item => item.id == activeUser.id)[0]) }

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

    fetchpages()
  }, [refresh])



  const [activeUser, setActiveUser] = useState('')

  const handleShow = (item) => {
    setActiveUser(item)
    // getUser(item.id)

    setPageStatus(1)
  }

  const handleBack = (item) => {
    setActiveUser('')
    setPageStatus(0)

  }

  const [itemToDelete, setItemToDelete] = useState('')
  const handleShowModal = (item) => {
    setSmall(!small)
    setItemToDelete(item)
  }
  const handleDelete = async () => {

    document.getElementById('root').style.opacity = 0.75;

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/pages/${itemToDelete.id}`,
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
      if (responsee.status == 200) {
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





  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>

              <CRow className=" row-gap-15">

                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  <strong>الصفحات</strong>
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                  <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push('/DynamicPages/AddNewPage')} >  إضافة صفحة جديدة
                  </CButton>

                </CCol>




              </CRow>
            </CCardHeader>
            <CCardBody className='usersTabel'>
              {data && <CDataTable
                items={data}
                fields={['id', 'الاسم العربي', 'الاسم الانكليزي', 'عمليات']}
                hover
                striped
                pagination

                sorter
                itemsPerPage={12}
                columnFilter
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{

                  'عمليات':
                    (item) => (
                      <td>
                        {item.id != 1 ?
                          <>
                            <CBadge className="p-1 m-1 badg-click" color="danger"
                              onClick={() => handleShowModal(item)}
                            >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>

                          </>
                          : null}

                        <CBadge className="p-1  m-1 badg-click" color="info" onClick={() => handleShow(item)}  >
                          {i18n.language == 'ar' ? "عرض ....." : "Show...."}</CBadge>

                      </td>
                    ),

                }}
              />}

            </CCardBody>
          </CCard>
        </CCol>
      }
      {
        pageStatus == 1 && activeUser &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow className="justify-content-center row-gap-15 ">




                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  {activeUser.username}
                </CCol>
                <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
                  <CButton color="info" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push(`/DynamicPages/Update/${activeUser.id}`)} >
                    تعديل
                  </CButton>
                  <CButton color="success" className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
                    onClick={() => handleBack()} >  رجوع
                  </CButton>

                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody className=''>



              <CRow>
                <CCol md='12'><strong>معلومات الصفحة</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>الاسم العربي</td>
                        <td><strong>{activeUser.title_ar}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td> الاسم الانكليزي </td>
                        <td><strong>{activeUser.title_en}</strong></td>
                      </tr>




                    </tbody>
                  </table>
                </CCol>
              </CRow>
              <hr />


              <CRow style={{ direction: 'ltr' }}>
                <CCol md='12'><strong> المحتوى الانكليزي</strong></CCol>
                <CCol style={{ textAlign: 'start' }} lg={12} dangerouslySetInnerHTML={{ __html: activeUser.content_en }}
                >

                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol md='12'><strong> المحتوى العربي</strong></CCol>
                <CCol lg={12} dangerouslySetInnerHTML={{ __html: activeUser.content_ar }}>

                </CCol>
              </CRow>






            </CCardBody>
          </CCard>
        </CCol>


      }
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
          هل انت متأكد أنك تريد حذف صفحة ({itemToDelete.title_ar})

        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>حذف</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>الغاء</CButton>
        </CModalFooter>
      </CModal>

    </CRow>
  )
}

export default DynamicPages
