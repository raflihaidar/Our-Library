import {
  getDataFromDb,
  addNewDataFromDb,
  deleteData,
  updateData,
} from "../models/books.js";

export const getBookData = async (req, res) => {
  try {
    const [data] = await getDataFromDb();
    res.render("main", {
      title: "Halaman utama",
      layout: "layout/main-layout",
      data,
    });
  } catch (error) {
    res
      .json({
        message: "Server Error",
        serverMessage: error,
      })
      .status(404);
  }
};

export const addNewBook = async (req, res) => {
  const { body, file } = req;
  try {
    await addNewDataFromDb(body, file);
  } catch (error) {
    res
      .json({
        message: "Server Error",
        serverMessage: error,
      })
      .status(404);
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await deleteData(id);
    res
      .json({
        data: body,
        message: "Success delete book",
      })
      .status(200);
  } catch (error) {
    res
      .json({
        message: "Server Error",
        serverMessage: error,
      })
      .status(404);
  }
};

export const editBook = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await updateData(body, id);
    res
      .json({
        data: body,
        message: "Success edit book",
      })
      .status(200);
  } catch (error) {
    res
      .json({
        message: "Server Error",
      })
      .status(404);
  }
};
