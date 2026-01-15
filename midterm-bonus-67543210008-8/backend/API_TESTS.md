# API Tests - Library Management

## Base URL
```
http://192.168.56.103:3000/api
```

## Endpoints

### 1. Get All Books
```bash
curl http://192.168.56.103:3000/api/books
```

### 2. Create Book
```bash
curl -X POST http://192.168.56.103:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
  }'
```

### 3. Borrow Book
```bash
curl -X PATCH http://192.168.56.103:3000/api/books/1/borrow
```

### 4. Return Book
```bash
curl -X PATCH http://192.168.56.103:3000/api/books/1/return
```

### 5. Delete Book
```bash
curl -X DELETE http://192.168.56.103:3000/api/books/1
```