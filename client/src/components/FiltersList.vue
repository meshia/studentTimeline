<template>
    <div class="filters-list">
        <span class="filter-title">Filter by:</span>
        <ul>
            <li @click="filterClick(filter)" class="filter button" v-for="filter in filtersList" :key="filter">
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
                if(filter === "all works") { // "all works" filter special functionality
                    this.selectedFilters = [];
                    const allFilters = event.target.parentNode.querySelectorAll('.filter.active');
                    allFilters.forEach(element => {
                        element.classList.remove('active');
                    });
                } else if(this.selectedFilters.indexOf("all works") !== -1) { // remove "all works" filter if other filters are active
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

</style>