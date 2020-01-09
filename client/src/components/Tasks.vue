<template>
  <div class="task">
      {{task.description}}
      <button @click="removeTask(task)" class=" btn btn-danger">X</button>
  </div>
</template>

<script>
export default {
name: 'task',
props: ['task'],

methods:{

removeTask(task){
    // console.log(list)
this.$store.dispatch("deleteTask", task)

    }
   }
}
</script>

<style>

</style>