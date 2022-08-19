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
      /* chartOptions: {
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
      }, */
    };
  },

  methods: {
    pieChartClick(data_, decimal_, percent_ = false) {
      let self = this;

      decimal_ = decimal_ == null ? data_.decimal : decimal_;

      let chartOptions = {
        colors: this.paleta_color,
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: data_.Titulo,
        },
        subtitle: {
          text: data_.STitulo,
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
            events: {
              click: function (event) {
                let columntype =
                  event.point.name.toLowerCase() == "deshab"
                    ? event.point.name.toLowerCase()
                    : null;
                self.cellTypeContClick(data_.Titulo, columntype);
              },
            },
          },
          series: {
            shadow: true,
          },
        },
        series: data_.values,
      };

      return new Promise((resolve, reject) => {
        resolve(chartOptions);
      });
    },

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
  mounted() {},
};
</script>
