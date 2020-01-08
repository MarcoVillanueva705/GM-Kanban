import mongoose from 'mongoose'
import List from "../models/List"
import ApiError from "../utils/ApiError"


const _repository = mongoose.model('List', List)

class ListService {

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

async getListsByBoardId(boardId) {
  let data = await _repository.find({boardId:boardId});
  if (!data) {
    throw new Error("Invalid Id");
  }
  return data;
}
}


const _listService = new ListService()
export default _listService