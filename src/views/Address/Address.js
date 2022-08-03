import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


const Address = ({ Address }) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="row myAddressRow">
            <div className='col-md-12 addressCol'>
                <div className=" addressDetail ">

                    <h6 className=" f-w-400"><b>Country  :</b>{Address.city?.country.country_name_en}{' / '}{Address.country_code}
                    </h6>
                </div>
                <div className="addressDetail">

                    <h6 className="  f-w-400"><b>City  :</b>{Address.city.name_en}
                    </h6>
                </div>

                {Address.city.country_id === 117 ?
                    <>
                        <div className="addressDetail">

                            <h6 className="  f-w-400"><b>Area  :</b>{JSON.parse(Address.line_1).Area}
                            </h6>
                        </div>
                        <div className="addressDetail">

                            <h6 className=" f-w-400"><b>Block  :</b>{JSON.parse(Address.line_1).Block}
                            </h6>
                        </div>
                        <div className="addressDetail">

                            <h6 className=" f-w-400"><b>Jaddah  :</b>{JSON.parse(Address.line_1).Jaddah ? JSON.parse(Address.line_1).Jaddah : "-"}
                            </h6>
                        </div>
                        <div className="addressDetail">

                            <h6 className="  f-w-400"><b>Street  :</b>{JSON.parse(Address.line_2).Street ? JSON.parse(Address.line_2).Street : "-"}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>Building  :</b>{JSON.parse(Address.line_2).Building}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>Floor  :</b>{JSON.parse(Address.line_3).Floor ? JSON.parse(Address.line_3).Floor : "-"}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>Flat  :</b>{JSON.parse(Address.line_3).Flat ? JSON.parse(Address.line_3).Flat : "-"}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>PCAIID  :</b>{JSON.parse(Address.line_3).PCAIID ? JSON.parse(Address.line_3).PCAIID : "-"}
                            </h6>
                        </div>

                    </>
                    :
                    <>
                        <div className="addressDetail  ">

                            <h6 className=" f-w-400">   <b>Line 1 :</b> {Address.line_1}
                            </h6>
                        </div>
                        {Address.line_2 && <div className="addressDetail ">

                            <h6 className="  f-w-400"> <b>Line 2 :</b> {Address.line_2}
                            </h6>
                        </div>}
                        {Address.line_3 && <div className=" addressDetail ">

                            <h6 className="  f-w-400">  <b>Line 3 :</b> {Address.line_3}
                            </h6>
                        </div>}
                        {Address.post_code && <div className=" addressDetail ">

                            <h6 className="  f-w-400"><b>   Postal Code :</b> {Address.post_code}
                            </h6>
                        </div>}
                        {Address.state_code && <div className=" addressDetail ">

                            <h6 className="  f-w-400">  <b>   State Code :</b> {Address.state_code}
                            </h6>
                        </div>}
                    </>

                }




            </div>
        </div>
    )
}

export default Address;