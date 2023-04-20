import { reactive } from "vue";

export const store = reactive({
    apiKey: "f5bb4ff3b033b28af5c092736f94844d",
    apiUrl: "https://api.themoviedb.org/3",
    apiUrlFilms: "/search/movie",
    apiUrlSeries: "/search/tv",
    apiUrlFilmsGeners: "/genre/movie/list",
    apiUrlSeriesGeners: "/genre/tv/list",
    imgPath: "https://image.tmdb.org/t/p/w342",
    currentSearch: "",
    myFilmsArray: [],
    mySeriesArray: [],
    filmGenersArray: [],
    seriesGenersArray: []
});