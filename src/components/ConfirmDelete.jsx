import { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../App.css'

function ConfirmDelete({ show, handleClose, handleDelete, deleteId }) {

    return (
        <>

            <Modal show={show} onHide={handleClose} centered size="sm">

                <Modal.Body className="text-center">
                    <Modal.Title>Are you sure?</Modal.Title>
                    <p>Do you want to delete this item.</p>
                    <div className="d-flex justify-content-between w-100">
                        <Button variant="secondary" onClick={handleClose} style={{ width: '48%' }}>
                            No
                        </Button>
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