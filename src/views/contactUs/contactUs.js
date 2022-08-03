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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,


} from '@coreui/react'
import { Pagination } from '../Pagination/pagination'
import '../../globalVar'
import ReplayForm from './ReplayForm/ReplayForm'
import './contactUs.scss'



const ConatctUs = () => {
  const history = useHistory()
  const [visible, setVisible] = useState(10)
  const [small, setSmall] = useState(false)
  const [dataText, setDataText] = useState('')
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState({ current_page: 1, total: 1 })
  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [modal, setModal] = useState(false)
  const [activeItem, setActiveItem] = useState({ id: '', message: '' })
  const [url, setUrl] = useState(`contactUs/viewAllContactUsRequests?`)

  const handleSetItemToreplay = async (item) => {

    await setActiveItem({ id: item.id, message: item.message })
    setDataText('')
    await setModal(!modal)
  }
  const closeModal = () => {
    setModal(false)
    setDataText('')
    setActiveItem({ id: '', message: '' })

  }
  const handleUrlFilter = (e) => {
    setCurrentPage(1)
    if (e.target.value == '0') { setUrl(`contactUs/viewAllContactUsRequests?`) }
    else if (e.target.value == 'active') { setUrl(`contactUs/viewAllContactUsRequests?seen=1&`) }

    else if (e.target.value == 'notActive') { setUrl(`contactUs/viewAllContactUsRequests?seen=0&`) }

    else { setUrl(`contactUs/viewAllContactUsRequests?`) }

  }
  const fetchFAQs = async (pageNumber) => {
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/contacts?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },



        }
      );
      const response = await responsee.json();
      console.log(response.payload)
      if (response.status == 204) {
        setData([])

      }



      if (response.success) {

        let temp = []
        setPaginationInfo(pre => ({ current_page: response.payload.current_page, total: response.payload.last_page }))
        await response.payload.data.map((item, index) => {

          temp.push({
            ...item,

            "الاسم": item.name,
            "الإيميل": item.email,
            "الشركة": item.company,
            "الموضوع": item.subject,
            "الرسالة": item.message,
            "التاريخ": item.created_at.slice(0, 10),


          })

        })
        setData(temp)

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
  useEffect(() => {

    fetchFAQs()
  }, [currentPage, refresh, url])



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
        `${global.apiUrl}api/contacts/${itemToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userToken,

            Accept: "application/json",
          },


        }
      );

      if (responsee.status == 200) {
        setSmall(!small)
        document.getElementById('root').style.opacity = 1;

        setRefresh(!refresh)

      }


    } catch (err) {
      console.log(err);

    }
    document.getElementById('root').style.opacity = 1;

  }
  const handleReplay = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')


    const data = new FormData();
    dataText && data.append('message', dataText);
    dataText && data.append('contact_id', activeItem.id);



    try {
      const responsee = await fetch(
        `${global.apiUrl}api/replies`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            // "Content-Type": "application/json",
            //'Access-Control-Allow-Origin': 'https://localhost:3000',
            // 'Access-Control-Allow-Credentials': 'true',

          },
          body: data,

        }
      );
      const response = await responsee.json();

      if (response.success) {
        // setDataText("")
        setActiveItem(activeItem)
        setSuccessAdd("تم ارسال الرد بنجاح")
        setRefresh(!refresh)
        setVisible(5)
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
  const handleSeen = (id) => {

    fetch(`${global.apiUrl}api/seen?id=${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
        },
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setRefresh(!refresh)
        }
      })
      .catch(err => console.log(err))
  }
  console.log(data)

  return (

    <CRow>
      {pageStatus == 0 &&
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CCol md='12'><strong>الرسائل</strong></CCol>
              {/*
              <CCol md="4" lg="4" xl="4" >

                <CSelect custom name="select" onChange={(e) => handleUrlFilter(e)}>
                  <option value='0' >Filter (All Requestes) </option>
                  <option value='active' >Seen</option>

                  <option value='notActive' >Unseen</option>

                </CSelect>


              </CCol> */}

            </CCardHeader>
            <CCardBody className='usersTabel'>
              {data.length > 0 && <CDataTable
                items={data}
                fields={['id', "الاسم", 'الإيميل', 'الشركة', 'الموضوع', 'الرسالة', 'التاريخ', 'عمليات']}
                hover
                striped
                sorter
                pagination
                itemsPerPage={12}
                columnFilter
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{

                  'عمليات':
                    (item) => (
                      <td>
                        <CBadge className="p-1 m-1 badg-click" color="danger"
                          onClick={() => handleShowModal(item)}
                        > حذف   </CBadge>
                        <br />
                        <CBadge className="p-1  m-1 badg-click" color={item.seen ? "success" : "secondary"}
                          style={{ cursor: item.seen ? 'pointer' : "auto" }}
                          onClick={() => handleSeen(item.id)}>
                          {item.seen ? "تمت المشاهدة" : "شاهد"}</CBadge>
                        <br />
                        <CBadge className="p-1  m-1 badg-click" color="info"
                          onClick={() => handleSetItemToreplay(item)}  >
                          ارسال رد</CBadge>
                        <br />

                      </td>


                    ),

                }}
              />}

            </CCardBody>
            <Pagination
              current_page={paginationInfo.current_page}
              total={paginationInfo.total}
              fetchFAQs={fetchFAQs}
            />

          </CCard>
        </CCol>
      }

      <CModal
        show={modal}
        onClose={closeModal}
      >
        <CModalHeader closeButton>
          <CModalTitle>ارسال رد</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow  >
            <CCol md="12">الرسالة :</CCol>
            <CCol md="12">{activeItem.message}</CCol>
            <CCol md="12">الرد :</CCol>
            {activeItem.message != '' && <ReplayForm setDataText={setDataText} dataText={dataText} />}
          </CRow>
          <CRow className="justify-content-center">

            {errorMessage &&
              <CCol md='12'>

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
              </CCol>
            }




            {succesAdd &&
              <CCol md='12'>
                <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                  color="success"
                  show={visible}
                  // closeButton
                  onShowChange={setVisible}
                // closeButton
                >
                  {succesAdd}
                </CAlert>
              </CCol>




            }
          </CRow>
        </CModalBody>
        <CModalFooter>

          <CButton color="primary" onClick={(e) => { handleReplay(e) }} >ارسال {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}</CButton>{' '}
          <CButton
            color="secondary"
            onClick={() => closeModal()}
          >الغاء</CButton>
        </CModalFooter>
      </CModal>







      <CModal
        show={small}
        onClose={() => setSmall(!small)}
        size="sm"
        color='danger'>
        <CModalHeader closeButton>
          <CModalTitle> حذف رسالة</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {`هل انت متأكد أنك تريد حذف رسالة من (${itemToDelete.name})`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDelete()}>حذف</CButton>{' '}
          <CButton color="secondary" onClick={() => setSmall(!small)}>الغاء</CButton>
        </CModalFooter>
      </CModal>





    </CRow>
  )
}

export default ConatctUs
