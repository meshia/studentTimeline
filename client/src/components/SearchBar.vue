<template>
  <div class="search-bar">
      <input type="text" v-model="searchText" @keyup="handleChange" placeholder="Search Timeline" />
      <span>
        <i class="fa-solid fa-search"/>
      </span>
  </div>
</template>

<script>
import Hub from '../events/Hub.vue';

export default {
    data() {
        return {
            searchText: ""
        }
    },
    methods: {
        handleChange(){
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                Hub.$emit('search-input', this.searchText);
            }, 300);
        }
    }

}
</script>

<style scoped>
.search-bar {
    --border-radius: .3em;

    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
}

input {
    width: 30%;
    border: 1px solid var(--border-color);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    font-size: 0.8em;
    font-weight: 600;
    padding-left: 0.5em;
}

span {
    display: flex;
    background-color: var(--filters-and-search);
    color: var(--search-icon);
    padding: 0.5em;
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    
}
</style>