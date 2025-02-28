import { useState } from 'react'
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




  // กำหนดการแสดงผลของแต่ละหน้า
  const [showForm, setShowForm] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [showAddPage, setShowAddPage] = useState(false);



  // ฟังก์ชันเปลี่ยนหน้าไปที่ EditPage
  const handleEdit = (item) => {
    setEditItem(item); // ตั้งค่ารายการที่จะแก้ไข
    setShowForm(false); // ซ่อนหน้าหลักและแสดงหน้า EditPage
  };

  // ฟังก์ชันบันทึกการแก้ไข และกลับไปที่ TodolistPage
  const handleSave = (updatedItem) => {
    setShowForm(true); // กลับไปที่หน้า Todolist
    console.log("Updated Item:", updatedItem); // ล็อกข้อมูลที่อัพเดท
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item))); // อัพเดทรายการ
  };

  // ฟังก์ชันยกเลิกการแก้ไขและกลับไปที่ TodolistPage
  const handleCancel = () => {
    setShowForm(true); // กลับไปที่หน้า Todolist
  };




  // ฟังก์ชันเพิ่มรายการใหม่
  const handleAdd = (newItem) => {
    setShowAddPage(false); // ซ่อนหน้า AddPage
    console.log("newItem Item:", newItem); // ล็อกข้อมูลใหม่ที่เพิ่ม
    const newId = items.length + 1; // กำหนด ID ใหม่ให้กับรายการ
    setItems([...items, { ...newItem, id: newId }]); // เพิ่มรายการใหม่เข้าไปใน list
    setShowForm(true); // กลับไปที่หน้า Todolist
  };

  // ฟังก์ชันเปิดหน้า AddPage
  const handleShowAddPage = () => {
    setShowForm(false); // ซ่อนหน้า Todolist
    setEditItem(null); // ล้างข้อมูล editItem
    setShowAddPage(true); // แสดงหน้า AddPage
  };

  // ฟังก์ชันยกเลิกการเพิ่มรายการใหม่
  const handleCancelAddPage = () => {
    setShowAddPage(false); // ซ่อนหน้า AddPage
    setShowForm(true); // กลับไปที่หน้า Todolist
  };




  // ฟังก์ชันแสดง modal เพื่อยืนยันการลบ
  const [showModal, setShowModal] = useState(false); // สถานะการแสดง Modal
  const handleShowDelete = (id) => {
    setShowModal(true); // แสดง Modal
    setDeleteId(id); // เก็บ ID ของรายการที่ต้องการลบ
  };

  const [deleteId, setDeleteId] = useState(null); // เก็บ ID ของรายการที่ต้องการลบ
  const handleClose = () => setShowModal(false); // ปิด Modal

  // ฟังก์ชันลบรายการ
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id)); // ลบรายการที่มี ID ตรงกับที่เลือก
    handleClose(); // ปิด Modal
  };



  return (
    <>
      {/* หน้า AddPage */}
      {showAddPage ? (
        <AddPage showAddPage={showAddPage} handleAdd={handleAdd} handleCancelAddPage={handleCancelAddPage} />
      ) : showForm ? (
        // หน้า TodolistPage
        <TodolistPage handleEdit={handleEdit} handleShowDelete={handleShowDelete} handleCheckboxChange={handleCheckboxChange} items={items} handleShowAddPage={handleShowAddPage} />
      ) : (
        // หน้า EditPage
        <EditPage editItem={editItem} handleSave={handleSave} handleCancel={handleCancel} />
      )}

      {/* ConfirmDelete Modal */}
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

