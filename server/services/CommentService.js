import mongoose from 'mongoose'
import Comment from "../models/Comment"
import ApiError from "../utils/ApiError"


const _repository = mongoose.model('Comment', Comment)

class CommentService {

  async getAll(userId){
    return await _repository.find({authorId: userId})
  }
async create (rawData){
  return await _repository.create(rawData);

  }
async delete (id) {
  let data = await _repository.findOneAndRemove({_id: id})
  if(!data) {
    throw new ApiError("Invalid Id!", 400);
  }
}

// async getLists(board) {
//   return await _repository.find({board});
// }

async getCommentsByTaskId(taskId) {
  let data = await _repository.find({taskId:taskId});
  if (!data) {
    throw new Error("Invalid Id");
  }
  return data;
}
}


const _commentService = new CommentService()
export default _commentService