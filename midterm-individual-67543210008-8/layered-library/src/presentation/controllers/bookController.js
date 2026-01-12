const bookService = require('../../business/services/bookService');

class BookController {

    // GET /books?status=available
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;

            // เรียก Service
            const books = await bookService.getAllBooks(status);

            // ส่ง response
            res.status(200).json({
                success: true,
                data: books
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /books/:id
    async getBookById(req, res, next) {
        try {
            const { id } = req.params;

            const book = await bookService.getBookById(id);

            res.status(200).json({
                success: true,
                data: book
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /books
    async createBook(req, res, next) {
        try {
            const bookData = req.body;

            const newBook = await bookService.createBook(bookData);

            res.status(201).json({
                success: true,
                data: newBook
            });
        } catch (error) {
            next(error);
        }
    }

    // PUT /books/:id
    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedBook = await bookService.updateBook(id, updateData);

            res.status(200).json({
                success: true,
                data: updatedBook
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /books/:id/borrow
    async borrowBook(req, res, next) {
        try {
            const { id } = req.params;

            const result = await bookService.borrowBook(id);

            res.status(200).json({
                success: true,
                message: 'Book borrowed successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /books/:id/return
    async returnBook(req, res, next) {
        try {
            const { id } = req.params;

            const result = await bookService.returnBook(id);

            res.status(200).json({
                success: true,
                message: 'Book returned successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /books/:id
    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;

            await bookService.deleteBook(id);

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();
