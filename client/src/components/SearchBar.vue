<template>
  <div class="search-bar-container">
    <div class="search-bar">
        <input type="text" v-model="searchText" @keyup="handleChange" placeholder="Search Timeline" />
        <span>
            <i class="fa-solid fa-search"/>
        </span>
    </div>
    <ul v-if="currentSuggestions.length > 0" class="suggestions-list">
        <li v-for="suggestion in currentSuggestions" :key="suggestion" @click="clickSuggestion(suggestion)">{{ suggestion }}</li>
    </ul>
  </div>
</template>

<script>
import Hub from '../events/Hub.vue';

export default {
    props: {
        suggestionList: Array
    },
    data() {
        return {
            searchText: "",
            currentSuggestions: []
        }
    },
    methods: {
        handleChange(){
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                Hub.$emit('search-input', this.searchText);
                if(this.searchText.length > 0) {
                    this.currentSuggestions = this.suggestionList.filter((item)=>{
                        return item.includes(this.searchText)
                    })
                } else {
                    this.currentSuggestions = []
                }
            }, 300);
        },
        clickSuggestion(suggestion) {
            this.searchText = suggestion;
            this.currentSuggestions = []
        }
    },
    watch: {
        searchText: function() {
            this.suggestions
        }
    }

}
</script>

<style scoped>
.search-bar-container {
    --border-radius: .3em;
    
    position: relative;
    width: 40%;
    margin-bottom: 1em;
}

.search-bar {
    display: flex;
    flex-direction: row;
}

input {
    display: flex;
    width: 100%;
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

ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--border-color);
    border-top: none;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    background-color: var(--component-bg);
    margin: 0;
    z-index: 1;
}

li {
    display: flex;
    padding: 0.3em;
    cursor: pointer;
}

</style>