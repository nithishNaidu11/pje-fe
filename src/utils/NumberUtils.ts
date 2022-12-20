export const NumberUtils = {
    toNumber(value: number): number {
        const number = parseFloat(`${value}`);
        if (!isNaN(number) && isFinite(value)) {
            return number;
        } else {
            throw new Error(
                `Connot convert ${value} to a number. use a valid number for conversion.`
            );
        }
    },
    isNumeric(value: number): boolean {
        return !isNaN(parseFloat(`${value}`)) && isFinite(value);
    },
    isPositiveNumber(value: number): boolean {
        return NumberUtils.isNumeric(value) && NumberUtils.toNumber(value) > 0;
    }
};
