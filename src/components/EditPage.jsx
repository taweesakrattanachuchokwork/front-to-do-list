import { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";

function EditPage({ editItem, handleSave, handleCancel }) {
    // สร้าง state สำหรับเก็บข้อมูลของรายการที่แก้ไข และ state สำหรับเก็บ errors
    const [editedItem, setEditedItem] = useState(editItem || { id: null, name: "", detail: "", date: "" });
    const [errors, setErrors] = useState({ name: '', detail: '', date: '' });

    // เมื่อข้อมูลที่จะแก้ไข (editItem) เปลี่ยนแปลง ให้ตั้งค่า editedItem ใหม่
    useEffect(() => {
        setEditedItem(editItem);
    }, [editItem]);

    // ฟังก์ชันสำหรับการบันทึกการเปลี่ยนแปลง
    const handleSaveChanges = () => {
        // ตรวจสอบความถูกต้องของฟอร์มก่อนบันทึก
        if (validateForm()) {
            handleSave(editedItem); // ถ้าฟอร์มถูกต้อง, ส่งข้อมูลกลับไปให้ handleSave
        }
    };

    // ฟังก์ชันสำหรับยกเลิกการแก้ไข
    const handleCancelChanges = () => {
        handleCancel(); // เรียก handleCancel เพื่อปิดหน้าต่างและยกเลิกการแก้ไข
    };

    // ฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูลที่กรอก
    const validateForm = () => {
        const newErrors = { name: '', detail: '', date: '' };

        // ตรวจสอบว่าแต่ละฟิลด์กรอกข้อมูลครบหรือไม่
        if (!editedItem.name) newErrors.name = 'กรุณากรอกชื่อรายการ';
        if (!editedItem.detail) newErrors.detail = 'กรุณากรอกรายละเอียด';
        if (!editedItem.date) newErrors.date = 'กรุณากรอกวันที่';

        // ตั้งค่า errors state
        setErrors(newErrors);

        // คืนค่าผลลัพธ์ว่าไม่มี error
        return Object.values(newErrors).every((error) => error === '');
    };

    return (
        <>
            {/* Modal แสดงฟอร์มแก้ไขรายการ */}
            <Modal show={true} onHide={handleCancelChanges} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขรายการ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* แสดง Alert ถ้ามีข้อผิดพลาด */}
                        {Object.values(errors).some((error) => error) && (
                            <Alert variant="danger">
                                {/* แสดงข้อความผิดพลาดสำหรับแต่ละฟิลด์ */}
                                {Object.values(errors).map((error, idx) => error && <div key={idx}>{error}</div>)}
                            </Alert>
                        )}

                        {/* ฟอร์มกรอกชื่อรายการ */}
                        <Form.Group className="mb-3">
                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={editedItem.name}
                                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                                placeholder="กรอกชื่อรายการ"
                            />
                        </Form.Group>

                        {/* ฟอร์มกรอกรายละเอียด */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedItem.detail}
                                onChange={(e) => setEditedItem({ ...editedItem, detail: e.target.value })}
                                placeholder="กรอกรายละเอียด"
                            />
                        </Form.Group>

                        {/* ฟอร์มกรอกวันที่ */}
                        <Form.Group className="mb-3">
                            <Form.Label>Due <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                value={editedItem.date}
                                onChange={(e) => setEditedItem({ ...editedItem, date: e.target.value })}
                                min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ปัจจุบันเป็นวันที่ต่ำสุด
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* ปุ่มปิดหน้าต่างการแก้ไข */}
                    <Button variant="secondary" onClick={handleCancelChanges}>ปิด</Button>
                    {/* ปุ่มบันทึกการแก้ไข */}
                    <Button variant="primary" onClick={handleSaveChanges}>ตกลง</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditPage;
