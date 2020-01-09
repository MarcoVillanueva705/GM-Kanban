import express from "express"
import {Authorize} from "../middleware/authorize"
import _CommentService from "../services/CommentService"

export default class CommentController {
    constructor(){
      this.router = express.Router()
      .use(Authorize.authenticated)
    //   .get("", this.getAll)
      .post("", this.create)
      .delete("/:id", this.delete)
    .use(this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'No Such Route' })
      }

      async create(req, res, next) {
        try {
      req.body.authorId = req.session.uid
      let data = await _CommentService.create(req.body)
      return res.status(201).send(data);
        } catch (error) {
          next(error)
        }
      }



      async delete(req, res, next) {
        try {
      await _CommentService.delete(req.params.id);
      return res.send("Successfully Deleted!");
        } catch (error) {
          next(error)
        }
      }
}