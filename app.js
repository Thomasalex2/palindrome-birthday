var date = document.querySelector("#date")
var button = document.querySelector("#check-btn")
var results = document.querySelector("#results")
var loading = document.querySelector(".loader")


let clearResult = () => results.innerText = "";

let reformatDate = date => date.slice(0, 2) + "-" + date.slice(2, 4) + "-" + date.slice(4)

let getKeybyValue = (dateDict, date) => Object.keys(dateDict).find(key => dateDict[key] === date)

let checkLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? true : false;

let checkPalindrome = date => reversedDate = date.split("").reverse().join("") === date ? true : false;

function generateDateFormats(givenDate) {
    var splitDate = {
        "Y": givenDate.split("-")[0],
        "M": givenDate.split("-")[1],
        "D": givenDate.split("-")[2]
    }

    var dateDict = {
        "DD-MM-YYYY": splitDate["D"] + splitDate["M"] + splitDate["Y"],
        "MM-DD-YYYY": splitDate["M"] + splitDate["D"] + splitDate["Y"],
        "YYYY-MM-DD": splitDate["Y"] + splitDate["M"] + splitDate["D"],
        "DD-MM-YY": splitDate["D"] + splitDate["M"] + splitDate["Y"].slice(2),
        "MM-DD-YY": splitDate["M"] + splitDate["D"] + splitDate["Y"].slice(2),
        "YY-MM-DD": splitDate["Y"].slice(2) + splitDate["M"] + splitDate["D"]
    }
    return dateDict;
}

function getNextPalindrome(currentDate, direction) {
    var currentSplitDate = {
        "Y": currentDate.split("-")[0],
        "M": currentDate.split("-")[1],
        "D": currentDate.split("-")[2]
    }
    var counter = 1;
    while (1) {
        if (direction === "next") {
            workingDate = getNextDate(currentSplitDate);
        } else if (direction === "prev"){
            workingDate = getPrevDate(currentSplitDate);   
        }
        var dateDict = generateDateFormats(workingDate.Y + "-" + workingDate.M + "-" + workingDate.D)
        var dates = Object.values(dateDict);
        for (var i = 0; i < dates.length; i++) {
            if (checkPalindrome(dates[i]) === true) {
                return {
                    "noOfDays": counter,
                    "date": dates[i],
                    "format": getKeybyValue(dateDict, dates[i])
                }
            }
        }
        counter++;
        currentSplitDate = workingDate
    }
    // return(getPrevDate(currentSplitDate));
}


function getNextDate(currentSplitDateString) {
    var currentSplitDate = {}
    currentSplitDate["D"] = parseInt(currentSplitDateString.D)
    currentSplitDate["M"] = parseInt(currentSplitDateString.M)
    currentSplitDate["Y"] = parseInt(currentSplitDateString.Y)
    
    var daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // console.log("Current Date: ", currentSplitDate);
    if (currentSplitDate.D === 28 && currentSplitDate.M === 2) {
        if (checkLeapYear(currentSplitDate.Y)) {
            // console.log ("Its a leap year")
            currentSplitDate.D++;
        } else {
            // console.log ("Its not a leap year")
            currentSplitDate.D = 1;
            currentSplitDate.M = 3;
        }
        var nextDate = {
            "Y": currentSplitDate.Y.toString(),
            "M": currentSplitDate.M.toString(),
            "D": currentSplitDate.D.toString()
        }
        if (parseInt(nextDate.D) < 10) { nextDate.D = nextDate.D.padStart(2, "0") }
        if (parseInt(nextDate.M) < 10) { nextDate.M = nextDate.M.padStart(2, "0")}
        return (nextDate);
    }
    if (currentSplitDate.D < 30 && currentSplitDate.M !== 2) {
        // console.log ("Incrementing date as < 30")
        currentSplitDate.D++;
    } else {
        if (currentSplitDate.D === daysInMonth[currentSplitDate.M - 1]) {
            currentSplitDate.D = 1;
            currentSplitDate.M++;
        } else {
            currentSplitDate.D++;
        }
        if (currentSplitDate.M === 13) {
            // console.log ("Incrementing year as month 12 and date 31")
            currentSplitDate.M = 1;
            currentSplitDate.Y++;
        }
    }
    var nextDate = {
        "Y": currentSplitDate.Y.toString(),
        "M": currentSplitDate.M.toString(),
        "D": currentSplitDate.D.toString()
    }
    if (parseInt(nextDate.D) < 10) { nextDate.D = nextDate.D.padStart(2, "0") }
    if (parseInt(nextDate.M) < 10) { nextDate.M = nextDate.M.padStart(2, "0")}
    return (nextDate);
}


function getPrevDate(currentSplitDateString) {
    var currentSplitDate = {}
    currentSplitDate["D"] = parseInt(currentSplitDateString.D)
    currentSplitDate["M"] = parseInt(currentSplitDateString.M)
    currentSplitDate["Y"] = parseInt(currentSplitDateString.Y)
    
    var daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // console.log("Current Date: ", currentSplitDate);
    if (currentSplitDate.D === 1 && currentSplitDate.M === 3) {
        if (checkLeapYear(currentSplitDate.Y)) {
            // console.log ("Its a leap year")
            currentSplitDate.M = 2;
            currentSplitDate.D = 29;
        } else {
            // console.log ("Its not a leap year")
            currentSplitDate.D = 28;
            currentSplitDate.M = 2;
        }
        var prevDate = {
            "Y": currentSplitDate.Y.toString(),
            "M": currentSplitDate.M.toString(),
            "D": currentSplitDate.D.toString()
        }
        if (parseInt(prevDate.D) < 10) { prevDate.D = prevDate.D.padStart(2, "0") }
        if (parseInt(prevDate.M) < 10) { prevDate.M = prevDate.M.padStart(2, "0")}
        return (prevDate);
    }
    if (currentSplitDate.D > 1) {
        // console.log ("Decrementing date as > 1")
        currentSplitDate.D--;
    } else {
        // console.log ("Decrementing month")
        if (currentSplitDate.D === 1 && currentSplitDate.M !== 3) {
            currentSplitDate.D = daysInMonth[currentSplitDate.M - 2];
            currentSplitDate.M--;
        }
        if (currentSplitDate.M === 0) {
            // console.log ("Decrementing year as month 1 and date 1")
            currentSplitDate.D = 31;
            currentSplitDate.M = 12;
            currentSplitDate.Y--;
        }
    }
    var prevDate = {
        "Y": currentSplitDate.Y.toString(),
        "M": currentSplitDate.M.toString(),
        "D": currentSplitDate.D.toString()
    }
    if (parseInt(prevDate.D) < 10) { prevDate.D = prevDate.D.padStart(2, "0") }
    if (parseInt(prevDate.M) < 10) { prevDate.M = prevDate.M.padStart(2, "0")}
    return (prevDate);
}


function fetchResults() {
    loading.style.display = "none"
    var dateDict =generateDateFormats(date.value)
    var dates = Object.values(dateDict);
    var palindromeFlag = false;
    for (var i = 0; i < dates.length; i++) {
        if (checkPalindrome(dates[i]) === true) {
            palindromeFlag = true;
            results.innerText = "Woohoo! Your birthday date forms a Palindrome in the " + getKeybyValue(dateDict, dates[i]) + " format 🥳"
        }
    }
    if (palindromeFlag === false) {
        var nextResult = getNextPalindrome(date.value, "next")
        var prevResult = getNextPalindrome(date.value, "prev")
        console.log("Next Palindrome: ", nextResult)
        console.log("Prev Palindrome: ", prevResult)
        if (nextResult.noOfDays <= prevResult.noOfDays) {
            results.innerText = "Your entered birthday date is not a Palindrome.\n \
            The nearest date as palindrome is after " + nextResult.noOfDays + (nextResult.noOfDays === 1 ? " day" : " days") + " on " + reformatDate(nextResult.date) + " in " + nextResult.format + " format";
        } else {
            results.innerText = "Your entered birthday date is not a Palindrome.\n \
            The nearest date as palindrome was before " + prevResult.noOfDays + (prevResult.noOfDays === 1 ? " day" : " days") + " on " + reformatDate(prevResult.date) + " in " + prevResult.format + " format";
        }
        loading.style.display = "none"
        results.style.display = "block"
    }
}

results.style.display = "none"
loading.style.display = "none"
button.addEventListener("click", loaderAnimation => loading.style.display = "block");
button.addEventListener("click", ()=>setTimeout(() => {fetchResults()}, 1000));
date.addEventListener("click", clearResult)