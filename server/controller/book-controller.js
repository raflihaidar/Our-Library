export const getBookData = (req, res) => {
  try {
    res
      .json({
        message: "Get Data Book Success",
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

export const addNewBook = (req, res) => {
  const { body } = req;
  try {
    res
      .json({
        data: body,
        message: "Success add new book",
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

export const deleteBook = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
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
      })
      .status(404);
  }
};

export const editBook = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
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
