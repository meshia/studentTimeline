<template>
    <div class="filters-list">
        <span class="filter-title">Filter by:</span>
        <ul>
            <li class="filter" v-for="filter in filtersList" :key="filter">
                <i v-if="active" class="fa-solid fa-circle-check"></i>
                {{ filter.replaceAll("_", "-") }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "FiltersList",
    props: {
        filtersList: Array
    }
}
</script>

<style scoped>
.filters-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.8em;
}

ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
}
.filter {
    display: flex;
    align-content: center;
    border: 2px solid var(--filters-and-search);
    border-radius: .3em;
    padding: .4em .7em;
    margin: .2em .5em .5em 0;
    font-weight: 600;
    color: var(--filters-and-search);
    text-transform: capitalize;
    cursor: pointer;
}
.filter:hover, filter:active {
    background-color: var(--filters-bg);
}

i {
    margin-right: .2em;
}
</style>