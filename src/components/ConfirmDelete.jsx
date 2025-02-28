import { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../App.css';

function ConfirmDelete({ show, handleClose, handleDelete, deleteId }) {
    return (
        <>
            {/* Modal สำหรับยืนยันการลบรายการ */}
            <Modal show={show} onHide={handleClose} centered size="sm">
                <Modal.Body className="text-center">
                    {/* ส่วนหัวของ Modal */}
                    <Modal.Title>Are you sure?</Modal.Title>
                    {/* ข้อความคำถามก่อนลบ */}
                    <p>Do you want to delete this item?</p>
                    {/* ปุ่มเลือกยืนยันหรือยกเลิก */}
                    <div className="d-flex justify-content-between w-100">
                        {/* ปุ่มยกเลิกการลบ */}
                        <Button variant="secondary" onClick={handleClose} style={{ width: '48%' }}>
                            No
                        </Button>
                        {/* ปุ่มยืนยันการลบ */}
                        <Button variant="danger" onClick={() => handleDelete(deleteId)} style={{ width: '48%' }}>
                            Yes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ConfirmDelete;
