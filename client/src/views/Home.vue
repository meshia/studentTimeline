<template>
  <div class="home">
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
  async created() {
    const res = await fetch("http://localhost:3000/activities/v1");
    const data = await res.json();
    this.studentsWorks = data;
    console.log("studentsWorks", this.studentsWorks);
  }
}
</script>
