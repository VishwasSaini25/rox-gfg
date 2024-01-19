import { useEffect, useState } from "react";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
const BarChart = ({ hookProp }) => {
    const [data, setData] = useState({
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901- above'],
        datasets: [
            {
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    });

    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = hookProp;


    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API}/charts/barChart?month=${selectedMonth ? selectedMonth : ""
                    }`
                );
                const { data } = await res.json();
                const range = data.length > 0 ? data?.map(item => item.range): [];
                const count = data?.map(item => item.count);
                console.log(range);
                setData({
                    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901- above'],
                    datasets: [
                        {
                            data: count,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                    ],
                });

            } catch (error) {
                console.log("Error fetching BarChart: " + error);
            }
        };

        (async () => {
            await fetchData();
            setLoading(false);
        })();
    }, [selectedMonth]);

    return (
        <div>
            <MDBContainer>
                <Bar data={data} />
            </MDBContainer>
        </div>
    );
};

export default BarChart;