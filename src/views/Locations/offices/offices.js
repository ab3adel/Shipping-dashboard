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
import '../../../globalVar'
import './offices.scss'

import { useTranslation } from 'react-i18next';

import GoogleMapReact from 'google-map-react';
import pin from './pin.png'
const AnyReactComponent = () => <img src={pin}></img>;

const Offices = ({ match }) => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
  const [danger, setDanger] = useState(false)
  const [data, setData] = useState('')
  const [nodata, setnoData] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [amount, setAmount] = useState('')
  const [visible, setVisible] = useState(10)
  const [companies, setCompanies] = useState('')
  const [company, setCompany] = useState('')
  const [depts, setDepts] = useState([])
  const [dept, setDept] = useState('')
  const [extNumber, setExtNumber] = useState('')
  useEffect(async () => {
    const fetchUsers = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/shipping/offices?code=${match.params.code}`,
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
        if (response.success && response.payload.Office) {
          let temp = []
          if (!response.payload.Office.length) {
            temp.push({
              ...response.payload.Office,
              index: 1,
              City: response.payload.Office.Address.City,
              Telephone: response.payload.Office.Telephone ? response.payload.Office.Telephone : '-',
              EntityDescription: response.payload.Office.EntityDescription ? response.payload.Office.EntityDescription : '-',

            })
          }
          if (response.payload.Office.length > 0) {
            response.payload.Office && await response.payload.Office.map((item, index) => {
              temp.push({
                ...item,
                index: index + 1,
                City: item.Address.City,
                Telephone: item.Telephone ? item.Telephone : '-',
                EntityDescription: item.EntityDescription ? item.EntityDescription : '-',
              })
            })
          }

          setData(temp)
        }
        if (!response.payload.Office) {
          console.log('response.payload.Office ');
          setData([])
          setnoData(true)
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

    fetchUsers()
  }, [currentPage, refresh])

  console.log('response.payload.Office ', data);

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

  const handleAddToDept = async (e) => {
    e.preventDefault()
    setLoading(true)
    setVisible(7)
    setErrorMessage('')
    setSuccessAdd('')
    if (activeUser.id) {
      const data = new FormData();
      dept && data.append('department_id', dept);

      !activeUser.extension_number && data.append('extension_number', extNumber);
      // JSON.stringify({
      //   "department_id" : dept,
      //   "extension_number": extNumber
      // })
      try {
        const responsee = await fetch(
          `${global.apiUrl}/super/attach/users/${activeUser.id}/departments`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + userToken,
              //  "Content-Type": "application/json",
              // 'Access-Control-Allow-Origin': 'https://localhost:3000',
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
        if (response.success) {

          setSuccessAdd(i18n.language == 'ar' ? "تمت اضافة المستخدم الى القسم بنجاح"
            : "User has been added to department successfully")
          // setRefresh(!refresh)
          // setAmount('')
          // getAmount(activeUser.id)
          // setUpData({api_key:''})
          setVisible(7)
        }
        else {

          setVisible(7)
          setErrorMessage(response.messages)
        }

      } catch (err) {
        console.log(err);

      }

      setLoading(false)

    }

  }


  const getUser = async (id) => {

    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/users/${id}`,
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
        setActiveUser(response.payload)
      }
    } catch (err) {
      console.log(err);

    }
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
        `${global.apiUrl}api/users/${itemToDelete.id}`,
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
  const handleCompany = (val) => {
    setCompany(val)
    setDept('')
    if (val == '') {
      setDepts('')
    }
    else {
      setDepts(companies.filter(item => item.id == val)[0].departments)
    }

  }
  const [activeCat, setActiveCat] = useState('0')
  const handleCat = (e) => {
    setActiveCat(e.target.value)

  }

  const handleActivation = async (id, status) => {
    // e.preventDefault()
    document.getElementById('root').style.opacity = 0.4;

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/users/${id}`,
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
            active: status,

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

        document.getElementById('root').style.opacity = 1;
        setRefresh(!refresh)


      }



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
                  <strong>المكاتب</strong>
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                  <CButton color="success" className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.goBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>
                </CCol>

                <CCol md="4" lg="4" xl="4" >


                </CCol>


              </CRow>
            </CCardHeader>
            <CCardBody className='usersTabel offices'>
              {data && data.length > 0 ? <CDataTable
                items={data}
                fields={['index', 'Entity', 'EntityDescription', 'OfficeType', 'City', 'Telephone', 'عمليات']}
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

                        <CBadge className="p-1  m-1 badg-click" color="info" onClick={() => handleShow(item)}  >
                          {i18n.language == 'ar' ? "عرض ....." : "Show...."}</CBadge>



                      </td>
                    ),

                }}
              /> :
                nodata ?

                  <CRow>
                    <CCol md='12'>
                      <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                        color="warning"
                      // closeButton
                      // show={visible}
                      // closeButton
                      // onShowChange={setVisible}
                      >
                        لايوجد مكاتب
                      </CAlert>
                    </CCol>
                  </CRow>
                  :
                  <></>
              }

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
                  {`${activeUser.Entity} (${activeUser.EntityDescription})`}


                </CCol>
                <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">

                  <CButton color="success" className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
                    onClick={() => handleBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>

                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody className=''>



              <CRow>
                <CCol md='12'><strong>معلومات المكتب</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>المدينة</td>
                        <td><strong>{activeUser.City}</strong></td>
                      </tr>
                      <tr >
                        <td>كيان</td>
                        <td><strong>{activeUser.Entity}</strong></td>
                      </tr>
                      <tr >
                        <td>نوع المكتب</td>
                        <td><strong>{activeUser.OfficeType}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>ايام العمل</td>
                        <td><strong>{activeUser.WorkingDays}</strong></td>
                      </tr>
                      <tr >
                        <td>ساعات العمل</td>
                        <td><strong>{activeUser.WorkingHours}</strong></td>
                      </tr>
                      <tr >
                        <td>هاتف</td>
                        <td style={{ direction: 'ltr' }}><strong>{activeUser.Telephone}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>
                <CCol md='12'><strong>العنوان</strong></CCol>
                <CCol lg={6}>

                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>السطر 1</td>
                        <td><strong>{activeUser.Address.Line1}</strong></td>
                      </tr>
                      <tr >
                        <td>السطر 2 </td>
                        <td><strong>{activeUser.Address.Line2 ? activeUser.Address.Line2 : '-'}</strong></td>
                      </tr>
                      <tr >
                        <td> السطر 3</td>
                        <td><strong>{activeUser.Address.Line3 ? activeUser.Address.Line3 : '-'}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>

                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>رمز الدولة</td>
                        <td><strong>{activeUser.Address.CountryCode}</strong></td>
                      </tr>
                      <tr >
                        <td>رمز البريد </td>
                        <td><strong>{activeUser.Address.PostCode ? activeUser.Address.PostCode : '-'}</strong></td>
                      </tr>
                      <tr >
                        <td> رمز الولاية أو المقاطعة</td>
                        <td><strong>{activeUser.Address.StateOrProvinceCode ? activeUser.Address.StateOrProvinceCode : '-'}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>
                {/* AIzaSyDk5VjGrf7kyQLiEaEgSSOdPhruL9eKFRE */}
                {activeUser.Latitude &&
                  <CCol md='12'>
                    <div style={{ height: '400px', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: 'AIzaSyB9zyT9CzMwXmGq5fOia4MOOlN2i7_1DpQ',
                          language: 'en',
                        }}
                        defaultCenter={{
                          lat: parseFloat(activeUser.Latitude),
                          lng: parseFloat(activeUser.Longtitude)
                        }}
                        defaultZoom={11}
                      >
                        <AnyReactComponent
                          lat={parseFloat(activeUser.Latitude)}
                          lng={parseFloat(activeUser.Longtitude)}

                        />
                      </GoogleMapReact>
                    </div>

                  </CCol>
                }
              </CRow>




            </CCardBody>
          </CCard>
        </CCol>


      }

    </CRow>
  )
}

export default Offices
