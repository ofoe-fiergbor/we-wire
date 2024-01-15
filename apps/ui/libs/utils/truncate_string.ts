export function truncateString(word: string, count = 6): string {
    if (word.length <= count) {
        return word; // If the word is already 6 characters or shorter, return as-is
    } else {
        return word.slice(0, count) + '...';
    }
}
