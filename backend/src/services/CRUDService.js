import db from "../models/index";
const { Op } = require("sequelize");
let createNewBook = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.BOOKS.create({
        Name: data.Name,
        Author: data.Author,
        Quantity: data.Quantity,
        Day: data.Day,
      });
      resolve("create success!");
    } catch (error) {
      reject(error);
    }
  });
};

let readAllBooks = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BOOKS.findAll({ raw: true });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getBookById = (ID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BOOKS.findOne({
        where: { id: ID },
        raw: true,
      });
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.BOOKS.update(data, { where: { id: data.id } });

      let allBooks = await db.BOOKS.findAll();
      resolve(allBooks);
    } catch (error) {
      reject(error);
    }
  });
};

let deleteBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.BOOKS.findOne({ where: { id: id } });
      if (book) {
        await book.destroy();
      }

      let allBooks = await db.BOOKS.findAll();
      resolve(allBooks);
    } catch (error) {
      reject(error);
    }
  });
};
let getBookByKey = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await db.BOOKS.findAll({
        where: {
          [Op.or]: [
            { Name: { [Op.like]: `%${value}%` } },
            { Author: { [Op.like]: `%${value}%` } },
            { Day: { [Op.like]: `%${value}%` } },
            // If Quantity is a numeric field, you may need a different comparison
            { Quantity: value },
          ],
        },
        raw: true,
      });
      resolve(books || []);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewBook: createNewBook,
  readAllBooks: readAllBooks,
  getBookById: getBookById,
  updateBook: updateBook,
  deleteBook: deleteBook,
  getBookByKey: getBookByKey,
};
