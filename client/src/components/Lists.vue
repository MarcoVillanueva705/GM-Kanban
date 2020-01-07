<template>
  <div class="list">
    
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <form @submit.prevent="addTask">
      <input type="text" placeholder="Task Title" v-model="newTask.description" required>
    <button type="submit" >New Task</button>
    </form>
    <h5 class="card-title">{{list.title}}</h5>
    
  </div>
   </div>
   </div>
  
</template>

<script>
export default {
  name: 'List',
  props: ['list'],

data() {
return {
  newTask: {
  description: "",

  boardId: this.$route.params.boardId,
  // authorId: this.$store.state.user.params
  }
}
  },

methods:{
  addTask(){
  let task= {...this.newTask};
      this.$store.dispatch("createTask", Task);
      this.newTask = {
         description: "",
         boardId: this.$route.params.boardId,
         }}
// data()
// {
//   return{
//     list:""
// }}
}}
</script>

<style scoped>
</style>
