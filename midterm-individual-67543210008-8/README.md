# 💻 ENGSE207 Software Architecture - MIDTERM PRACTICAL EXAM (Individual)
## ข้อสอบปฏิบัติเดี่ยว - Version 1

---

### 📋 ข้อมูลการสอบ
- **รหัสวิชา:** ENGSE207
- **ชื่อวิชา:** สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)
- **ประเภทข้อสอบ:** ปฏิบัติเดี่ยว (Individual Practical)
- **เวลาที่ใช้:** 180 นาที (3 ชั่วโมง)
- **คะแนนเต็ม:** 15 คะแนน
- **รูปแบบ:** Open Book, Open Internet, Open AI

---

### 👤 ข้อมูลนักศึกษา

**ชื่อ-นามสกุล:** 
ณัฐพงศ์ จินะปัญญา

**รหัสนักศึกษา:** 
67543210008-8

**หมู่เรียน:** 
SEC-1

---

## 📌 สถานการณ์โจทย์

บริษัท TechStartup มีระบบ **Library Management System (ระบบจัดการห้องสมุด)** แบบ Monolithic ที่กำลังเริ่มมีปัญหา:

### 🔴 ปัญหาปัจจุบัน:

1. **Code ยุ่งเหยิง** - โค้ดทั้งหมดอยู่ในไฟล์เดียว (server.js) มากกว่า 400 บรรทัด
2. **ยากต่อการบำรุงรักษา** - แก้โค้ดส่วนหนึ่ง ต้องระวังไม่ให้กระทบส่วนอื่น
3. **ทำงานร่วมกันยาก** - Developer หลายคนแก้ไฟล์เดียวกัน เกิด conflict บ่อย
4. **ไม่มี Separation of Concerns** - Business logic ปนกับ Data access ปนกับ HTTP handling

### 🎯 เป้าหมาย:

คุณได้รับมอบหมายให้ **Refactor** ระบบจาก **Monolithic** เป็น **Layered Architecture (3-tier)** เพื่อ:
- ✅ แยก Concerns ชัดเจน (Presentation, Business, Data)
- ✅ ง่ายต่อการบำรุงรักษา
- ✅ ทีมสามารถทำงานแยกกันได้ (แต่ละ layer)
- ✅ เตรียมพร้อมสำหรับการขยายระบบในอนาคต
