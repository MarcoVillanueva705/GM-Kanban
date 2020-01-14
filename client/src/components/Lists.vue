<template>
  <div class="list">
    
    {{list.title}}
  </div>
</template>


<script>
export default {
  name: 'Lists',
  props: ['list'],

data() {
  return {
   list: ""
    }
}
}
</script>


<style scoped>
</style>
