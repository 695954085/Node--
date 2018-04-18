<template>
  <div class="message">
    <ul class="message__ul">
      <li v-for="item in messages" class="message__item" :key="item.friendOid">
        <p class="item__time">
          <span class="time__text">{{item.date | time}}</span>
        </p>
        <div :class="['item__main',{'self':item.self}]">
          <img class="item__avatar" :src='avatar(item)' width="30" height="30" />
          <div class="item__text">{{item.text}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["session", "user", "userList"],
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      return date.getHours() + ":" + date.getMinutes();
    }
  },
  computed: {
    sessionUser() {
      if (this.userList == undefined) {
        return "";
      }
      return this.userList.filter(value => {
        if (value._id == this.session.friendOid) {
          return true;
        }
        return false;
      })[0];
    },
    messages() {
      if (this.session != undefined) {
        return this.session.messages;
      } else {
        return [];
      }
    }
  },
  methods: {
    avatar(item) {
      if (item.self) {
        return this.user.img;
      }
      return this.sessionUser.img;
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  padding: 10px 15px;
  overflow-y: scroll;
  height: 440px;

  .message__ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .message__item {
    margin-bottom: 15px;

    .item__time {
      margin: 7px 0;
      text-align: center;

      .time__text {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
        line-height: 1rem;
      }
    }

    .item__avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }

    .item__text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: calc(100% - 40px);
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }
  }

  .self {
    text-align: right;

    .item__avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .item__text {
      background-color: #b2e281;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>













