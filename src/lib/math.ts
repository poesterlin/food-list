/**
 * Returns the modulo of a number. The result is always positive. Works with negative numbers.
 * @param n 
 * @param m 
 * @returns 
 */
export function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}
