<script>
import axios from "axios";
import { store } from "./store";
import AppHeader from "./components/AppHeader.vue";
import AppCard from "./components/AppCard.vue";
export default {
  data() {
    return {
      store,
    }
  },
  components: {
    AppHeader,
    AppCard

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
          this.store.myFilmsArray = resp.data.results;
        })
    },
    getSeriesFromApi(params) {
      axios
        .get(this.store.apiUrlSeries, {
          params
        })
        .then((resp) => {
          this.store.mySeriesArray = resp.data.results;

        })
    }
  },

}
</script>

<template>
  <AppHeader @search="handleSearch" />
  <div class="container">
    <div class="row row-cols-2 row-cols-md-4 row-cols-lg-6">
      <div v-for="item in store.myFilmsArray" class="col mt-2">
        <AppCard :item="item" />
      </div>

    </div>
  </div>
</template>

<style lang="scss">
@use "./scss/general.scss"
</style>
