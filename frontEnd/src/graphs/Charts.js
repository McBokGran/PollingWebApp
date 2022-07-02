import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/exporting")(Highcharts);

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barchart: true,
      data: props.data,
    };
  }

  handleCharType = () => {
    this.setState({
      barchart: !this.state.barchart,
    });
  };

  render() {
    let arr = [];
    this.state.data.choices.forEach((elt) => {
      let obj = {
        name: elt.text,
        y: elt.voteCount,

        //sliced: true,
        selected: true,
      };

      arr.push(obj);
    });

    let arr2 = [];
    this.state.data.choices.forEach((elt) => {
      let obj = {
        name: elt.text,

        data: [elt.voteCount],
      };

      arr2.push(obj);
    });

    let options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: this.state.barchart ? "column" : "pie",
      },
      title: {
        text: this.state.data.question,
      },

      tooltip: {
        headerFormat: "",
        pointFormat: "{series.name} {point.name} : <b>{point.y:.1f}</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f}",
          },
        },
      },
      series: this.state.barchart
        ? arr2
        : [
            {
              name: this.state.data.question,
              data: arr,
            },
          ],
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "4px 22px",
            margin: "10px",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "10px",
          }}
          onClick={this.handleCharType}
        >
          Pie Chart
        </button>

        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          showOptions={true}
          isPureConfig={true}
        />
      </div>
    );
  }
}

export default Charts;
