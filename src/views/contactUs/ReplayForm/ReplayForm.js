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
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ReplayForm.scss'
import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";

import '../../../globalVar'
import Editor from './editor'
const ReplayForm = ({ dataText, setDataText, }) => {

  return (


    <CCol md="12" lg="12" xl="12">

      <Editor className='col-md-12' setDataText={setDataText} dataText={dataText} />
    </CCol>



  )
}

export default ReplayForm

