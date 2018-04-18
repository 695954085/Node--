<template>
  <div class="message">
    <ul class="message__ul">
      <li v-for="item in messages" class="message__item" :key="item.friendOid">
        <p class="item__time">
          <span class="time__text">{{item.date | time}}</span>
        </p>
        <div :class="['item__main',{'self':session.self}]">
          <img class="item__avatar" :src='item | avatar' />
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
    avatar(value) {
      if (value.self) {
        return this.user.img;
      }
      console.log(this);
      return this.user.img;
    },
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
      // if(this.userList == undefined){
      //   return '';
      // }
      // return this.userList.filters(value => {
      //   if (value._id == this.session.friendOid) {
      //     return true;
      //   }
      //   return false;
      // })[0];
      return {
        img:'http://localhost:3000/img/1.jpg'
      };
    },
    messages(){
      if(this.session != undefined){
        return this.session.messages;
      }else{
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  padding: 10px 15px;
  overflow-y: scroll;

  .message__ul {
    list-style: none;
    padding: 0px;
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
}
</style>













