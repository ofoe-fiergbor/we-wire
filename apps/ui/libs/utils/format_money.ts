export function formatMoney(number: number) {
    if (number >= 1000) {
        const shortValue = Math.floor(number / 1000);
        return shortValue + 'K';
    }
    return number;
}
