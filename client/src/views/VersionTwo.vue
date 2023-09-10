<template>
  <div class="VersionTwo">
    <Header title="Timeline" />
    <StudentsList :works="studentsWorks" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import StudentsList from '@/components/StudentsList.vue';

export default {
  name: 'VersionTwo',
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
    async getDataV2 () {
      const res = await fetch("http://localhost:3000/activities/v2");
      const data = await res.json();
      return data;
    }
  },
  async created() {
    console.log("DATA 2")
    this.studentsWorks = await this.getDataV2()
  }
}
</script>
