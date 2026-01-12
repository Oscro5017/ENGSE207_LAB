const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {

    // GET ALL BOOKS
    async getAllBooks(status = null) {
        // 1. ถ้ามี status ให้ validate
        if (status) {
            bookValidator.validateStatus(status);
        }

        // 2. เรียก repository
        const books = await bookRepository.findAll(status);

        // 3. คำนวณสถิติ
        const statistics = {
            total: books.length,
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length
        };

        // 4. return data
        return { books, statistics };
    }

    // GET BOOK BY ID
    async getBookById(id) {
        // 1. Validate ID
        bookValidator.validateId(id);

        // 2. เรียก repository
        const book = await bookRepository.findById(id);

        // 3. ถ้าไม่เจอ throw error
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        // 4. return book
        return book;
    }

    // CREATE BOOK
    async createBook(bookData) {
        // 1. Validate book data
        bookValidator.validateCreate(bookData);

        // 2. Validate ISBN format
        bookValidator.validateISBN(bookData.isbn);

        // 3. เรียก repository
        const createdBook = await bookRepository.create(bookData);

        // 4. return created book
        return createdBook;
    }

    // UPDATE BOOK
    async updateBook(id, bookData) {
        // 1. Validate ID
        bookValidator.validateId(id);

        // 2. Validate update data
        bookValidator.validateUpdate(bookData);

        // 3. ตรวจสอบว่ามีหนังสืออยู่จริง
        const existingBook = await bookRepository.findById(id);
        if (!existingBook) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        // 4. Update
        const updatedBook = await bookRepository.update(id, bookData);
        return updatedBook;
    }

    // BORROW BOOK
    async borrowBook(id) {
        // 1. Validate ID
        bookValidator.validateId(id);

        // 2. ดึงหนังสือ
        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        // 3. ตรวจสอบสถานะ
        if (book.status === 'borrowed') {
            const error = new Error('Book is already borrowed');
            error.name = 'ConflictError';
            throw error;
        }

        // 4. Update status
        const updatedBook = await bookRepository.updateStatus(id, 'borrowed');

        // 5. return
        return updatedBook;
    }

    // RETURN BOOK
    async returnBook(id) {
        // 1. Validate ID
        bookValidator.validateId(id);

        // 2. ดึงหนังสือ
        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        // 3. ตรวจสอบสถานะ
        if (book.status === 'available') {
            const error = new Error('Book is not borrowed');
            error.name = 'ConflictError';
            throw error;
        }

        // 4. Update status
        const updatedBook = await bookRepository.updateStatus(id, 'available');

        // 5. return
        return updatedBook;
    }

    // DELETE BOOK
    async deleteBook(id) {
        // 1. Validate ID
        bookValidator.validateId(id);

        // 2. ดึงหนังสือ
        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        // 3. ถ้า borrowed ห้ามลบ
        if (book.status === 'borrowed') {
            const error = new Error('Cannot delete a borrowed book');
            error.name = 'ConflictError';
            throw error;
        }

        // 4. Delete
        await bookRepository.delete(id);
    }
}

module.exports = new BookService();
