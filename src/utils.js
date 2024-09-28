export function formatDate(date) {
    
    return `${getFullDay(date)}/${getFullMonth(date)}/${date.getFullYear()}`
}

function getFullDay(date) {
    let day = date.getDate()
    if (day < 10)
    {
        day = `0${day}`
    }

    return day
}

function getFullMonth(date) {
    let month = date.getMonth()
    if (month < 10)
    {
        month = `0${month}`
    }

    return month
}