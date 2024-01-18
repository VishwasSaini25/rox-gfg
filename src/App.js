import './App.css';
import Transaction from "./components/transactions"
function App() {
  return (
    <div className="App">
      <div className='heading'>
        <h3>
            Transaction Dashboard
        </h3>
      </div>
      <div className='transaction-table'>
      <Transaction />
      </div>
    </div>
  );
}

export default App;
