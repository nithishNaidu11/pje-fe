export interface CompanyProps {
    name: string;
    logoUrl?: string;
    settings: {
        dashboardSettings?: {
            isKycEnabled?: boolean;
        };
    };
}

export interface Company {
    name?: string;
    logoUrl?: string;
    // settings: {
    //     careerPageSettings: {
    //         logo1: string;
    //         logo2: string | null;
    //         primaryColor: string;
    //         bannerBgColor: string;
    //         bannerTextColor: string;
    //         companyName: string;
    //         description: string;
    //         learnMoreLink: string;
    //     };
    //     referralPageSettings: {
    //         companyName: string;
    //         logo: string;
    //         bannerTextColor: string;
    //         bannerBgColor: string;
    //         primaryColor: string;
    //         description: string;
    //         learnMoreLink: string;
    //     };
    //     workerSettings: {
    //         bulkUploadSetting?: {
    //             uploadToGcs: boolean;
    //         };
    //         bulkRequiredFields: string[];
    //         onboardingRequiredFields: string[];
    //         singleWorkerRequiredFields: string[];
    //     };
    //     dashboardSettings?: {
    //         onboarding?: {
    //             disableAadhaarOtpVerification?: boolean;
    //             disableFormTemplateCreation?: boolean;
    //             disableWorkspaceCreation?: boolean;
    //             editableFields?: string[];
    //             otpBasedLogin?: boolean;
    //         };
    //         vendor?: {
    //             disableVerification?: boolean;
    //         };
    //         isKycEnabled?: boolean;
    //     };
    // };
}
