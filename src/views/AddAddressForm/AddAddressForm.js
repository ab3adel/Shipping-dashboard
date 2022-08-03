import React, { useState, useEffect } from 'react'

import 'react-fancybox/lib/fancybox.css'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CAlert,
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

import '../../globalVar'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const AddAddress = ({ address, status, title, type, openModal, closeModal, id, refreshParent, userID }) => {

    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [errorMessage, setErrorMessage] = useState();
    const [visible, setVisible] = useState(10)
    const [succesAdd, setSuccessAdd] = useState()
    const [loading, setLoading] = useState('')
    const [countries, setCountries] = useState([])
    const [countryDetails, setCountryDetails] = useState({ postalCode: false, stateCode: false })
    const [cities, setCities] = useState([])
    const [data, setData] = useState({
        country: null, city: null, line_1: '',
        line_2: '', line_3: '', post_code: '', state_code: '',
        area: "", Block: "", jaddah: "", street: "", building: "",
        floor: "", flat: "", PCAIID: "",
        recipient_name_en: "",
        recipient_name_ar: "",
        recipient_phone: "",
        email: "",

    })



    useEffect(async () => {

        const fetchCountries = async (e) => {
            try {
                const responsee = await fetch(`${global.apiUrl}api/countries`,
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
                    setCountries(response.payload)
                    if (type === 'sendAddress' && status === "new") {
                        handleCountry(response.payload.filter(item => item.id === 117)[0])
                    }
                    if ((type === 'sendAddress' || type === 'recipientAddress') && status === "update") {
                        await handleCountry(response.payload.filter(item => item.id === address.city.country.id)[0])
                        // await handleCity(address.city)
                        if (address.city.country.id === 117) {
                            setData({
                                ...data, country: address.city.country, city: address.city,
                                area: JSON.parse(address.line_1).Area,
                                Block: JSON.parse(address.line_1).Block,
                                jaddah: JSON.parse(address.line_1).Jaddah,
                                street: JSON.parse(address.line_2).Street,
                                building: JSON.parse(address.line_2).Building,
                                floor: JSON.parse(address.line_3).Floor,
                                flat: JSON.parse(address.line_3).Flat,
                                PCAIID: JSON.parse(address.line_3).PCAIID
                            })
                        }
                        else {
                            setData({
                                ...data, country: address.city.country, city: address.city,
                                line_1: address.line_1,
                                line_2: address.line_2 ? address.line_2 : "",
                                line_3: address.line_3 ? address.line_3 : "",
                                post_code: address.post_code ? address.post_code : "",
                                state_code: address.state_code ? address.state_code : "",
                            })
                        }


                    }
                }

            } catch (err) { console.log(err); }

        }
        if (type === 'recipient' && status === "update") {
            setData({
                ...data,
                recipient_name_en: address.recipient_name_en,
                recipient_name_ar: address.recipient_name_ar,
                recipient_phone: address.recipient_phone,
                email: address.email,

            })

        }
        else {
            fetchCountries()
        }

    }, [])
    const handleCountry = async (value) => {
        if (value != null) {

            setData({
                ...data, country: value, city: null,
                post_code: value.postal_aware == 0 ? '' : data.post_code,
                state_code: value.state_or_province == 0 ? '' : data.state_code,
            })
            fetchCities(value.id)

            setCountryDetails({ postalCode: value.postal_aware !== 0, stateCode: value.state_or_province !== 0 })
            // value.postal_aware == 0 && setData({ ...data, post_code: '', });
            // value.state_or_province == 0 && setData({ ...data, state_code: '', });


        }
        else {
            setCountryDetails({ postalCode: false, stateCode: false })
            setData({ ...data, country: null })
            setCities([])
        }

    }
    const handleCity = async (value) => {
        if (value != null) {

            setData({ ...data, city: value })

        }
        else {
            setData({ ...data, city: null })

        }
    }



    const fetchCities = async (id) => {
        try {
            const responsee = await fetch(
                `${global.apiUrl}api/cities/getCityByCountryId?country_id=${id}`,
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
            if (response.success) {
                setCities(response.payload)

            }

        } catch (err) { console.log(err); }

    }

    const handleAddAddress = async (e) => {
        // customer_id: profile.customer.id,

        e.preventDefault()
        setLoading(true)
        setErrorMessage('')
        setSuccessAdd('')
        let url = 'api/address'

        let dataNew = {
            customer_id: userID,

        }

        if (status === "update" && type != "recipient") { url = `api/address/${address.id}?_method=put` }
        if (type === 'sendAddress' && status === "new") { dataNew = { ...dataNew, outgoing: true, } }
        if (type === 'recipient' && status === "new") {
            dataNew = {
                ...dataNew,
                recipient_id: null, outgoing: false,
                recipient_name_en: data.recipient_name_en,
                recipient_name_ar: data.recipient_name_ar,
                recipient_phone: data.recipient_phone,
                email: data.email,
            }
        }
        if (type === 'recipient' && status === "update") {
            dataNew = {
                name_en: data.recipient_name_en,
                name_ar: data.recipient_name_ar,
                phone: data.recipient_phone,
                email: data.email,
            }
            url = `api/recipients/${id}?_method=put`
        }
        else {
            {
                dataNew = {
                    ...dataNew,
                    address: {
                        city_id: data.city.id,
                        line_1: data.country.id === 117 ?
                            `{"Area":"${data.area}", "Block":"${data.Block}", "Jaddah":"${data.jaddah ? data.jaddah : ""}" }`
                            :
                            data.line_1,
                        line_2: data.country.id === 117 ?
                            `{"Street":"${data.street}", "Building":"${data.building}" }`
                            :
                            data.line_2 ? data.line_2 : '',
                        line_3: data.country.id === 117 ?
                            `{"Floor":"${data.floor ? data.floor : ""}", "Flat":"${data.flat ? data.flat : ""}", "PCAIID":"${data.PCAIID ? data.PCAIID : ""}" }`
                            :

                            data.line_3 ? data.line_3 : '',
                        main: 1,
                        post_code: data.country.id === 117 ? "" : data.post_code ? data.post_code : '',
                        state_code: data.country.id === 117 ? "" : data.state_code ? data.state_code : '',
                        type: 'home'
                    }
                }
            }
        }

        if (type === 'recipientAddress' && status === "new") { dataNew = { ...dataNew, outgoing: false, recipient_id: id, } }
        try {
            const responsee = await fetch(
                `${global.apiUrl + url}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(dataNew),
                }
            );
            const response = await responsee.json();

            if (response.success) {
                await setVisible(6)
                if ((type === 'recipient' && status === "update") || type == "recipientAddress") {
                    refreshParent(id)
                }
                else { refreshParent(userID) }

                if (status === "new") {
                    if (type === 'sendAddress') {
                        setData({
                            city: null, line_1: '',
                            line_2: '', line_3: '', post_code: '', state_code: '',
                            area: "", Block: "", jaddah: "", street: "", building: "", floor: "", flat: "",
                            PCAIID: "", recipient_name_en: "", recipient_name_ar: "", recipient_phone: "", email: "",
                        })
                        setSuccessAdd("Sending address added.")
                    }
                    if (type === 'recipient') {
                        setData({
                            country: null, city: null, line_1: '',
                            line_2: '', line_3: '', post_code: '', state_code: '',
                            area: "", Block: "", jaddah: "", street: "", building: "", floor: "", flat: "",
                            PCAIID: "", recipient_name_en: "", recipient_name_ar: "", recipient_phone: "", email: "",
                        })
                        setSuccessAdd("Recipient has been added")
                    }
                    if (type === 'recipientAddress') {
                        setData({
                            country: null, city: null, line_1: '',
                            line_2: '', line_3: '', post_code: '', state_code: '',
                            area: "", Block: "", jaddah: "", street: "", building: "", floor: "", flat: "",
                            PCAIID: "", recipient_name_en: "", recipient_name_ar: "", recipient_phone: "", email: "",
                        })
                        setSuccessAdd("Address to the Recipient has been added")
                    }

                }
                else if (status === "update") {
                    if (type === 'sendAddress') { setSuccessAdd("Sending address has been modified.") }
                    if (type === 'recipientAddress') { setSuccessAdd("Recipient address has been modified") }
                    if (type === 'recipient') { setSuccessAdd("Recipient information has been modified") }

                }
                closeModal()
            }
            else {

                setVisible(10)
                setErrorMessage(response.messages)


            }


        }
        catch (err) { console.log(err); }
        setLoading(false)
    }
    const handleAddressData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setErrorMessage('')
        setSuccessAdd('')

    }
    console.log('data', data)

    return (



        <CModal
            show={openModal}
            onClose={() => closeModal()}
            size="lg"
            color='primary'
        >
            <CModalHeader closeButton>
                <CModalTitle>
                    {title}

                </CModalTitle>
            </CModalHeader>

            <CForm onSubmit={(e) => { handleAddAddress(e) }}>
                <CModalBody>
                    <CRow>
                        {type === "recipient" &&
                            <>
                                <CCol md="6" lg="6" xl="6">
                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel htmlFor="text-input">Arabic Name</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">

                                            <CInput name="recipient_name_ar"
                                                required
                                                autoComplete='off'
                                                onChange={(e) => handleAddressData(e)}
                                                placeholder='Arabic Name'
                                                value={data.recipient_name_ar} />
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6" lg="6" xl="6">
                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel htmlFor="text-input">   English Name      </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">

                                            <CInput name="recipient_name_en"
                                                required
                                                autoComplete='off'
                                                onChange={(e) => handleAddressData(e)}
                                                placeholder='English Name'
                                                value={data.recipient_name_en} />
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6" lg="6" xl="6">
                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel htmlFor="text-input">  Phone  </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">

                                            <CInput name="recipient_phone"
                                                required
                                                autoComplete='off'
                                                onChange={(e) => handleAddressData(e)}
                                                placeholder='Phone'
                                                value={data.recipient_phone} />
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="6" lg="6" xl="6">
                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel htmlFor="text-input">   Email   </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">

                                            <CInput name="email"
                                                required
                                                autoComplete='off'
                                                onChange={(e) => handleAddressData(e)}
                                                placeholder='Email'
                                                value={data.email} />
                                        </CCol>
                                    </CFormGroup>
                                </CCol>



                            </>
                        }
                        {(type === 'recipient' && status === "update") ?
                            <></>
                            :

                            <>

                                <CCol md="6" lg="6" xl="6">

                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel htmlFor="text-input">Country </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">
                                            {/* <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}> */}
                                            <div  >
                                                <Autocomplete
                                                    // id="country-select-demo"
                                                    size="small"
                                                    autoComplete='off'
                                                    options={countries}
                                                    required
                                                    autoHighlight

                                                    disabled={type === 'sendAddress'}
                                                    rtl='true'
                                                    value={data.country}
                                                    onChange={(event, newValue) => {
                                                        handleCountry(newValue);
                                                    }}
                                                    getOptionLabel={(option) => option.country_name_en + "  " + option.country_code}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
                                                                alt=""
                                                            />
                                                            {option.country_name_en} ({option.country_code})
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            required
                                                            autoComplete="new-password"
                                                            {...params}
                                                            label={"Select Country"}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'off', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />

                                            </div>
                                            {/* </ThemeProvider>
                                            </CacheProvider> */}
                                        </CCol>
                                    </CFormGroup>

                                </CCol>
                                <CCol md="6" lg="6" xl="6">

                                    <CFormGroup row>
                                        <CCol md="12">
                                            <CLabel htmlFor="text-input">City </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">
                                            {/* <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}> */}
                                            <div  >
                                                <Autocomplete
                                                    id="country-select-demo"
                                                    size="small"
                                                    options={cities}
                                                    autoComplete='off'
                                                    autoHighlight

                                                    value={data.city}
                                                    onChange={(event, newValue) => {
                                                        handleCity(newValue);
                                                    }}
                                                    getOptionLabel={(option) => option.name_en}

                                                    renderInput={(params) => (
                                                        <TextField
                                                            required
                                                            autoComplete="new-password"
                                                            {...params}
                                                            label={"Select City"}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: "new-password", // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />

                                            </div>
                                            {/* </ThemeProvider>
                                            </CacheProvider> */}




                                        </CCol>
                                    </CFormGroup>

                                </CCol>
                                {data.country && data.country.id === 117 ?
                                    <>
                                        <CCol md="6" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">   Area   </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="area"
                                                        required

                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Area'
                                                        value={data.area} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">   Block   </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="Block"
                                                        required autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Block'
                                                        value={data.Block} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">   Jaddah   </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="jaddah" autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Jaddah'
                                                        value={data.jaddah} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">Street</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="street"
                                                        required autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Street'
                                                        value={data.street} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">Building</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="building"
                                                        required autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Building'
                                                        value={data.building} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="2" xl="2">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">Floor</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="floor"
                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Floor'
                                                        value={data.floor} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="2" xl="2">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">Flat</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="flat"
                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='Flat'
                                                        value={data.flat} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="6" lg="2" xl="2">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">PCAIID</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="PCAIID"
                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder='PCAIID'
                                                        value={data.PCAIID} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                    </>
                                    :
                                    <>
                                        <CCol md="12" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">            Line 1    </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="line_1"
                                                        required
                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder={`Line 1`}
                                                        value={data.line_1} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="12" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">Line 2</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="line_2"
                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder={`Line 2`}
                                                        value={data.line_2} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="12" lg="4" xl="4">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">        Line 3    </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="line_3"
                                                        autoComplete='off'
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder={`Line 3`}
                                                        value={data.line_3} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="3" lg="3" xl="3">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">   State Code     </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="state_code"
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder={`State Code`}
                                                        value={data.state_code}
                                                        required={countryDetails.stateCode}
                                                        disabled={!countryDetails.stateCode}
                                                    />

                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol md="3" lg="3" xl="3">
                                            <CFormGroup row>
                                                <CCol md="12">
                                                    <CLabel htmlFor="text-input">   Postal Code  </CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">

                                                    <CInput name="post_code"
                                                        required={countryDetails.postalCode}
                                                        disabled={!countryDetails.postalCode}
                                                        onChange={(e) => handleAddressData(e)}
                                                        placeholder={`Postal Code`}
                                                        value={data.post_code} />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                    </>
                                }
                            </>
                        }
                    </CRow>
                    <CRow className="justify-content-center">

                        {errorMessage &&
                            <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 mb-0 '
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

                            <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 mb-0 '
                                color="success"
                                show={visible}
                                // closeButton
                                onShowChange={setVisible}
                            // closeButton
                            >
                                {succesAdd}
                            </CAlert>}


                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" type='submit' onClick={(e) => handleAddAddress(e)}>
                        Save
                        {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModal()}>Cancel</CButton>
                </CModalFooter>
            </CForm>

        </CModal>


    )
}

export default AddAddress
