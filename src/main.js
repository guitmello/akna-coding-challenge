import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import AppBookList from './components/AppBookList.vue';
import AppBookForm from './components/AppBookForm.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/books",
      name: "books",
      component: AppBookList
    },
    {
      path: "/",
      redirect: "/books"
    },
    {
      path: "/books/edit/:book",
      name: "editBook",
      component: AppBookForm,
      props: true
    },
    {
      path: "/books/add",
      name: "addBook",
      component: AppBookForm
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
