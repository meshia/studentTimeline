<template>
    <div class="students-list">
        <ul>
            <StudentWork v-for="work in works" :key="work.id" :work="work" />
        </ul>
        <Modal />
    </div>
</template>

<script>
import { ref } from 'vue';
import StudentWork from './StudentWork.vue';
import Modal from './Modal.vue';

export default {
    name: "StudentsList",
    props: {
        works: Array
    },
    components: {
        StudentWork,
        Modal
    },
    data() {
        return {
            months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
            data: {}
        }
    },
    
    created() {
       this.data = ref(this.works);
       console.log("this.data", this.data)
      
    //    if(!this.works.id) {
    //     const parsedData = this.works.map(({activities, resource_type}) => {
    //         activities[0].resource_type = resource_type;
    //         return activities[0];
    //         })
    //         console.log("parsedData", parsedData);
    //         this.data = parsedData;
    //     }
    }
};
</script>

<style>
.students-list {
    /* component's css variables */
    --icon-size: 2em;
    --tiny-circle-size: 0.8em;
    --border-color: #ccc;
    --component-bg: #ffffff;
    --logo-default-bg: #00C5C4;
    --logo-extra-bg: #F7AE11;
    --logo-tiny-bg: #FEC55A;
    --logo-tiny-text: #623518;
    --score-and-zoom: #019c9c;
}

.students-list ul {
    position: relative;
    display: flex;
    flex-direction: column;
    list-style: none;
}

.students-list ul:after {
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    left: 5em;
    z-index: -1;
    background-color: var(--border-color);
    content: " ";
}

.students-list .img-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.students-list .img-wrapper img {
    height: var(--icon-size);
    width: var(--icon-size);
    padding: 0.4em;
    border-radius: var(--icon-size);
    background-color: var(--logo-default-bg);
}

.students-list .img-wrapper img.bpjr {
    background-color: var(--logo-extra-bg);
}

.students-list .img-wrapper span {
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

.students-list .score, .students-list .zoom {
    display: flex;
    align-items: center;
    color: var(--score-and-zoom);
    font-weight: 600;
}

.students-list .score .label {
    font-weight: 400;
    padding-right: 0.2em;
}

</style>