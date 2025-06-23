export const RegExUtil = {
    alphaNumericWithUnderscoreAndDash: '^[a-zA-Z0-9_-]*$',
    conformToId: (psuedoId: string): string => {
        const id = psuedoId.replace(/[^a-zA-Z0-9_]/g, '-');
        return id.slice(0, 33).toLowerCase();
    },
    isMobileNumber: (mobileNumber: string): boolean => {
        const re = /^[6-9]\d{9}$/;
        return !!mobileNumber && re.test(mobileNumber);
    },
    isGSTIN: (gstin: string): boolean => {
        const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return !!gstin && re.test(gstin);
    },
    isAadhaar: (aadhaarNumber: string): boolean => {
        const re = /^[2-9]{1}[0-9]{11}$/;
        return !!aadhaarNumber && re.test(aadhaarNumber);
    },
    isYearsOfExperience: (yearsOfExperience: string): boolean => {
        const re = /^[0-9][0-9]?$|^50$/;
        return !!yearsOfExperience && re.test(yearsOfExperience);
    },
    isName: (fullName: string): boolean => {
        const re = /^[a-zA-Z0-9.-\s]*$/;

        return (
            !!fullName &&
            re.test(fullName) &&
            fullName.length > 2 &&
            fullName.length < 100
        );
    },
    isEmail(email: string | null) {
        const re = /\S+@\S+\.\S+/;
        return !!email && re.test(email);
    },
    isDescription(description: string | null) {
        return (description || '')?.length < 200;
    },
    isNumber(str: string): boolean {
        const regex = /^[0-9]*$/;
        return regex.test(str);
    },
    isAlphaNumeric(str: string): boolean {
        const regex = /^[a-zA-Z0-9]*$/;
        return regex.test(str);
    },
    isDate(str: string): boolean {
        // eslint-disable-next-line no-useless-escape
        const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(str);
    }
};
