import { useState } from 'react';
import './App.css';
import Transaction from "./components/transactions";
import Statistics from "./components/statistics";
import BarChart from './components/barChart';
function App() {
const [selectedMonth, setSelectedMonth] = useState(3);

  return (
    <div className="App">
      <div className='heading'>
        <h3>
            Transaction Dashboard
        </h3>
      </div>
      <div className='transaction-table'>
      <Transaction hookProp={[selectedMonth,setSelectedMonth]} />
      </div>
      <div className='stats-pieChart'>
        <Statistics hookProp={[selectedMonth,setSelectedMonth]} />
      </div>
      <div className='barChart'>
        <BarChart hookProp={[selectedMonth,setSelectedMonth]} />
      </div>
    </div>
  );
}

export default App;
