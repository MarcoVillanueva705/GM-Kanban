<template>
  <div class="boards">
    WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}} </router-link>
      <button @click="close(board)" class=" btn btn-danger">X</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
         
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      },
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      close(board){
        
        console.log(board);
      //  let id = this.$store.state.boards.find(b => b._id == this.$store.state.boards.data._id)
        
      this.$store.dispatch("deleteBoard", board._id)

    },
  }
  }
</script>