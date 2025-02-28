import { useState } from 'react'
import '../App.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

// คอมโพเนนต์สำหรับหน้า To-Do List
function TodolistPage({ handleEdit, handleShowDelete, handleCheckboxChange, items, handleShowAddPage }) {

    // คำนวณจำนวนงานที่ยังไม่เสร็จ (ที่ยังไม่ได้ทำเครื่องหมาย checked)
    const count = items.filter((item) => item.checked === true).length;
    // สถานะการแสดงรายละเอียดทั้งหมด
    const [expandedItemId, setExpandedItemId] = useState(null);

    // ฟังก์ชัน toggle สำหรับการแสดงรายละเอียดเต็ม
    const handleToggleDetail = (id) => {
        if (expandedItemId === id) {
            setExpandedItemId(null); // ถ้าคลิกแล้วให้ซ่อนรายละเอียด
        } else {
            setExpandedItemId(id); // แสดงรายละเอียด
        }
    };

    return (
        <>
            {/* ใช้ Container จาก react-bootstrap เพื่อจัด layout ให้อยู่กลางหน้าจอ */}
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="form-container">
                    <Row>
                        {/* ใช้ Col ให้เนื้อหากระจายตามพื้นที่ */}
                        <Col xs={12}>
                            <Form>
                                {/* หัวเรื่องของหน้า To-Do List */}
                                <h1>To-Do List</h1>

                                {/* แสดงจำนวนรายการที่ยังค้าง */}
                                <Row className="d-flex justify-content-between align-items-center">
                                    <Col xs={8} className="text-start">
                                        <h6>To-Do List</h6>
                                        <p>You have {count} tasks left!</p> {/* แสดงจำนวน task ที่ยังไม่เสร็จ */}
                                    </Col>
                                    <Col className="text-end">
                                        {/* ปุ่ม "Add Task" สำหรับเพิ่ม task ใหม่ */}
                                        <Button variant="primary" onClick={() => handleShowAddPage()}>
                                            Add Task
                                        </Button>
                                    </Col>
                                </Row>

                                {/* แสดงรายการ task */}
                                <Row>
                                    <Col xs={12}>
                                        <div className="list-container">
                                            {items.map((item) => (
                                                <div key={item.id} className="form-container">
                                                    <Row className="align-items-center">

                                                        {/* ช่องเช็คบ็อกซ์ (checkbox) สำหรับเลือกทำเครื่องหมายเสร็จ */}
                                                        <Col xs={1} className="d-flex justify-content-center align-items-start">
                                                            <Form.Check
                                                                type="checkbox"
                                                                checked={item.checked}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                            />
                                                        </Col>

                                                        {/* รายละเอียดของแต่ละรายการ */}
                                                        <Col xs={8}>
                                                            <div
                                                                className="item-name"
                                                                style={{ textDecoration: item.checked ? 'line-through' : 'none' }}  // ขีดเส้นใต้ชื่อถ้าทำเครื่องหมายเสร็จแล้ว
                                                            >
                                                                {item.name}
                                                            </div>
                                                            {/* แสดงรายละเอียดแบบย่อ */}
                                                            <div className="item-detail">
                                                                {item.detail.length > 100 && expandedItemId !== item.id
                                                                    ? item.detail.slice(0, 100) + "..."  // ถ้ายาวเกิน 500 ตัวอักษรให้แสดงเป็น "..."
                                                                    : item.detail}

                                                                {item.detail.length > 100 && (expandedItemId !== item.id) && (
                                                                    <Button variant="link" onClick={() => handleToggleDetail(item.id)} className="show-more-button">
                                                                        Show more
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </Col>

                                                        {/* ปุ่มแก้ไขและลบ */}
                                                        <Col xs={3} className="text-end">
                                                            {/* ปุ่มแก้ไข */}
                                                            <Button variant="warning" onClick={() => handleEdit(item)} className="me-2">
                                                                <Pencil />
                                                            </Button>
                                                            {/* ปุ่มลบ */}
                                                            <Button variant="danger" onClick={() => handleShowDelete(item.id)}>
                                                                <Trash />
                                                            </Button>
                                                        </Col>
                                                    </Row>

                                                    {/* แสดงวันที่ของรายการ */}
                                                    <Row>
                                                        <Col xs={1}></Col>
                                                        <Col xs={11}>
                                                            <div className="item-date">
                                                                {/* แสดงวันที่ในรูปแบบ day/month/year */}
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
