import React, { Component } from 'react'
import { render } from 'react-dom'
import Option from './Option'
import { connect } from 'react-redux';
var BarChart = require("react-chartjs").Bar;
import OtherOptionForm from './OtherOptionForm'
import chartSpecs from '../modules/chartSpecs'

class Vote extends Component {
	render() {
	
		const { poll } = this.props
		const options = poll.options
		// get the data for the chart
		var labels = [];
		var data= [];
		options.map(option=> {
			labels.push(option.optionName)
			data.push(option.emails.length)
		})
		var chartData = chartSpecs(labels,data)

		return (
			<div>
			{options.map((option,ind) => 
				<Option {...this.props} option={option} optionIndex={ind} key={ind}/>
			)}
			<OtherOptionForm {...this.props}/>
			<BarChart data={chartData}/>
			</div>
		)
	}
}

Vote = connect()(Vote)

export default Vote
