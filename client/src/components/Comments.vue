<template>
  <div class="comment">
    {{comment.content}}
    <button @click="removeComment(comment)" class="btn btn-danger">Remove</button>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],

  methods: {
    removeComment(comment) {
      this.$store.dispatch("deleteComment", comment);
    }
  }
};
</script>

<style>
</style>