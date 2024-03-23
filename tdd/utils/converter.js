export function toCelsius(f) {
    const c = ((f - 32) * 5) / 9;
	return parseFloat(c.toFixed(2));
}
