const express = require("express");
const multer = require("multer");
const {
  createTodoController, getTodos, deleteTodoController, updateTodoController, markTodoCompleted
} = require("../controllers/TodoController.js");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

// Create a product
router.post(
  "/add-todo",
  createTodoController
);
router.get("/get-todos", getTodos);
router.delete("/delete-todo/:todoId",deleteTodoController)
router.put("/update-todo/:todoId",updateTodoController)
router.put("/mark-completed/:todoId",markTodoCompleted)


// router.get(
//   "/get-featured-product-photos/:pId/photos/:photoIndex",
//   getFeaturedProductsPhoto
// );
// router.get("/get-single-product/:pId", getSingleProduct);
// router.get("/get-specific-category-products/:cId", getSpecificCategoryProducts);
// router.post("/add-product-review/:pId", addReviewController);
// router.get("/filter-and-pagination", filterAndPagination);
// router.get("/search-products/:searchTerm", searchProductsController);

module.exports = router;
