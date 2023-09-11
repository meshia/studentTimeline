<template>
    <div class="students-list">
        <ul>
            <li v-for="work in parsedData" :key="work.id ? work.id : work.monthTitle" >
                <StudentWork v-if="work.id" :work="work" />
                <span class="month-title" v-else>{{ work.monthTitle }}</span>
            </li>
        </ul>
        <Modal />
    </div>
</template>

<script>
import { ref } from 'vue';
import StudentWork from './StudentWork.vue';
import Modal from './Modal.vue';

const test = ref(0);

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
            data: [...this.works]
        }
    },
    computed: {
        parsedData(){
            let data = [];
            let month = "";
            this.works.map((item) => {
                let currItem = item;
                if(!item?.id) {
                    item.activities[0].resource_type = item.resource_type;
                    currItem = item.activities[0]
                }
                const newDate = new Date(parseInt(currItem.d_created));
                const currMonth = newDate.getMonth();
                if(month !== currMonth) {
                    month = currMonth;
                    data.push({ "monthTitle": this.months[currMonth]});
                    console.log("new month data", data)
                }
                data.push(currItem);
            })
            
            console.log("data", data);
            return data
        }
    }
};
</script>

<style>
.students-list {
    /* component's css variables */
    --month-title-bg: #FCF7E1;
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
    font-size: 0.8em;
    padding: 0;
}

.students-list ul:after {
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    left: 3em;
    z-index: -1;
    background-color: var(--border-color);
    content: " ";
}

.students-list li {
    display: flex;
    width: 100%;
    margin-bottom: 1em;
}

.students-list li .month-title {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    padding: 0.5em;
    width: 5em;
    background-color: var(--month-title-bg);
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