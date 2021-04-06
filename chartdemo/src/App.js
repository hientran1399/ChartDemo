import "./App.css";
import React from "react";
import { Radio } from 'antd';
import { getData } from "./helpers/fetchDataHelper";
// import BarChart from "./components/ChartJS/BarChart";
// import StackedBarChart from "./components/ChartJS/StackedBarChart";
// import LineChart from "./components/ApexChart/LineChart";
// import LineBrushChart from "./components/ApexChart/BrushChart";
// import TreeMap2 from "./components/ApexChart/TreeMap";
// import PrinterComponent from './components/PrinterComponent'
import HeatMap from './components/ApexChart/Heatmap'
import TreeMap from './components/ApexChart/TreeMap'
import PieChart from './components/ApexChart/PieChart'
import ExportMockupData from './components/mockupData/ExportMockupData'

import { generateDataHeatMap, generateDataHeatMap1, generateDataPie, generateDataTreeMap } from './helpers/generateDataHelper'
import FilterComponent2 from "./components/FilterComponent2";
import FilterComponent3 from "./components/FilterComponent3";
import FilterComponent1 from "./components/FilterComponent1";
import FilterComponent from "./components/FilterComponent";
import { PROVINCE } from "./data/constData";
             

// const LABELS = [
//   "Cần Thơ",
//   "Đà Nẵng",
//   "Hải Phòng",
//   "Hà Nội",
//   "TP HCM",
//   "An Giang",
// ]

const NO_TENANT = 10
const USECASE = ['Usecase 3', 'Usecase 11', 'Usecase 12', 'Usecase 13', 'Usecase 1']
const UC_DES = [
  'Xem top 5 đường có nhiều hoặc ít revenue/transaction nhất của TP/tỉnh (dành cho doanh nghiệp lớn)',
  'So sánh mật độ doanh thu hoặc số lượng transaction của 1 brand (hoặc chi nhánh) qua các khung giờ và các thứ/ngày trong 1 tháng',
  'So sánh mật độ doanh thu/số lượng transaction của tenant qua các khung giờ trong ngày',
  'So sánh mật độ doanh thu/ transaction giữa các tenant trong cùng 1 khung giờ trong ngày/cùng 1 thứ trong tuần',
  'Xem doanh thu/transaction theo thành phố trực thuộc TW/ Tỉnh'
]

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: getData(),
      sliderValue: 2020,
      usecaseValue: 0,
      data: null,
      isChange: false,
      labels: PROVINCE
    };
  }

  componentDidMount() {
    // window.setInterval(() => {
    this.setState({
      feeds: getData(),
    });
    // }, 5000);
  }

  onChange = e => {
    this.setState({
      usecaseValue: e.target.value,
    });
  };

  handleFilterChange1 = (districtList) => {
    let res = null
    if (districtList.length>0) {
      res = generateDataTreeMap(districtList)
    }

    let bool = this.state.isChange
    if (this.state.data?.data.length < districtList.length) bool = !bool

    this.setState({
      ...this.state,
      data: res,
      isChange: bool
    })
  }

  handleFilterChange2 = (date, timeType) => {
    let res = null
    if (date) res = generateDataHeatMap(timeType, NO_TENANT)
    
    this.setState({
      ...this.state,
      data: res
    })
  }

  handleFilterChange3 = (month, type) => {
    let res = null
    if (month) res = generateDataHeatMap1(month, type)
    this.setState({
      ...this.state,
      data: res
    })
  }

  handleFilterChange4 = (value) => {
    let res = []
    if (value) res = generateDataPie(PROVINCE)
    this.setState({
      ...this.state,
      data: res,
    })
  }

  render() {
    return (
      <div className="App">
        <ExportMockupData />

        <Radio.Group
          onChange={this.onChange}
          value={this.state.usecaseValue}
          optionType="button"
          buttonStyle="solid"
        >
          {
            USECASE.map((item, index) => {
              return(
                <Radio value={index}>{item}</Radio>
              )
            })
          }
        </Radio.Group>

        <h1>{USECASE[this.state.usecaseValue]}</h1>
        <h3>{UC_DES[this.state.usecaseValue]}</h3>
        <br />
     
        <div className="main chart-wrapper">
          <div style={styles.chartContainer}>
            <div style={styles.filterContainer}>
              { this.state.usecaseValue === 0  && <FilterComponent1 handleFilterChange={this.handleFilterChange1}/> }
              { this.state.usecaseValue === 1 && <FilterComponent3 handleFilterChange={this.handleFilterChange3}/> }
              { (this.state.usecaseValue === 2 || this.state.usecaseValue === 3) &&  <FilterComponent2 handleFilterChange={this.handleFilterChange2}/> }
              { this.state.usecaseValue === 4 && <FilterComponent handleFilterChange={this.handleFilterChange4}/> }
            </div>

            { (this.state.usecaseValue > 0 && this.state.usecaseValue <4) &&  <HeatMap usecase={this.state.usecaseValue} data={this.state.data}/> }
            { this.state.usecaseValue === 0 && this.state.isChange && <TreeMap data={this.state.data?.data} trend={this.state.data?.trend}/> }
            { this.state.usecaseValue === 0 && !this.state.isChange && <TreeMap data={this.state.data?.data} trend={this.state.data?.trend}/> }
            { this.state.usecaseValue === 4 && <PieChart data={this.state.data} labels={this.state.labels}/>}
          </div>
        </div>


        {/* <div>
          <LineBrushChart />
        </div> */}

           
        {/* <div className="main chart-wrapper">
          <BarChart
            data={this.state.feeds[1].data}
            title={this.state.feeds[1].title}
            color="#70CAD1"
          />
        </div>  */}
      </div>
    );
  }
}

export default App;

const styles = {
  chartContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  filterContainer: {
    display: 'flex', 
    // width: 300, 
    // justifyContent: 'space-between'
  }
}
