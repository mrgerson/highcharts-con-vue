import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
//import drilldown from "highcharts/modules/drilldown"

exportingInit(Highcharts);
//drilldown(Highcharts)

const mixinCharts = {
    components: {
        highcharts: Chart,
    },

    data() {
        return {
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
        spline(data_) {
            let chartOptions = {
                chart: {
                    zoomType: "xy",
                    type: "spline",
                },
                title: {
                    text: data_.title ? data_.title : "Titulo del Gráfico", //'Pron\u00F3stico Clim\u00E1tico',
                    x: -20, //center
                },
                subtitle: {
                    text: data_.subtitle ? data_.subtitle : "Sub Titulo del Gráfico", //'ZONA: ',
                    x: -20,
                },
                xAxis: {
                    categories: data_.categories,
                },
                yAxis: data_.yAxis ?
                    data_.yAxis : {
                        title: {
                            text: data_.yAxisT,
                            style: {
                                color: "#1ABC9C",
                            },
                        },
                        tickAmount: 5,
                    },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                },
                plotOptions: {
                    spline: {
                        //stacking: 'percent',//'normal',
                        dataLabels: {
                            enabled: true,
                            //format: '{point.y:.1f}',
                            color: "black",
                            /* style: {
                                textShadow: '0 0 3px black, 0 0 3px black'
                            }*/
                        },
                    },
                },
                series: data_.series,
            };

            return chartOptions;
        },

        columnsValuesTimeHours(data_, percent_ = false) {
            let chartOptions = {
                colors: this.paleta_color,
                chart: {
                    type: "column",
                    zoomType: "x",
                },
                title: {
                    text: data_.Titulo,
                },
                subtitle: {
                    text: data_.STitulo,
                },
                xAxis: {
                    categories: data_.xAxis,
                    crosshair: true,
                    labels: {
                        //rotation: -90,
                        style: {
                            color: "#6e6e70", //,
                            //fontWeight: 'bold'
                        },
                    },
                },
                yAxis: {
                    labels: {
                        formatter: function() {
                            return Highcharts.numberFormat(this.value / 3600000, 0);
                        },
                    },
                    title: {
                        text: data_.yAxisT,
                    },
                    tickInterval: 3600000,
                },
                tooltip: {
                    formatter: function() {
                        return this.y == 0 ?
                            "" :
                            '<span style="font-size: 10px">' +
                            this.series.name +
                            " : </span><br/>" +
                            '<span style="color:' +
                            this.series.color +
                            '">\u25CF</span> ' +
                            Highcharts.dateFormat("%Hh:%Mm:", new Date(this.y));
                    },
                    useHTML: true,
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return this.y == 0 ?
                                    null :
                                    Highcharts.dateFormat("%Hh:%Mm", new Date(this.y));
                            },
                        },
                    },
                },
                series: data_.values,
            };

            return chartOptions;
        },

        async columns(data_, decimal_, percent_ = false) {
            let mThis = this;
            decimal_ = decimal_ == null ? data_.decimal : decimal_;
            let chartOptions = {
                colors: this.paleta_color,
                chart: {
                    type: "column",
                    zoomType: "x",
                },
                title: {
                    text: data_.Titulo,
                },
                subtitle: {
                    text: data_.STitulo,
                },
                xAxis: {
                    categories: data_.xAxis,
                    crosshair: true,
                    labels: {
                        //rotation: -90,
                        style: {
                            color: "#6e6e70", //,
                            //fontWeight: 'bold'
                        },
                    },
                },
                yAxis: data_.yAxis ?
                    data_.yAxis : {
                        min: 0,
                        title: {
                            text: data_.yAxisT,
                            align: "high",
                        },
                        labels: {
                            style: {
                                color: "#6e6e70", //,
                                //fontWeight: 'bold'
                            },
                        },
                    },
                // tooltip: {

                // headerFormat: '<span style="font-size:9px">{point.key}</span><table>',
                // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                // '<td style="padding:0"><strong>{point.y:.0f}</strong></td></tr>',
                // footerFormat: '</table>',
                // shared: true,
                // useHTML: true
                // },
                tooltip: {
                    formatter: function() {
                        var value = mThis.formatMoney(this.y, decimal_);
                        return (
                            '<span style="font-size: 10px">' +
                            this.key +
                            "</span><br/>" +
                            '<span style="color:' +
                            this.series.color +
                            '">\u25CF</span> ' +
                            this.series.name +
                            ": <strong>" +
                            value +
                            (percent_ ? " %" : "") +
                            "</strong><br/>"
                        );
                    },
                    useHTML: true,
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.05,
                        borderWidth: 0,
                        // dataLabels: {
                        // enabled: true,
                        // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray'
                        // }
                        dataLabels: {
                            enabled: true,
                            color: "gray",
                            formatter: function() {
                                //return (mThis.formatMoney(this.y, decimal_));
                                return this.y != 0 ?
                                    mThis.formatMoney(this.y, decimal_) + (percent_ ? " %" : "") :
                                    null;
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

        async columnsDrill(data_, decimal_, percent_ = false, drilldown_ = null) {
            let chartOptions = {
                chart: {
                    type: "column",
                    zoomType: "x",
                    events: {
                        drilldown: function(e) {
                            this.setTitle({ text: e.point.name.toUpperCase() });
                            if (!e.seriesOptions) {
                                this.getData(e.point.name);
                                this.showLoading("Loading data ...");
                                this.hideLoading();
                            }
                        },
                        drillup: function(e) {
                            this.setTitle({ text: data_.Titulo });
                        },
                    },
                },
                accessibility: {
                    announceNewData: {
                        enabled: true,
                    },
                },
                title: {
                    text: data_.Titulo,
                },
                subtitle: {
                    text: data_.STitulo,
                },
                xAxis: {
                    type: "category",
                    categories: data_.xAxis,
                },
                yAxis: {
                    title: {
                        text: "Total percent market share",
                    },
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.05,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            color: "gray",
                        },
                    },
                    series: {
                        shadow: true,
                    },
                },
                series: data_.values,
                drilldown: {
                    series: drilldown_,
                },
            };

            return new Promise((resolve, reject) => {
                resolve(chartOptions);
            });
        },

        pieChart(data_, decimal_, percent_ = false) {
            decimal_ = decimal_ == null ? data_.decimal : decimal_;

            let chartOptions = {
                colors: this.paleta_color,
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0, //null,
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
                    pointFormat: "{series.name}: <strong>{point.label:.f}</strong><br/><strong>{point.percentage:.2f} %</strong>",
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format: "<strong>{point.name}</strong>: <strong>{point.label:.f}</strong><br/><strong>{point.percentage:.2f} %</strong>",
                        },
                    },
                    series: {
                        shadow: true,
                    },
                },
                // plotOptions: {
                // pie: {
                // allowPointSelect: true,
                // cursor: 'pointer',
                // dataLabels: {
                // enabled: true,
                // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray',
                // formatter: function () {
                // //return this.y.formatMoney(decimal, ',', '.');
                // return (this.y!=0)? this.y.formatMoney(decimal, ',', '.') : null;
                // }
                // }
                // }
                // },
                series: data_.values,
            };

            return new Promise((resolve, reject) => {
                resolve(chartOptions);
            });
        },

        formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(
                    (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
                ).toString();
                let j = i.length > 3 ? i.length % 3 : 0;

                let response =
                    negativeSign +
                    (j ? i.substr(0, j) + thousands : "") +
                    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                    (decimalCount ?
                        decimal +
                        Math.abs(amount - i)
                        .toFixed(decimalCount)
                        .slice(2) :
                        "");

                return response.replace(".00", "");
            } catch (e) {
                console.log(e);
            }
        },
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
                    pointFormat: "{series.name}: <b>{point.label:.f}</b><br/><b>{point.percentage:.2f} %</b>",
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format: "<b>{point.name}</b>: <b>{point.label:.f}</b><br/><b>{point.percentage:.2f} %</b>",
                        },
                        events: {
                            click: function(event) {
                                let columntype =
                                    event.point.name.toLowerCase() == "deshab" ?
                                    event.point.name.toLowerCase() :
                                    null;
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
    },
};

export default mixinCharts;