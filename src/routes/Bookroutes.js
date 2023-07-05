const express = require("express");
const { createBook, updateBook, deleteBook, getBook } = require("../Controllers/BookControllers");
const auth = require("../Middlewares/auth");
const bookRouter = express.Router();

bookRouter.get("/", auth, getBook);

bookRouter.post("/", auth, createBook);

bookRouter.put("/:id", auth, updateBook);

bookRouter.delete("/:id", auth ,deleteBook);

module.exports = bookRouter;