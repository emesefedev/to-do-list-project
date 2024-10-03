export function formatDate(date) {
    
    return `${getFullDay(date)}/${getFullMonth(date)}/${date.getFullYear()}`
}

function getFullDay(date) {
    let day = date.getDate()
    return day.toString().padStart(2, '0')
}

function getFullMonth(date) {
    let month = date.getMonth() + 1
    return month.toString().padStart(2, '0')
}