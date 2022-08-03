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
import './Reciepients.scss'

import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddAddressForm from '../AddAddressForm/AddAddressForm'
import Address from '../Address/Address'
import DeleteAddress from '../DeleteAddress/DeleteAddress'
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


const Reciepients = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [modal, setModal] = useState(false)
  const [small, setSmall] = useState(false)
  const [addressID, setAddressID] = useState('')
  const [customer, setCustomer] = useState(null)
  const [allCustomers, setAllCustomers] = useState([])
  const [data, setData] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  const [visible, setVisible] = useState(10)
  const [addressDetailsModal, setAddressDetailsModal] = useState({
    id: "",
    open: false,
    type: "",
    title: "",
    status: "",
    address: ""

  })


  useEffect(async () => {
    const fetchUsers = async (e) => {
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
        const response = await responsee.json();
        // console.log('response',response);
        console.log('faqs', response);
        if (response.success) {


          setAllCustomers(response.payload.filter(item => item.admin == 0))
          //  setTotalPages(response.payload.last_page)

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

  }, [])




  const [activeUser, setActiveUser] = useState('')

  const handleShow = (item) => {
    // setActiveUser(item)
    getUser(item.id)

    setPageStatus(1)
  }

  const handleBack = (item) => {
    setActiveUser('')
    setPageStatus(0)

  }

  const getUser = async (id) => {

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/address/${customer.customer.id}?incoming=1&recipient_id=${id}`,
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
        setActiveUser(response.payload[0])
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
        `${global.apiUrl}api/recipients/${itemToDelete.id}`,
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

        fetchRecipients(customer.customer.id)

      }
      // else{
      // setErrorMessage(response.errors)
      // }

    } catch (err) {
      console.log(err);

    }
    document.getElementById('root').style.opacity = 1;

  }


  const handleCustomerChange = (val) => {
    setCustomer(val)
    if (val) {
      fetchRecipients(val.customer.id)
    }
  }
  const fetchRecipients = async (id) => {
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/address/${id}?incoming=1`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },

        }
      );
      const response = await responsee.json();
      if (response.success) {
        let temp = []

        await response.payload.map((item, index) => {

          temp.push({
            ...item,

            "الاسم الانكليزي": item.name_en,
            "تاريخ الانشاء": item.created_at.slice(0, 10),
            "الاسم العربي": item.name_ar,
            "هاتف": item.phone ? item.phone : "-",
            "إيميل": item.email ? item.email : "-"

          })

        })
        setData(temp)

        // if (activeUser.id) { setActiveUser(response.payload.filter(item => item.id == activeUser.id)[0]) }

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

  const openAddRecipent = () => {
    setAddressDetailsModal({ id: "", open: true, type: "recipient", status: "new", title: "إضافة مرسل اليه", address: "" })
  }
  const openAddrecipientAddress = () => {
    setAddressDetailsModal({ id: activeUser.id, open: true, type: "recipientAddress", status: "new", title: "إضافة عنوان مرسل اليه", address: "" })
  }
  const openUpdaterecipientAddress = (address) => {
    setAddressDetailsModal({ id: activeUser.id, open: true, type: "recipientAddress", status: "update", title: "تعديل عنوان مرسل اليه", address: address })
  }
  const openUpdaterecipient = () => {
    setAddressDetailsModal({
      id: activeUser.id, open: true, type: "recipient", status: "update", title: "تعديل معلومات مرسل اليه",
      address: {
        recipient_name_en: activeUser.name_en,
        recipient_name_ar: activeUser.name_ar,
        recipient_phone: activeUser.phone ? activeUser.phone : "",
        email: activeUser.email ? activeUser.email : "",


      }
    })
  }
  const CloseAddAddressModal = () => {
    setAddressDetailsModal({ id: "", open: false, type: "", title: "", status: "", address: "" })
  }
  const openDeleteAddress = (id) => {
    setModal(true)
    setAddressID(id)
  }
  const CloseDeleteAddress = () => {
    setModal(false)
    setAddressID('')
  }




  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>

              <CRow className=" row-gap-15">

                <CCol md="12" lg="12" xl="12">

                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="text-input">اختر زبون</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                          <div dir="rtl">
                            <Autocomplete
                              id="country-select-demo"
                              size="small"
                              options={allCustomers}
                              autoHighlight
                              autoComplete='off'
                              dir='rtl'
                              rtl='true'
                              value={customer}
                              onChange={(event, newValue) => {
                                handleCustomerChange(newValue)
                              }}
                              getOptionLabel={(option) => option.name + ` ( هاتف : ${option.customer.phone ? option.customer.phone : '-'})`}
                              // + ' ( id : ' + option.id + ' )'
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                  اسم : {option.name} / ( ايميل :{option.email}) / ( هاتف : {option.customer.phone ? option.customer.phone : '-'})
                                </Box>
                              )}
                              // / ( Id: {option.customer.id})
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  required
                                  label={i18n.language == 'ar' ? "اختر زبون" : "Select Country"}
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                              required={true}
                            />

                          </div>
                        </ThemeProvider>
                      </CacheProvider>




                    </CCol>
                  </CFormGroup>

                </CCol>
                {customer &&
                  <> <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                    <strong>المستلمين</strong>
                  </CCol>

                    <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                      <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                        onClick={() => openAddRecipent()}
                      // history.push('/Reciepients/AddNewReciepient')
                      >  إضافة مستلم جديد
                      </CButton>

                    </CCol>
                  </>
                }






              </CRow>
            </CCardHeader>
            <CCardBody className='usersTabel'>
              {data && <CDataTable
                items={data}
                fields={['id', 'الاسم العربي', 'الاسم الانكليزي', 'هاتف', 'إيميل', 'تاريخ الانشاء', 'عمليات']}
                hover
                striped
                pagination

                sorter
                itemsPerPage={12}
                columnFilter
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{

                  // 'الاسم': (item) => (<td>{item.name}</td>),
                  // 'البريد الالكتروني': (item) => (<td>{item.email}</td>),

                  'عمليات':
                    (item) => (
                      <td>
                        <CBadge className="p-1 m-1 badg-click" color="danger"
                          onClick={() => handleShowModal(item)}
                        >{i18n.language == 'ar' ? "حذف" : "Delete"}</CBadge>

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




                <CCol md="6" lg="5" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  {activeUser.name_ar}
                </CCol>
                <CCol md="6" lg="7" className=" row-gap-15 col-gap-15 ">

                  <CButton color="info" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => openUpdaterecipient()} > تعديل
                  </CButton>
                  <CButton color="primary" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => openAddrecipientAddress()}
                  >      إضافة عنوان
                  </CButton>
                  <CButton color="secondary" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => handleBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>

                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody className=''>



              <CRow>
                <CCol md='12'><strong>معلومات المرسل اليه</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>الاسم العربي</td>
                        <td><strong>{activeUser.name_ar}</strong></td>
                      </tr>
                      <tr >
                        <td> الاسم الانكليزي  </td>
                        <td><strong>{activeUser.name_en}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>  البريد الالكتروني   </td>
                        <td><strong>{activeUser.email ? activeUser.email : "-"}</strong></td>
                      </tr>
                      <tr >
                        <td>   هاتف     </td>
                        <td><strong>{activeUser.phone ? activeUser.phone : '-'}</strong></td>
                      </tr>







                    </tbody>
                  </table>
                </CCol>

                {activeUser.addresses &&
                  activeUser.addresses.map((item, index) => {
                    return (<React.Fragment key={item.id}>

                      <CCol md='6'><strong> {`العنوان ${index + 1}`} </strong></CCol>

                      <CCol md="6" lg="3" xl="3" className='row-gap-15 col-gap-15'>


                        <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                          onClick={() => openUpdaterecipientAddress(item)}
                        >     تعديل العنوان
                        </CButton>
                        <CButton color="danger" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                          onClick={() => openDeleteAddress(item.id)}
                        >  حذف العنوان
                        </CButton>



                      </CCol>
                      <CCol lg={12} className='mt-3'>
                        <table className="table table-striped table-hover">
                          <tbody>
                            <tr >
                              <td>  <Address Address={item} /></td>

                            </tr>

                          </tbody>
                        </table>
                      </CCol>
                    </React.Fragment>)
                  })}
              </CRow>
              <hr />




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
          <CModalTitle>حذف مستلم</CModalTitle>
        </CModalHeader>
        <CModalBody>
          هل انت متأكد أنك تريد حذف مستلم ({itemToDelete.name_ar})

        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>حذف</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>الغاء</CButton>
        </CModalFooter>
      </CModal>

      {addressDetailsModal.open && customer.customer &&
        <AddAddressForm
          openModal={addressDetailsModal.open}
          closeModal={CloseAddAddressModal}
          type={addressDetailsModal.type}
          address={addressDetailsModal.address}
          id={addressDetailsModal.id}
          title={addressDetailsModal.title}
          status={addressDetailsModal.status}
          userID={customer.customer.id}
          refreshParent={addressDetailsModal.type == "recipientAddress" || (addressDetailsModal.type === "recipient" && addressDetailsModal.status === "update") ? getUser : fetchRecipients}
        />}

      {modal && customer.customer && activeUser &&
        <DeleteAddress
          openModal={modal}
          closeModal={CloseDeleteAddress}
          id={addressID}
          userID={activeUser.id}
          refreshParent={getUser}
        />}
    </CRow>
  )
}

export default Reciepients
