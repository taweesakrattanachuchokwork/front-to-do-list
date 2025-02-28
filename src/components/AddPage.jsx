import { useState, useEffect } from 'react';
import '../App.css'
import { Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";

function AddPage({ showAddPage, handleAdd, handleCancelAddPage }) {
    const [addItem, setAddedItem] = useState(showAddPage || { id: null, name: "", detail: "", date: "" });
    const [errors, setErrors] = useState({ name: '', detail: '', date: '' });
    useEffect(() => {
        setAddedItem(showAddPage);
    }, [showAddPage]);

    const handleSaveAdd = () => {

        if (validateForm()) {
            handleAdd(addItem);
        }
    };

    const handleCancelAdd = () => {

        handleCancelAddPage();

    };





    const validateForm = () => {
        const newErrors = { name: '', detail: '', date: '' };

        if (!addItem.name) newErrors.name = 'กรุณากรอกชื่อรายการ';
        if (!addItem.detail) newErrors.detail = 'กรุณากรอกรายละเอียด';
        if (!addItem.date) newErrors.date = 'กรุณากรอกวันที่';

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };



    return (
        <>

            <Modal show={true} onHide={handleCancelAdd} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
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
                                value={undefined}
                                onChange={(e) => setAddedItem({ ...addItem, name: e.target.value })}
                                placeholder="Placeholder"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={undefined}
                                onChange={(e) => setAddedItem({ ...addItem, detail: e.target.value })}
                                placeholder="Type here"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                value={undefined}
                                onChange={(e) => setAddedItem({ ...addItem, date: e.target.value })}
                                min={new Date().toISOString().split("T")[0]} // กำหนดวันที่ปัจจุบันเป็นวันที่ต่ำสุด
                            />

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelAdd}>ปิด</Button>
                    <Button variant="primary" onClick={handleSaveAdd}>ตกลง</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AddPage;