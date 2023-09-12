<template>
    <div class="students-list-container">
        <SearchBar />
        <FiltersList :filtersList="filtersList"/>
        <ul class="students-list">
            <li v-for="work in parsedData" :key="work.id ? work.id : work.monthTitle" >
                <StudentWork v-if="work.id" :work="work" />
                <span class="month-title" v-else>{{ work.monthTitle }}</span>
            </li>
        </ul>
        <button @click="loadMore" v-if="showLoadMore()" class="button">Load More</button>
        <Modal />
    </div>
</template>

<script>
import { ref } from 'vue';
import StudentWork from './StudentWork.vue';
import SearchBar from './SearchBar.vue';
import FiltersList from './FiltersList.vue';
import Modal from './Modal.vue';
import Hub from '../events/Hub.vue';

const test = ref(0);

export default {
    name: "StudentsList",
    props: {
        works: Array
    },
    components: {
        StudentWork,
        SearchBar,
        FiltersList,
        Modal
    },
    data() {
        return {
            data: [],
            months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
            activityType: {
                movie: {
                    score: false,
                    zoom: false
                },
                quiz: {
                    score: true,
                    zoom: true
                },
                easy_quiz: {
                    score: false,
                    zoom: true
                },
                challenge: {
                    score: false,
                    zoom: true
                },
                make_a_map: {
                    score: false,
                    zoom: true
                },
                make_a_movie: {
                    score: false,
                    zoom: true
                },
                wordplay :{
                    score: false,
                    zoom: true
                },
                related_reading: {
                    score: false,
                    zoomoom: false
                },
                draw_about_it: {
                    score: false,
                    zoom: true
                }
            },
            filtersList: [],
            selectedFilters: [],
            searchQuery: "",
            loadingIndex: 10
        }
    },
    methods: {
        setSearchQuery(searchQuery) {
            this.searchQuery = searchQuery;
        },
        setSelectedFilters(filters) {
            this.selectedFilters = filters;
        },
        checkModal(data) {
            if(this.$route.params.modal) {
                const currWork = data.filter(item => item.title == this.$route.params.modal.toLowerCase())[0];
                if(currWork) { 
                    Hub.$emit('open-modal');
                    Hub.$emit('set-modal-data', currWork);
                }
            } else {

            }
        },
        loadMore() {
            this.loadingIndex += 10;
            console.log("this.loadingIndex", this.loadingIndex)
        },
        showLoadMore(){
            return this.works?.length >= this.loadingIndex
        }
    },
    watch: {
        $route(to,from) {
        },
        parsedData: function(data) {
            this.checkModal(data);
        }
    },

    mounted() {
        this.$nextTick(function(){
            Hub.$on('search-input', this.setSearchQuery);
            Hub.$on('selected-filters', this.setSelectedFilters);
        }.bind(this))
    },
    created() {
        this.filtersList = ["all works", ...Object.keys(this.activityType)];
    },
    computed: {
        parsedData(){
            let data = [];
            let month = "";
            this.works.map((item) => {
                let currItem = item;
                if(!item?.id) { //check if the data structure is different
                    item.activities[0].resource_type = item.resource_type;
                    currItem = item.activities[0]
                }
                const newDate = new Date(parseInt(currItem.d_created));
                const currMonth = newDate.getMonth();
                if(month !== currMonth) { // add month title to list
                    month = currMonth;
                    data.push({ "monthTitle": this.months[currMonth]});
                }
                // add parsed data to list items
                currItem.title = `${currItem.topic_data.name} ${currItem.resource_type.replaceAll("_", " ")}`;
                let count = 0;
                currItem.date = `${newDate.toLocaleTimeString([],
                    { month:"short", day:"numeric", year:"numeric", hour: '2-digit', minute:'2-digit'})
                    .replace(/\,/g, match => ++count === 2 ? ' • ' : match)}`;
                currItem.display = this.activityType[currItem.resource_type];
                data.push(currItem);
            })
            
            //filters the data
            if(this.selectedFilters.indexOf("all works") === -1 && this.selectedFilters.length !== 0){
                data = data.filter(item=>{
                    if(this.selectedFilters.indexOf(item.resource_type) !== -1)
                        return item       
                })
            }

            //search filter
            if(this.searchQuery) {
                data = data.filter(({title})=>{
                    return String(title).includes(this.searchQuery)
                })
            }

            return data.slice(0, this.loadingIndex+1)
        }
    }
};
</script>

<style>
.students-list-container {
    /* component's css variables */
    --month-title-bg: #FCF7E1;
    --icon-size: 2em;
    --tiny-circle-size: 0.8em;
    --border-color: #ccc;
    --component-bg: #ffffff;
    --logo-default-bg: #00C5C4;
    --logo-extra-bg: #F7AE11;
    --logo-tiny-bg: #FEC55A;
    --logo-tiny-text: #623518;
    --score-and-zoom: #019c9c;
    --filters-and-search: #017575;
    --search-icon: #ffffff;
    --filters-bg: #01757520;
}

.students-list {
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
}

.students-list:after {
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    left: 3em;
    z-index: -1;
    background-color: var(--border-color);
    content: " ";
}

.students-list li {
    display: flex;
    width: 100%;
    margin-bottom: 1em;
}

.students-list li .month-title {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    padding: 0.5em;
    width: 5em;
    background-color: var(--month-title-bg);
}

.img-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.img-wrapper img {
    height: var(--icon-size);
    width: var(--icon-size);
    padding: 0.4em;
    border-radius: var(--icon-size);
    background-color: var(--logo-default-bg);
}

.students-list .img-wrapper img.bpjr {
    background-color: var(--logo-extra-bg);
}

.students-list .img-wrapper span {
    position: absolute;
    bottom: 0;
    right: -0.4em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--tiny-circle-size);
    width: var(--tiny-circle-size);
    padding: 0.6em;
    border-radius: 1em;
    font-size: 0.6em;
    font-weight: 800;
    color: var(--logo-tiny-text);
    background-color: var(--logo-tiny-bg);
}

.score, .students-list .zoom {
    display: flex;
    align-items: center;
    color: var(--score-and-zoom);
    font-weight: 600;
}

.score .label {
    font-weight: 400;
    padding-right: 0.2em;
}

</style>