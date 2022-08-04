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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
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

  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
  const [pageStatus, setPageStatus] = useState(0)



  useEffect(async () => {
    console.log('refreshed parent')

    const fetchCompany = async (id) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/companies`,
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
          setfetchedData(response.payload.filter(item => item.id == id)[0])

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


    await fetchCompany(match.params.id)
  }, [i18n.language, refresh])
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

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
          setCategories(response.payload)
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

    fetchitems()
  }, [refresh])
  const handleAddToCat = async (e) => {
    e.preventDefault()
    setLoading(true)
    setVisible(7)
    setErrorMessage('')
    setSuccessAdd('')

    const data = new FormData();
    data.append('company_id', match.params.id);
    category != '' && data.append('category_id', category);

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/companies/attach/category`,
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

        setSuccessAdd("Category has been added to the company successfully.")
        setRefresh(!refresh)
        setCategory('')
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
  const [itemToDelete, setItemToDelete] = useState('')
  const handleShow = (item) => {
    setSmall(!small)
    setItemToDelete(item)
  }
  const handleDelete = async () => {
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity = 0.75;
    const data = new FormData();
    data.append('company_id', match.params.id);
    data.append('category_id', itemToDelete.id);

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/companies/detach/category`,
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

    <>
      {pageStatus == 0 ? <div className="c-app c-default-layout flex-row align-items-center register-cont">

        <CContainer>



          {fetchedData && <>



            <CCard className="">



              <CCardHeader>
                <CRow className=" row-gap-15">

                  <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                    <strong>{fetchedData.name_en}</strong>
                  </CCol>

                  <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
                    <CButton color="info" className='col-lg-3  col-md-3 col-sm-6 col-xs-6 updatebtn'
                      onClick={() => setPageStatus(1)} > Update
                    </CButton>
                    <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                      onClick={() => history.goBack()} > Back
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
                            <CCard>
                              <CCardHeader>
                                <CRow className="">

                                  <CCol md="6" lg="6" xl="6" >
                                    <strong>Add Category</strong>
                                  </CCol>

                                </CRow>

                              </CCardHeader>
                              <CCardBody className=''>

                                <CForm onSubmit={(e) => { handleAddToCat(e) }}  >
                                  <CRow className="justify-content-center" >

                                    <CCol md="8" lg="8" xl="8">

                                      <CFormGroup row>
                                        {/* <CCol md="1">
                                          <CLabel htmlFor="text-input">
                                            
                                          </CLabel>
                                        </CCol> */}
                                        <CCol xs="10" md="10">
                                          <CSelect custom name="country_id"

                                            required value={category} onChange={(e) => setCategory(e.target.value)}  >
                                            <option value='' >
                                              Select Category
                                            </option>
                                            {categories.length > 0 && categories.map((cat) => {
                                              return (<option value={cat.id} key={cat.id}>
                                                {cat.name_en}
                                              </option>)
                                            })}

                                          </CSelect>
                                        </CCol>
                                      </CFormGroup>

                                    </CCol>



                                    <CCol md="4" lg="4" xl="4" className='mr-t' >
                                      {/* className=" row-gap-15 col-gap-15 " */}
                                      <CButton color="success" className='col-12' type='submit'
                                      > Add   {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
                                        {/* className='col-lg-2  col-md-2 col-sm-12 col-xs-12 ' */}
                                      </CButton>

                                    </CCol>

                                  </CRow>
                                </CForm>
                              </CCardBody>
                              {/* <CCardFooter className="p-4"> */}
                              <CRow className="justify-content-center">

                                <CCol md='12' >
                                  <CCol md='12' >

                                    {errorMessage &&


                                      <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                                        color="danger"
                                        // closeButton
                                        show={visible}
                                        // closeButton
                                        onShowChange={setVisible}
                                      >
                                        {Object.keys(errorMessage).map((item, i) => (<>{errorMessage[item]}<br /></>))}
                                      </CAlert>

                                    }




                                    {succesAdd &&


                                      <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                                        color="success"
                                        show={visible}
                                        // closeButton
                                        onShowChange={setVisible}
                                      // closeButton
                                      >
                                        {succesAdd}
                                      </CAlert>


                                    }
                                  </CCol>

                                </CCol>

                              </CRow>


                              {fetchedData.categories && fetchedData.categories.length > 0 &&
                                <CCardFooter className="p-4"> <CRow md='12' >
                                  <CCol md='12'> <strong>Categories</strong> </CCol>
                                  {

                                    fetchedData.categories.length > 0 && fetchedData.categories.map((cat, index) => {
                                      return (

                                        <CCol key={cat.id} md='6' >


                                          <ul className=" card list-group list-group-flush">
                                            <li className="list-group-item  ">
                                              <strong>Arabic Name :{' '}</strong> {cat.name_ar}
                                              <br />
                                              <strong>   English Name :  {' '}</strong>  {cat.name_en}</li>
                                            {/* <CCol xs="12" md="12"> */}


                                            <CButton color="secondary" className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '
                                              onClick={() => handleShow(cat)}
                                              style={{ borderRadius: '0' }} >
                                              Remove
                                            </CButton>

                                            {/* </CCol> */}
                                          </ul>

                                        </CCol>



                                      )
                                    })}
                                </CRow> </CCardFooter>}

                              <CModal
                                show={small}
                                onClose={() => setSmall(!small)}
                                size="sm"
                                color='danger'
                              >
                                <CModalHeader closeButton>
                                  <CModalTitle>Remove Category</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                  {`Are you sure you want to delete a category from the company (  ${itemToDelete.name_en} )`}
                                </CModalBody>
                                <CModalFooter>
                                  <CButton color="danger" onClick={() => handleDelete()}>Remove</CButton>{' '}
                                  <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
                                </CModalFooter>
                              </CModal>

                            </CCard>



                          </CCol>



                          <CCol className=' p-1' md='6' >

                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item"><strong>Id : {' '}</strong> {fetchedData.id}</li>
                              <li className="list-group-item"><strong>{i18n.language == 'ar' ? `اسم انكليزي :` : `English Name :`}

                                {' '}</strong>  {fetchedData.name_en}</li>
                              <li className="list-group-item  "><strong>Arabic Name :{' '}</strong> {fetchedData.name_ar}</li>
                            </ul>


                          </CCol>
                          <CCol className=' p-1' md='6'>
                            <ul className=" card list-group list-group-flush">
                              <li className="list-group-item">
                                <strong> Logo   </strong>
                                <img className='detLogo' src={global.apiUrl + fetchedData.logo} /></li>

                            </ul>
                            {/* <ul className=" card list-group list-group-flush">


                              {fetchedData.phones && <li className="list-group-item ">
                                <strong>{i18n.language == 'ar' ? "هواتف : " : "Phones :"}</strong><br /> {' / '}
                                {fetchedData && fetchedData.phones.length > 0 && fetchedData.phones.map((phone, index) => {
                                  return (<React.Fragment key={index}>{phone.number + ' / '}</React.Fragment>)
                                })}
                              </li>}




                            </ul> */}
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
