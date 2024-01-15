export function convertPathToArr(path: string): string[] {
    return path.split('/').filter(Boolean);
}
