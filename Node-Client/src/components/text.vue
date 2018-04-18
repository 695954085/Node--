<template>
  <div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="text" @keyup.ctrl.13="inputing">
    </textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    inputing() {
      if (this.text == "") {
        return;
      }
      this.$emit("addMessage", {
        text: this.text,
        date: new Date(),
        self: true
      });
      this.text = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>


