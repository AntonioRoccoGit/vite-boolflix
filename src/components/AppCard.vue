<script>
import { store } from '../store';
import LangFlag from "vue-lang-code-flags";
import axios from 'axios';
export default {
    name: "AppCard",
    data() {
        return {
            store,
            castArray: [],
            showDetails: false
        }
    },
    components: {
        LangFlag,
    },
    props: {
        item: Object,
    },

    computed: {
        getFleg() {
            const flag = this.item.original_language;
            if (flag === "kn") {
                return false;
            }
            return flag;
        },
        getOriginalTitle() {
            if (this.item.original_title) {
                return this.item.original_title;
            } else {
                return this.item.original_name;
            }
        },
        getTitle() {
            if (this.item.title) {
                return this.item.title;
            } else {
                return this.item.name;
            }
        },
        setRaiting() {
            return parseInt(this.item.vote_average / 2);
        },
        getCast() {
            if (this.item.original_title) {
                return this.getMovieCast;
            } else {
                return this.getSeriesCast;
            }
        },
    },
    methods: {
        getGeneres(genre) {
            if (this.item.original_title) {
                for (let i = 0; i < this.store.filmGenersArray.length; i++) {
                    let curr = this.store.filmGenersArray[i];
                    if (genre === curr.id) {
                        return curr.name
                    }
                }
            } else {
                for (let i = 0; i < this.store.seriesGenersArray.length; i++) {
                    let curr = this.store.seriesGenersArray[i];
                    if (genre === curr.id) {
                        return curr.name
                    }
                }
            }

        },
        getMovieCast() {
            if (this.castArray.length === 0) {
                axios
                    .get(`${this.store.apiUrl}/movie/${this.item.id}/credits`, {
                        params: {
                            api_key: this.store.apiKey
                        }
                    })
                    .then(resp => {
                        for (let i = 0; i < 5; i++) {
                            this.castArray.push(resp.data.cast[i].original_name);
                        }
                    });

            };
            this.showDetails = !this.showDetails;
        },
        getSeriesCast() {
            if (this.castArray.length === 0) {
                axios
                    .get(`${this.store.apiUrl}/tv/${this.item.id}/credits`, {
                        params: {
                            api_key: this.store.apiKey
                        }
                    })
                    .then(resp => {
                        for (let i = 0; i < 5; i++) {
                            this.castArray.push(resp.data.cast[i].original_name);
                        }
                    })

            };
            this.showDetails = !this.showDetails;

        },

    }

}
</script>

<template>
    <div class="ms_card">
        <img :src="`${store.imgPath}${item.poster_path}`" alt="">
        <h3 v-if="!item.poster_path">Siamo spiacenti, l'immagine non è disponibile</h3>
        <ul class="overlay">
            <li><span>Titolo:</span> {{ getTitle }}</li>
            <li v-if="getTitle !== getOriginalTitle"><span>Titolo originale: </span>{{ getOriginalTitle }}</li>
            <li v-if="getFleg">
                <span>Lingua:</span>
                <LangFlag :iso="getFleg" :squared="false" />
            </li>
            <li v-else><span>Lingua:</span> Kannada</li>
            <li>
                <span>Voto:</span>
                <i v-for="number in setRaiting" class="fa-solid fa-star"></i>
                <i v-for="star in (5 - setRaiting)" class="fa-regular fa-star"></i>
            </li>
            <li v-if="item.overview"><span>Descrizione:</span> {{ item.overview }}</li>
            <li>
                <button @click="getCast">Dettagli</button>
                <div v-show="showDetails" class="container">
                    <h2 class="mt-2">Attori:</h2>
                    <div class="row row-cols-5 flex-column gap-2">
                        <div v-for="name in castArray" class="col">{{ name }}</div>
                    </div>
                    <h2 class="mt-2">Categorie:</h2>
                    <div class="row row-cols-5 flex-column gap-2">
                        <div v-for="id in item.genre_ids" class="col">{{ getGeneres(id) }}</div>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<style scoped lang="scss">
@use "../scss/partials/costantVariables.scss" as *;

.ms_card {
    border: 1px solid rgba(255, 255, 255, 0.322);
    position: relative;
    min-height: 100%;
    display: flex;
    align-items: center;

    h3 {
        text-align: center;
        font-size: 1rem;
    }

    .overlay {
        padding: 0 !important;
        list-style-type: none;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.9);
        margin-bottom: 0;
        overflow-y: auto;
        font-size: .65rem;

        &::-webkit-scrollbar {
            width: 12px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }


        &::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background: $main_bg_color;
            border: 4px solid transparent;
            background-clip: content-box;
        }

        li {
            padding: .4rem 1rem;

            h2 {
                font-size: .9rem;
            }

            span {
                font-weight: 800;
            }

            .flag-icon {
                margin-left: .4rem;
            }

            .fa-solid.fa-star {
                color: yellow;
                margin-left: .1rem;

            }

            .fa-regular.fa-star {
                margin-left: .1rem;

            }
        }

        &:hover {
            opacity: 1;
        }
    }
}
</style>