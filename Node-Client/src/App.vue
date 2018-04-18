<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {

    }
  }
};
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
  }
</style>


















