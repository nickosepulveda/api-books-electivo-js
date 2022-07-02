'use-strict'

const { bookRepo } = require('../data')

const BookService = () => {
    const findAllBooks = async () => {
        try {
            return await bookRepo.findAll();
        } catch (error) {
            return Promise.reject({ error: true, message: error })
        }
    }

    const createBook = async ({ name, author, editorial, year }) => {
        try {
            if (!name) {
                console.error("BookService.createBook name is empty")
                return { error: true, message: "name is required" }
            }
            if (!author) {
                console.error("BookService.createBook author is empty")
                return { error: true, message: "author is required" }
            }
            if (!editorial) {
                console.error("BookService.createBook editorial is empty")
                return { error: true, message: "editorial is required" }
            }
            if (!year) {
                console.error("BookService.createBook year is empty")
                return { error: true, message: "year is required" }
            }

            return await bookRepo.create({ name, author, editorial, year });
        } catch (error) {
            return Promise.reject({ message: error })
        }
    }

    // find book on database
    const findBookById = async (id) => {
        try {
            return await bookRepo.findById(id);
        } catch (error) {
            return Promise.reject({ error: true, message: error })
        }
    }

    // delete book on database
    const deleteBookById = async (id) => {
        try {
            return await bookRepo.delete(id);
        } catch (error) {
            return Promise.reject({ error: true, message: error })
        }
    }

    return {
        findAll: findAllBooks,
        create: createBook,
        findById: findBookById,
        delete: deleteBookById
    }
}

module.exports = BookService();