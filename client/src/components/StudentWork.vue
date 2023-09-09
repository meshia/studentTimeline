<template>
    <li class="student-work ">
        <div class="img-wrapper" v-if="work.topic_data">
            <img v-if="work.topic_data.icon_path" :src="`${work.topic_data.icon_path}`" :alt="work.topic_data.name" :class="work.product"/>
            <span v-if="work.product.includes('bpjr')" >Jr.</span>
        </div>
        <div class="name-date-time">
            <h4>{{ `${work.topic_data.name} ${work.resource_type.replaceAll("_", " ")}` }}</h4>
            <span>{{ date }}</span>
        </div>
        <div v-if="activityType[work.resource_type]?.score && work.score" class="score">
            <span class="label">Score:</span>
            <span>{{ `${work.score}/${work.possible_score}` }}</span>
        </div>
        <div @click="showZoom(work)" v-if="activityType[work.resource_type]?.zoom" class="zoom">
            <i class="far fa-eye"></i>
            <span>View Work</span>
        </div>
    </li>
</template>

<script>
export default {
    name: 'StudentWork',
    props: {
        work: Object
    },
    methods:{
        showZoom(work){
            console.log(work)
        }
    },
    data(){
        return {
            date: "testing",
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
        var count = 0;
        this.date = `${newDate.toLocaleTimeString([], { month:"short", day:"numeric", year:"numeric", hour: '2-digit', minute:'2-digit'}).replace(/\,/g, match => ++count === 2 ? ' • ' : match)}`;
    },
}
</script>

<style scoped>
    .student-work {
        /* component's css variables */
        --icon-size: 2em;
        --tiny-circle-size: 0.8em;
        --component-bg: #ffffff;
        --logo-default-bg: #00C5C4;
        --logo-extra-bg: #F7AE11;
        --logo-tiny-bg: #FEC55A;
        --logo-tiny-text: #623518;
        --score-and-zoom: #019c9c;

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
    .img-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 100%;
    }
    .img-wrapper img {
        height: var(--icon-size);
        width: var(--icon-size);
        padding: 0.4em;
        border-radius: var(--icon-size);
        background-color: var(--logo-default-bg);
    }

    .img-wrapper img.bpjr {
        background-color: var(--logo-extra-bg);
    }
    .img-wrapper span {
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

    .score, .zoom {
        display: flex;
        align-items: center;
        color: var(--score-and-zoom);
        font-size: 0.8em;
        font-weight: 600;
        padding-left: 0.8em;
    }
    .score .label {
        font-weight: 400;
        padding-right: 0.2em;
    }
    .zoom {
        cursor: pointer;
    }
    .zoom i {
        padding-right: 0.2em;
    }
</style>