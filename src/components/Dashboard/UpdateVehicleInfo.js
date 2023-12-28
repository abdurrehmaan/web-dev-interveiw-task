import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'


function UpdateVehicleInfo(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        id,
        category,
        company,
        modal,
        owner,
        allVehicle,
        setAllVehicle,
    } = props
    // form managing 
    const [values, setValues] = useState({
        category: category,
        company: company,
        modal: modal,
        owner: owner,
    });
    // Form inputs 
    const inputs = [
        {
            id: 1,
            name: "category",
            type: "text",
            placeholder: "Vehicle Category",
            label: "Category",
            required: true,
        },
        {
            id: 2,
            name: "company",
            type: "text",
            placeholder: "Vehicle Company",
            label: "Company",
            required: true,
        },
        {
            id: 2,
            name: "modal",
            type: "text",
            placeholder: "Vehicle Modal",
            label: "Modal",
            required: true,
        },
        {
            id: 2,
            name: "owner",
            type: "text",
            placeholder: "Vehicle Owner",
            label: "Owner",
            required: true,
        },
    ];
    async function formHandler(e) {
        e.preventDefault();
        setShow(false)
        const url = process.env.REACT_APP_FIREBASE_CLOUD_FUCNTION_URL + `updatevehicle/${id}`
        const response = await axios.put(url, values)
        .then(res=>console.log("res", res.data))
        .catch(err=>console.log(err))
        setAllVehicle(...allVehicle)
    }
    return (
        <>
            <Button variant="btn btn-warning mx-2" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vehicle Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        {inputs.map((input) => (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>{input.label}</Form.Label>
                                    <Form.Control key={input.id} {...input} type={input.type} placeholder={input.placeholder} value={values[input.name]} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} required={input.required} />
                                </Form.Group>
                            </>
                        ))}
                        <Button variant="primary" type="submit" >
                            Update Infomation
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UpdateVehicleInfo