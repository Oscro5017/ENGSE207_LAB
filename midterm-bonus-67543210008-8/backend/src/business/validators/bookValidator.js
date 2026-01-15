class BookValidator {

    // Validate data when creating a book
    validateCreate(data) {
        const { title, author, isbn } = data;

        if (!title || !author || !isbn) {
            const error = new Error('Title, author, and ISBN are required');
            error.name = 'ValidationError';
            throw error;
        }

        return true;
    }

    // Validate data when updating a book
    validateUpdate(data) {
        const { title, author, isbn, status } = data;

        if (!title && !author && !isbn && !status) {
            const error = new Error('At least one field must be provided for update');
            error.name = 'ValidationError';
            throw error;
        }

        if (status && !['available', 'borrowed'].includes(status)) {
            const error = new Error('Invalid book status');
            error.name = 'ValidationError';
            throw error;
        }

        return true;
    }

    // Validate ISBN format
    validateISBN(isbn) {
        // Allow any string with at least 8 characters for ISBN
        if (!isbn || isbn.trim() === '') {
            const error = new Error('ISBN cannot be empty');
            error.name = 'ValidationError';
            throw error;
        }
        
        const cleanISBN = isbn.replace(/-/g, '');
        if (cleanISBN.length < 8) {
            const error = new Error('ISBN must be at least 8 characters');
            error.name = 'ValidationError';
            throw error;
        }

        return true;
    }

    // Validate status query param
    validateStatus(status) {
        if (!['available', 'borrowed'].includes(status)) {
            const error = new Error('Invalid status value');
            error.name = 'ValidationError';
            throw error;
        }
        return true;
    }

    // Validate book ID
    validateId(id) {
        const numId = parseInt(id);

        if (isNaN(numId) || numId <= 0) {
            const error = new Error('Invalid book ID');
            error.name = 'ValidationError';
            throw error;
        }

        return numId;
    }
}

module.exports = new BookValidator();