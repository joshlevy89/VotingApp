export default function chartSpecs(labels,data) {
var chartData = {
    labels: labels,
	 datasets: [
    {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: data
    }
	]
}
return chartData
}