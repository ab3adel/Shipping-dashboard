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
    CSelect,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CAlert
} from '@coreui/react'
import '../../globalVar'
// import ReplayForm from './ReplayForm/ReplayForm'
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
    const [totalPages, setTotalPages] = useState()
    const [succesAdd, setSuccessAdd] = useState()
    const [loading, setLoading] = useState('')
    const [pageStatus, setPageStatus] = useState(0)
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [modal, setModal] = useState(false)
    const [activeItem, setActiveItem] = useState({ id: '', message: '' })
    const [url, setUrl] = useState(`contactUs/viewAllContactUsRequests?`)
    const handleSetItemToreplay = async (item) => {
        console.log(item)
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
    useEffect(async () => {
        const fetchFAQs = async (e) => {



            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/replies`,
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
                    setTotalPages()
                }
                const response = await responsee.json();
                // console.log('response',response);
                console.log('faqs', response);
                if (response.success) {

                    let temp = []

                    await response.payload.map((item, index) => {

                        temp.push({


                            ...item,



                            "الرد": item.message,
                            "التاريخ": item.created_at.slice(0, 10),

                        })

                    })
                    setData(temp)

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

            // setLoading(false)


        }

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
                `${global.apiUrl}api/replies/${itemToDelete.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + userToken,

                        Accept: "application/json",
                    },


                }
            );
            // const response = await responsee.json();
            // console.log('response', response);

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
                            <CCol md='12'><strong>Replys</strong></CCol>
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
                                fields={['id', "contact_id",
                               {  label:'Reply',key:'الرد'},
                               {label:'History',key:'التاريخ'}
                               , {label:"Actions",key:'عمليات'}]}
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
                                                > Delete   </CBadge>


                                            </td>


                                        ),
                                    'الرد':
                                        (item) => (
                                            <td dangerouslySetInnerHTML={{ __html: item.message }}>

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
                    <CModalTitle> Delete Message </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {`Are you sure you want to delete Reply`}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => handleDelete()}>Delete</CButton>{' '}
                    <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
                </CModalFooter>
            </CModal>





        </CRow>
    )
}

export default ConatctUs
