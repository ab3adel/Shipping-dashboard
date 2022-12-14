import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCardFooter
} from '@coreui/react'
import { CAlert } from '@coreui/react'
import '../../globalVar'
import './Categories.scss'

import { useTranslation } from 'react-i18next';


const Categories = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
  const [danger, setDanger] = useState(false)
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


  useEffect(async () => {
    const fetchitems = async (e) => {



      try {
        const responsee = await fetch(
          `${global.apiUrl}api/categories??paginate=0`,
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
        console.log('faqs', response);
        if (response.success) {

          let temp = []

          await response.payload.map((item, index) => {

            temp.push({


              ...item,
              "?????????? ????????????": item.name_ar,
              "?????????? ??????????????????": item.name_en,



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

      // setLoading(false)


    }

    fetchitems()
  }, [currentPage, refresh])


  const [activeUser, setActiveUser] = useState('')
  const [charge, setCharge] = useState([])
  const [nocharge, setNoCharge] = useState(false)
  const handleShow = (item) => {
    setActiveUser(item)
    //  getUser(item.id)
    setPageStatus(1)
  }

  const handleBack = (item) => {
    setActiveUser('')
    setPageStatus(0)
    setAmount('')
    setCharge([])
    setNoCharge(false)
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
    setSmall(!large)
    setItemToDelete(item)
  }
  const handleDelete = async () => {
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity = 0.75;

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/categories/${itemToDelete.id}`,
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

  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow className=" row-gap-15">
                <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  Categories
                </CCol>

                <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                  <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.push('/Categories/AddNewCategory')} >
                    Add new category

                  </CButton>

                </CCol>

              </CRow>

            </CCardHeader>
            <CCardBody className='usersTabel'>
              {data && <CDataTable
                items={data}
                fields={['id',
                  { label: "Arabic Name", key: '?????????? ????????????' },
                  { label: "English Name", key: '?????????? ??????????????????' },
                  { label: "Actions", key: '????????????' }]}
                hover
                striped
                pagination
                sorter
                itemsPerPage={12}
                columnFilter
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
                  '????????????':
                    (item) => (
                      <td>
                        <CBadge className="p-1 m-1 badg-click" color="danger"
                          onClick={() => handleShowModal(item)}
                        > Delete</CBadge>
                        <br />
                        <CBadge className="p-1  m-1 badg-click" color="info"
                          onClick={() => history.push(`/Categories/Update/${item.id}`)}  >
                         ...Update</CBadge>

                      </td>
                    ),


                }}
              />}
            </CCardBody>
          </CCard>
        </CCol>
      }

      <CModal
        show={small}
        onClose={() => setSmall(!small)}
        size="sm"
        color='danger'>
        <CModalHeader closeButton>
          <CModalTitle> Delete Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {`  Are you sure you want to delete the category (${itemToDelete.name_en})`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>Delete</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
        </CModalFooter>
      </CModal>

    </CRow>
  )
}

export default Categories
