import { dbPool } from "../config/database.js";

export const getDataFromDb = () => {
  const SQLquery = "SELECT * FROM directory_books.books";
  return dbPool.execute(SQLquery);
};

export const singleDataFromDb = (id) => {
  const SQLquery = `SELECT * FROM directory_books.book WHERE id = ${id};`;
  return dbPool.execute(SQLquery);
};

export const addNewDataFromDb = (body, file) => {
  const SQLquery = `INSERT INTO directory_books.book
                    (
                      title,
                      author,
                      description,
                      img
                    )
                    VALUES (  
                      '${body.title}', 
                      '${body.author}',
                      '${body.description}',
                      '${file.filename}'
                    )`;
  return dbPool.execute(SQLquery);
};

export const deleteData = (id) => {
  const SQLquery = `DELETE FROM book WHERE id = ${id}`;
  return dbPool.execute(SQLquery);
};

export const updateData = (body, id) => {
  const SQLquery = `UPDATE book 
                    SET title='${body.title}',
                        description='${body.description}' 
                        WHERE id=${id}`;
  return dbPool.execute(SQLquery);
};
