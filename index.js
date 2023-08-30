// Your code here

/*
function createEmployeeRecord(arr) {

    let arrayOfEmployees = [];
    let newObject = {};

    //determines if array is nested...
    if (Array.isArray(arr[0])) {
        for (let item of arr) {
            arrayOfEmployees.push(createEmployeeRecord(item));
        }
    }
    else {
        arr.forEach((item, index) => {
            switch (index) {
                case 0:
                    newObject.firstName = item;
                    break;
                case 1:
                    newObject.familyName = item;
                    break;
                case 2:
                    newObject.title = item;
                    break;
                case 3:
                    newObject.payPerHour = item;
                    break;
            }
        })
        newObject.timeInEvents = [];
        newObject.timeOutEvents = [];
    }

    console.log('should be last');
    console.log(arrayOfEmployees);
    return newObject;
}

createEmployeeRecord([["Gray", "Worm", "Security", 1], ["Blue", "Beetle", "CEO", 5000]]);
*/

function createEmployeeRecord(arr) {
    let newObject = {};
    //determines if array is nested...
        arr.forEach((item, index) => {
            switch (index) {
                case 0:
                    newObject.firstName = item;
                    break;
                case 1:
                    newObject.familyName = item;
                    break;
                case 2:
                    newObject.title = item;
                    break;
                case 3:
                    newObject.payPerHour = item;
                    break;
            }
        })
        newObject.timeInEvents = [];
        newObject.timeOutEvents = [];
    return newObject;
}

function createEmployeeRecords(arr) {
    const employeeList = [];
    //assume array is two dimensional
    for(let employee of arr){
        employeeList.push(createEmployeeRecord(employee));
    }
    return employeeList;
}

function createTimeInEvent(employeeObj, timeInDate){
    //timeIndate comes in date and hour
    //split timeInDate into two strings
    const timeInDateArray = timeInDate.split(" ");
    const date = timeInDateArray[0];
    const hour = parseInt(timeInDateArray[1],10);
    const timeInObj = {
        type: 'TimeIn',
        date: date,
        hour: hour,
    }
    //assuming it has timeInEvent key
    employeeObj.timeInEvents.push(timeInObj);
    return employeeObj;
}

function createTimeOutEvent(employeeObj, timeOutDate){
    //timeIndate comes in date and hour
    if(typeof employeeObj !== 'object' || Array.isArray(employeeObj)){
        return;
    }

    //split timeInDate into two strings
    const timeOutDateArray = timeOutDate.split(" ");
    const date = timeOutDateArray[0];
    const hour = parseInt(timeOutDateArray[1],10);
    const timeOutObj = {
        type: 'TimeOut',
        date: date,
        hour: hour,
    }
    //assuming it has timeInEvent key
    employeeObj.timeOutEvents.push(timeOutObj);
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date){
    let timeInHour;
    let timeOutHour;
    let difference;
    if(!employeeObj.timeInEvents && !employeeObj.timeOutEvents){
        return;
    }
    //if date matches with whatever is in employee object, then...
    for(let i = 0; i < employeeObj.timeInEvents.length; i++){
        if(date === employeeObj.timeInEvents[i].date){
            timeInHour = employeeObj.timeInEvents[i].hour;
            timeOutHour = employeeObj.timeOutEvents[i].hour;
            difference = Math.abs(timeInHour - timeOutHour)/100;
        }
    }
    console.log(difference);
    return difference;
}

function wagesEarnedOnDate(employeeObj, date){
    const hoursWorked = hoursWorkedOnDate(employeeObj, date);
    if(!hoursWorked){
        return;
    }
    const earnedWage = hoursWorked*employeeObj.payPerHour;
    return earnedWage;
}

function allWagesFor(employeeObj){
    let summer = 0;
    for(let timeObj of employeeObj.timeInEvents){
        summer = summer + wagesEarnedOnDate(employeeObj, timeObj.date);
    }
    return summer;
}

function calculatePayroll(multipleEmployees){
    let aggregateWage = 0;
    //multiple employees having [{},{}] format
    for(let employeeObj of multipleEmployees){
        aggregateWage = aggregateWage + allWagesFor(employeeObj);
    }
    return aggregateWage;
}


