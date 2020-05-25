const sorter = {
    "sunday": 0,
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6
}

/**
 * 
 * @param {Array} data - array of objects
 * @param {String} data.name - weekday name
 */
const sortWeekDays = data => {
console.log({data})
    return data.sort((a, b) =>
        sorter[a.name.toLowerCase()] - sorter[b.name.toLowerCase()]
    )
}
    

module.exports = {
    sortWeekDays
}