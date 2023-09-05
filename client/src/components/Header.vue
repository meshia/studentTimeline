<template>
    <header>
        <h2>{{ title }}</h2>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        title: String
    },
};
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
}
</style>