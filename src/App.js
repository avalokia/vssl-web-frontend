import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
 import {UserData} from './Data';
import chart from 'chart.js/dist/chart';
import Moment from 'react-moment';
import 'moment-timezone';

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
    let today = new Date(); //Date(2022,3,5);
    let firstDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+1); //start from monday
    let lastDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+7);
    // console.log(today + ' ' + firstDayOfTheWeek + ' ' + lastDayOfTheWeek);
    console.log(firstDayOfTheWeek);
    // for (let j = firstDayOfTheWeek; j < lastDayOfTheWeek; j.setDate(j.getDate()+1)){
    //   for (let i = 0; i < items.data.length; i++){
    //     console.log(new Date(items.data[i].Timestamp) + ' > ' + j)
    //     if (new Date(items.data[i].Timestamp) > j && new Date(items.data[i].Timestamp) < j.getDate()+1) {
    //       //console.log('items.data[i].Timestamp' + items.data[i].Timestamp + ' > ' + j)
    //     } 
    //   }
    // }

    return (
      <div className = "App">
        
        <h1> Fetch data from an api in react </h1>
        <p> Current Date = { String(today) } </p>
        <p> Start of The Week = { String(firstDayOfTheWeek) } </p>
        <p> End of The Week = {String(lastDayOfTheWeek)} </p>

        <p>Customers of the week = { items.customerOfTheWeek }</p>
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

