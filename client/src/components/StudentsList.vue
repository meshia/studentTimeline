<template>
    <div class="students-list">
        <ul v-for="work in works" :key="work.id">
            <StudentWork :key="work.id" :work="work" />
        </ul>
    </div>
</template>

<script>
import StudentWork from './StudentWork.vue';
export default {
    name: "StudentsList",
    props: {
        works: Array
    },
    methods:  {

    },
    components: {
        StudentWork
    }
};
</script>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-bottom: 1em;
}
</style>