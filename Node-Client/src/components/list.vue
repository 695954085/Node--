<template>
  <div class="list">
    <ul class="list__menu">
      <li v-for="item in list" :class="['list__item',session.friendOid==item.friendOid?'is-active':'']"
         :key="item.friendOid" @click="select(item)">
        <img class="list-item__avatar" :alt="item.userName" :src="item.img" />
        <p class="list-item__name">{{item.userName}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["userList", "session", "search", "sessionList"],
  methods: {
    select(value) {
      this.$emit("selectSession",  this.sessionList.indexOf(value));
    }
  },
  computed: {
    list() {
      // 1. 要通过sessionList和userList得到有userName、img信息的sessionList
      // 2. 要通过search过滤sessionList
      this.sessionList.forEach((value, index, array) => {
        for (let i = 0; i < this.userList.length; i++) {
          if (value.friendOid == this.userList[i]._id) {
            value.userName = this.userList[i].userName;
            value.img = this.userList[i].img;
            break;
          }
        }
      });
      return this.sessionList.filter(value => {
        return value.userName.indexOf(this.search) > -1;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list__menu {
  list-style: none;
  padding: 0px;
  margin: 0px;

  .list__item {
    padding: 0px;
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.is-active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .list-item__avatar{
      width: 30px;
      height: 30px;
    }

    .list-item__name{
      margin: 0 0 0 20px;
      line-height: 1.4rem;
    }
  }
}
</style>


