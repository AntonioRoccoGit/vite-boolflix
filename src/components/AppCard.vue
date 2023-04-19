<script>
import { store } from '../store';
export default {
    name: "AppCard",
    data() {
        return {
            store
        }
    },
    props: ["item"]
}
</script>

<template>
    <div class="ms_card">
        <img :src="`${store.imgPath}${item.backdrop_path}`" alt="">
        <ul class="overlay">
            <li>{{ item.title }}</li>
            <li>{{ item.original_title }}</li>
            <li>{{ item.original_language }}</li>
            <li>{{ item.vote_average }}</li>
        </ul>



    </div>
</template>

<style scoped lang="scss">
.ms_card {
    border: 1px solid white;
    position: relative;
    min-height: 100%;

    .overlay {
        padding: 0 !important;
        list-style-type: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        opacity: 0;
        background-color: black;
        margin-bottom: 0;
        overflow-y: auto;

        &:hover {
            opacity: 1;
        }
    }
}
</style>