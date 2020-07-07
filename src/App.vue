<template>
  <div id="app">
    <notifications position="bottom left" />
    <my-nav></my-nav>
    <router-view></router-view> 
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Nav from './components/shared/Nav';

export default {
  components: {
    'my-nav': Nav
  }
}
</script>

<style>
</style>