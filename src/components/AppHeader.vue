<script>
import { store } from '../store';
export default {
    name: "AppHeader",
    data() {
        return {
            store
        }
    },
    emits: [
        "search"
    ]
}
</script>

<template>
    <header class="header">
        <div class="container">
            <section class="logo">
                BOOL<span>FLIX</span>
            </section>
            <section class="ms_search-bar">
                premi invio per cercare
                <input @keyup.enter="$emit('search')" v-model.trim="store.currentSearch" type="text"
                    placeholder="Ricerca per nome...">
            </section>

        </div>
    </header>
</template>

<style scoped lang="scss">
@use "../scss/partials/costantVariables.scss" as *;

header {
    background-color: black;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    height: $header_height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    color: white;
    text-transform: uppercase;

    .logo {

        font-size: 2rem;
    }

    span {
        color: red;
    }

    input {
        padding-left: .8rem !important;
        padding: .3rem 0;
        border-radius: 10px;
        align-self: center;

    }
}
</style>