'use-strict'

const mysql = require('mysql');
const provider = require('./providers/postgres_provider');

const bookRepo = () => {
    const findAllBooks = async () => {
        try {
            let books = await provider.query("SELECT * FROM book WHERE is_available=true ORDER BY id ASC");
            return books.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    const createBook = async ({ name, author, editorial, year }) => {
        try {
            let sql = mysql.format("INSERT INTO book(name, author, editorial, year) VALUES (?, ?, ?, ?) RETURNING id", [name, author, editorial, year]);
            const result = await provider.query(sql);
            return result.rowCount > 0 ? {
                id: result.rows[0].id, name, author, editorial, year
            } : null;

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    const findBookById = async ({ id }) => {
        try {
            let sql = mysql.format("SELECT * FROM book WHERE id=?", [id]);
            const result = await provider.query(sql);
            return result.rows

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    const deleteBookById = async ({ id }) => {
        try {
            let sql = mysql.format("UPDATE book SET is_available=false WHERE id=?", [id]);
            const result = await provider.query(sql);
            return "libro eliminado."

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    return {
        findAll: findAllBooks,
        create: createBook,
        findById: findBookById,
        delete: deleteBookById
    }
}

module.exports = bookRepo();