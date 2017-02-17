<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <dock v-if="isIndex"></dock>
  </div>
</template>
<script>
  import dock from './components/base/Dock'

  export default {
    data () {
      return {
        isIndex: false
      }
    },
    components: {
      dock
    },
    beforeUpdate () {
      this.isIndex = this.$router.app.isIndex
    }
  }
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .15s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
