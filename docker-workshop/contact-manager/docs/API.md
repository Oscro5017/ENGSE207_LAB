# Contact Manager API Documentation

## Endpoints

### GET /api/contacts
Get all contacts

### GET /api/contacts/:id
Get contact by ID

### POST /api/contacts
Create a new contact

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
}
```

### PUT /api/contacts/:id
Update a contact

### DELETE /api/contacts/:id
Delete a contact
