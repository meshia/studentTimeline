<template>
    <div class="modal-under-layer" v-if="active" @click.self="close">
        <div class="modal-content">
            <header>
                <span class="close-button" @click="close">
                    <i class="fas fa-close"></i>
                </span>
                <div class="img-wrapper">
                    <img v-if="data.topic_data.icon_path" :src="`${data.topic_data.icon_path}`" :alt="data.topic_data.name" :class="data.product"/>
                </div>
                <h2>{{ title }}</h2>
                <span class="date">{{ date }}</span>
            </header>
            <h2 class="comment">{{ data.comment }}</h2>
            <div class="score">
                <span class="label">Score:</span>
                <span>{{ `${data.score}/${data.possible_score}` }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Hub from '../events/Hub.vue';

export default {
    data() {
        return {
            active: false,
            data: Object,
            title: null,
            date: null,
        }
    },
    destroyed() {
        Hub.$off('set-modal-data', this.set);
        Hub.$off('open-modal', this.open);
    },
    methods: {
        close() {
            this.active = false;
        },
        open() {
            this.active = true;
            console.log(this.data)
        },
        set(data, title, date) {
            this.data = data;
            this.title = title;
            this.date = date;
        }
    },
    mounted() {
        console.log("Another modal component mounted.");
        this.$nextTick(function(){
            Hub.$on('set-modal-data', this.set);
            Hub.$on('open-modal', this.open)
        }.bind(this))
    }
}
</script>

<style scoped>
.modal-under-layer {
    --modal-icon-size: 2.8em;
    --modal-border-color: #afafaf;
    --modal-border: 0.26em solid var(--modal-border-color);
    --modal-under-layer: rgb(255 255 255 / 50%);

    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: var(--modal-under-layer);
    font-size: 16px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 45%;
    border: var(--modal-border);
    border-radius: 1.1em;
    background-color: var(--component-bg);
    z-index: 101;
    padding: 0.8em 0.8em 1.5em 1.5em;
}

header {
    display: flex;
    flex-direction: column;
    width: 100%;
}
header .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.6em;
    height: 0.6em;
    color: var(--modal-border-color);
    border: 0.15em solid var(--modal-border-color);
    border-radius: 1em;
    padding: 0.3em;
    font-size: 24px;
    font-weight: 800;
    cursor: pointer;
    margin-left: auto;
}
header .img-wrapper {
    align-items: center;
}
header .img-wrapper img {
    height: var(--modal-icon-size);
    width: var(--modal-icon-size);
}

header h2 {
    font-size: 30px;
    font-weight: 600;
    text-transform: capitalize;
}

.comment {
    display: flex;
    width: 100%;
    font-weight: 500;
}

.score {
    margin-top: auto;
    font-size: 1.1em;
}


</style>