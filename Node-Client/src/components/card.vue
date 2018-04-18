<template>
  <div class="card">
    <header>
      <img class="header__avatar" :src="user.img" :alt="user.name" width="40px" height="40px" v-if="user.img"/>
      <img v-else class="header__avatar" width="40px" height="40px" src="../assets/logo.png"/>
      <p class="header__name">{{user.userName}}</p>
    </header>
    <footer>
      <el-input class="footer__search" type="text" placeholder="search user..." v-model="search" ref="elinput">
        <i class="el-icon-plus icon" slot="suffix" @click='showFriendList'></i>
      </el-input>
    </footer>
    <transition name="el-zoom-in-top">
      <friendlist :user-list='userList' v-show='visible'>
      </friendlist>
    </transition>
  </div>
</template>

<script>
import friendlist from "@/components/friendlist";
import eventhub from "@/api/event";
export default {
  data() {
    return {
      search: "",
      visible: false
    };
  },
  components: {
    friendlist
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    userList: {
      type: Array,
      required: true
    }
  },
  watch: {
    search: function(newValue, oldValue) {
      this.$emit("searchSession", newValue);
    },
    visible: function(newValue, oldValue) {
      if (newValue) {
        eventhub.$emit("showfriendlist");
      }
    }
  },
  methods: {
    showFriendList() {
      // 打开FriendList
      this.visible = !this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  padding: 12px;
  border-bottom: 1px solid #24272c;

  footer {
    margin-top: 10px;

    .foorer__search {
      padding: 0 10px;
      width: 100%;
      font-size: 12px;
      color: #fff;
      height: 30px;
      line-height: 30px;
      border: 1px solid #3a3a3a;
      border-radius: 4px;
      outline: none;
      background-color: #26292e;
    }
  }

  .icon {
    height: 100%;

    &::before {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      display: block;
    }
  }

  header {
    display: flex;
    align-items: center;
    .header__avatar {
      border-radius: 2px;
    }
    .header__name {
      display: inline-block;
      margin: 0 0 0 15px;
      font-size: 16px;
    }
  }
}

$--md-fade-transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
  opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: $--md-fade-transition;
  transform-origin: center top;
}
.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
