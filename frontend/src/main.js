import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem("user_token")
  }
}));

const httpLink = new createHttpLink({
  uri: "http://localhost:4040/graphql"
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  provide: apolloProvider.provide(),
  router,
  components: { App },
  template: "<App/>"
});
