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

const getDataV2 = async () => {
  const res = await fetch("http://localhost:3000/activities/v2");
  const data = await res.json();
  console.log('data', data)
  return data;
}

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
  async created() {
    console.log("DATA 2")
    this.studentsWorks = await getDataV2()
  }
}
</script>
