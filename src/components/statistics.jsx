import { useEffect,useState } from "react";
import month from "../month";
import PieChart from "./pieChart";
const Statistics = ({hookProp}) => {
  const [data, setData] = useState();
  const [selectedMonth, setSelectedMonth] = hookProp;
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/statistics?month=${
            selectedMonth ? selectedMonth : ""
          }`
        );
        const { data } = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log("Error fetching statistics: " + error);
      }
    };

    (async () => {
      await fetchData();
      setLoading(false);
    })();
  }, [selectedMonth]);


    return (
        <div className="statistics">
            <div className="stats">
                <div className="stats-month">
                    <h2>Statistics - {month[selectedMonth-1].month}</h2>
                    <h5>Select months from the dropdown</h5>
                </div>
                <div className="stats-details">
                    <h3>Total Sale</h3>
                    <h4>{!loading && data.totalSaleAmount}</h4>
                    <h3>Total sold item</h3>
                    <h4>{!loading && data.totalSoldItems}</h4>
                    <h3>Total not sold item</h3>
                    <h4>{!loading && data.totalNotSoldItems}</h4>
                </div>
            </div>
            <div className="piechart">
                <h2>Pie Chart</h2>
                <PieChart props={hookProp} />
            </div>
        </div>
    )
}
export default Statistics;