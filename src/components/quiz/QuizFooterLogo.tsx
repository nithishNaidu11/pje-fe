import { Box, useMediaQuery, useTheme } from '@mui/material';

import { PoweredByText } from '@components/common';

import { useGetOpenCompany } from '@/hooks/apiHooks/useGetOpenCompany';

const ABC_COMPANY_ID: string = import.meta.env.VITE_ABC_COMPANY_ID;

export const QuizFooterLogo = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { data: companyDetails, isLoading: isCompanyDetailsLoading } =
        useGetOpenCompany({
            params: { companyId: ABC_COMPANY_ID },
            enabled: true
        });

    return (
        <>
            {!isCompanyDetailsLoading && companyDetails?.logoUrl ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <img
                        src={companyDetails?.logoUrl}
                        height={isMobile ? '38px' : '54px'}
                        style={{ margin: '48px 0 10px', display: 'block' }}
                    />
                    <PoweredByText
                        fontVariant={isMobile ? 'caption' : 'body1'}
                    />
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};
