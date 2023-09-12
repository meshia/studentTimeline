<template>
    <li class="student-work" v-if="!work.hide">
        <div class="hide" @click="handleHide()">
            <i class="fa fa-eye-slash"></i>
        </div>
        <div class="img-wrapper" v-if="work.topic_data">
            <img v-if="work.topic_data.icon_path" :src="`${work.topic_data.icon_path}`" :alt="work.topic_data.name" :class="work.product"/>
            <span v-if="work.product.includes('bpjr')" >Jr.</span>
        </div>
        <div class="name-date-time">
            <h4>{{ work.title }}</h4>
            <span>{{ work.date }}</span>
        </div>
        <div v-if="work.display?.score && work.score" class="score">
            <span class="label">Score:</span>
            <span>{{ `${work.score}/${work.possible_score}` }}</span>
        </div>
        <div @click="showZoom()" v-if="work.display?.zoom" class="zoom">
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
        showZoom() {
            Hub.$emit('open-modal');
            Hub.$emit('set-modal-data', this.work)
        },
        handleHide() {
            Hub.$emit('remove-work', this.work.id)
        }
    }
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
        text-transform: capitalize;
        background-color: var(--component-bg);
    }
    .hide {
        color: var(--hide-score-zoom);
        margin: -0.3em 0.5em 0 0;
        cursor: pointer;
    }
    .name-date-time {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-right: auto;
        padding-left: 1em;
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