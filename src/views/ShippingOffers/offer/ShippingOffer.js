import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ReactFancyBox from 'react-fancybox'
import Base64Downloader from 'common-base64-downloader-react';
import 'react-fancybox/lib/fancybox.css'
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
  CInputRadio,
  CFormGroup,
  CLabel,
  CSelect,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCardFooter
} from '@coreui/react'
import { CAlert } from '@coreui/react'
import '../../../globalVar'
import Address from '../../Address/Address'
import '../ShippingOffers.scss'

import { useTranslation } from 'react-i18next';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Invoice from './invoice'

const ShippingOffer = ({ match }) => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [data, setData] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [activeUser, setActiveUser] = useState()
  const [filters, setFilters] = useState({
    accepted: "", active: "",
    paid: "", company_id: "", shipment_id: ""
  })

  const [pageStatus, setPageStatus] = useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [visible, setVisible] = useState(10)
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState('')
  const [succesAdd, setSuccessAdd] = useState()


  useEffect(async () => {
    const fetchOffer = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/offers`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
            },

          }
        );
        const response = await responsee.json();
        // console.log('response',response);

        if (response.success) {

          setActiveUser(response.payload.filter(item => item.id == match.params.id)[0])

          // console.log('faqs', response.payload.filter(item=>item.id==match.params.id)[0]);

        }
        if (response.message) {

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

    fetchOffer()
  }, [refresh])




  const handleShow = async (item) => {

    // setPageStatus(1)
  }
  const [upData, setUpData] = useState({
    accepted: "", hours: '', active: "", days: "", paid: ""
  })
  const [openModal, setOpenModal] = useState(false)

  const closeModal = () => {
    setOpenModal(false)
    setUpData({ accepted: "", hours: '', active: "", days: "", paid: "" })
  }

  const openEModal = () => {
    setUpData({
      accepted: activeUser.accepted, paid: activeUser.paid, hours: '', active: activeUser.active, days: ""
    })
    setOpenModal(true)
  }


  const handledata = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

  }
  const handleUpdateOffer = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessAdd('')
    let data = {}
    Object.keys(upData).map((item, i) => {
      console.log(item, upData[item])
      if (upData[item]) {
        if (item == 'active') { data = { ...data, active: upData.active == 'true' ? true : false } }
        else { data = { ...data, [item]: upData[item] } }

      }

    })


    // if (upData.accepted) { data = { ...data, accepted: upData.accepted } }
    // if (upData.active) { }
    // if (upData.days) { data = { ...data, active: upData.days } }
    // if (upData.hours) { data = { ...data, active: upData.hours } }
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/offers/${activeUser.id}?_method=put`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data)
        }
      );
      const response = await responsee.json();

      if (response.success) {
        await setVisible(6)

        setSuccessAdd('Modified successfully')
        setRefresh(!refresh)


      }
      else {

        setVisible(10)
        setErrorMessage(response.errors)


      }


    }
    catch (err) { console.log(err); }
    setLoading(false)


  }
  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessAdd('')


    try {
      const responsee = await fetch(
        `${global.apiUrl}api/shipping/createShipment/${activeUser.id}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },

        }
      );
      const response = await responsee.json();

      if (response) {
        // await setVisible(6)

        // setSuccessAdd('تم التعديل بنجاح')
        setRefresh(!refresh)


      }
      else {

        // setVisible(10)
        // setErrorMessage(response.errors)


      }


    }
    catch (err) { console.log(err); }
    setLoading(false)


  }
  const handleExportWithFunction = () => {
    const input = document.getElementById('PDFCONT');
    // , {
    //   scale: 2,

    // }
    html2canvas(input)
      .then((canvas) => {
        var width = canvas.width;
        var height = canvas.height;
        var millimeters = {
          width: 0,
          height: 0,
        };
        millimeters.width = Math.floor(width * 0.264583);
        millimeters.height = Math.floor(height * 0.264583);

        var imgData = canvas.toDataURL(
          'image/png');
        var doc = new jsPDF("p", "mm", [millimeters.width, millimeters.height]);
        // doc.deletePage(1);"p", "mm", 'a4'
        // doc.addPage(millimeters.width, millimeters.height);
        doc.addImage(imgData, 'PNG', 0, 0);
        doc.save(`${new Date().toISOString().toString().slice(0, 19)}.pdf`);
      })
      ;
  }
  return (

    <CRow>
      {activeUser &&


        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow className="justify-content-center row-gap-15 ">




                <CCol md="3" lg="4" xl="4" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                  {/* {activeUser.name} */}
                </CCol>
                <CCol md="9" lg="8" xl="8" className=" row-gap-15 col-gap-15 ">
                  {activeUser.paid && !activeUser.shipment_id && activeUser.errors ?
                    <CButton color="primary" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                      onClick={(e) => handleCreate(e)}
                    >  Recreate shipment
                      {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
                    </CButton>
                    :
                    null
                  }
                  {activeUser.paid && !activeUser.shipment_id && !activeUser.errors ?
                    <CButton color="primary" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                      onClick={(e) => handleCreate(e)}
                    >  Create shipment
                      {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
                    </CButton>
                    :
                    null
                  }
                  <CButton color="info" className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                    onClick={() => openEModal()}
                  >{i18n.language == 'ar' ? `تعديل` : `Update`}
                  </CButton>
                  <CButton color="success" className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
                    onClick={() => history.goBack()} >{i18n.language == 'ar' ? `رجوع` : `Back`}
                  </CButton>

                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody className=''>
              {activeUser && activeUser.errors && activeUser.errors.length > 0 &&
                <>

                  <CRow>
                    <CCol md='12'><strong>Errors</strong></CCol>
                    {activeUser.errors.map((item, index) => {
                      return (
                        <CAlert key={index} className='col-lg-12  col-md-12 col-sm-12 col-xs-12 mb-0 '
                          color="danger"
                        >
                          {item}

                        </CAlert>
                      )
                    })}

                  </CRow>
                  <hr />
                </>
              }



              <CRow>
                <CCol md='12'><strong>Offer Details</strong></CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>ID</td>
                        <td><strong>{activeUser.id}</strong></td>
                      </tr>
                      <tr >
                        <td>   Shipment Number</td>
                        <td><strong>{activeUser.shipment_id ? activeUser.shipment_id : "-"}</strong></td>
                      </tr>
                      <tr >
                        <td>Total Net Charge</td>
                        <td><strong>{activeUser.totalNetCharge ? `${activeUser.totalNetCharge} ( KWD )` : "-"}</strong></td>
                      </tr>
                      <tr >
                        <td>Paid</td>
                        <td><strong>{activeUser.paid == 1 ? "مدفوع" : "غير مدفوع"}</strong></td>
                      </tr>
                      <tr >
                        <td>Payer</td>
                        <td><strong>{activeUser.payer == "sender" ? "المرسل" : "المرسل إليه"}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>    Payment ID</td>
                        <td><strong style={{ fontSize: `11px` }}>{activeUser.payment_id ? activeUser.payment_id : "-"}</strong></td>
                      </tr>

                      <tr >
                        <td>Profit Percentage</td>
                        <td><strong>{activeUser.profit_percentage + " % "}</strong></td>
                      </tr>
                      <tr >
                        <td>Fixed Profit Value</td>
                        <td><strong>{`${activeUser.fixed_profit_value} (د.ك)`}</strong></td>
                      </tr>
                      <tr >
                        <td>{`Accepted`}</td>
                        <td><strong>{activeUser.accepted == 1 ? "مقبول" : "غير مقبول"}</strong></td>
                      </tr>
                      <tr >
                        <td>{`Status`}</td>
                        <td><strong>{activeUser.active ? "فعال" : "غير فعال"}</strong></td>
                      </tr>




                      {/* <tr >
                        <td>تاريخ الانشاء </td>
                        <td><strong> {activeUser.created_at && activeUser.created_at.slice(0, 10)}</strong></td>
                      </tr> */}



                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>{`Document Shipment`}</td>
                        <td><strong>{activeUser.documentShipment == 1 ? "Yes" : "No"}</strong></td>
                      </tr>
                      <tr >
                        <td>{`Company`}</td>
                        <td><strong>{activeUser.company?.name_ar}</strong></td>
                      </tr>
                      <tr >
                        <td>{`Ship Date`}</td>
                        <td><strong>{activeUser.ship_date}</strong></td>
                      </tr>
                      <tr >
                        <td>Offer Expiration Date</td>
                        <td><strong>{activeUser.offer_expiration_date}</strong></td>
                      </tr>
                      <tr >
                        <td>{`Delivery Time`}</td>
                        <td><strong>{activeUser.delivery_date_time ? activeUser.delivery_date_time : "-"}</strong></td>
                      </tr>
                      {/* <tr >
                        <td>تاريخ الانشاء </td>
                        <td><strong> {activeUser.created_at && activeUser.created_at.slice(0, 10)}</strong></td>
                      </tr> */}



                    </tbody>
                  </table>
                </CCol>
              </CRow>

              {activeUser.added_charges && activeUser.added_charges.length > 0 &&
                <>  <hr />
                  <CRow   >
                    <CCol md='12'> <strong>Added Charges</strong> </CCol>
                    {

                      activeUser.added_charges.length > 0 && activeUser.added_charges.map((item, index) => {
                        return (

                          <CCol key={index} md='3 ' className='mb-1'>


                            <ul className=" card list-group list-group-flush ">
                              <li className="list-group-item arabic-align">
                                <strong>Name :{' '}</strong> {item.name}
                                <br />
                                <strong>Value : {' '}</strong>   {item.value}
                              </li>



                            </ul>

                          </CCol>



                        )
                      })}
                  </CRow>
                </>
              }
              <hr />


              <CRow>
                <CCol md='12'><strong>Sender</strong></CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>


                      <tr >
                        <td>Name</td>
                        <td><strong>{activeUser.customer && activeUser.customer.user.name ? activeUser.customer.user.name : "-"}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Email</td>
                        <td><strong>{activeUser.customer && activeUser.customer.user.email ? activeUser.customer.user.email : "-"}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Phone</td>
                        <td><strong>{activeUser.customer && activeUser.customer.phone ? activeUser.customer.phone : "-"}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>

                <CCol lg={12} >
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>Sender Address</td>
                        {activeUser.id == 1 && activeUser.shipment_id == "1276405841" ?
                          <td>{activeUser.recipient && <Address Address={activeUser.recipient} />}</td>

                          :
                          <td>{activeUser.shipper && <Address Address={activeUser.shipper} />}</td>
                        }



                      </tr>

                    </tbody>
                  </table>
                </CCol>
              </CRow>


              <hr />
              <CRow>
                <CCol md='12'><strong>      Reciepient</strong></CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>


                      <tr >
                        <td>Name</td>
                        <td><strong>{activeUser.recipient && activeUser.recipient.recipient.name_ar ? activeUser.recipient.recipient.name_ar : "-"}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Email</td>
                        <td><strong>{activeUser.recipient && activeUser.recipient.recipient.email ? activeUser.recipient.recipient.email : "-"}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={4}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Phone</td>
                        <td><strong>{activeUser.recipient && activeUser.recipient.recipient.phone ? activeUser.recipient.recipient.phone : "-"}</strong></td>
                      </tr>


                    </tbody>
                  </table>
                </CCol>

                <CCol lg={12} >
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>Recipient Address</td>
                        <td>{activeUser.recipient && <Address Address={activeUser.recipient} />}</td>


                      </tr>

                    </tbody>
                  </table>
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol md='12'><strong>   Shipment Information</strong></CCol>
                <CCol md={6} lg={3}>
                  <table className="table table-striped table-hover">
                    <tbody>


                      <tr >
                        <td>Weight</td>
                        <td><strong>{activeUser.weight + " (KG)"}</strong></td>
                      </tr>
                      <tr >
                        <td>Width</td>
                        <td><strong>{activeUser.width + " (CM)"}</strong></td>
                      </tr>
                      <tr >
                        <td>Length</td>
                        <td><strong>{activeUser.length + " (CM)"}</strong></td>
                      </tr>
                      <tr >
                        <td>Height</td>
                        <td><strong>{activeUser.height + " (CM)"}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={3}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Category</td>
                        <td><strong>{activeUser.category?.name_en}</strong></td>
                      </tr>
                      <tr >
                        <td> Packaging Type</td>
                        <td><strong>{activeUser.subPackagingType}</strong></td>
                      </tr>


                      <tr >
                        <td> PackageCount</td>
                        <td><strong>{activeUser.groupPackageCount}</strong></td>
                      </tr>
                      <tr >
                        <td>Number Of Pieces</td>
                        <td><strong>{activeUser.NumberOfPieces}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={3}>
                  <table className="table table-striped table-hover">
                    <tbody>

                      <tr >
                        <td>Unit Price</td>
                        <td><strong>{activeUser.unitPrice || "-"}</strong></td>
                      </tr>
                      <tr >
                        <td>Harmonized Code</td>
                        <td><strong>{activeUser.harmonizedCode}</strong></td>
                      </tr>

                      <tr >
                        <td>Shipment Purpose</td>
                        <td><strong style={{ fontSize: `11px` }}>{activeUser.shipmentPurpose ? activeUser.shipmentPurpose : "-"}</strong></td>
                      </tr>

                      <tr >
                        <td>Commodity Name</td>
                        <td><strong>{activeUser.commodityName ? activeUser.commodityName : "-"}</strong></td>
                      </tr>

                    </tbody>
                  </table>
                </CCol>
                <CCol md={6} lg={3}>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr >
                        <td>      Service Code</td>
                        <td><strong>{activeUser.serviceCode ? activeUser.serviceCode : "-"}</strong></td>
                      </tr>
                      <tr >
                        <td>     Service Name</td>
                        <td><strong style={{ fontSize: `11px` }}>{activeUser.serviceName ? activeUser.serviceName : "-"}</strong></td>
                      </tr>
                      <tr >
                        <td>Service Type</td>
                        <td><strong style={{ fontSize: `11px` }}>{activeUser.serviceType ? activeUser.serviceType : "-"}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>




              </CRow>

              <hr />

              <CRow   >
                <CCol md='12'> <strong>Shipment Files</strong> </CCol>
                <CCol md='3 ' className='mb-1'>


                  <ul className=" card list-group list-group-flush ">
                    <li className="list-group-item    ">
                      <strong>Content Type :{' '}</strong>     Wodex Invoice
                      <br />
                      <strong>Document Type : {' '}</strong>  -
                      <br />
                      <strong> copies To Print   : {' '}</strong>   -
                      <br />

                      <a style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleExportWithFunction()} >Download

                      </a>

                    </li>

                  </ul>

                </CCol>


                {activeUser.shipment_documents && activeUser.shipment_documents.length > 0 && activeUser.shipment_documents.map((item, index) => {
                  return (

                    <CCol key={item.id} md='3 ' className='mb-1'>


                      <ul className=" card list-group list-group-flush ">
                        <li className="list-group-item  ">
                          <strong>Content Type :{' '}</strong>  {item.contentType ? item.contentType : "-"}
                          <br />
                          <strong>Document Type : {' '}</strong> {item.docType ? item.docType : "-"}
                          <br />
                          <strong> copies To Print   : {' '}</strong>    {item.copiesToPrint ? item.copiesToPrint : "-"}
                          <br />
                          {activeUser.company_id == 3 ?

                            <Base64Downloader base64={"data:application/pdf;base64," + item.url} downloadName={`${item.contentType}  ${new Date().toISOString().slice(0, 19)}`}>
                              Download
                            </Base64Downloader>
                            :
                            <a href={item.url} target="_blank" download>      Download

                            </a>
                          }



                        </li>



                      </ul>

                    </CCol>



                  )
                })}
              </CRow>







            </CCardBody>
          </CCard>
        </CCol>


      }
      <CModal
        show={openModal}
        onClose={() => closeModal()}
        size="md"
        color='primary'
      >
        <CModalHeader closeButton>
          <CModalTitle>
            Update Offer

          </CModalTitle>
        </CModalHeader>

        <CForm onSubmit={(e) => { handleUpdateOffer(e) }}>
          <CModalBody>
            <CRow>
              <CCol md="4" lg="4" xl="4" >
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">Accepted</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CSelect custom name="accepted" id="select" value={upData.accepted}
                      onChange={(e) => handledata(e)}>
                      <option value='' >Select</option>
                      <option value='1'>Accept</option>
                      <option value='0'>Reject</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol md="4" lg="4" xl="4" >
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">Paid</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CSelect custom name="paid" id="select" value={upData.paid}
                      onChange={(e) => handledata(e)}>
                      <option value='' >Select</option>
                      <option value='1'>Paid</option>
                      <option value='0'>Not Paid</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol md="4" lg="4" xl="4" >
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input"> Status</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CSelect custom name="active" value={upData.active}
                      onChange={(e) => handledata(e)}>
                      <option value='' >Select </option>
                      <option value={true}>Activate</option>
                      <option value={false}>  Deactivate</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CCol>

              <CCol md="6" lg="4" xl="4">
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">Days </CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CInput name="days"
                      type='number'
                      min='0'
                      onChange={handledata}
                      placeholder={`Days`}
                      value={upData.days} />
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol md="6" lg="4" xl="4">
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">Hours</CLabel>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CInput name="hours"
                      min='0'
                      type='number'
                      onChange={handledata}
                      placeholder={`عدد الساعات`}
                      value={upData.hours} />
                  </CCol>
                </CFormGroup>
              </CCol>


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
            <CButton color="primary" type='submit'  >
              Save
              {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
            </CButton>{' '}
            <CButton color="secondary" onClick={() => closeModal()}>Cancel</CButton>
          </CModalFooter>
        </CForm>

      </CModal>
      {activeUser ? <div style={{ height: '0px', overflow: 'hidden' }} > <Invoice bill={activeUser && activeUser} /></div> : null}
    </CRow >
  )
}

export default ShippingOffer
