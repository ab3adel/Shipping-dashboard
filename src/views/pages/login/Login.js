import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import "../../../globalVar"
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
const Login = () => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [extensionNumber, setExtensionNumber] = useState("");
  const [emailPass, setEmailPass] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [logged, setLogged] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [succesAdd, setSuccessAdd] = useState()
  const [succesmsg, setSuccessmsg] = useState()
  const [pageStatus, setPageStatus] = useState(0)
  useEffect(() => {
    console.log(tokenString)
    if (tokenString || logged) {
      history.push("/")
    }
  }, [logged])
  const langChange = (langss) => {
    console.log(langss)
    i18n.changeLanguage(langss);
    // console.log(lang)
  }


  const handelOnSubmit = async (e) => {
    setErrorMessage('')
    setSuccessAdd('')
    setSuccessmsg('')
    e.preventDefault();
    const formData = new FormData();
    email && formData.append("email", email);

    formData.append("password", password);
    const requestOptions2 = {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data'
        //  ' X-Requested-With' : 'XMLHttpRequest'
      },
      body: formData,
    };
    try {
      const response = await fetch(
        `${global.apiUrl}api/login`,
        requestOptions2
      );
      setVisible(10)
      const responseData = await response.json();
      console.log(responseData);

      // check Status and errors
      if (responseData.success == false) {
        setErrorMessage(responseData.messages);
        console.log(responseData.messages);
      }
      else if (responseData.error) {
        setErrorMessage(responseData.error);
      }
      else if (responseData.success == true && responseData.payload.admin == 1) {
        setErrorMessage('');

        await localStorage.setItem(
          "token",
          JSON.stringify(responseData.payload.access_token)
        );

        await localStorage.setItem(
          "roles",
          JSON.stringify(responseData.payload.admin)
        );
        console.log('sucseses');
        //  history.push("/")
        setLogged(true)
      }

    } catch (error) {
      console.log(error);
    }
  };
  const handelOnSubmitGetPAss = async (e) => {
    setErrorMessage('')
    setSuccessAdd('')
    setSuccessmsg('')
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", emailPass);

    const requestOptions2 = {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data'
        //  ' X-Requested-With' : 'XMLHttpRequest'
      },
      body: formData,
    };
    try {
      const response = await fetch(
        `${global.apiUrl}/authentication/forgotPassword`,
        requestOptions2
      );
      console.log(response);
      if (response.status == '204') {
        setErrorMessage('Sorry,, This Email not registerd');
        console.log(responseData.message);
      }
      const responseData = await response.json();
      console.log(responseData);

      // check Status and errors
      if (responseData.message && responseData.message == "Please check your email!") {

        setSuccessAdd("Please check your email!")
        setSuccessmsg("Click Back To Login With New Password")


      }
      if (responseData.message && responseData.message !== "Please check your email!") {
        setErrorMessage(responseData.message);
        console.log(responseData.message);
      }
      else if (responseData.error) {
        setErrorMessage(responseData.error);
      }


    } catch (error) {
      console.log(error);
    }
  };



  const handlePage = (x) => {
    setErrorMessage('')
    setPageStatus(x)
    setSuccessAdd('')
    setSuccessmsg('')
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {i18n.language == 'ar' &&
        <Helmet><link rel="stylesheet" type="text/css" href="/assets/arabicStyle/arabicStyle.css" /></Helmet>}
      <CContainer>
        {pageStatus == 0 ? <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => { handelOnSubmit(e) }} >
                    <h1>LOGIN</h1>
                    <p className="text-muted">Login To Your Account</p>
                    {errorMessage && <CAlert
                      color="danger"
                      // closeButton
                      show={visible}
                      onShowChange={setVisible}
                    >

                      {Object.keys(errorMessage).map((item, i) => (

                        <>{errorMessage[item]}<br /></>

                      ))}
                      {/* {errorMessage} */}
                    </CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                          {/* <CIcon name="cil-code" /> */}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="email"
                        name="Username/Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="password" placeholder={"Password"} autoComplete="current-password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type='submit' className="px-4">{'Login'}</CButton>
                      </CCol>

                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
          :

          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={(e) => { handelOnSubmitGetPAss(e) }} >
                      <h1>Forgot password</h1>
                      <p className="text-muted">We will send a new password to your email</p>
                      {errorMessage && <CAlert
                        color="danger"
                        closeButton
                      >
                        {errorMessage}
                      </CAlert>}
                      {succesAdd && <CAlert
                        color="success"
                        closeButton
                      >
                        {succesAdd}<br></br>{succesmsg}
                      </CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput required type="email" placeholder="Email" autoComplete="email"
                          name="Username/Email"
                          value={emailPass}
                          onChange={(e) => setEmailPass(e.target.value)}
                        />
                      </CInputGroup>


                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" type='submit' className="px-4">Send</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0" onClick={() => handlePage(0)} >Back To Login</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
              <CCardBody className="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <Link to="/register">
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>

        }
      </CContainer>
    </div>
  )
}

export default Login
