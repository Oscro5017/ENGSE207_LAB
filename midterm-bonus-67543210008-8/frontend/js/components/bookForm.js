// frontend/js/components/bookForm.js
function showBookForm(book = null) {
    const modal = document.getElementById('book-modal');
    const form = document.getElementById('book-form');
    const modalTitle = document.getElementById('modal-title');
    
    if (book === null) {
        // Create mode
        modalTitle.textContent = 'Add New Book';
        form.reset();
        document.getElementById('book-id').value = '';
    } else {
        // Edit mode - pre-fill data
        modalTitle.textContent = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
    }
    
    // Show modal
    modal.style.display = 'flex';
}

function hideBookForm() {
    const modal = document.getElementById('book-modal');
    modal.style.display = 'none';
}