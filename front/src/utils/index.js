/**
 * Formatar a data
 */
export function formatDate(dateTime) {
    if (dateTime) {
        const date = new Date(dateTime);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString();
    }
    return '-';
}