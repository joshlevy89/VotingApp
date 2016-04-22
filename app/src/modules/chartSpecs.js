export default function chartSpecs(labels,data) {
var chartData = {
    labels: labels,
	 datasets: [
    {
        label: "My First dataset",
        fillColor: "rgb(150,200,230)",
        strokeColor: "rgb(150,200,230)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: data
    }
	]
}
return chartData
}