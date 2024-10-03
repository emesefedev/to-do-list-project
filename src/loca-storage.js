export function saveInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLocalStorage(key) {
    const value = JSON.parse(localStorage.getItem(key))
    if (!value) {
        throw new Error(`${key} not found in local storage`)
    }
    return value
}

export function deleteFromLocalStorage(key)
{
    localStorage.removeItem(key)
}