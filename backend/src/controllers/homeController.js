import db from "../models/index";
import CRUDService from "../services/CRUDService";

let ReadData = async (req, res) => {
  let data = await CRUDService.readAllBooks();
  return res.json(data);
};

let CreateData = async (req, res) => {
  let data = await CRUDService.createNewBook(req.body);
  return res.json({
    status: true,
  });
};

let Searching = async (req, res) => {
  console.log("Searching called with key:", req.query.key);
  try {
    let key = req.query.key;
    let data = await CRUDService.getBookByKey(key);
    return res.json(data);
  } catch (error) {
    console.error("Error searching for books:", error);
    return res.status(500).json({
      message: "Error searching for books",
      error: error.message,
    });
  }
};

let ReadID = async (req, res) => {
  let data = await CRUDService.getBookById(req.query.id);
  return res.json(data);
};

module.exports = {
  ReadData: ReadData,
  CreateData: CreateData,
  Searching: Searching,
  ReadID: ReadID,
};
