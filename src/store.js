import { reactive } from "vue";

export const store = reactive({
    apiKey: "f5bb4ff3b033b28af5c092736f94844d",
    apiUrlFilms: "https://api.themoviedb.org/3/search/movie",
    apiUrlSeries: "https://api.themoviedb.org/3/search/tv",
    currentSearch: ""
});