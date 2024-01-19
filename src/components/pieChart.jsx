import { useEffect, useState } from "react";
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
const PieChart = ({ props }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    });

    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = props;


    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API}/charts/pieChart?month=${selectedMonth ? selectedMonth : ""
                    }`
                );
                const { data } = await res.json();
                const categories = data?.map(item => item.category);
                const count = data?.map(item => item.count);
                console.log(categories);
                setData({
                    labels: categories,
                    datasets: [
                        {
                            data: count,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                    ],
                });

            } catch (error) {
                console.log("Error fetching PieChart: " + error);
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
                <Pie data={data} />
            </MDBContainer>
        </div>
    );
};

export default PieChart;