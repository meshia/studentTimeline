<template>
    <li class="student-work">
        <div v-if="work.topic_data">
            <img v-if="work.topic_data.icon_path" :src="`${work.topic_data.icon_path}`" :alt="work.topic_data.name" />
            <span v-if="work.product.includes('bpjr')">Jr</span>
        </div>
        <div class="name-date-time">
            <span>{{ `${work.topic_data.name} ${work.resource_type}` }}</span>
            <span>{{ `${work.d_created}` }}</span>
        </div>
        <div v-if="work.score" class="score">
            <span>{{ `Score: ${work.score}/${work.possible_score}` }}</span>
        </div>
        <div v-if="work.comment" class="comment">
            <span>{{ `${work.comment}` }}</span>
        </div>
    </li>
</template>

<script>
export default {
    name: 'StudentWork',
    props: {
        work: Object
    },
    created() {
        console.log("created")
    }
}
</script>

<style scoped>
    .student-work {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        padding: 0.8em;
        border: 1px solid #ccc;
        border-radius: 0.3em;
    }

    .name-date-time {
        display: flex;
        flex-direction: column;
        margin-right: auto;
    }
</style>