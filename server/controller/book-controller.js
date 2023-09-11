import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBookData = async (req, res) => {
  try {
    const data = await prisma.books.findMany();
    res.render("main", {
      title: "Our Library",
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

export const getDetailBookData = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await prisma.books.findUnique({
      where: {
        id,
      },
    });
    res.render("detail", {
      title: "Halaman Detail",
      layout: "layout/main-layout",
      data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addNewBook = async (req, res) => {
  const { body, file } = req;
  try {
    await prisma.books.create({
      data: {
        title: body.title,
        author: body.author,
        description: body.description,
        image: file.filename,
      },
    });
    res.redirect("/");
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
  try {
    await prisma.books.delete({
      where: {
        id,
      },
    });
    res.redirect("/");
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
  const { body, file } = req;
  try {
    await prisma.books.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        author: body.author,
        description: body.description,
        image: file.filename,
      },
    });
    res.redirect("/");
    console.log(id);
  } catch (error) {
    res
      .json({
        message: "Server Error",
        serverMessage: error,
      })
      .status(404);
  }
};
