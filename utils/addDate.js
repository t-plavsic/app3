exports.addDays = function (daysToAdd) {
    var futureDate = new Date();
    var numberOfDaysToAdd = parseInt(daysToAdd);
    futureDate.setDate(futureDate.getDate() + numberOfDaysToAdd);
    return futureDate;
}

exports.addDaysDDMMYYY = function (daysToAdd) {
    var futureDate = new Date();
    var numberOfDaysToAdd = parseInt(daysToAdd);
    futureDate.setDate(futureDate.getDate() + numberOfDaysToAdd);
    var dateISOstring = futureDate.toISOString();
    var dd = dateISOstring.substr(8, 2);
    var mm = dateISOstring.substr(5, 2);
    var yyyy = dateISOstring.substr(0, 4);
    var futureDate_dd_mm_yyy = dd + '/' + mm + '/' + yyyy;
    return futureDate_dd_mm_yyy;
}
  
                     