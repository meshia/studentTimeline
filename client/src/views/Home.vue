<template>
  <div class="home container">
    <Header title="Timeline" />
    <StudentsList :works="studentsWorks" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import StudentsList from '@/components/StudentsList.vue';

export default {
  name: 'home',
  components: {
    Header,
    StudentsList
  },
  data() {
    return {
      studentsWorks: []
    }
  },
  methods: {
    async getDataV1 () {
      const res = await fetch("http://localhost:3000/activities/v1");
      const data = await res.json();
      return data;
    }
  },
  async created() {
    console.log("DATA 1")
    this.studentsWorks = await this.getDataV1()
  }
}
</script>
