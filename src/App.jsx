import { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import './App.css'
import TodolistPage from './components/TodolistPage'
import AddPage from './components/AddPage'
import EditPage from './components/EditPage'
import ConfirmDelete from './components/ConfirmDelete'

function App() {

  // กำหนดรายการเริ่มต้น
  const [items, setItems] = useState([
    {
      id: 1,
      name: "รายการ 1",
      detail: "รายละเอียดของรายการ 1",
      date: "2025-02-27",
      checked: false,
    },
    {
      id: 2,
      name: "รายการ 2",
      detail: "รายละเอียดของรายการ 2",
      date: "2025-02-26",
      checked: false,
    },
    {
      id: 3,
      name: "รายการ 3",
      detail: "รายละเอียดของรายการ 3",
      date: "2025-02-25",
      checked: false,
    },
    {
      id: 4,
      name: "รายการ 4",
      detail: "รายละเอียดของรายการ 4",
      date: "2025-02-24",
      checked: false,
    },
    {
      id: 5,
      name: "รายการ 5",
      detail: "รายละเอียดของรายการ 5",
      date: "2025-02-23",
      checked: false,
    },
    {
      id: 6,
      name: "รายการ 6",
      detail: "รายละเอียดของรายการ 6",
      date: "2025-02-22",
      checked: false,
    },
    {
      id: 7,
      name: "รายการ 7",
      detail: "รายละเอียดของรายการ 7",
      date: "2025-02-21",
      checked: false,
    },
  ]);


  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ checkbox
  const handleCheckboxChange = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };





  const [showForm, setShowForm] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [showAddPage, setShowAddPage] = useState(false);


  // ฟังก์ชันเปลี่ยนหน้าไป EditPage
  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(false);
  };

  // ฟังก์ชันบันทึกการแก้ไข และกลับไป TodolistPage
  const handleSave = (updatedItem) => {
    setShowForm(true);
    console.log("Updated Item:", updatedItem); // ล็อกผลลัพธ์
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));

  };

  // ยกเลิก
  const handleCancel = () => {
    setShowForm(true);
  };



  // ฟังก์ชันเพิ่มรายการใหม่
  const handleAdd = (newItem) => {
    setShowAddPage(false);
    console.log("newItem Item:", newItem); // ล็อกผลลัพธ์

    const newId = items.length + 1;
    setItems([...items, { ...newItem, id: newId }]);
    setShowForm(true);

  };

  const handleShowAddPage = () => {
    setShowForm(false);
    setEditItem(null);
    setShowAddPage(true);
  };

  const handleCancelAddPage = () => {
    setShowAddPage(false);
    setShowForm(true);

  };




  // ฟังก์ชันลบรายการ
  const [showModal, setShowModal] = useState(false);
  const handleShowDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };
  const [deleteId, setDeleteId] = useState(null);
  const handleClose = () => setShowModal(false);

  // ฟังก์ชันลบรายการ
  const handleDelete = (id) => {
    // alert confirm 
    setItems(items.filter((item) => item.id !== id));
    handleClose();
  };


  return (
    <>

      {showAddPage ? (
        <AddPage showAddPage={showAddPage} handleAdd={handleAdd} handleCancelAddPage={handleCancelAddPage} />
      ) : showForm ? (
        <TodolistPage handleEdit={handleEdit} handleShowDelete={handleShowDelete} handleCheckboxChange={handleCheckboxChange} items={items} handleShowAddPage={handleShowAddPage} />
      ) : (
        <EditPage editItem={editItem} handleSave={handleSave} handleCancel={handleCancel} />
      )}


      <ConfirmDelete
        show={showModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        deleteId={deleteId}
      />






    </>
  );
}

export default App;

