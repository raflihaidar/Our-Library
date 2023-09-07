import axios from "axios";

export const loadBookData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/books");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewBook = async (title, author, description, img) => {
  try {
    await axios.post("http://localhost:8000/books", {
      title,
      author,
      description,
      img,
    });
  } catch (error) {
    console.log(error.message);
  }
};
