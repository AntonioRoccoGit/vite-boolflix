<script>
import { store } from '../store';
export default {
    name: "AppCard",
    data() {
        return {
            store
        }
    },
    props: ["item"],
    mounted() {
        this.setTitle();
        this.setRaiting();
    },
    methods: {
        setTitle() {
            if (!this.item.original_title) {
                this.item.original_title = this.item.original_name
                this.item.title = this.item.name
            }
        },
        setRaiting() {
            this.item.vote_average = parseInt(this.item.vote_average / 2)
        }
    }
}
</script>

<template>
    <div class="ms_card">
        <img :src="`${store.imgPath}${item.poster_path}`" alt="">
        <h3 v-if="!item.poster_path">Siamo spiacenti, l'immagine non è disponibile</h3>
        <ul class="overlay">
            <li><span>Titolo:</span> {{ item.title }}</li>
            <li v-if="item.title !== item.original_title"><span>Titolo originale: </span>{{ item.original_title }}</li>
            <li><span>Lingua:</span> {{ item.original_language }}</li>
            <li><span>Voto:</span> {{ item.vote_average }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
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

        li {
            padding: .4rem 1rem;

            span {
                font-weight: 800;
            }
        }

        &:hover {
            opacity: 1;
        }
    }
}
</style>