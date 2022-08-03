import React, { useState, useEffect } from 'react'

import 'react-fancybox/lib/fancybox.css'
import {
    CButton,

    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

import '../../globalVar'


const DeleteAddress = ({ openModal, closeModal, id, refreshParent, userID }) => {

    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    const handleDelete = async () => {


        document.getElementById('root').style.opacity = 0.75;

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/address/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + userToken,

                        Accept: "application/json",
                    },


                }
            );
            const response = await responsee.json();
            console.log('response', response);
            console.log(response);
            if (response.success == true && response.payload) {
                closeModal()
                document.getElementById('root').style.opacity = 1;
                refreshParent(userID)



            }


        } catch (err) {
            console.log(err);

        }
        document.getElementById('root').style.opacity = 1;

    }




    return (



        <CModal
            show={openModal}
            onClose={() => closeModal()}
            size="sm"
            color='danger'
        >
            <CModalHeader closeButton>
                <CModalTitle></CModalTitle>
            </CModalHeader>
            <CModalBody>
                Are You Sure Want To Delete Address

            </CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => handleDelete()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModal()}>Cancel</CButton>
            </CModalFooter>
        </CModal>


    )
}

export default DeleteAddress
