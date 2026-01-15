// frontend/js/api.js - API Client for Client-Server
class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async getAllBooks(status = null) {
        try {
            let url = `${this.baseURL}/books`;
            if (status) {
                url += `?status=${status}`;
            }
            
            console.log('Fetching from:', url);
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error('HTTP Error:', response.status, response.statusText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('API Response:', result);
            
            // Backend returns: { success, data: { books, statistics }, timestamp }
            const responseData = result.data || {};
            const books = responseData.books || [];
            const statistics = responseData.statistics || {
                available: books.filter(b => b.status === 'available').length,
                borrowed: books.filter(b => b.status === 'borrowed').length,
                total: books.length
            };
            
            return { books, statistics };
        } catch (error) {
            console.error('getAllBooks error:', error);
            throw error;
        }
    }
    
    async getBookById(id) {
        try {
            console.log('Fetching book:', id);
            const response = await fetch(`${this.baseURL}/books/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const result = await response.json();
            console.log('getBookById response:', result);
            // Backend returns { success, data, timestamp }
            return result.data || result;
        } catch (error) {
            console.error('getBookById error:', error);
            throw error;
        }
    }
    
    async createBook(bookData) {
        try {
            const url = `${this.baseURL}/books`;
            console.log('Creating book at:', url, bookData);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Create error response:', errorData);
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Create response:', result);
            return result.data || result;
        } catch (error) {
            console.error('createBook error:', error);
            throw error;
        }
    }
    
    async updateBook(id, bookData) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        const result = await response.json();
        return result.data || result;
    }
    
    async borrowBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/borrow`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        const result = await response.json();
        return result.data || result;
    }
    
    async returnBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/return`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        const result = await response.json();
        return result.data || result;
    }
    
    async deleteBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        const result = await response.json();
        return result.data || result;
    }
}

// 🆕 สำคัญ! เปลี่ยน URL ตาม environment
const API_BASE_URL = 'http://172.26.192.162:3000/api';  // Backend server
// const API_BASE_URL = 'http://<VM-IP>:3000/api';  // Production (ใช้ IP ของ VM)

const api = new LibraryAPI(API_BASE_URL);