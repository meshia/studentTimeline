<template>
    <div class="students-list">
        <ul>
            <StudentWork v-for="work in works" :key="work.id" :work="work" />
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
    components: {
        StudentWork
    },
    data() {
        return {
            month: ["January","February","March","April","May","June","July","August","September","October","November","December"]
        }
    },
    created() {
       
    }
};
</script>

<style scoped>
ul {
    --border-color: #ccc;

    position: relative;
    display: flex;
    flex-direction: column;
    list-style: none;
}

ul:after {
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    left: 5em;
    z-index: -1;
    background-color: var(--border-color);
    content: " ";
}
</style>