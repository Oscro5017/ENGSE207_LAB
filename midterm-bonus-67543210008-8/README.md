# Library Management System - Client-Server Architecture

## Project Information
- **Student Name:** [ชื่อ-นามสกุล]
- **Student ID:** [รหัสนักศึกษา]
- **Course:** ENGSE207 - Bonus Exam

## Architecture

### Before: Layered Architecture
- Single application
- Frontend + Backend ผูกติดกัน

### After: Client-Server Architecture
- **Backend:** REST API (Node.js + Express + SQLite)
- **Frontend:** Web Client (HTML + CSS + JavaScript)
- **Communication:** HTTP/JSON

## Project Structure

```
midterm-bonus-<รหัส>/
├── backend/         # Server (VM)
└── frontend/        # Client (Local)
```

## How to Run

### Backend (Server - VM)
```bash
cd backend
npm install
npm start
# Server: http://localhost:3000
```

### Frontend (Client - Local)
```bash
cd frontend
# Open index.html in browser
# Or use: python3 -m http.server 8000
```

## API Endpoints

[ระบุ endpoints ทั้งหมด]

## Screenshots

[เพิ่ม screenshots ของ UI]