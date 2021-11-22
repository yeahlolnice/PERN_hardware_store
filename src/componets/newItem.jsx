import React, {useState, useEffect} from "react";
import {Button, Form, FloatingLabel} from "react-bootstrap"


const NewItem = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            let payload = {
                "name": "",
                "description": ""
            };
            if (name === "" || description === ""){
                alert(`Please enter a Name and Description `)
            }else {
                payload.name = name;
                payload.description = description;
                const response = await fetch("http://localhost:5000/items",{
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(payload)
                });
                window.location = "/";
            };
        } catch (err) {
            console.error(err.message);
        };
    };
    

    return (
        <>
            <h1>Create Item</h1>
            <Form className="mt-3" >
                <FloatingLabel
                    controlId="floatingInput"
                    label="Item Name"
                    className="mb-2"
                >
                <Form.Control type="text" placeholder="Item Name" onChange={e => setName(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-2"
                >
                <Form.Control type="text" placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                </FloatingLabel>
                <Button className="btn btn-success" onClick={onSubmitForm}>Add</Button>
            </Form>
        </>
    )
}
export default NewItem;