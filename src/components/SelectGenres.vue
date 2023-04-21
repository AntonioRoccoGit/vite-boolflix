<script>
import { store } from "../store";
export default {
    name: "SelectGenres",
    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <select v-model="store.filmsGeneres" v-show="store.filmGenersArray.length" name="select" id="film-select">
        <option value="">Seleziona il genere</option>
        <option v-for="generes in store.filmGenersArray" :key="generes.id" :value="generes.id">
            {{ generes.name }}
        </option>
    </select>
</template>

<style scoped lang="scss">
select {
    border-radius: 15px;
    padding: .1rem .6rem;
    appearance: none;
    background-color: rgba(255, 255, 255, 0.144);
    color: white;

    option {
        color: black;
    }
}
</style>