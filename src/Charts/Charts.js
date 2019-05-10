import chart from 'chart.js';
// var myChart = new Chart(ctx, {...});
import {Bar, Line, Pie} from 'react-chartjs-2';
import React from 'react';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    }

	render() {

        let myChart = document.getElementById('myChart').getContext('2d');

        let empSTOChart = new chart(myChart, {
            type: 'bar',
            data: {
                labels: ['LY', 'TJ', 'MC', 'JW', 'CP'],
                datasets: [{
                    label: "STO", 
                    data: [8, 7, 3, 2, 5]
            }]
        }
    }
    }
		return (
			<div className = 'chart'>
            <title>STO by Employee</title>
			
            {myChart}


			</div>
			)
    }
    }
}

export default Chart;