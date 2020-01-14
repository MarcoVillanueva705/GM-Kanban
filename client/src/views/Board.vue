<template>
  <div class="board">{{board.title}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">New List</button>
    </form>
      <lists v-for="list in lists" :key="list.id" :list="list"/> 


  </div>

</template>

<script>
import Lists from "@/components/Lists.vue"
export default {
  name: "board",
  // name: "list",

data() {
return {
  newList: {
  title: "",
  boardId: this.$route.params.boardId,
  // authorId: this.$store.state.user.params
  }
}
  },

  mounted() {
  this.$store.dispatch("getLists", this.$route.params.boardId)

  },

    methods:{
      addList(){
        debugger
// let data = {
//   title: this.title,
//   boardId: this.$route.params.id,
//   authorId: this.$route.params.uid 
// }
// this.$store.dispatch("createList",data)
      let list= {...this.newList};
      this.$store.dispatch("createList", list);
      this.newList = {
         title: "",
         boardId: this.$route.params.boardId,
        
      
      }
      }
    },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
  },
activeBoard () {
  return this.$store.state.activeBoard;
},
lists(){
  return this.$store.state.lists
}
  },


components: {
  Lists
    },
  props: ["boardId"]
};
</script>
