<template>
  <div id="T2_cost">
    <table id="main">
      <tbody>
        <tr v-for="(singleAgent, index) in agentData" :key="index">
          <td>
            {{singleAgent.codeName}}
          </td>
          <td>
            {{singleAgent.phases}}
          </td>
          <td>
            {{singleAgent.codeName}}
          </td>
        </tr>
      </tbody>
      <!-- {{agentData}} -->
    </table>

  </div>
</template>

<script>

  export default {
    data(){
            return {
              agentData:agentData,
            }
        },
  }

</script>

<style scoped>
  .pie_all {
    width: 450px;
    height: 300px;
    border-radius: 16px;
    margin-top: -10%;
  }

</style>
