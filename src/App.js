import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
 import {UserData} from './Data';


class App extends React.Component {

  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  //ComponentDidMount is used to execute the code
  componentDidMount() {
    fetch("http://localhost:3000/api/test2")
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        items: json,
        DataisLoaded: true
      });
    })
  }
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded) return <div> <h1> Please wait some time... </h1></div>;
    
    return (
      <div className = "App">
        <h1> Fetch data from an api in react </h1>
        <div> Customers of the week = { items.customerOfTheWeek }</div>
        {
          items.data.map((item) => (
            <div> Timestamp = {item.Timestamp},  
            DeviceID = {item.DeviceID}, 
            Customer duration = {item.Duration} </div>
          ))}
      </div>
    )
  }

}

export default App;

export function BarChartApp() {

  const xAxisData = UserData.map((data) => data.day); //retrieve x-axis data
  const yAxisData = UserData.map((data) => data.total); //retrieve y-axis data
  // console.log(xAxisData);
  // console.log(yAxisData);
  
  return (
    <div className="BarChartApp"> 
    <BarChart xAxisData={xAxisData} yAxisData={yAxisData}/> 
    </div>
  );
}
