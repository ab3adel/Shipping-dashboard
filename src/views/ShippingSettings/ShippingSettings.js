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
import './ShippingSettings.scss'




const ShippingSettings = () => {
  const history = useHistory()


  const [data, setData] = useState('')

  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);



  useEffect(async () => {
    const fetchitems = async (e) => {



      try {
        const responsee = await fetch(
          `${global.apiUrl}api/settings/settings`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },


          }
        );
        const response = await responsee.json();

        console.log('faqs', response);
        if (response.success) {
          setData(response.payload)

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
  }, [])





  return (

    <CRow>

      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow className=" row-gap-15">
              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                Settings
              </CCol>

              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.push('/Settings/Update')} >Update Settings
                </CButton>

              </CCol>

            </CRow>

          </CCardHeader>
          <CCardBody  >
            {data && <>
              <CRow>
                <CCol md='12' className={'mb-1 mt-2 '}><strong>Company Information</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>Name</td>
                        <td><strong>{data.name}</strong></td>
                      </tr>
                      <tr >
                        <td>Company Name</td>
                        <td><strong>{data.company_name}</strong></td>
                      </tr>
                      <tr >
                        <td>Phone</td>
                        <td><strong>{data.phone}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Mobile</td>
                        <td><strong>{data.cell_phone}</strong></td>
                      </tr>
                      <tr >
                        <td>Max Shipment Weight</td>
                        <td><strong>{data.maximum_weight + " "} (KG) </strong></td>
                      </tr>
                      <tr >
                        <td>Pickup Time for Dhl</td>
                        <td><strong>{data.pickup_time}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
                <hr style={{ width: '100%' }} />

                <CCol md='12' className={'mb-1 mt-2 '}><strong>Shipping Accounts</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>DHL</td>
                        <td><strong>{data.dhl_email}</strong></td>
                      </tr>
                      <tr >
                        <td>FEDEX</td>
                        <td><strong>{data.fedex_email}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>ARAMEX</td>
                        <td><strong>{data.aramex_email}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>
                <hr style={{ width: '100%' }} />

                <CCol md='12' className={'mb-1 mt-2 '}><strong>Address</strong></CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>Country Code</td>
                        <td><strong>{data.country_code}</strong></td>
                      </tr>
                      <tr >
                        <td>City</td>
                        <td><strong>{data.city}</strong></td>
                      </tr>
                      <tr >
                        <td>      Postal Code , State   </td>
                        <td><strong>{'Postal : '}{data.postal_code ? data.postal_code : "-"} , {` State :`}{data.state_or_province_code ? data.state_or_province_code : "-"}   </strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={6}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>Line 1 :</td>
                        <td><strong>{data.street_line_1}</strong></td>
                      </tr>
                      <tr >
                        <td>Line 2 :</td>
                        <td><strong>{data.street_line_2}</strong></td>
                      </tr>
                      <tr >
                        <td>Line 3 :</td>
                        <td><strong>{data.street_line_3}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>




                    </tbody>
                  </table>
                </CCol>

              </CRow>






            </>}
          </CCardBody>
        </CCard>
      </CCol>




    </CRow>
  )
}

export default ShippingSettings
