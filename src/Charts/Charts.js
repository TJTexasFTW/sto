import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Link} from 'react-router-dom'
import axios from 'axios';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){

let chartData = { 
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'STO Days',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                responsive: false,
                maintainAspectRatio: false
            }
          }
        ]
      }

    return (
        <div>
          <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
          <h2 className = 'subHeading'>STO Days in Last Year by Employee</h2>

      <div className='chart-container' id="chart">
        <Bar className='chart-container' data={chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'',
              fontSize: 0
            }
          }}
        />
      </div>

    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>


      <div className="button_choices">
          <Link to='/'><button className = "adminButton">HOME</button></Link>
          <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
      </div>

    </div>
    )
  }
}

export default Chart;
