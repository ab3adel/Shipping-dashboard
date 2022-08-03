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
import Address from '../Address/Address'
import './users.scss'

import { useTranslation } from 'react-i18next';
import DeleteAddress from '../DeleteAddress/DeleteAddress'
import AddAddressForm from '../AddAddressForm/AddAddressForm'

const Users = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [modal, setModal] = useState(false)
  const [small, setSmall] = useState(false)
  const [addressID, setAddressID] = useState('')
  const [addressDetailsModal, setAddressDetailsModal] = useState({
    id: "",
    open: false,
    type: "",
    title: "",
    status: "",
    address: ""

  })
  const [data, setData] = useState('')
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


          let temp = []

          await response.payload.map((item, index) => {

            temp.push({


              ...item,

              الاسم: item.name,
              الحالة: item.active == 1 ? "فعال" : "غير فعال",
              "البريد الالكتروني": item.email ? item.email : "-",
              "نوع الحساب": item.admin,



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

    fetchUsers()
  }, [currentPage, refresh])



  const [activeUser, setActiveUser] = useState({})
  const [sendAddress, setSendAddress] = useState({})
  const handleShow = async (item) => {
    await setActiveUser({ ...item })
    await getSendAddress(item.customer.id)


    setPageStatus(1)
  }

  const handleBack = (item) => {
    setActiveUser({})
    setSendAddress({})
    setPageStatus(0)

  }




  const getSendAddress = async (id) => {

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/address/${id}?incoming=0`,
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

      if (response.success == true) {
        setSendAddress(response.payload.length > 0 ? response.payload[0] : "EMPTY")
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

  const [activeCat, setActiveCat] = useState('0')
  const handleCat = (e) => {
    setActiveCat(e.target.value)

  }

  const setFilter = () => {
    if (activeCat == '0') {
      return data
    }
    else if (activeCat == '1') {
      return data.filter(item => item.admin == 1)
    }
    else if (activeCat == '2') {
      return data.filter(item => item.admin == 0)
    }

    else if (activeCat == '3') {
      return data.filter(item => item.active == 1)
    }
    else if (activeCat == '4') {
      return data.filter(item => item.active == 0)
    }

    // else if (activeCat == '5') {
    //   return data.filter(item => item.customer != null)
    // }
    else {
      return data
    }


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

  const openDeleteAddress = (id) => {
    setModal(true)
    setAddressID(id)
  }
  const CloseDeleteAddress = () => {
    setModal(false)
    setAddressID('')
  }

  const openAddAddress = () => {
    setAddressDetailsModal({ id: "", open: true, type: "sendAddress", status: "new", title: "إضافة عنوان ارسال", address: "" })
  }
  const openUpdateAddress = (address) => {
    setAddressDetailsModal({
      id: address.id, open: true, type: "sendAddress",
      status: "update", title: "تعديل عنوان ارسال", address: address
    })
  }
  const CloseAddAddressModal = () => {
    setAddressDetailsModal({ id: "", open: false, type: "", title: "", status: "", address: "" })
  }




  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>

              <CRow className=" row-gap-15">

                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  <strong>المستخدمين</strong>
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                  <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push('/users/AddNewUser')} >  إضافة مستخدم جديد
                  </CButton>

                </CCol>

                <CCol md="4" lg="4" xl="4" >

                  <CSelect custom name="select" id="select" value={activeCat} onChange={(e) => handleCat(e)}>
                    <option value='0' >كل المستخدمين</option>

                    <option value='1'>مدراء</option>
                    <option value='2'>مستخدمين</option>
                    <option value='3'>فعال</option>
                    <option value='4'>غير فعال </option>
                    {/* <option value='5'>  زبون</option> */}
                  </CSelect>


                </CCol>


              </CRow>
            </CCardHeader>
            <CCardBody className='usersTabel'>
              {data && <CDataTable
                items={setFilter()}
                fields={['id', 'البريد الالكتروني', 'الاسم', 'نوع_الحساب', 'الحالة', 'عمليات']}
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
                  'نوع_الحساب': (item) => (<td>{item.admin == 0 ? 'مستخدم' : "مدير"}</td>),
                  'عمليات':
                    (item) => (
                      <td>
                        <CBadge className="p-1 m-1 badg-click" color="danger"
                          onClick={() => handleShowModal(item)}
                        >{i18n.language == 'ar' ? " حذف " : "Delete"}</CBadge>
                        {/* <br /> */}
                        <CBadge className="p-1  m-1 badg-click" color="info" onClick={() => handleShow(item)}  >
                          {i18n.language == 'ar' ? " عرض " : "Show...."}</CBadge>

                        {item.id !== 1 ? <>  {item.active == 1 ?
                          <>
                            {/* <br /> */}
                            <CBadge className="p-1  m-1 badg-click" color="secondary" onClick={() => handleActivation(item.id, 0)}  >
                              تعطيل</CBadge></>
                          :
                          <>
                            {/* <br /> */}
                            <CBadge className="p-1  m-1 badg-click" color="primary" onClick={() => handleActivation(item.id, 1)}  >
                              تفعيل </CBadge>

                          </>


                        }</>
                          : null
                        }

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
                  {activeUser.name}
                </CCol>
                <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
                  <CButton color="info" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push(`/users/Update/${activeUser.id}`)} >{i18n.language == 'ar' ? `تعديل` : `Update`}
                  </CButton>
                  <CButton color="success" className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
                    onClick={() => handleBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>

                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody className=''>



              <CRow>
                <CCol md='12'><strong>معلومات الحساب</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>ID</td>
                        <td><strong>{activeUser.id}</strong></td>
                      </tr>
                      <tr >
                        <td>الاسم</td>
                        <td><strong>{activeUser.name}</strong></td>
                      </tr>
                      <tr >
                        <td>{`البريد الالكتروني`}</td>
                        <td><strong>{activeUser.email}</strong></td>
                      </tr>

                      <tr >
                        <td>نوع الحساب</td>
                        <td><strong>{activeUser.admin == 0 ? "مستخدم عادي" : "مدير"}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>{`نسبة الربح`}</td>
                        <td><strong>{activeUser.profit_percentage + " "}%</strong></td>
                      </tr>
                      <tr >
                        <td>{`مبلغ اضافي`}</td>
                        <td><strong>{activeUser.fixed_profit_value + " "} د.ك</strong></td>
                      </tr>



                      <tr >
                        <td>تاريخ الانشاء </td>
                        <td><strong> {activeUser.created_at && activeUser.created_at.slice(0, 10)}</strong></td>
                      </tr>

                      <tr >
                        <td> الحالة</td>
                        <td><strong>{activeUser.active == 1 ?
                          <>
                            {`فعال`}
                          </> :
                          <>
                            {`غير فعال`}
                          </>}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
              </CRow>
              <hr />

              {activeUser.admin == 0 && <>
                <CRow>
                  <CCol md='12'><strong>معلومات الزبون</strong></CCol>
                  <CCol lg={6}>
                    <table className="table table-striped table-hover">
                      <tbody>
                        <tr >
                          <td>هاتف</td>
                          <td><strong>{activeUser.customer.phone ? activeUser.customer.phone : "-"}</strong></td>
                        </tr>
                        <tr >
                          <td>الشركة</td>
                          <td><strong>{activeUser.customer.company ? activeUser.customer.company : "-"}</strong></td>
                        </tr>
                        <tr >
                          <td>العنوان</td>
                          <td><strong>{activeUser.customer.address ? activeUser.customer.address : "-"}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </CCol>
                  <CCol lg={6}>
                    <table className="table table-striped table-hover">
                      <tbody>

                        <tr >
                          <td>اسم البنك</td>
                          <td>
                            <strong>
                              {activeUser.customer.bank_name ? activeUser.customer.bank_name : "-"}</strong></td>
                        </tr>

                        <tr >
                          <td>رقم الحساب البنكي </td>
                          <td><strong>
                            {activeUser.customer.bank_account_number ? activeUser.customer.bank_account_number : "-"}</strong></td>
                        </tr>
                        <tr >
                          <td>رقم IBAN</td>
                          <td><strong>
                            {activeUser.customer.IBAN_number ? activeUser.customer.IBAN_number : "-"}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </CCol>
                </CRow>


                <hr />
                <CRow>
                  <CCol md='6'><strong>عنوان إرسال الشحنات</strong></CCol>

                  <CCol md="6" lg="3" xl="3" className='row-gap-15 col-gap-15'>
                    {sendAddress && sendAddress != 'EMPTY' ?
                      <>
                        <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                          onClick={() => openUpdateAddress(sendAddress)} >     تعديل العنوان
                        </CButton>
                        <CButton color="danger" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                          onClick={() => openDeleteAddress(sendAddress.id)} >  حذف العنوان
                        </CButton>

                      </>
                      :
                      <CButton color="primary" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                        onClick={() => openAddAddress()} >      إضافة عنوان
                      </CButton>}
                  </CCol>





                  <CCol lg={12} className='mt-3'>
                    <table className="table table-striped table-hover">
                      <tbody>
                        <tr >
                          {sendAddress && sendAddress != 'EMPTY' ? <td>  <Address Address={sendAddress} /></td> : null}
                          {sendAddress && sendAddress == 'EMPTY' ? <td>    <b> لا يوجد عنوان</b> </td> : null}

                        </tr>

                      </tbody>
                    </table>
                  </CCol>

                </CRow>




                {activeUser.customer.attachments.length > 0 ?
                  <>
                    <hr />

                    <CRow>
                      <CCol md='12'><strong>معلومات اضافية</strong></CCol>
                      <CCol lg={12} >
                        <table className="table table-striped table-hover">
                          <tbody>

                            {activeUser.customer.attachments.map((item) => {
                              return (

                                <tr key={item.id}>
                                  <td>{item.key}</td>
                                  <td>
                                    <strong>
                                      {item.file == 0 ? item.value :
                                        <>
                                          <a href={`${global.apiUrl + item.value}`} target="_blank">رابط الملف
                                          </a>



                                        </>

                                      }</strong></td>
                                </tr>

                              )
                            })}

                          </tbody>
                        </table>
                      </CCol>
                    </CRow>
                  </>
                  :
                  null}
                {activeUser.customer.categories && activeUser.customer.categories.length > 0 &&
                  <CRow   >
                    <CCol md='12'> <strong>التصنيفات</strong> </CCol>
                    {

                      activeUser.customer.categories.length > 0 && activeUser.customer.categories.map((cat, index) => {
                        return (

                          <CCol key={cat.id} md='6' >


                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item arabic-align">
                                <strong>اسم عربي :{' '}</strong> {cat.name_ar}
                                <br />
                                <strong>  اسم انكليزي :  {' '}</strong>  {cat.name_en}</li>



                            </ul>

                          </CCol>



                        )
                      })}
                  </CRow>}


              </>}


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
          هل انت متأكد أنك تريد حذف مستخدم ({itemToDelete.name})

        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>حذف</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>الغاء</CButton>
        </CModalFooter>
      </CModal>
      {modal && activeUser.customer &&
        <DeleteAddress
          openModal={modal}
          closeModal={CloseDeleteAddress}
          id={addressID}
          userID={activeUser.customer.id}
          refreshParent={getSendAddress}
        />}
      {addressDetailsModal.open && activeUser.customer &&
        <AddAddressForm
          openModal={addressDetailsModal.open}
          closeModal={CloseAddAddressModal}
          type={addressDetailsModal.type}
          address={addressDetailsModal.address}
          id={addressDetailsModal.id}
          title={addressDetailsModal.title}
          status={addressDetailsModal.status}
          userID={activeUser.customer.id}
          refreshParent={getSendAddress}
        />}
    </CRow>
  )
}

export default Users
