<script>
import axios from "axios";
import { store } from "./store";
import AppHeader from "./components/AppHeader.vue";
export default {
  data() {
    return {
      store,
    }
  },
  components: {
    AppHeader

  },
  methods: {
    handleSearch() {
      const params = {
        api_key: this.store.apiKey,
        query: this.store.currentSearch
      }
      if (this.store.currentSearch) {
        this.getFilmsFromApi(params);
        this.getSeriesFromApi(params);

      } else {

        console.log("error");
      }
      this.store.currentSearch = "";
    },
    getFilmsFromApi(params) {
      axios
        .get(this.store.apiUrlFilms, {
          params
        })
        .then((resp) => {
          console.log(resp, "FIlm");
        })
    },
    getSeriesFromApi(params) {
      axios
        .get(this.store.apiUrlSeries, {
          params
        })
        .then((resp) => {
          console.log(resp, "serie");
        })
    }
  },

}
</script>

<template>
  <AppHeader @search="handleSearch" />
  <div class="container">
    <div class="row">
      <div class="col"></div>
    </div>
  </div>
</template>

<style lang="scss">
@use "./scss/general.scss"
</style>
