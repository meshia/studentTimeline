<template>
    <div class="filters-list">
        <span class="filter-title">Filter by:</span>
        <ul>
            <li @click="filterClick(filter)" :class="`filter`" v-for="filter in filtersList" :key="filter">
                <i class="fa-solid fa-circle-check"></i>
                {{ filter.replaceAll("_", "-") }}
            </li>
        </ul>
    </div>
</template>

<script>
import Hub from '../events/Hub.vue';

export default {
    name: "FiltersList",
    props: {
        filtersList: Array
    },
    data(){
        return {
            selectedFilters: []
        }
    },
    methods:{
        filterClick(filter){
            const index = this.selectedFilters.indexOf(filter);
            if(index === -1){
                if(filter === "all works") {
                    this.selectedFilters = [];
                    const allFilters = event.target.parentNode.querySelectorAll('.filter.active');
                    allFilters.forEach(element => {
                        element.classList.remove('active');
                    });
                } else if(this.selectedFilters.indexOf("all works") !== -1) {
                    this.selectedFilters.splice(this.selectedFilters.indexOf("all works"), 1);
                    const allWorksFilter = event.target.parentNode.querySelectorAll('.filter.active')[0];
                    allWorksFilter.classList.remove("active");
                }
                this.selectedFilters.push(filter);
                event.target.classList.add("active");
            } else {
                this.selectedFilters.splice(index, 1);
                event.target.classList.remove("active");
            }
            Hub.$emit('selected-filters', this.selectedFilters)
        }
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
.filter.active {
    background-color: var(--filters-bg);
}
.filter.active i {
    display: flex;
    pointer-events: none;
}

.filter i {
    display: none;
    margin-right: .3em;
}

</style>