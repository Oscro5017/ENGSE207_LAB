// frontend/js/components/bookList.js
function renderBookList(books) {
    const container = document.getElementById('book-list');
    
    console.log('Rendering books:', books);
    
    if (books.length === 0) {
        container.innerHTML = '<p>No books found</p>';
        return;
    }

    const html = books.map(book => `
        <div class="book-card" data-id="${book.id}">
            <h3>${book.title}</h3>
            <p class="author">👤 ${book.author}</p>
            <p class="isbn">🔖 ISBN: ${book.isbn}</p>
            <span class="status-badge status-${book.status}">
                ${book.status === 'available' ? '✅' : '📖'} ${book.status.toUpperCase()}
            </span>
            <div class="actions">
                ${book.status === 'available' 
                    ? `<button class="btn btn-success" onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button class="btn btn-warning" onclick="returnBook(${book.id})">Return</button>`
                }
                <button class="btn btn-secondary" onclick="editBook(${book.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}