import _listService from "../services/ListService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";
import BoardService from "../services/BoardService";
import TaskService from "../services/TaskService";

export default class ListsController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id/tasks", this.getTasksByListId)
      .post("", this.create)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await _listService.getAll(req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      let data = await TaskService.getTasksByListId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _listService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _listService.delete(req.params.id);
      return res.send("Successfully Deleted!");
    } catch (error) {
      next(error);
    }
  }
}
