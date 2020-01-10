<template>
  <div class="task">
    {{task.description}}
    <div class="btn-group">
      <button
        class="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >MoveTask</button>
      <div class="dropdown-menu">
        <a
          class="dropdown-item"
          href="#"
          v-for="list in lists"
          :key="list.id"
          :list="list.title"
        >{{list.title}}</a>
      </div>
    </div>
    <!-- <button @click="removeTask(task)" class="btn btn-danger">X</button> -->
    <button @click="addComment()" class="btn btn-success">Add Comment</button>
    <div>
      <form @submit.prevent="addComment">
        <input type="text" placeholder="Comment..." v-model="newComment.content" required />
        <button type="submit">Comment</button>
      </form>
    </div>

    <comments v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import Comments from "@/components/Comments.vue";
export default {
  name: "task",
  props: ["task"],

  data() {
    return {
      newComment: {
        name: "",
        taskId: this.task._id
      }
    };
  },

  mounted() {
    this.$store.dispatch("getComments", this.task._id);
  },

  methods: {
    //     createComment(){
    //         swal("Add a Comment:", {
    //    data: "input",
    // })
    // .then((data) => {
    //     this.$store.dispatch("addComment",data)
    //     //   swal(`You typed: ${value}`);
    // });

    //      },

    addComment() {
      let comment = { ...this.newComment };
      this.$store.dispatch("createComment", comment);
      // console.log("what is task",task);

      this.newComment = {
        content: "",
        taskId: this.task._id
        // listId: this.list._id,
        // boardId: this.$route.params.boardId
      };
    },

    removeTask(task) {
      // console.log(list)
      this.$store.dispatch("deleteTask", task);
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.task._id];
    },
    lists() {
      return this.$store.state.lists._id;
    }
  },
  components: {
    Comments
  }
};
</script>

<style>
</style>