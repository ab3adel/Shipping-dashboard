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
    CSwitch,
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
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'

import { useHistory, useLocation } from 'react-router-dom'

import { CAlert } from '@coreui/react'

import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const UpdateCat = ({ customer, setRefresh, refresh }) => {
    const [t, i18n] = useTranslation();
    const history = useHistory()
    const [visible, setVisible] = useState(10)

    const [modal, setModal] = useState(true)
    const [small, setSmall] = useState(false)

    const [errorMessage, setErrorMessage] = useState();

    const [succesAdd, setSuccessAdd] = useState()
    const [loading, setLoading] = useState('')
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [pickedImg, setPickedImg] = useState('')
    const [inputType, setInputType] = useState('2')



    const [itemToDelete, setItemToDelete] = useState('')

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


    // const [data, setData] = useState({ _method: 'put', })
    const handleAddToCat = async (e) => {
        e.preventDefault()
        setLoading(true)

        setErrorMessage('')
        setSuccessAdd('')
        var data = new FormData()
        data.append('customer_id', customer.id)
        category != '' && data.append('category_id', category);


        try {
            const responsee = await fetch(
                `${global.apiUrl}api/customers/attach/category`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        // "Content-Type": "application/json",
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
            setVisible(10)
            if (response.success) {
                setSuccessAdd("تمت اضافة تصنيف الى  الزبون بنجاح")
                setRefresh(!refresh)
                setCategory('')
                setVisible(7)


            }
            else {

                setVisible(10)
                setErrorMessage(response.messages)


            }


        } catch (err) {
            console.log(err);

        }

        setLoading(false)
    }

    const handleShow = (item) => {
        setSmall(!small)
        setItemToDelete(item)
    }
    const handleDelete = async () => {
        setErrorMessage('')
        setSuccessAdd('')
        document.getElementById('root').style.opacity = 0.75;
        const data = new FormData();
        data.append('customer_id', customer.id)
        data.append('category_id', itemToDelete.id);

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/customers/detach/category`,
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
            else {
                setErrorMessage(response.messages)
                setSmall(!small)
            }

        } catch (err) {
            console.log(err);

        }
        document.getElementById('root').style.opacity = 1;

    }



    return (
        <CRow>
            <CCol xs="12" sm="12" md="12" className=''>         <CCol xs="12" sm="12" md="12" className=''>
                <CCard>
                    <CCardHeader>
                        <CRow className="">

                            <CCol md="6" lg="6" xl="6" >
                                <strong> اضافة تصنيف </strong>
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
                                                    اختر تصنيف
                                                </option>
                                                {categories.length > 0 && categories.map((cat) => {
                                                    return (<option value={cat.id} key={cat.id}>
                                                        {cat.name_ar}
                                                    </option>)
                                                })}

                                            </CSelect>
                                        </CCol>
                                    </CFormGroup>

                                </CCol>



                                <CCol md="4" lg="4" xl="4" className='mr-t' >
                                    {/* className=" row-gap-15 col-gap-15 " */}
                                    <CButton color="success" className='col-12' type='submit'
                                    > إضافة   {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
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


                    {customer.categories && customer.categories.length > 0 &&
                        <CCardFooter className="p-4"> <CRow md='12' >
                            <CCol md='12'> <strong>التصنيفات</strong> </CCol>
                            {

                                customer.categories.length > 0 && customer.categories.map((cat, index) => {
                                    return (

                                        <CCol key={cat.id} md='6' >


                                            <ul className=" card list-group list-group-flush">
                                                <li className="list-group-item arabic-align">
                                                    <strong>اسم عربي :{' '}</strong> {cat.name_ar}
                                                    <br />
                                                    <strong>  اسم انكليزي :  {' '}</strong>  {cat.name_en}</li>
                                                {/* <CCol xs="12" md="12"> */}


                                                <CButton color="secondary" className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '
                                                    onClick={() => handleShow(cat)}
                                                    style={{ borderRadius: '0' }} >
                                                    إزلة التصنيف
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
                            <CModalTitle>  إزالة تصنيف </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {`هل انت متأكد أنك تريد حذف تصنيف الزبون (  ${itemToDelete.name_ar} )`}
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" onClick={() => handleDelete()}>حذف </CButton>{' '}
                            <CButton color="secondary" onClick={() => setSmall(!small)}>الغاء</CButton>
                        </CModalFooter>
                    </CModal>

                </CCard>



            </CCol>       </CCol>


        </CRow>


    )
}

export default UpdateCat




























