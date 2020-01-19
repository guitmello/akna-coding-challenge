<template>
  <div class="card-panel">
    <h1 class="center">{{title}}</h1>
    <div class="divider"></div>

    <form v-on:submit.prevent="checkForm()" novalidate>
      <div class="row">
        <div class="col s12">
          <div class="input-field col s12 m4">
            <i class="material-icons prefix">book</i>
            <input
              class="validate"
              type="text"
              name="name"
              id="name"
              v-model="bookEdit.name"
              @blur="checkForm('nameError', bookEdit.name)"
              maxlength="50"
              required
            />
            <span class="input-feedback error" v-if="form.nameError">Campo obrigatório</span>
            <label for="name" v-bind:class="{ active: bookEdit.name }">Nome</label>
          </div>
          <div class="input-field col s12 m4">
            <i class="material-icons prefix">account_circle</i>
            <input
              class="validate"
              type="text"
              name="author"
              id="author"
              v-model="bookEdit.author"
              @blur="checkForm('authorError', bookEdit.author)"
              maxlength="50"
              required
            />
            <span class="input-feedback error" v-if="form.authorError">Campo obrigatório</span>
            <label for="author" v-bind:class="{ active: bookEdit.author }">Autor</label>
          </div>
          <div class="input-field col s12 m4">
            <i class="material-icons prefix">attach_money</i>
            <input
              class="validate"
              type="tel"
              name="price"
              id="price"
              v-model="bookEdit.price"
              v-money="money"
              @blur="checkForm('priceError', bookEdit.price)"
              maxlength="20"
              required
            />
            <span class="input-feedback error" v-if="form.priceError">Campo obrigatório</span>
            <label for="price" v-bind:class="{ active: bookEdit.price }">Preço</label>
          </div>
        </div>
      </div>

      <div class="center btn-area">
        <button
          class="btn waves-effect waves-light center-align m-rl-20"
          type="button"
          @click="navigateBack()"
        >
          <i class="material-icons left">arrow_back</i>
          Voltar
        </button>

        <button class="btn waves-effect waves-light center-align m-rl-20" type="submit">
          <i class="material-icons left">check</i>
          {{buttonTitle}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import materialize from "materialize-css/dist/js/materialize.min.js";
import notificationToast from "./shared/notifcationToast";
import { VMoney } from "v-money";

export default {
  name: "AppBookForm",
  props: ["book"],
  data: () => {
    return {
      bookEdit: {},
      form: {
        nameError: false,
        authorError: false,
        priceError: false
      },
      buttonTitle: "",
      title: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  directives: {
    money: VMoney
  },
  methods: {
    getBook(book) {
      axios({
        method: "get",
        url: `http://localhost:3000/books/${book}`
      })
        .then(response => {
          this.bookEdit = response.data;
          this.title = `Editando o livro - ${this.bookEdit.name}`;
        })
        .catch(() => notificationToast.notify("error", "get", materialize));
    },
    editBook() {
      axios({
        method: "put",
        url: `http://localhost:3000/books/${this.bookEdit.id}`,
        data: { ...this.bookEdit }
      })
        .then(() => {
          notificationToast.notify("sucess", "edit", materialize);
          this.$router.push({ path: "/" });
        })
        .catch(() => notificationToast.notify("error", "edit", materialize));
    },
    addBook() {
      axios({
        method: "post",
        url: "http://localhost:3000/books",
        data: { ...this.bookEdit }
      })
        .then(() => {
          notificationToast.notify("sucess", "add", materialize);
          this.$router.push({ path: "/" });
        })
        .catch(() => notificationToast.notify("error", "add", materialize));
    },
    checkForm(blurValidate, field) {
      
      if (!blurValidate) {
        this.form.nameError = this.bookEdit.name ? false : true;
        this.form.authorError = this.bookEdit.author ? false : true;
        this.form.priceError = this.bookEdit.price ? false : true;
      } else {
        this.form[blurValidate] = field ? false : true
      }

      if (!this.form.nameError && !this.form.authorError && !this.form.priceError && !blurValidate) {
        this.submit();
      }
    },
    submit() {
      if (this.book) {
        this.editBook();
      } else {
        this.addBook();
      }
    },
    navigateBack() {
      this.$router.push({ path: "/" });
    }
  },
  created() {
    if (this.book) {
      this.buttonTitle = "Editar";
      this.getBook(this.book);
    } else {
      this.buttonTitle = "Cadastrar";
      this.title = `Cadastrando Livro`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
