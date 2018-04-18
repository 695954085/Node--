<template>
  <div class="liuyanben">
    <div class="liuyanben__sidebar">
      <card :user='user' v-on:searchSession='searchSession' :user-list='userList'></card>
      <list :session-list='sessionList' :search='search' v-on:selectSession='selectSession' :user-list='userList' :session='session'></list>
    </div>
    <div class="liuyanben__main">
      <message :session='session' :user="user" :user-list='userList'></message>
      <mtext @addMessage='addSessionMessage'></mtext>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import list from "@/components/list";
import message from "@/components/message";
import mtext from "@/components/text";
import { getServerData, addMessage } from "@/api/api";

export default {
  data() {
    return {
      user: {
        img: "",
        userName: ""
      },
      // 用户列表
      userList: [],
      // 会话列表
      sessionList: [],
      //当前会话索引
      sessionIndex: 0,
      // 搜索会话
      search: ""
    };
  },
  computed: {
    session() {
      return this.sessionList[this.sessionIndex];
    }
  },
  components: {
    card: card,
    list: list,
    message,
    mtext
  },
  methods: {
    searchSession(value) {
      this.search = value;
    },
    selectSession(index) {
      this.sessionIndex = index;
    },
    addSession(value) {
      addMessage(this.user._id, value, "测试",true).then(value => {
        console.log(value);
      });
    },
    addSessionMessage(message){
      this.$set(this.session,this.session.message,this.session.messages.push(message));
      addMessage(this.user._id, this.session.friendOid, message.text,true).then(value => {
        console.log(value);
      });
    },
    async init() {
      let serverData = await getServerData();
      this.user = Object.assign(this.user, serverData.user);
      this.userList = serverData.userList;
      if (serverData.sessionList[0] !== undefined) {
        this.sessionList = serverData.sessionList[0].personalSessionList;
      } else {
        this.sessionList = [];
      }
    }
  },
  created() {
    //获取服务器数据
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.liuyanben {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  .liuyanben__sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
    height: 100%;
  }
  .liuyanben__main {
    float: left;
    width: 600px;
    position: relative;
    background-color: #eeeeee;
  }
}
</style>

