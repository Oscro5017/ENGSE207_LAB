# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** ณัฐพงศ์ จินะปัญญา
- **Student ID:** 67543210008-8
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure
```
midterm-individual-67543210008-8/
├──layered-library/
|   ├── public/
│   |       ├── index.html
│   |       ├── css/
│   |       │   └── style.css
│   |       └── js/
│   |           ├── api.js
│   |           └── app.js
|   |
│   ├── src/
│   │   ├── presentation/
│   │   │   ├── routes/
│   │   │   │   └── bookRoutes.js
│   │   │   ├── controllers/
│   │   │   │   └── bookController.js
│   │   │   └── middlewares/
│   │   │       └── errorHandler.js
│   │   │
│   │   ├── business/
│   │   │   ├── services/
│   │   │   │   └── bookService.js
│   │   │   └── validators/
│   │   │       └── bookValidator.js
│   │   │
│   │   └── data/
│   │       ├── repositories/
│   │       │   └── bookRepository.js
│   │       └── database/
│   │           └── connection.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── library.db
│   └── README.md
|
└── monolithic-library/
    │
    ├── server.js
    ├── package.json
    ├── library.db
    └── public/
        └── index.html
```

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- โค้ดทั้งหมดอยู่ในไฟล์เดียว ทำให้ไฟล์มีขนาดใหญ่และอ่านยาก

- Business Logic ปนกับ HTTP handling และ Data access

- แก้ไขโค้ดส่วนหนึ่งอาจกระทบส่วนอื่นโดยไม่ตั้งใจ
 
- ยากต่อการแบ่งงานให้ทีมพัฒนา

- ไม่รองรับการขยายระบบในอนาคต

### วิธีแก้ไขด้วย Layered Architecture:
- แยก Controller ออกมารับผิดชอบเฉพาะ HTTP Request/Response

- ย้าย Business Logic ทั้งหมดไปไว้ใน Service Layer

- ยกการติดต่อฐานข้อมูลไปไว้ใน Repository Layer

- เพิ่ม Validator เพื่อจัดการ validation แยกจาก business logic

- แต่ละ layer ติดต่อกันผ่าน method call เท่านั้น ไม่ข้าม layer

### ประโยชน์ที่ได้รับ:
- โค้ดอ่านง่าย และเข้าใจโครงสร้างระบบได้ชัดเจน

- แก้ไขหรือเพิ่มฟีเจอร์ได้ง่ายขึ้น

- ลดความเสี่ยงในการเกิด bug จากการแก้ไขโค้ด

- รองรับการทำงานเป็นทีมได้ดี

- สามารถต่อยอดไปสู่ Microservices ในอนาคตได้

## 🚀 How to Run

```
git clone https://github.com/Oscro5017/ENGSE207_LAB.git

cd /engse207-labs/midterm-individual-67543210008-8/layered-library

npm install

npm start

# Open browser: http://localhost:3000
```

## 📝 API Endpoints

## 📘 Book Management

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | `/books`                  | ดึงข้อมูลหนังสือทั้งหมด |
| GET    | `/books?status=available` | ดึงหนังสือตามสถานะ      |
| GET    | `/books/:id`              | ดึงข้อมูลหนังสือตาม ID  |
| POST   | `/books`                  | เพิ่มหนังสือใหม่        |
| PUT    | `/books/:id`              | แก้ไขข้อมูลหนังสือ      |
| DELETE | `/books/:id`              | ลบหนังสือ               |

## 🔄 Book Status

| Method | Endpoint            | Description |
| ------ | ------------------- | ----------- |
| POST   | `/books/:id/borrow` | ยืมหนังสือ  |
| POST   | `/books/:id/return` | คืนหนังสือ  |