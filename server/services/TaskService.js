import mongoose from "mongoose";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async getAll(userId) {
    return await _repository.find({ authorId: userId });
  }
  async create(rawData) {
    return await _repository.create(rawData);
  }
  async delete(id) {
    let data = await _repository.findOneAndRemove({ _id: id });
    if (!data) {
      throw new ApiError("Invalid Id!", 400);
    }
  }

  // async getLists(board) {
  //   return await _repository.find({board});
  // }

  async getTasksByListId(listId) {
    let data = await _repository.find({ listId: listId });
    if (!data) {
      throw new Error("Invalid Id");
    }
    return data;
  }
  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }
}

const _taskService = new TaskService();
export default _taskService;
