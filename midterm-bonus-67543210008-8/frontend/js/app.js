// frontend/js/app.js

// Global state
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Library Management System - Client');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    await loadBooks();
});

function setupEventListeners() {
    // Filter buttons
    document.getElementById('filter-all').addEventListener('click', () => {
        currentFilter = 'all';
        loadBooks();
    });
    
    document.getElementById('filter-available').addEventListener('click', () => {
        currentFilter = 'available';
        loadBooks('available');
    });
    
    document.getElementById('filter-borrowed').addEventListener('click', () => {
        currentFilter = 'borrowed';
        loadBooks('borrowed');
    });
    
    // Add book button
    document.getElementById('add-book-btn').addEventListener('click', () => {
        showBookForm();
    });
    
    // Form submit
    document.getElementById('book-form').addEventListener('submit', handleFormSubmit);
}

async function loadBooks(status = null) {
    try {
        showLoading();
        const result = await api.getAllBooks(status);
        updateStatistics(result.statistics);
        renderBookList(result.books);
        hideLoading();
        
    } catch (error) {
        console.error('Error loading books:', error.message || error);
        alert('Failed to load books: ' + (error.message || 'Unknown error'));
        hideLoading();
    }
}

async function borrowBook(id) {
    try {
        if (!confirm('Borrow this book?')) return;
        
        await api.borrowBook(id);
        alert('Book borrowed successfully!');
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
        
    } catch (error) {
        console.error('Error borrowing book:', error);
        alert('Failed to borrow book. Please try again.');
    }
}

async function returnBook(id) {
    try {
        if (!confirm('Return this book?')) return;
        
        await api.returnBook(id);
        alert('Book returned successfully!');
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
        
    } catch (error) {
        console.error('Error returning book:', error);
        alert('Failed to return book. Please try again.');
    }
}

async function deleteBook(id) {
    try {
        if (!confirm('Are you sure you want to delete this book?')) return;
        
        await api.deleteBook(id);
        alert('Book deleted successfully!');
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
        
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book: ' + (error.message || 'Please try again.'));
    }
}

async function editBook(id) {
    try {
        const book = await api.getBookById(id);
        showBookForm(book);
        
    } catch (error) {
        console.error('Error fetching book:', error);
        alert('Failed to load book details. Please try again.');
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const bookId = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value
    };
    
    try {
        if (bookId) {
            await api.updateBook(bookId, bookData);
            alert('Book updated successfully!');
        } else {
            await api.createBook(bookData);
            alert('Book created successfully!');
        }
        
        hideBookForm();
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
        
    } catch (error) {
        console.error('Error submitting form:', error.message || error);
        alert('Failed to save book: ' + (error.message || 'Unknown error'));
    }
}

function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available || 0;
    document.getElementById('stat-borrowed').textContent = stats.borrowed || 0;
    document.getElementById('stat-total').textContent = stats.total || 0;
}

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}