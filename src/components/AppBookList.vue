<template>
  <div class="card-panel">
    <h1 class="center">Livros Cadastrados</h1>
    <div class="divider center"></div>
    <div class="row">
      <div class="col s12">
        <table class="striped centered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Autor</th>
              <th>Preço</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody v-if="books.length > 0">
            <tr v-for="book in books" v-bind:key="book.id">
              <td>{{book.name}}</td>
              <td>{{book.author}}</td>
              <td>{{book.price == 'R$ 0,00' ? 'Grátis' : book.price}}</td>
              <td>
                
                <a
                  v-bind:key="book.id"
                  class="dropdown-trigger btn btn-floating waves-effect waves-light"
                  v-bind:data-target="book.id"
                >
                  <i class="material-icons">more_vert</i>
                </a>

                <ul v-bind:id="book.id" class="dropdown-content">
                  <li>
                    <a @click="navigateEditBook(book)">
                      <span>Editar</span>
                    </a>
                  </li>
                  <li>
                    <a @click="deleteBook(book)">Deletar</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="books.length < 1">
            <tr>
              <td class="center" colspan="4">Não há livros cadastrados</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="center btn-area">
      <button class="btn waves-effect waves-light" type="button" v-on:click="navigateAddBook()">
        <i class="material-icons left">add</i>
        Cadastrar livro
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import materialize from "materialize-css/dist/js/materialize.min.js";
import notificationToast from "./shared/notifcationToast";

export default {
  name: "AppBookList",
  props: {},
  data: () => {
    return {
      books: []
    };
  },
  methods: {
    getBooks() {
      axios({
        method: "get",
        url: "http://localhost:3000/books",
        responseType: "json"
      })
        .then(response => {
          this.books = response.data;
        })
        .catch(() => notificationToast.notify("error", "get", materialize));
    },
    deleteBook(book) {
      axios({
        method: "delete",
        url: `http://localhost:3000/books/${book.id}`
      })
        .then(() => {
          this.books.splice(this.books.indexOf(book), 1);
          notificationToast.notify("sucess", "delete", materialize);
        })
        .catch(() => notificationToast.notify("error", "delete", materialize));
    },
    navigateEditBook(book) {
      this.$router.push({
        path: `/books/edit/${book.id}`
      });
    },
    navigateAddBook() {
      this.$router.push({
        path: "/books/add"
      });
    }
  },
  created() {
    this.getBooks();
  },
  updated() {
    const elDropDown = document.querySelectorAll(".dropdown-trigger");
    elDropDown.forEach(dropdown => {
      materialize.Dropdown.init(dropdown, {});
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  color: #444a65;
}
</style>
