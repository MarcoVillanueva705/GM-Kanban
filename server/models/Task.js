import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
//NOTE  this would be for subdocs
// const Comment = new Schema({
//     content: {type: String, required: true},
//     taskId: { type: ObjectId, ref: 'Task', required: true },
// }, { timestamps: true, toJSON: { virtuals: true } })

const Task = new Schema(
  {
    description: { type: String, require: true },
    listId: { type: ObjectId, ref: "List", required: true },
    authorId: { type: ObjectId, ref: " User", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true }
    //NOTE for subdocs
    // comments: [Comment]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Task.pre("deleteMany", function(next) {
//   //lets find all the comments and remove them
//   Promise.all([_commentService.deleteMany({ taskId: this._conditions_id })])
//     .then(() => next())
//     .catch(err => next(err));
// });

// Task.pre("findOneAndRemove", function(next) {
//   //lets find all the comments and remove them
//   Promise.all([_commentRepo.deleteMany({ taskId: this._conditions._id })])
//     .then(() => next())
//     .catch(err => next(err));
// });

export default Task;
