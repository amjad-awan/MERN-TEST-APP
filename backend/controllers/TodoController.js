const TodoModal = require("../modals/TodoModal");

exports.createTodoController = async (req, res) => {
  try {
    const { todo } = req.body;

    const newTodo = await TodoModal({
      todo,
    }).save();
    res.status(200).json({
      todo: newTodo,
      success: true,
      message: "todo added successfully!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo." });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModal.find({});
    res.status(200).json({
      todos,
      success: true,
      message: "Todos fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching featured todos.",
    });
  }
};

exports.deleteTodoController = async (req, res) => {
  const { todoId } = req.params;
  try {
    const deletedTodo = await TodoModal.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found." });
    }
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the todo.",
    });
  }
};

exports.updateTodoController = async (req, res) => {
  const { todoId } = req.params;
  const { todo } = req.body;
  try {
    await TodoModal.findByIdAndUpdate(todoId, { todo }, { new: true });

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the todo.",
    });
  }
};
exports.markTodoCompleted = async (req, res) => {
  const { todoId } = req.params;
  try {
    const todo = await TodoModal.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.isCompleted = !todo.isCompleted;

   await todo.save();

    res.status(200).json({
      success: true,
      message: "Todo status toggled successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while toggling the todo status.",
    });
  }
};
