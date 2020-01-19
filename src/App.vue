<template>
  <div id="app">
    <AppNavbar></AppNavbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import AppNavbar from "./components/AppNavbar"

export default {
  name: "app",
  components: {
    AppNavbar
  }
};
</script>

<style lang="less">
@primary-color: #0b2950;
@second-color: #444a65;
@tertiary-color: #d03129;
@success: #4caf50;
@erro: #f44336;

html {
  background-color: #f2f2f2;
  height: 100vh;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

h1 {
  font-size: 2.5rem;
  color: @primary-color;
  margin: 1.6rem 0 1rem;
}

.m-rl-20 {
  margin: 10px;
}

.divider {
  content: "";
  height: 3px;
  width: 50px;
  background: @tertiary-color;
  margin: 20px auto 40px;
}

nav {
  background-color: @tertiary-color;
  margin-bottom: 60px
}

.btn-area {
  margin: 40px 0 10px;
}

.btn {
  background-color: @primary-color;
  &:hover {
    background-color: @primary-color;
    opacity: 0.8;
  }
}

.dropdown-content li > a {
  color: @second-color;
}

.material-icons.prefix {
  &.active {
    color: @primary-color;
  }
}

input[type="text"]:not(.browser-default):focus:not([readonly]) + label,
input[type="tel"]:not(.browser-default):focus:not([readonly]) + label {
  color: @primary-color;
}
input[type="text"]:not(.browser-default):focus.valid ~ label,
input[type="tel"]:not(.browser-default):focus.valid ~ label {
  color: @success;
}
input[type="text"]:not(.browser-default):focus.invalid ~ label,
input[type="tel"]:not(.browser-default):focus.invalid ~ label {
  color: @erro;
}

input[type="text"]:not(.browser-default):focus:not([readonly]),
input[type="tel"]:not(.browser-default):focus:not([readonly]) {
  border-bottom: 1px solid @primary-color;
  -webkit-box-shadow: 0 1px 0 0 @primary-color;
  box-shadow: 0 1px 0 0 @primary-color;
}
input.valid[type="text"]:not(.browser-default),
input.valid[type="text"]:not(.browser-default):focus
  input.valid[type="tel"]:not(.browser-default),
input.valid[type="tel"]:not(.browser-default):focus {
  border-bottom: 1px solid @success !important;
  -webkit-box-shadow: 0 1px 0 0 @success !important;
  box-shadow: 0 1px 0 0 @success !important;
}
input.invalid[type="text"]:not(.browser-default),
input.invalid[type="text"]:not(.browser-default):focus,
input.invalid[type="tel"]:not(.browser-default),
input.invalid[type="tel"]:not(.browser-default):focus {
  border-bottom: 1px solid @erro;
  -webkit-box-shadow: 0 1px 0 0 @erro;
  box-shadow: 0 1px 0 0 @erro;
}

.input-feedback {
  font-size: 0.8rem;
  margin-left: 5px;
  &.error{
    color: @erro;
  }
}

.toast {
  opacity: 0.8;
  .success-notify {
    color: #d4edda;
  }
  .error-notify {
    color: #f8d7da;
  }
}
</style>
