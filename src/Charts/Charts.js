import React, {Component} from 'react';
import ChartJS from "chart.js";
import {Bar} from 'react-chartjs-2';
import {Link} from 'react-router-dom'
import axios from 'axios';

ChartJS.defaults.global.defaultFontFamily = "PT Sans', sans-serif"
ChartJS.defaults.global.legend.display = false;
ChartJS.defaults.global.fontSize = 20;

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartSTO_365_byEmp: [],
      chartSTO_labels: [],
      chartSTO_data: [],
      chartSTO_colors: []
    }
  }

  // static defaultProps = {
  //   displayTitle:true,
  //   displayLegend: true,
  //   legendPosition:'right',
  //   location:'City'
  // }


  //chart_last_365_days_STO_by_emp
  async componentDidMount() {
    await axios.get('/api/charts/STO_365_byEmp')
        .then(results => {this.setState({ chartSTO_365_byEmp: results.data });
      }).catch( error => alert(error));

      console.log('chart data: ', this.state.chartSTO_365_byEmp)

      let theLabels = [];
      let theData = [];
      let theColors = [];

      // var letters = '0123456789ABCDEF';
      //thanks for colors of this:
      //https://sashat.me/2017/01/11/list-of-20-simple-distinct-colors/
      var colors = ['#e6194b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080',  '#000000', '#3cb44b'];
        // for (var i = 0; i < 6; i++ ) {
        //     color += letters[Math.floor(Math.random() * 16)];
        // }
      
      let j = 0;

      for (let i = 0; i < this.state.chartSTO_365_byEmp.length; i++) {
        theLabels.push(this.state.chartSTO_365_byEmp[i].initials);
        theData.push(this.state.chartSTO_365_byEmp[i].days);
        if (j < 20) {
          theColors.push(colors[j]);
            j++;}
        else {
          j=0;
          theColors.push(colors[j]);}
        }
      

      // console.log(theColors);

      this.setState({chartSTO_labels: theLabels});
      this.setState({chartSTO_data: theData});
      this.setState({chartSTO_colors: theColors});

      console.log("Labels: ", theLabels);
      console.log("Data: ", theData);

    }

  render(){

let chartData = { 
        labels: this.state.chartSTO_labels,
        datasets:[
          {
            // label:'',
            data: this.state.chartSTO_data,
            backgroundColor: this.state.chartSTO_colors,
            options: {
              legend: {
                display: false,
                labels: {
                  fontSize:20
                }
              },
                responsive: true,
                maintainAspectRatio: false
            }
          }
        ]
      }

      // chartData.canvas.parentNode.style.height = '128px';
      // chartData.canvas.parentNode.style.width = '128px';

      // let chartData = {labels: this.state.chartSTO_labels,
      //   datasets: [{
      //     label:"Employee STO Last 365 Days",
      //     data: this.state.chartSTO_data,
      //   }]
      // }

    return (
        <div>
          <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
          <h2 className = 'subHeading'>STO Days Last 365 Days by Employee</h2>
 
            <div className='chart-container' id="chart">
              <Bar id='myChart1' className='chart-container' data={chartData}/>
      </div>

    <div className="chart-container">
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
