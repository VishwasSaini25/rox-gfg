import React, { useState } from 'react';
import { useEffect } from 'react';
import month from "../month";
const SearchTransactionPage = ({hookProp}) => {
  const [selectedMonth, setSelectedMonth] = hookProp;
  const [data,setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 3,
    page: 1,
  });
  const handleSearch = (event) => {
      setSearch(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleNextPage = () => {
    setPaginationModel(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const handlePreviousPage = () => {
    setPaginationModel(prevState => ({
      ...prevState,
      page: prevState.page - 1,
    }));
  };
  useEffect(() => {
    setIsLoading(true);
      setData({});
  try {
    const fetchTransactions = async () => {
      const res = await fetch(
        `${
          process.env.REACT_APP_API
        }/transactions?search=${search}&page=${
          paginationModel.page
        }&perPage=${paginationModel.pageSize}&month=${selectedMonth ? selectedMonth : ""}`
      );
      console.log(res);
      const { data } = await res.json();
      console.log(data);
      setData(data);
    };
    fetchTransactions().then(() => {
      setIsLoading(false);
    });
  } catch (error) {
    console.log("Error fetching transactions: " + error);
  }
}, [paginationModel, search, selectedMonth]);

  return (
    <div>
      <div className='transaction-buttons'>
        <input type="text" placeholder="Search Transaction" onKeyUp={handleSearch} />
        <div>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {month.map((item,index) => (
              <option key={index} value={item.id}>{item.id} - {item.month}</option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions &&  data.transactions.map((item,index) => (
               <tr key={index}>
            <td>{index+1}</td>
            <td>{item.title.substring(0,20)}...</td>
            <td>{item.description.substring(0, 100)}..</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>{item.sold ? "true" : "false"}</td>
            <td><img src={item.image} /></td>
          </tr> 
          ))}
        </tbody>
      </table>
      <div className='table-nav'>
        <span>Page No: {paginationModel.page}</span>
        <div>
        <button onClick={handlePreviousPage} disabled={paginationModel.page === 1}>Previous - </button>
        <button onClick={handleNextPage} disabled={data.total/paginationModel.pageSize == paginationModel.page}>Next</button>
        </div>
        <span>Per Page: {paginationModel.pageSize}</span>
      </div>
    </div>
  );
};

export default SearchTransactionPage;