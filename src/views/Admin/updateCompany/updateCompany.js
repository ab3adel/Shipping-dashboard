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
import './updateCompany.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const UpdateCompany = ({setPageStatus,updatefetchedData,refresh,setRefresh}) => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])

  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);
  // updatefetchedData.logo_url
  // updatefetchedData.phones
 
 
  
  const [upData, setUpData] = useState({
    name_en: updatefetchedData.name_en,
    name_ar: updatefetchedData.name_ar,
    criteriaDirection:  updatefetchedData.criteria_direction,
    criteriaDigits:  updatefetchedData.criteria_digits,
    countryId: updatefetchedData.country_id,
    address:updatefetchedData.address


  })
  const { name_en,
    name_ar,
    criteriaDirection,
    criteriaDigits,
    countryId,
 
    address


  } = upData;
  const [phones, setPhones] = useState([""])
  const [oldPhones, setOldPhones] = useState([""])
  const [phoneslength, setPhoneslength] = useState()
  useEffect(async () => {
    // let temp=[]
     
    // await updatefetchedData.phones.map((phone,index)=>{
      
    //  temp.push(
    //   phone.number
    //   )
  
    // })
    // setOldPhones(temp)
    // setPhones(temp)
    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/countries`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,

              Accept: "application/json",
            },
          }
        );
        const response = await responsee.json();
        console.log(response);

        if (response.success) {
          setfetchedData(response.payload)
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

    fetchCountries()
  }, [refresh])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }

  const handlePhones = (i,e) => {
    setPhones(...[phones, (phones[i] = e.target.value)]);
    console.log('phones', phones)
    console.log('i', i)
    console.log('e', e.target.value)

  };

  // add row
  const [addRow, setaddrow] = useState([]);
  const handladdRow = (e) => {
    setaddrow([...addRow, 1]);
  };



  const handleAddCompany = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    const data = new FormData();
    upData.name_en!=updatefetchedData.name_en && data.append("name_en", name_en);
    upData.criteriaDirection && data.append("criteria_direction", criteriaDirection);
    upData.name_ar!=updatefetchedData.name_ar && data.append("name_ar", name_ar);
    upData.criteriaDigits && data.append("criteria_digits", criteriaDigits);
    countryId && data.append("country_id", countryId);
    upData.address && data.append("address", address);
     phones.map((item, index) => {
     phones[index] != ''&&data.append("phones[]", phones[index]);
    });
    pickedImg && data.append('logo', pickedImg);
    data.append('_method', 'put');
   
    // 
    try {
      const responsee = await fetch(
        `${global.apiUrl}/admin/company`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            //  "Content-Type": "application/json",
            //'Access-Control-Allow-Origin': 'https://localhost:3000',
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
      if (response.payload) {
        await setVisible(6)
        setSuccessAdd(i18n.language == 'ar' ? "تم تعديل معلومات الشركة بنجاح" : "Company Updated Successfuly")
// document.getElementById('phone1').value=''
await setRefresh(!refresh)
        // setUpData({
        //   name_en: '',
        //   name_ar: '',
        //   criteriaDirection: '',
        //   criteriaDigits: '',
        //   countryId: '',
        //   departmentAr: '',
        //   departmentEn: '',
        //   userName: '',
        //   userUserName: '',
        //   email: '',
        //   extentionNumber: '',
        //   password: '',
        //   confirmPassword: '',
        //   userPosition: '',
        //   address:''
        // })
        setPhones([""])
        // setPickedImg('')
        setaddrow([])
        setVisible(6)
      }
      else {

        await setVisible(10)
        setErrorMessage(response.messages)


      }


    } catch (err) {
      console.log(err);

    }

    setLoading(false)
  }

  const handleDelete=async(id)=>{
    setErrorMessage('')
    setSuccessAdd('')
    document.getElementById('root').style.opacity=0.75;
  
   
  
  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/admin/company/phones/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userToken,
         
          Accept: "application/json",
        },
   
    
      }
    );
    const response = await responsee.json();
    console.log('response',response);
    console.log(response);
    if(response.success==true&& response.payload){
     
      document.getElementById('root').style.opacity=1;
     
     setRefresh(!refresh)
    
    }
    // else{
    // setErrorMessage(response.errors)
    // }
   
  } catch (err) {
    console.log(err);
   
  }
  document.getElementById('root').style.opacity=1;
  
  }



  const handleImg = (e) => {
    if (e.target.files[0]) { setPickedImg(e.target.files[0]) }
  }
  console.log('data', upData)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong> {i18n.language == 'ar' ? updatefetchedData.name_ar : updatefetchedData.name_en}</strong>
              </CCol>
              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
       
       <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
      onClick={()=>setPageStatus(0)} >
         {i18n.language == 'ar' ? `رجوع` :   `Back`}
             </CButton>
          
       </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddCompany(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                        <CCol md='12'> <strong>
                          {i18n.language == 'ar' ? "معلومات الشركة :" : "Company Informations :"}
                          </strong></CCol>

                        {/* className="justify-content-center" */}
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "الاسم الانكليزي" : "English Name"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? "الاسم الانكليزي" : "English Name"}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>

                        </CCol>

                        <CCol md="6" lg="6">
                          <CFormGroup row className='arabic-align'>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">الاسم العربي</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">


                              <CInput name="name_ar" required
                                onChange={handleData}

                                placeholder="الاسم العربي" value={upData.name_ar} />


                            </CCol>
                          </CFormGroup>

                        </CCol>

              
                     

                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "اتجاه المعايير" : "Criteria Direction"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="criteriaDirection" id="select"
                                required value={criteriaDirection} onChange={(e) => handleData(e)}>
                                <option value='' >{i18n.language == 'ar' ? "اختر اتجاه" : "Select direction"}
                                </option>

                                <option value='left'>{i18n.language == 'ar' ? "يسار" : "Left"}</option>
                                <option value='right'>{i18n.language == 'ar' ? "يمين" : "Right"}</option>

                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? "أرقام المعايير" : "Criteria Digits"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CInput name="criteriaDigits"
                                required
                                type='number'
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? "أرقام المعايير" : "Criteria Digits"}
                                value={upData.criteriaDigits} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "الدولة" : "Country"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="countryId"
                                required value={upData.countryId} onChange={(e) => handleData(e)}>
                                <option value='' >
                                  {i18n.language == 'ar' ? "اختر دولة" : "Select Country"}
                                </option>
                                {fetchedData.length > 0 && fetchedData.map((country) => {
                                  return (<option value={country.id} key={country.id}>
                                    {i18n.language == 'ar' ? country.name_ar : country.name_en}
                                  </option>)
                                })}

                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6" xl="6">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {i18n.language == 'ar' ? "العنوان" : "Address"}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="address"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? "العنوان" : "Address"}
                                value={upData.address} />
                            </CCol>
                          </CFormGroup>

                       </CCol>
                       {updatefetchedData.phones.length>0&&updatefetchedData.phones.map((phone,index)=>{
                         return(<CCol md="6" lg="6" xl="6" key={phone.id}>
                      
                         <CFormGroup  row>
                           <CCol md="12">
                             <CLabel htmlFor="text-input">
                             {i18n.language == 'ar' ? `هاتف (${(index +1)})` : `Phone (${(index + 1)})`}
                             </CLabel>
                           </CCol>
                           <CCol xs="9" md="9">

                             <CInput disabled
                               defaultValue={phone.number}
                               onChange={(e)=>handlePhones(index,e)}
                               placeholder={i18n.language == 'ar' ? `هاتف (${(index +1)})` : `Phone (${(index + 1)})`} />
                           </CCol>
                           <CCol md='3'>
                         {/* className='col-lg-3  col-md-3 col-sm-3 col-xs-3' updatebtn */}
                         <CButton color="danger"  type='button' className='col-md-12'
           onClick={()=>handleDelete(phone.id)} ><i class="fa fa-trash" aria-hidden="true"></i>
                  </CButton>

                         </CCol>
                         </CFormGroup>
                     
                       </CCol>)
                       })}
                        
                        {addRow.length > 0 &&
                          addRow.map((row, index) => {
                            return (
                              <CCol md="6" lg="6" xl="6" key={index}>

                                <CFormGroup row>
                                  <CCol md="12">
                                    <CLabel htmlFor="text-input">
                                      {i18n.language == 'ar' ? ` هاتف جديد (${(index +1)})` : `New Phone (${(index +1)})`}</CLabel>
                                  </CCol>
                                  <CCol xs="12" md="12">

                                    <CInput name="name_en"
                                      onChange={(e)=>handlePhones((index ),e)}
                                      placeholder={i18n.language == 'ar' ? ` هاتف جديد (${(index +1)})` : `New Phone (${(index +1)})`}
                                    />
                                  </CCol>
                                </CFormGroup>

                              </CCol>
                            );
                          })}

                        <CCol md="12" lg="12" xl="12">
                          <br></br>
                          <CButton className='col-md-2'
                            onClick={handladdRow}
                            color="info" block type='button'>
                            {i18n.language == 'ar' ? `إضافة هاتف آخر` : `Add More Phones`}
                          </CButton>
                          <br></br>
                        </CCol>
                        <CCol md='6' className='p-4'>
                          <CFormGroup row >
                            <CLabel col md={12}>{i18n.language == 'ar' ? `الشعار` : `Logo`}</CLabel>
                            <CCol xs="12" md="12">

                              <CInputFile  accept="image/*" custom id="custom-file-input" onChange={(e) => { handleImg(e) }} />

                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {pickedImg ? pickedImg.name : i18n.language == 'ar' ? `اختر صورة ...` : `Choose image ...`}

                              </CLabel>
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md='6'>
                          {pickedImg ? <img className="imgLogo" src={URL.createObjectURL(pickedImg)}></img> :
                            <img className="imgLogo" src={updatefetchedData.logo_url}></img>}
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

                            {errorMessage && errorMessage.map((item, i) => (

                              <>{errorMessage[i]}<br /></>

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
                            {t('Save')}
                            {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>}
                        </CCol>

                      </CRow>
                    </CCardFooter>
                  </CCard>



                </CCardBody>

              </CForm>
            </CCol>
          </CRow>

        </CCard>







      </CContainer>
    </div>
  )
}

export default UpdateCompany
