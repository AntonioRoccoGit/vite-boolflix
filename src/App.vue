<script>
import axios from "axios";
import { store } from "./store";
import AppHeader from "./components/AppHeader.vue";
import AppCard from "./components/AppCard.vue";
import SelectGenres from "./components/SelectGenres.vue";
import SelectGenresTV from "./components/SelectGenresTV.vue";
export default {
  data() {
    return {
      store,
    }
  },
  components: {
    AppHeader,
    AppCard,
    SelectGenres,
    SelectGenresTV

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
        this.getFilmGeneres(params);
        this.getSeriesGeneres(params);

      } else {

        console.log("error");
      }
      this.store.currentSearch = "";
      this.store.filmsGeneres = "";
      this.store.seriesGeneres = "";
    },
    getFilmsFromApi(params) {
      axios
        .get(`${this.store.apiUrl}${this.store.apiUrlFilms}`, {
          params
        })
        .then((resp) => {
          this.store.myFilmsArray = resp.data.results;
        })
    },
    getSeriesFromApi(params) {
      axios
        .get(`${this.store.apiUrl}${this.store.apiUrlSeries}`, {
          params
        })
        .then((resp) => {
          this.store.mySeriesArray = resp.data.results;

        })
    },
    getFilmGeneres() {
      axios
        .get(`${this.store.apiUrl}${this.store.apiUrlFilmsGeners}`, {
          params: {
            api_key: this.store.apiKey
          }
        })
        .then((resp) => {
          this.store.filmGenersArray = resp.data.genres;
        })
    },
    getSeriesGeneres() {
      axios
        .get(`${this.store.apiUrl}${this.store.apiUrlSeriesGeners}`, {
          params: {
            api_key: this.store.apiKey
          }
        })
        .then((resp) => {
          this.store.seriesGenersArray = resp.data.genres;
        })
    },
  },

}
</script>

<template>
  <AppHeader @search="handleSearch" />
  <div class="container ms_container mt-4 px-5">
    <h2 v-if="this.store.myFilmsArray.length" class="row-title"> FILMS </h2>
    <h2 v-else class="mt-4 text-center">Inizia la tua ricerca...</h2>

    <!-- SELECT SECTION -->
    <SelectGenres />
    <!-- /SELECT SECTION -->

    <!-- FILM ROW -->
    <div div class=" row row-cols-2 row-cols-md-4 row-cols-lg-6">
      <div v-show="store.filmsGeneres === '' || item.genre_ids.includes(this.store.filmsGeneres)"
        v-for="item in this.store.myFilmsArray" :key="item.id" class="col mt-2">
        <AppCard :item="item" />
      </div>
    </div>
    <!-- /FILM ROW -->
    <!-- SERIES ROW -->
    <h2 class="row-title" v-if="this.store.mySeriesArray.length">Serie TV</h2>
    <SelectGenresTV />
    <div class="row row-cols-2 row-cols-md-4 row-cols-lg-6">
      <div v-show="store.seriesGeneres === '' || item.genre_ids.includes(this.store.seriesGeneres)"
        v-for="item in this.store.mySeriesArray" :key="item.id" class="col mt-2">
        <AppCard :item="item" />
      </div>
    </div>
  </div>
  <!-- /SERIES ROW -->
</template>

<style lang="scss">
@use "./scss/general.scss"
</style>
