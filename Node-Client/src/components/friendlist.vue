<template>
  <div class="friendlist-popper el-select-dropdown el-popper">
    <ul class="friendlist__ul el-scrollbar__view el-select-dropdown__list">
      <li v-for="item in userList" :key="item._id" class="friendlist__item el-select-dropdown__item" @click='addSession(item._id)'>
        {{item.userName}}
      </li>
    </ul>
  </div>
</template>

<script>
import eventhub from "@/api/event";
import popper from "@/api/vue-popper";

export default {
  data() {
    return {};
  },
  props: ["userList"],
  mixins: [popper],
  methods: {
    addSession(value) {
      // 添加会话
      this.$parent.$parent.addSession(value);
      this.$parent.visible = false;
    }
  },
  mounted() {
    this.referenceElm = this.$parent.$refs.elinput.$el;
    this.popperElm = this.$el;
    eventhub.$on("showfriendlist", () => {
      if (this.$parent.visible) this.updatePopper();
    });
  }
};
</script>

<style lang="scss" scoped>
.friendlist-popper {
  position: absolute;

  .friendlist__ul {
    list-style: none;
  }
}
</style>
