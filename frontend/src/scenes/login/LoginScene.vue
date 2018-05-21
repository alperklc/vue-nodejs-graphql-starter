<template>
  <div class="login-scene">
    <div class="form-container">
      <div class="logo-container">
        <img src="@/assets/logo.png" >
      </div>
      <div class="login-scene__form-container">
        <div class="login-scene__selectors">
          <span
            class="login-scene__selector"
            :class="{'login-scene__selector--active': showSignup}"
            @click="showSignup = true">
            SIGNUP
          </span>
          <span
            class="login-scene__selector"
            :class="{'login-scene__selector--active': !showSignup}"
            @click="showSignup = false">
            LOGIN
          </span>
        </div>
        <div
          v-if="showSignup"
          class="login-scene__signup-form">
          <input
            placeholder="Email"
            type="text"
            v-model="newUser.email" >
          <input
            placeholder="Username"
            type="text"
            v-model="newUser.username" >
          <input
            placeholder="Password"
            type="password"
            v-model="newUser.password" >
          <button
            class="submit-btn"
            type="submit"
            @click.prevent="signup">Sign Up</button>
        </div>
        <div
          v-else
          class="login-scene__login-form">
          <input
            placeholder="Email"
            type="text"
            v-model="loginCredentials.email" >
          <input
            placeholder="Password"
            type="password"
            v-model="loginCredentials.password" >
          <button
            class="submit-btn"
            type="submit"
            @click="login">Login</button>
        </div>
      </div>
    </div>
    <toast-message ref="toastr" />
  </div>
</template>

<script>
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import ToastMessage from "@/components/ToastMessage";
import queries from "@/data";

export default {
  components: {
    ToastMessage
  },
  data() {
    return {
      apolloClient: undefined,
      showSignup: false,
      newUser: {
        email: undefined,
        username: undefined,
        password: undefined
      },
      loginCredentials: {
        email: undefined,
        password: undefined
      },
      queries
    };
  },
  created() {
    this.apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:4040/auth"
      }),
      cache: new InMemoryCache(),
      connectToDevTools: true
    });
  },
  methods: {
    saveUserDataToLocalStorage(userData) {
      localStorage.setItem("user_id", userData.user.id);
      localStorage.setItem("user_username", userData.user.username);
      localStorage.setItem("user_token", userData.token);
    },

    redirectToListScene() {
      this.$router.push("/records");
    },

    login() {
      this.apolloClient
        .mutate({
          mutation: this.queries.loginUser,
          variables: {
            email: this.loginCredentials.email,
            password: this.loginCredentials.password
          }
        })
        .then(({ data }) => {
          this.saveUserDataToLocalStorage(data.loginResponse);
          this.redirectToListScene();
        })
        .catch(err => {
          const graphQLErrors = err.graphQLErrors
            .map(err => err.message)
            .join(", ");
          const errorMessage = err.message;

          this.$refs.toastr.display(graphQLErrors || errorMessage, () => {});
        });
    },

    signup() {
      this.apolloClient
        .mutate({
          mutation: this.queries.createUser,
          variables: {
            username: this.newUser.username,
            email: this.newUser.email,
            password: this.newUser.password
          }
        })
        .then(({ data }) => {
          this.saveUserDataToLocalStorage(data.signupResponse);
          this.redirectToListScene();
        })
        .catch(err => {
          const graphQLErrors = err.graphQLErrors
            .map(err => err.message)
            .join(", ");
          const errorMessage = err.message;

          this.$refs.toastr.display(graphQLErrors || errorMessage, () => {});
        });

    }
  }
};
</script>
