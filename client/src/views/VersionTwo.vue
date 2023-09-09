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
  const parsedData = data.map(({activities, resource_type}) => {
    console.log(activities[0].id)
    activities[0].resource_type = resource_type;
    return activities[0];
  })
  return parsedData;
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
