const compareId = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

const compareName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

const compareBenefit = (a, b) => {
    if (a.benefit < b.benefit) {
        return -1;
    }
    if (a.benefit > b.benefit) {
        return 1;
    }
    return 0;
}

const compareValue = (a, b) => {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
}

const compareTransactionDate = (a, b) => {
    if (a.transactionDate < b.transactionDate) {
        return -1;
    }
    if (a.transactionDate > b.transactionDate) {
        return 1;
    }
    return 0;
}

const compareIdAsc = (a, b) => {
    if (a.id > b.id) {
        return -1;
    }
    if (a.id < b.id) {
        return 1;
    }
    return 0;
}

const compareNameAsc = (a, b) => {
    if (a.name > b.name) {
        return -1;
    }
    if (a.name < b.name) {
        return 1;
    }
    return 0;
}

const compareBenefitAsc = (a, b) => {
    if (a.benefit > b.benefit) {
        return -1;
    }
    if (a.benefit < b.benefit) {
        return 1;
    }
    return 0;
}

const compareValueAsc = (a, b) => {
    if (a.value > b.value) {
        return -1;
    }
    if (a.value < b.value) {
        return 1;
    }
    return 0;
}

const compareTransactionDateAsc = (a, b) => {
    if (a.transactionDate > b.transactionDate) {
        return -1;
    }
    if (a.transactionDate < b.transactionDate) {
        return 1;
    }
    return 0;
}

export {
    compareId,
    compareName,
    compareBenefit,
    compareValue,
    compareTransactionDate,
    compareIdAsc,
    compareNameAsc,
    compareBenefitAsc,
    compareValueAsc,
    compareTransactionDateAsc
};