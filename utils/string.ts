/**
 * This function returns a part of a string based on the length
 * 
 * @param name string
 * @param length number
 * @returns string
 */
export const substr = (name: string, length: number) => {
    return name?.length > length ? `${name.slice(0, length)}..${name.slice(-4)}` : name
}