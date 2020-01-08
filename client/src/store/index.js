import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'
import AuthService from '../AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    lists:[],
    user: {},
    boards: [],
    activeBoard: {},
    activeList:{}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      console.log(user)
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, data){
      state.lists = data
    },
    addLists(state, data) {
      state.lists.push(data);
    },
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
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({ commit, dispatch }, id) {
      let res = await api.delete("boards/"+ id);
      dispatch("getBoards")
    },
    
    //#endregion

    //#region -- LISTS --
    async getLists({commit,dispatch}, boardId){
      // debugger
      let res = await api.get(`boards/${boardId}/lists`)
      commit("setLists" , res.data)
      console.log("here", res.data);
       
    },
    async createList({commit, dispatch}, list) {
      let res= await api.post("lists", list);
      commit("addLists",res.data)
      console.log(" from store", res)
    },
    async deleteList({ commit, dispatch }, list) {
      console.log(list)
      let res = await api.delete("lists/"+ list.id);
      dispatch ("getLists",list.boardId)
    },
    }
    // async getListByBoardId({commit, dispatch}, id) {
    //   let res = await api.get("boards/" +id+ "/lists")
    //   console.log(res.data)
    // },
    //#endregion
  
});
