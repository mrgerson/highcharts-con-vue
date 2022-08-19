<template>
  <div class="card">
    <div class="row">
      <div class="card col-md-6">
         <!--  https://www.highcharts.com/demo/pie-basic -->
        <highcharts :options="chartOptions1"></highcharts>
      </div> 
    </div>
  </div>
</template>

<script>
/* import MixinCharts from "/src/mixins/mixinCharts.js"; */
import MixinCharts from "@/mixins/mixinCharts";
import axios from "axios";
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
      chartOptions1: {},
      paleta_color: [
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
    };
  },

  methods: {
   
    async api() {
      try {
        const res = await axios.get("auth/indicatorsage");
        let data_charts = [];
        let datos = [];

        await res.data.forEach((row) => {
          const { EMPRESA, EDAD } = row;
          datos.push({ name: EMPRESA, y: Number(EDAD.replace("%", "")) });
        });

        let series = [
          {
            name: "promedio edad",
            colorByPoint: true,
            data: datos,
          },
        ];

        data_charts.push({
          Titulo: "edades promedio por empresa",
          STitulo: "EMPRESAS",
          decimal: 1,
          values: series,
        });

        //console.log(data_charts[0])
        this.pieChartClick(data_charts[0]).then((res) => {
          this.chartOptions1 = res;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.api();
  },

  mixins: [MixinCharts],
  mounted() {},
};
</script>
