import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Task = new Schema({
description: {type: String, require: true},
listId: {type: ObjectId, ref: "List", required: true},
authorId: {type: ObjectId, ref:" User", required: true},
boardId: {type: ObjectId, ref: "Board", required: true}
}, {timestamps: true, toJSON: {virtuals: true}})

export default Task;