import { useState, useEffect } from 'react';
import '../App.css'
import { Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";

function EditPage({ editItem, handleSave, handleCancel }) {
    const [editedItem, setEditedItem] = useState(editItem || { id: null, name: "", detail: "", date: "" });
    const [errors, setErrors] = useState({ name: '', detail: '', date: '' });
    useEffect(() => {
        setEditedItem(editItem);
    }, [editItem]);

    const handleSaveChanges = () => {

        if (validateForm()) {
            handleSave(editedItem);
        }
    };

    const handleCancelChanges = () => {

        handleCancel();

    };





    const validateForm = () => {
        const newErrors = { name: '', detail: '', date: '' };

        if (!editedItem.name) newErrors.name = 'กรุณากรอกชื่อรายการ';
        if (!editedItem.detail) newErrors.detail = 'กรุณากรอกรายละเอียด';
        if (!editedItem.date) newErrors.date = 'กรุณากรอกวันที่';

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };



    return (
        <>
            <Modal show={true} onHide={handleCancelChanges} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขรายการ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Error Alert */}
                        {Object.values(errors).some((error) => error) && (
                            <Alert variant="danger">
                                {Object.values(errors).map((error, idx) => error && <div key={idx}>{error}</div>)}
                            </Alert>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={editedItem.name}
                                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                                placeholder="Placeholder"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedItem.detail}
                                onChange={(e) => setEditedItem({ ...editedItem, detail: e.target.value })}
                                placeholder="Type here"
                            />
                        </Form.Group>
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
                    <Button variant="secondary" onClick={handleCancelChanges}>ปิด</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>ตกลง</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default EditPage;