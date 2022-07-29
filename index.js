function createEmployeeRecord([name, surname, title, rate]) {
    return {
        firstName: name,
        familyName: surname,
        title: title,
        payPerHour: rate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    let employeeArray = [];
    for (const element of array) {
        let employee = createEmployeeRecord(element);
        employeeArray.push(employee);
    }
    return employeeArray;
}

function createTimeInEvent(employee, date) {
    employee['timeInEvents'].push({
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    });
    return employee;
}

function createTimeOutEvent(employee, date) {
    employee['timeOutEvents'].push({
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let clockIn;
    let clockOut;
    employee.timeInEvents.forEach((element) => {
        if (element.date === date) {
            clockIn = element.hour;
        }
    })
    employee.timeOutEvents.forEach((element) => {
        if (element.date === date) {
            clockOut = element.hour;
        }
    })
    return (clockOut - clockIn) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    const timeIn = employee.timeInEvents;
    const timeOut = employee.timeOutEvents;
    let totalWages = 0
    for (let i = 0; i < timeIn.length; i++) {
        for (let j = 0; j < timeOut.length; j++) {
            if (timeIn[i].date === timeIn[j].date) {
                let dailyWages = wagesEarnedOnDate(employee, timeIn[i].date);
                totalWages += dailyWages;
            }
        }
    }
    return totalWages;
}

function calculatePayroll(records) {
    let wagesOwed = 0;
    records.forEach(employee => {
        wagesOwed += allWagesFor(employee)
    })
    return wagesOwed;
}