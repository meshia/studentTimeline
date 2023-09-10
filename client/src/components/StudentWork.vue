<template>
    <li class="student-work ">
        <div class="img-wrapper" v-if="work.topic_data">
            <img v-if="work.topic_data.icon_path" :src="`${work.topic_data.icon_path}`" :alt="work.topic_data.name" :class="work.product"/>
            <span v-if="work.product.includes('bpjr')" >Jr.</span>
        </div>
        <div class="name-date-time">
            <h4>{{ title }}</h4>
            <span>{{ date }}</span>
        </div>
        <div v-if="activityType[work.resource_type]?.score && work.score" class="score">
            <span class="label">Score:</span>
            <span>{{ `${work.score}/${work.possible_score}` }}</span>
        </div>
        <div @click="showZoom()" v-if="activityType[work.resource_type]?.zoom" class="zoom">
            <i class="far fa-eye"></i>
            <span>View Work</span>
        </div>
    </li>
</template>

<script>
import Hub from '../events/Hub.vue';

export default {
    name: 'StudentWork',
    props: {
        work: Object
    },
    methods:{
        showZoom(){
            Hub.$emit('open-modal');
            Hub.$emit('set-modal-data', this.work,  this.title, this.date)
        }
    },
    data(){
        return {
            date: "",
            title: "",
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
            }
        }
    },
    created() {
        const newDate = new Date(parseInt(this.work.d_created));
        if(this.$parent.currMonth !== newDate.getMonth()) {
            this.$parent.currMonth =  newDate.getMonth();
        }
        let count = 0;
        this.date = `${newDate.toLocaleTimeString([], { month:"short", day:"numeric", year:"numeric", hour: '2-digit', minute:'2-digit'}).replace(/\,/g, match => ++count === 2 ? ' • ' : match)}`;
        this.title = `${this.work.topic_data.name} ${this.work.resource_type.replaceAll("_", " ")}`;
    },
}
</script>

<style scoped>
    .student-work {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        border: 1px solid var(--border-color);
        border-radius: 0.3em;
        padding: 1.2em;
        margin-bottom: 1em;
        text-transform: capitalize;
        background-color: var(--component-bg);
    }

    .name-date-time {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-right: auto;
        padding-left: 1em;
        font-size: 0.8em;
    }
    .name-date-time h4 {
        margin: 0 0 0.4em 0;
    }
    .students-list .score, .students-list .zoom {
        font-size: 0.8em;
        padding-left: 0.8em;
    }
    .zoom {
        cursor: pointer;
    }
    .zoom i {
        padding-right: 0.2em;
    }
</style>