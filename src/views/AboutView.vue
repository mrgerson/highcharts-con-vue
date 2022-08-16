<template>
  <div class="container">
    <div class="card">
    <highcharts :options="chartOptions"></highcharts>
  </div>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);
export default {
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
      },
    };
  },
};
</script>

<style></style>
