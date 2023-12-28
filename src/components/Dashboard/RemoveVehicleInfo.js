import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'


function RemoveVehicleInfo(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        id,
        allVehicle,
        setAllVehicle,
    } = props


    async function formHandler(e) {
        e.preventDefault();
        setShow(false)
        
            const url = process.env.REACT_APP_FIREBASE_CLOUD_FUCNTION_URL +'deletevehicle/'+ id;
            const response = await  axios.delete(url)
            .then(res => console.log("res", res.data))
            .catch(err => console.log(err))
            setAllVehicle(...allVehicle)
    }

    return (
        <>
            <Button variant="btn btn-danger mx-2" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>

                        <Form.Group className="mb-3">
                            <Form.Label>Are you sure you wanna delete this Vehicle informatin ? </Form.Label>
                        </Form.Group>

                        <Button variant="danger" type="submit" >
                            Remove Vehicle Infomation
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default RemoveVehicleInfo