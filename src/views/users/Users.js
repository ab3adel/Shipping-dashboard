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
              الحالة: item.active == 1 ? "Active" : "Not Active",
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
    setAddressDetailsModal({ id: "", open: true, type: "sendAddress", status: "new", title: "Add New Sender Address", address: "" })
  }
  const openUpdateAddress = (address) => {
    setAddressDetailsModal({
      id: address.id, open: true, type: "sendAddress",
      status: "update", title: "Update Send Address", address: address
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
                  <strong>Users</strong>
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                  <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push('/users/AddNewUser')} >Add New User
                  </CButton>

                </CCol>

                <CCol md="4" lg="4" xl="4" >

                  <CSelect custom name="select" id="select" value={activeCat} onChange={(e) => handleCat(e)}>
                    <option value='0' >All Users</option>

                    <option value='1'>Admin</option>
                    <option value='2'>Normal</option>
                    <option value='3'>Active</option>
                    <option value='4'>Not Active</option>
                    {/* <option value='5'>  زبون</option> */}
                  </CSelect>


                </CCol>


              </CRow>
            </CCardHeader>
            <CCardBody className='usersTabel'>
              {data && <CDataTable
                items={setFilter()}
                fields={['id', { label: "Email", key: 'البريد الالكتروني' },
                  { label: "Name", key: 'الاسم' },
                  { label: "Account Type", key: 'نوع_الحساب' },
                  { label: "Status", key: 'الحالة' },
                  { label: "Actions", key: 'عمليات' },]}
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
                  'نوع_الحساب': (item) => (<td>{item.admin == 0 ? 'Normal User' : "Admin"}</td>),
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
                              Deactivate</CBadge></>
                          :
                          <>
                            {/* <br /> */}
                            <CBadge className="p-1  m-1 badg-click" color="primary" onClick={() => handleActivation(item.id, 1)}  >
                              Activate </CBadge>

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
                <CCol md='12'><strong>Account Information</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>ID</td>
                        <td><strong>{activeUser.id}</strong></td>
                      </tr>
                      <tr >
                        <td>Name</td>
                        <td><strong>{activeUser.name}</strong></td>
                      </tr>
                      <tr >
                        <td>{`Email`}</td>
                        <td><strong>{activeUser.email}</strong></td>
                      </tr>

                      <tr >
                        <td>Account Type</td>
                        <td><strong>{activeUser.admin == 0 ? "Normal User" : "Admin"}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Profit Percentage</td>
                        <td><strong>{activeUser.profit_percentage + " "}%</strong></td>
                      </tr>
                      <tr >
                        <td>{`fixed Profit Value`}</td>
                        <td><strong>{activeUser.fixed_profit_value + " "} د.ك</strong></td>
                      </tr>



                      <tr >
                        <td>Created at</td>
                        <td><strong> {activeUser.created_at && activeUser.created_at.slice(0, 10)}</strong></td>
                      </tr>

                      <tr >
                        <td> Status</td>
                        <td><strong>{activeUser.active == 1 ?
                          <>
                            {`Active`}
                          </> :
                          <>
                            {`Not Active`}
                          </>}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
              </CRow>
              <hr />

              {activeUser.admin == 0 && <>
                <CRow>
                  <CCol md='12'><strong>Customer  Information</strong></CCol>
                  <CCol lg={6}>
                    <table className="table table-striped table-hover">
                      <tbody>
                        <tr >
                          <td>Phone</td>
                          <td><strong>{activeUser.customer.phone ? activeUser.customer.phone : "-"}</strong></td>
                        </tr>
                        <tr >
                          <td>Company</td>
                          <td><strong>{activeUser.customer.company ? activeUser.customer.company : "-"}</strong></td>
                        </tr>
                        <tr >
                          <td>Address</td>
                          <td><strong>{activeUser.customer.address ? activeUser.customer.address : "-"}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </CCol>
                  <CCol lg={6}>
                    <table className="table table-striped table-hover">
                      <tbody>

                        <tr >
                          <td>   Bank Name</td>
                          <td>
                            <strong>
                              {activeUser.customer.bank_name ? activeUser.customer.bank_name : "-"}</strong></td>
                        </tr>

                        <tr >
                          <td>Bank Account Number</td>
                          <td><strong>
                            {activeUser.customer.bank_account_number ? activeUser.customer.bank_account_number : "-"}</strong></td>
                        </tr>
                        <tr >
                          <td> IBAN Number  </td>
                          <td><strong>
                            {activeUser.customer.IBAN_number ? activeUser.customer.IBAN_number : "-"}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </CCol>
                </CRow>


                <hr />
                <CRow>
                  <CCol md='6'><strong> Shipments Sending Address </strong></CCol>

                  <CCol md="6" lg="4" xl="4" className='row-gap-15 col-gap-15'>
                    {sendAddress && sendAddress != 'EMPTY' ?
                      <>
                        <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                          onClick={() => openUpdateAddress(sendAddress)} >        Update
                        </CButton>
                        <CButton color="danger" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                          onClick={() => openDeleteAddress(sendAddress.id)} >  Delete
                        </CButton>

                      </>
                      :
                      <CButton color="primary" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                        onClick={() => openAddAddress()} >         Add Address
                      </CButton>}
                  </CCol>





                  <CCol lg={12} className='mt-3'>
                    <table className="table table-striped table-hover">
                      <tbody>
                        <tr >
                          {sendAddress && sendAddress != 'EMPTY' ? <td>  <Address Address={sendAddress} /></td> : null}
                          {sendAddress && sendAddress == 'EMPTY' ? <td>    <b>  No Address </b> </td> : null}

                        </tr>

                      </tbody>
                    </table>
                  </CCol>

                </CRow>




                {activeUser.customer.attachments.length > 0 ?
                  <>
                    <hr />

                    <CRow>
                      <CCol md='12'><strong> Additional Information  </strong></CCol>
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
                                          <a href={`${global.apiUrl + item.value}`} target="_blank"> File URL
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
                    <CCol md='12'> <strong>Categories</strong> </CCol>
                    {

                      activeUser.customer.categories.length > 0 && activeUser.customer.categories.map((cat, index) => {
                        return (

                          <CCol key={cat.id} md='6' >


                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item    ">
                                <strong>   Arabic Name :{' '}</strong> {cat.name_ar}
                                <br />
                                <strong>     English Name :  {' '}</strong>  {cat.name_en}</li>



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
        onClose={() => setSmall(!false)}
        size="sm"
        color='danger'
      >
        <CModalHeader closeButton>
          <CModalTitle></CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are You Sure Want To Delete User({itemToDelete.name})

        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>Delete</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
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
