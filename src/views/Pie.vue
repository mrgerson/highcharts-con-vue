<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import exportingInit from "highcharts/modules/exporting";

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        colors: [
          "#1ABC9C",
          "#0089C7",
          "#DE6C47",
          "#FFB311",
          "#F9F966",
          "#d13814",
          "#9b59b6",
          "#f17cb0",
          "#84754e",
          "#003666",
          "#EACA69",
          "#00B4FF",
          "#F97566",
        ],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Browser market shares in January, 2018",
        },
        subtitle: {
          text: "Browser market",
          x: -20,
        },
        tooltip: {
          pointFormat:
            "{series.name}: <b>{point.label:.f}</b><br/><b>{point.percentage:.2f} %</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format:
                "<b>{point.name}</b>: <b>{point.label:.f}</b><br/><b>{point.percentage:.2f} %</b>",
            },
          },
          series: {
            shadow: true,
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "Chrome",
                y: 61.41,
                sliced: true,
                selected: true,
              },
              {
                name: "Internet Explorer",
                y: 11.84,
              },
              {
                name: "Firefox",
                y: 10.85,
              },
              {
                name: "Edge",
                y: 4.67,
              },
              {
                name: "Safari",
                y: 4.18,
              },
              {
                name: "Sogou Explorer",
                y: 8,
              },
              {
                name: "Opera",
                y: 1.6,
              },
              {
                name: "QQ",
                y: 1.2,
              },
              {
                name: "Other",
                y: 2.61,
              },
            ],
          },
        ],
      },

    };
  },
};
</script>
