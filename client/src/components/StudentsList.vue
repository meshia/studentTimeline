<template>
    <div class="students-list">
        <ul v-for="work in works" :key="work.id">
            <li :key="work.id">{{ work.resource_type }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "StudentsList",
    props: {
        works: Array
    },
    methods:  {

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