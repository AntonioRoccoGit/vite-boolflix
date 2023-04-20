<script>
import { store } from '../store';
import LangFlag from "vue-lang-code-flags";
export default {
    name: "AppCard",
    data() {
        return {
            store,
        }
    },
    components: {
        LangFlag,
    },
    props: ["item"],

    computed: {
        getFleg() {
            const flag = this.item.original_language;
            if (flag === "kn") {
                return false
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
            return parseInt(this.item.vote_average / 2)
        }
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
            <li v-if="getFleg"><span>Lingua:</span>
                <LangFlag :iso="getFleg" :squared="false" />
            </li>
            <li v-else><span>Lingua:</span> Kannada</li>
            <li>
                <span>Voto:</span>
                <i v-for="number in setRaiting" class="fa-solid fa-star"></i>
                <i v-for="star in (5 - setRaiting)" class="fa-regular fa-star"></i>
            </li>
            <li v-if="item.overview"><span>Descrizione:</span> {{ item.overview }}</li>
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