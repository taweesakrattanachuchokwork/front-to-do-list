import { useState } from 'react'
import '../App.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';



function TodolistPage({ handleEdit, handleShowDelete, handleCheckboxChange, items, handleShowAddPage }) {


    const count = items.filter((item) => item.checked === true).length;



    return (
        <>

            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="form-container">
                    <Row>

                        <Col xs={12}>
                            <Form>
                                <h1>To-Do List</h1>

                                <Row className="d-flex justify-content-between align-items-center">
                                    <Col xs={8} className="text-start">
                                        <h6>To-Do List</h6>
                                        <p>You have {count} tasks left!</p>
                                    </Col>
                                    <Col className="text-end">
                                        <Button variant="primary" onClick={() => handleShowAddPage()}>

                                            Add Task
                                        </Button>
                                    </Col>
                                </Row>





                                <Row>
                                    <Col xs={12}>
                                        <div className="list-container">
                                            {items.map((item) => (
                                                <div key={item.id} className="form-container">
                                                    <Row className="align-items-center">
                                                        {/* ช่องติ๊กเช็คบ๊อก */}
                                                        <Col xs={1} className="d-flex justify-content-center align-items-start">
                                                            <Form.Check
                                                                type="checkbox"
                                                                checked={item.checked}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                            />
                                                        </Col>

                                                        {/* รายละเอียด */}
                                                        <Col xs={8}>
                                                            <div
                                                                className="item-name"
                                                                style={{ textDecoration: item.checked ? 'line-through' : 'none' }}
                                                            >
                                                                {item.name}</div>
                                                            <div className="item-detail">{item.detail}</div>
                                                        </Col>

                                                        {/* ปุ่มแก้ไขและลบ */}
                                                        <Col xs={3} className="text-end">
                                                            <Button variant="warning" onClick={() => handleEdit(item)} className="me-2" >
                                                                <Pencil />
                                                            </Button>
                                                            <Button variant="danger" onClick={() => handleShowDelete(item.id)} >
                                                                <Trash />
                                                            </Button>
                                                        </Col>
                                                    </Row>

                                                    {/* รายการวันที่ */}
                                                    <Row>
                                                        <Col xs={1}>

                                                        </Col>
                                                        <Col xs={11}>
                                                            <div className="item-date">
                                                                {new Date(item.date).toLocaleDateString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: '2-digit',
                                                                    year: 'numeric'
                                                                })}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>









                            </Form>
                        </Col>

                    </Row>

                </div>
            </Container>

        </>
    );
}

export default TodolistPage;