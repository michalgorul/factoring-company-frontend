import {handleFilterTransactionsDates} from "./historyService";
import React from "react";

const getBenefit = (startDate, endDate, setValueBenefitCredits, creditTransactions) => {
    setValueBenefitCredits(creditTransactions
        .filter(transaction => handleFilterTransactionsDates(transaction, startDate, endDate))
        .filter(transaction => {
            const {benefit = {}} = transaction;
            return benefit === true
        })
        .map(creditTransaction => {
            return creditTransaction.value
        }).reduce((a, b) => a + b, 0))
}

const getDrawback = (startDate, endDate, setValueDrawbackCredits, creditTransactions) => {
    setValueDrawbackCredits(creditTransactions
        .filter(transaction => handleFilterTransactionsDates(transaction, startDate, endDate))
        .filter(transaction => {
            const {benefit = {}} = transaction;
            return benefit === false
        })
        .map(creditTransaction => {
            return creditTransaction.value
        }).reduce((a, b) => a + b, 0))
}

const showSumCredits = (valueBenefitCredits, valueDrawbackCredits) => {
    let sum = valueBenefitCredits - valueDrawbackCredits;
    if (sum >= 0) {
        return (
            <div className="mb-2 fs-5"><span className="bg-success p-1 rounded"> + {sum.toFixed(2)} USD </span></div>
        )
    }
    return (
        <div className="mb-2 fs-5"><span className="bg-danger p-1 rounded">{sum.toFixed(2)} USD </span></div>
    )
}


export {getBenefit, getDrawback, showSumCredits}

export class handleResetDates {
}