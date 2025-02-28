import { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";

function AddPage({ showAddPage, handleAdd, handleCancelAddPage }) {
    // State สำหรับเก็บข้อมูลรายการที่เพิ่ม
    const [addItem, setAddedItem] = useState(showAddPage || { id: null, name: "", detail: "", date: "" });

    // State สำหรับเก็บข้อความ error เมื่อข้อมูลไม่ครบ
    const [errors, setErrors] = useState({ name: '', detail: '', date: '' });

    // ฟังก์ชันที่ใช้ในการอัปเดตข้อมูลเมื่อ showAddPage เปลี่ยนแปลง
    useEffect(() => {
        setAddedItem(showAddPage);
    }, [showAddPage]);

    // ฟังก์ชันที่ใช้เมื่อผู้ใช้กดปุ่มบันทึก
    const handleSaveAdd = () => {
        if (validateForm()) {
            // ถ้าฟอร์มถูกต้องให้ทำการเพิ่มรายการ
            handleAdd(addItem);
        }
    };

    // ฟังก์ชันที่ใช้เมื่อผู้ใช้กดปุ่มยกเลิกการเพิ่มรายการ
    const handleCancelAdd = () => {
        handleCancelAddPage();
    };

    // ฟังก์ชันตรวจสอบข้อมูลก่อนบันทึก
    const validateForm = () => {
        const newErrors = { name: '', detail: '', date: '' };

        // ตรวจสอบแต่ละฟิลด์ ถ้าหากเป็นค่าว่างจะแสดงข้อความ error
        if (!addItem.name) newErrors.name = 'กรุณากรอกชื่อรายการ';
        if (!addItem.detail) newErrors.detail = 'กรุณากรอกรายละเอียด';
        if (!addItem.date) newErrors.date = 'กรุณากรอกวันที่';

        setErrors(newErrors);
        // ตรวจสอบว่าทุกฟิลด์ไม่มี error หรือไม่
        return Object.values(newErrors).every((error) => error === '');
    };

    return (
        <>
            {/* Modal สำหรับเพิ่มรายการใหม่ */}
            <Modal show={true} onHide={handleCancelAdd} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* แสดงข้อความ error ถ้ามี */}
                        {Object.values(errors).some((error) => error) && (
                            <Alert variant="danger">
                                {Object.values(errors).map((error, idx) => error && <div key={idx}>{error}</div>)}
                            </Alert>
                        )}
                        {/* ชื่อรายการ */}
                        <Form.Group className="mb-3">
                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={undefined}
                                onChange={(e) => setAddedItem({ ...addItem, name: e.target.value })}
                                placeholder="Enter task title"
                            />
                        </Form.Group>

                        {/* รายละเอียดของรายการ */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={undefined}
                                onChange={(e) => setAddedItem({ ...addItem, detail: e.target.value })}
                                placeholder="Enter task description"
                            />
                        </Form.Group>

                        {/* วันที่กำหนด */}
                        <Form.Group className="mb-3">
                            <Form.Label>Due <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                value={undefined}
                                onChange={(e) => setAddedItem({ ...addItem, date: e.target.value })}
                                min={new Date().toISOString().split("T")[0]}  // กำหนดวันที่ต่ำสุดเป็นวันที่ปัจจุบัน
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* ปุ่มยกเลิก */}
                    <Button variant="secondary" onClick={handleCancelAdd}>ปิด</Button>
                    {/* ปุ่มบันทึก */}
                    <Button variant="primary" onClick={handleSaveAdd}>ตกลง</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPage;
