import React, {useEffect, useState} from 'react';
import {
    getBackgroundColors,
    getBorderColors,
    getColors,
    getLastMonths,
    getValuesForLastMonth, getValuesForLastMonths,
    randColor,
    showChart,
    showSelectDateScope
} from "../../../../services/chartsService";
import {Marginer} from "../../../../components/marginer";
import useFetchWithToken from "../../../../services/useFetchWithToken";
import config from "../../../../services/config";
import {Spinner} from "react-bootstrap";

const Charts = () => {
    const [whatTransactions, setWhatTransactions] = useState('credit');
    const [whatChart, setWhatChart] = useState('bar');
    const [datesScope, setDatesScope] = useState('lastMonth');
    const [labels, setLabels] = useState(getLastMonths(3));
    let colors = getColors(3);
    const [backgroundColors, setBackgroundColors] = useState(getBackgroundColors(3, colors));
    const [borderColors, setBorderColors] = useState(getBorderColors(3, colors));

    const {errorC, isPendingC, data: creditTransactions} = useFetchWithToken(`${config.API_URL}/api/transaction/credit`)
    const {errorI, isPendingI, data: invoiceTransactions} = useFetchWithToken(`${config.API_URL}/api/transaction/invoice`)
    const [dataset, setDataset] = useState(null);

    let data = {
        labels: labels,
        datasets: [
            {
                label: '$ Amount',
                data: dataset,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 3,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const switchTransactions = (whatTransactions) => {
        switch (datesScope) {
            case 'lastMonth':
                setDataset(getValuesForLastMonth(whatTransactions));
                break;
            case 'last3Months':
                setDataset(getValuesForLastMonths(whatTransactions, 3));
                break;
            case 'last6Months':
                setDataset(getValuesForLastMonths(whatTransactions, 6));
                break;
            case 'lastYear':
                setDataset(getValuesForLastMonths(whatTransactions, 12));
                break;
            default:
                setDataset(null);
                break;
        }
    }

    const setDatasetValues = () => {

        if (whatTransactions === 'credit') {
            switchTransactions(creditTransactions);
        } else if (whatTransactions === 'invoice') {
            switchTransactions(invoiceTransactions);
        }
    }

    const handleWhatTransactionsChange = (changeEvent) => {
        setWhatTransactions(changeEvent.target.value);
    }
    const handleWhatChartChange = (changeEvent) => {
        setWhatChart(changeEvent.target.value);
    }
    const setOptionsForCharts = (numOfColors) => {
        let colors = [];
        for (let i = numOfColors; i > 0; i -= 1) {
            colors.push(randColor())
        }
        setDatasetValues();
        setBackgroundColors(getBackgroundColors(numOfColors, colors));
        setBorderColors(getBorderColors(numOfColors, colors));
        setLabels(getLastMonths(numOfColors));

    }
    useEffect(() => {
        if (datesScope === 'lastMonth') {
            setOptionsForCharts(4, getValuesForLastMonth)
        } else if (datesScope === 'last3Months') {
            setOptionsForCharts(3)
        } else if (datesScope === 'last6Months') {
            setOptionsForCharts(6)
        } else if (datesScope === 'lastYear') {
            setOptionsForCharts(12)
        }
    }, [datesScope, whatTransactions, creditTransactions, whatChart]);

    return (
        <>
            {isPendingI && isPendingC &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorC && <div>{errorC}</div>}
            {errorI && <div>{errorI}</div>}
            {creditTransactions && invoiceTransactions && (
                <>
                    <div className="media align-items-center py-2">
                        <div className="media-body ml-4">
                            <h4 className="font-weight-bold display-2">Charts</h4>
                        </div>
                    </div>
                    <div className="container mt-5 mb-4 h4">
                        <div className="row align-items-start ms-1">
                            <div className="col-6 col-lg-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="payOption" value="credit"
                                           checked={whatTransactions === 'credit'} onChange={handleWhatTransactionsChange}/>
                                    <label className="form-check-label">Credits</label>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="payOption" value="invoice"
                                           checked={whatTransactions === 'invoice'} onChange={handleWhatTransactionsChange}/>
                                    <label className="form-check-label">Invoices</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5 mb-4 h4">
                        <div className="row align-items-start ms-1">
                            <div className="col-6 col-lg-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="chartOption" value="bar"
                                           checked={whatChart === 'bar'} onChange={handleWhatChartChange}/>
                                    <label className="form-check-label">Bar</label>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="chartOption" value="pie"
                                           checked={whatChart === 'pie'} onChange={handleWhatChartChange}/>
                                    <label className="form-check-label">Pie</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showSelectDateScope(whatChart, setDatesScope)}


                    <Marginer direction={'vertical'} margin={60}/>
                    <div className="mb-4">
                        {showChart(whatChart, data, options)}
                    </div>
                </>)}

        </>)
};

export default Charts;