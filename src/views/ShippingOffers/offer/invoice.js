import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import logo from './logo.png'

import Barcode from 'react-barcode';

import './styleInvoice.scss'






const Invoice = ({ bill }) => {


    return (
        <div className="row invoice m-auto" id="PDFCONT">
            <div className='row col-12 p-0 invoiceInnerCont'>
                <div className='row col-12  firstRow'>
                    <img src={logo} className='inv-logo'></img>
                    <div className='barCode'>
                        {/* value={bill.shipment_id ? bill.shipment_id : "No Traking Number"} */}
                        <Barcode
                            fontSize={14}
                            value={bill.shipment_id ? bill.shipment_id : "No Traking Number"}
                            width={2}
                            height={35}
                        />
                    </div>
                </div>
                <div className=' p-0 invSection secondSection  '>
                    <div className='invSectionTitle'><span>Shipment Details</span></div>
                    <div className=' p-0 detailsDiv'>
                        <div className='shipLine borderBottom'>
                            <div className=' width25 singleDetail  borderRight'>
                                <strong>Weight </strong>
                                <div className='InvVal' >{bill.weight} {' '} KG</div>
                            </div>
                            <div className=' width25 singleDetail  borderRight'>
                                <strong>Height </strong>
                                <div className='InvVal' >{bill.height} {' '} Cm</div>
                            </div>
                            <div className=' width25 singleDetail  borderRight'>
                                <strong>Length </strong>
                                <div className='InvVal' >{bill.length} {' '} Cm</div>
                            </div>
                            <div className=' width25 singleDetail   '>
                                <strong>Width </strong>
                                <div className='InvVal' >{bill.width} {' '} Cm</div>
                            </div>
                        </div>
                        <div className='shipLine borderBottom'>
                            <div className=' width33 singleDetail  borderRight'>
                                <strong>Company </strong>
                                <div className='InvVal' >{bill.company.name_en}  </div>
                            </div>
                            <div className=' width33 singleDetail  borderRight'>
                                <strong>Category </strong>
                                <div className='InvVal' >{bill.category.name_en}  </div>
                            </div>
                            <div className=' width33 singleDetail   '>
                                <strong>Package Type </strong>
                                <div className='InvVal' >{bill.subPackagingType} </div>
                            </div>

                        </div>
                        <div className='shipLine borderBottom'>
                            <div className=' width33 singleDetail  borderRight'>
                                <strong>Customs Value </strong>
                                <div className='InvVal' >{bill.customs_value} {' '} KWD  </div>
                            </div>
                            <div className=' width33 singleDetail  borderRight '>
                                <strong>Ship Date </strong>
                                <div className='InvVal' >{bill.ship_date} </div>
                            </div>
                            <div className=' width33 singleDetail   '>
                                <strong>Delivery Date </strong>
                                <div className='InvVal' >{bill.delivery_date_time ? bill.delivery_date_time.slice(0, 10) : "--"}  </div>
                            </div>


                        </div>
                        <div className='shipLine  '>
                            <div className=' width25 singleDetail  borderRight'>
                                <strong> Shipping Price   </strong>
                                <div className='InvVal' >{bill.totalNetCharge} {' '} KWD  </div>
                            </div>
                            <div className=' width25 singleDetail  borderRight '>
                                <strong>Payer </strong>
                                <div className='InvVal' >{bill.payer ? bill.payer : 'Sender'} </div>
                            </div>
                            <div className=' width25 singleDetail  borderRight '>
                                <strong>Payment Method </strong>
                                <div className='InvVal' >{bill.payment_method} </div>
                            </div>
                            <div className=' width25 singleDetail   '>
                                <strong>Payment status</strong>
                                <div className='InvVal' >{bill.paid ? 'Paid' : "NOT PAID"}  </div>
                            </div>


                        </div>
                    </div>

                </div>
                <div className=' p-0 invSection thirdSection '>
                    <div className='invSectionTitle'><span>Shipper Details</span></div>
                    <div className=' p-0 detailsDiv ' style={{ display: "flex" }}>
                        <div className='shipLine shipcol height100 width50 borderRight'>
                            <div className='singleDetail width100 height25   borderBottom'>
                                <strong>Name </strong>
                                <div className='InvVal' >{bill.customer.user.name}</div>
                            </div>
                            <div className='singleDetail width100 height25   borderBottom'>
                                <strong>Email </strong>
                                <div className='InvVal' >{bill.customer.user.email}</div>
                            </div>
                            <div className='singleDetail width100 height25 borderBottom   '>
                                <strong>Phone </strong>
                                <div className='InvVal' >{bill.customer.phone}  </div>
                            </div>
                            <div className=' singleDetail width100 height25  '>
                                <strong>Company </strong>
                                <div className='InvVal' >{bill.customer.company ? bill.customer.company != 'undefined' ? bill.customer.company : "--" : '--'}  </div>
                            </div>
                        </div>

                        <div className='shipLine shipcol height100 width50  '>

                            <div className='shipLine   height25 width100 borderBottom '>
                                <div className='singleDetail width50 height100     '>
                                    <strong>Country </strong>
                                    <div className='InvVal' >{bill.shipper.city.country.country_name_en} {' '} ({bill.shipper.city.country.country_code})</div>

                                </div>
                                <div className='singleDetail width50 height100     '>
                                    <strong>City </strong>
                                    <div className='InvVal' >{bill.shipper.city.name_en} </div>
                                </div>

                            </div>
                            <div className='shipLine   height25 width100 borderBottom '>
                                <div className='singleDetail width50 height100   borderRight '>
                                    <strong>Area </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_1).Area} </div>
                                </div>
                                <div className='singleDetail width50 height100     '>
                                    <strong>Block </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_1).Block}</div>
                                </div>
                            </div>

                            <div className='shipLine   height50 width100   ' style={{ flexFlow: 'wrap' }}>
                                <div className='singleDetail width50 height33     '>
                                    <strong>Jaddah </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_1).Jaddah ? JSON.parse(bill.shipper.line_1).Jaddah : '--'}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>Street </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_2).Street ? JSON.parse(bill.shipper.line_2).Street : '--'}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>Building </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_2).Building ? JSON.parse(bill.shipper.line_2).Building : '--'}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>Floor </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_3).Floor ? JSON.parse(bill.shipper.line_3).Floor : '--'}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>Flat </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_3).Flat ? JSON.parse(bill.shipper.line_3).Flat : '--'}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>PCAIID </strong>
                                    <div className='InvVal' >{JSON.parse(bill.shipper.line_3).PCAIID ? JSON.parse(bill.shipper.line_3).PCAIID : '--'}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='  p-0 invSection  ' style={{ height: "65mm" }}>
                    <div className='invSectionTitle'><span>Recipient Details</span></div>
                    <div className=' p-0 detailsDiv ' style={{ display: "flex" }}>
                        <div className='shipLine shipcol height100 width50 borderRight'>
                            <div className='singleDetail width100 height33   borderBottom'>
                                <strong>Name </strong>
                                <div className='InvVal' >{bill.recipient.recipient.name_en}</div>
                            </div>
                            <div className='singleDetail width100 height33   borderBottom'>
                                <strong>Email </strong>
                                <div className='InvVal' >{bill.recipient.recipient.email ? bill.recipient.recipient.email : '--'}</div>
                            </div>
                            <div className='singleDetail width100 height33     '>
                                <strong>Phone </strong>
                                <div className='InvVal' >{bill.recipient.recipient.phone}  </div>
                            </div>

                        </div>

                        <div className='shipLine shipcol height100 width50  '>

                            <div className='shipLine   height25 width100 borderBottom '>
                                <div className='singleDetail width50 height100     '>
                                    <strong>Country </strong>
                                    <div className='InvVal' >{bill.recipient.city.country.country_name_en} {' '} ({bill.recipient.city.country.country_code})</div>

                                </div>
                                <div className='singleDetail width50 height100     '>
                                    <strong>City </strong>
                                    <div className='InvVal' >{bill.recipient.city.name_en} </div>
                                </div>

                            </div>


                            <div className='shipLine   height75 width100   ' style={{ flexFlow: 'wrap' }}>

                                <div className='singleDetail width100 height33     '>
                                    <strong>Full Address </strong>
                                    <div className='InvVal' >{bill.recipient.line_1}</div>
                                </div>
                                <div className='singleDetail width100 height33     '>
                                    <strong>Distinctive signs of address </strong>
                                    <div className='InvVal' >{bill.recipient.line_2 ? bill.recipient.line_2 : '--'}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>Postal Code </strong>
                                    <div className='InvVal' >{bill.recipient.post_code ? bill.recipient.post_code : "--"}</div>
                                </div>
                                <div className='singleDetail width50 height33     '>
                                    <strong>State Code </strong>
                                    <div className='InvVal' >{bill.recipient.post_code ? bill.recipient.post_code : "--"}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='  p-0 invSection  ' style={{ borderBottom: "none", height: "30mm" }}>
                    <div className='invSectionTitle'><span>Notes</span></div>
                    <div className=' p-0 detailsDiv '  >

                        <div className='shipLine   ' style={{ borderBottom: "none", height: "100%" }}>

                            <div className=' width100 singleDetail   '>
                                {bill.accepted == 0 ? <strong>* Shipping request has not been accepted yet  </strong> : null}

                                {bill.accepted == 1 && bill.paid == 0 ? <>
                                    <strong>* Shipping fee has not been paid yet  </strong>
                                    <strong>* The shipping process will start after the payment is completed  </strong>
                                </> : null}
                                {bill.paid == 1 && !bill.shipment_id ? <>
                                    <strong>* Payment completed successfully   </strong>
                                    <strong>* Shipment not created yet  </strong>
                                </> : null}
                                {bill.paid == 1 && bill.shipment_id ? <>
                                    <strong>* Payment completed successfully  </strong>
                                    <strong>* Shipment created successfully  </strong>
                                </> : null}
                            </div>



                        </div>


                    </div>
                </div>
            </div>

        </div>

    )

}

export default Invoice;
