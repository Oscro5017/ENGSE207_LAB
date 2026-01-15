# Architecture Comparison

## Layered Architecture (Before)

### Pros:
- [ระบุข้อดี]

### Cons:
- [ระบุข้อเสีย]

## Client-Server Architecture (After)

### Pros:
- [ระบุข้อดี]

### Cons:
- [ระบุข้อเสีย]

## Changes Made

### 1. Separation
- แยก Frontend และ Backend เป็น 2 โปรเจกต์

### 2. Communication
- ใช้ REST API (HTTP/JSON)

### 3. CORS
- เพิ่ม CORS middleware เพื่อให้ Client-Server คุยกันได้

### 4. API Response Format
- มาตรฐาน: { success, data, timestamp }