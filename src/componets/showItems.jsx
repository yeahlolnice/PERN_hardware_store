import React, {useEffect, useState} from "react";
import {Table, Button, Form} from "react-bootstrap"
import EditItem from "./editItem";

const ShowItems = ({searchedItems}) => {
    
    const [items, setItems] = useState([]);
    const [name, setName] = useState("")
    
    // Delete items
    const deleteItem = async(itemId) => {
        try {
            const response = await fetch(`http://localhost:5000/items/${itemId}`, {
                method: "DELETE"
            });
            setItems(items.filter(item => item.hardware_id !== itemId))
            

        } catch (err) {
            console.error(err.message);
        }
    };


    const getItems = async() => {
        try {
            if (searchedItems > 0){
                setItems(searchedItems);
            }else {
                const response = await fetch("http://localhost:5000/items");
                const jsonData = await response.json();
                setItems(jsonData);
            }
        } catch (err) {
            console.error(err.message);
        };
    };

    const handleSearch = async () => {
        try {
            if (name === ""){
                getItems();
            }else{
                const response = await fetch(`http://localhost:5000/items/search/${name}`);
                const jsonData = await response.json();
                setItems(jsonData);
            }
        } catch (err) {
            console.error(err.message);
        };
    };

    useEffect(() => {
        getItems();
    },[]);


    return(
        <>
            <>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Looking for an item?</Form.Label>
                    <Form.Control type="text" placeholder="Search" onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleSearch}>
                    Search
                </Button>
                </Form>
            </>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                    <th>#ID</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.hardware_id}>
                            <td>{item.hardware_id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><EditItem item={item}/></td>
                            <td><Button className="btn btn-danger" onClick={() => deleteItem(item.hardware_id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
};

export default ShowItems;