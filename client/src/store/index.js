import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    lists: [],
    user: {},
    boards: [],
    activeBoard: {},
    activeList: {},
    tasks: [],
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      // console.log(user)
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setLists(state, data) {
      state.lists = data;
    },
    addLists(state, data) {
      state.lists.push(data);
    },
    addTasks(state, data) {
      state.tasks.push(data);
      // console.log(data);
    },
    setTasks(state, data) {
      // debugger
      Vue.set(state.tasks, data.listId, data.tasks); //NOTE state.tasks[data.listId] =data.tasks
      // state.tasks =(data)
    },

    setComments(state, data) {
      Vue.set(state.comments, data.taskId, data.comments);
    },

    resetState(state, data) {
      state.user = {};
    }

    // setActiveList(state, data){
    //   state.activeBoard= (data)
    // }
    // delete(state,data){
    //   state.boards.find
    // }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(serverBoard => {
        dispatch("getBoards");
      });
    },
    async deleteBoard({ commit, dispatch }, id) {
      let res = await api.delete("boards/" + id);
      dispatch("getBoards");
    },

    //#endregion

    //#region -- LISTS --
    async getLists({ commit, dispatch }, boardId) {
      // debugger
      let res = await api.get(`boards/${boardId}/lists`);
      commit("setLists", res.data);
      // console.log("here", res.data);
    },
    async createList({ commit, dispatch }, list) {
      let res = await api.post("lists", list);
      commit("addLists", res.data);
      // console.log(" from store", res)
    },
    async deleteList({ commit, dispatch }, list) {
      // console.log(list)
      let res = await api.delete("lists/" + list.id);
      dispatch("getLists", list.boardId);
    },

    // async getListByBoardId({commit, dispatch}, id) {
    //   let res = await api.get("boards/" +id+ "/lists")
    //   console.log(res.data)
    // },
    //#endregion

    //#region -- TASKS --
    async createTask({ commit, dispatch }, task) {
      // console.log("from create task",task)
      let res = await api.post("tasks", task);
      dispatch("getTasks", res.data.listId);
      console.log("$$$$$$", res.data);
    },
    async getTasks({ commit, dispatch }, listId) {
      let res = await api.get("lists/" + listId + "/tasks");
      commit("setTasks", { tasks: res.data, listId: listId });
      // console.log("from get task", res.data);
    },
    async deleteTask({ commit, dispatch }, task) {
      // console.log(list)
      let res = await api.delete("tasks/" + task.id);
      dispatch("getTasks", task.listId);
    },
    async changeTaskList({ commit, dispatch }, data) {
      console.log("herehere", data);

      let res = await api.put("tasks/" + data.task.id, data.task);
      dispatch("getTasks", data.task.listId);
      console.log("here1", data.oldListId);
      dispatch("getTasks", data.oldListId);
    },

    //#endregion
    async createComment({ commit, dispatch }, data) {
      console.log(data);
      let res = await api.post("comments", data);
      dispatch("getComments", res.data.taskId);
    },

    async getComments({ commit, dispatch }, taskId) {
      let res = await api.get("tasks/" + taskId + "/comments");
      commit("setComments", { comments: res.data, taskId: taskId });
    },
    async deleteComment({ commit, dispatch }, comment) {
      let res = await api.delete("comments/" + comment.id);
      dispatch("getComments", comment.taskId);
    }
  }
});
