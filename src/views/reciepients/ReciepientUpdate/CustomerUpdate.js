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
    CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'


import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
import Attachments from './Attachments'
import UpdateCategory from './UpdateCategory'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const CustomerUpdate = ({ customer, setRefresh, refresh }) => {
    const [t, i18n] = useTranslation();

    const [visible, setVisible] = useState(10)



    const [errorMessage, setErrorMessage] = useState();

    const [succesAdd, setSuccessAdd] = useState()
    const [loading, setLoading] = useState('')
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [pickedImg, setPickedImg] = useState('')


    const [upData, setUpData] = useState({

        address: customer.address,
        phone: customer.phone,
        company: customer.company,
        bank_name: customer.bank_name,
        bank_account_number: customer.bank_account_number,
        IBAN_number: customer.IBAN_number,
        attachments: customer.attachments,
    })
    const { address,
        phone,
        company,
        bank_name,
        bank_account_number,
        IBAN_number,
        attachments } = upData;






    const handleData = (e) => {
        setUpData({ ...upData, [e.target.name]: e.target.value })

        setErrorMessage('')
        setSuccessAdd('')
    }
    // const [data, setData] = useState({ _method: 'put', })
    const handleAddUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        setErrorMessage('')
        setSuccessAdd('')
        var data = new FormData()
        data.append('_method', 'put')
        company && data.append('company', company)
        address && data.append('address', address)
        phone && data.append('phone', phone)
        bank_name && data.append('bank_name', bank_name)
        bank_account_number && data.append('bank_account_number', bank_account_number)
        IBAN_number && data.append('IBAN_number', IBAN_number)
        try {
            const responsee = await fetch(
                `${global.apiUrl}api/customers/${customer.id}`,
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
                await setVisible(6)
                setSuccessAdd("تم تعديل معلومات الزبون بنجاح")
                // setData({ _method: 'put', })
                setRefresh(!refresh)


            }
            else {

                setVisible(10)
                setErrorMessage(response.errors)


            }


        } catch (err) {
            console.log(err);

        }

        setLoading(false)
    }





    const handleImg = (e) => {
        if (e.target.files[0]) { setPickedImg(e.target.files[0]) }
    }
    console.log('data', upData)
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12" className=''>
                    <CForm onSubmit={(e) => { handleAddUser(e) }}>
                        <CCardBody>
                            <CCard>
                                <CCardBody>
                                    <CRow >


                                        {/* className="justify-content-center" */}

                                        <CCol md='12'> <strong>معلومات الزبون </strong></CCol>
                                        <CCol md="6" lg="6" xl="6">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">رقم الهاتف</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="phone"
                                                        autoComplete='off'
                                                        onChange={handleData}
                                                        placeholder={`رقم الهاتف`}
                                                        value={upData.phone} />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">{`الشركة`}</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="company"
                                                        autoComplete='off'
                                                        type='text'
                                                        onChange={handleData}
                                                        placeholder={`الشركة`}
                                                        value={upData.company} />
                                                </CCol>
                                            </CFormGroup>

                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">{`العنوان`}</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="address"
                                                        autoComplete='off'
                                                        type='text'
                                                        onChange={handleData}
                                                        placeholder={`العنوان`}
                                                        value={upData.address} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>


                                        <CCol md="6" lg="6" xl="6">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">اسم البنك </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="bank_name"
                                                        autoComplete='off'
                                                        onChange={handleData}
                                                        placeholder={`اسم البنك`}
                                                        value={upData.bank_name} />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">{`رقم الحساب البنكي`}</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="bank_account_number"
                                                        autoComplete='off'
                                                        type='text'
                                                        onChange={handleData}
                                                        placeholder={`رقم الحساب البنكي`}
                                                        value={upData.bank_account_number} />
                                                </CCol>
                                            </CFormGroup>

                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">{`رقم IBAN`}</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="IBAN_number"
                                                        autoComplete='off'
                                                        type='text'
                                                        onChange={handleData}
                                                        placeholder={`رقم IBAN`}
                                                        value={upData.IBAN_number} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>






                                    </CRow>


                                </CCardBody>
                                <CCardFooter className="p-4">
                                    <CRow className="justify-content-center">

                                        {errorMessage &&
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
                                            </CAlert>}

                                        {succesAdd &&

                                            <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                                                color="success"
                                                show={visible}
                                                // closeButton
                                                onShowChange={setVisible}
                                            // closeButton
                                            >
                                                {succesAdd}
                                            </CAlert>}

                                        <CCol md="6" lg="6" xl="6" xs="12" sm="12" >
                                            {<CButton color="success" block type='submit'>
                                                حفظ
                                                {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>}
                                        </CCol>

                                    </CRow>
                                </CCardFooter>
                            </CCard>



                        </CCardBody>

                    </CForm>
                </CCol>
            </CRow>
            <UpdateCategory customer={customer} setRefresh={setRefresh}
                refresh={refresh} />
            <Attachments customer={customer} setRefresh={setRefresh}
                refresh={refresh} />


        </>



    )
}

export default CustomerUpdate
