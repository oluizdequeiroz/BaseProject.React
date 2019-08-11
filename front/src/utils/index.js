/**
 * Formatar a data
 */
export function formatDate(dateTime) {
    if (dateTime) {
        debugger;
        const date = new Date(dateTime);
        let day = date.getDate() + 1;
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${day}`.concat('/', month, '/', date.getFullYear());
    }
    return '-';
}