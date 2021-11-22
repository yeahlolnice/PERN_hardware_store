import React, {useState} from "react";
import {Modal, Button, Form, FloatingLabel} from "react-bootstrap";

function EditItem({item}) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async() => {
        setShow(false);
        try {
            if (name === "" || description === ""){
                console.log("item was not updated")
            }else {
                let payload = {
                    "name": "",
                    "description": ""
                };
                payload.name = name;
                payload.description = description;
                const response = await fetch(`http://localhost:5000/items/${item.hardware_id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                });
                const jsonData = await response.json()
                window.location = "/";
            }
        } catch (err) {
            console.error(err.message)
        }
    } 

  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          Edit
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item : {item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form className="mt-3" >
                <FloatingLabel
                    controlId="floatingInput"
                    label="Item Name"
                    className="mb-2"
                >
                <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-2"
                >
                <Form.Control type="text" placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                </FloatingLabel>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default EditItem;