import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { PoweredByText } from 'components/common';
import { QuizVideoViewBanner } from 'components/quiz';

import { useGetOpenCompany } from 'hooks/apiHooks/useGetOpenCompany';

const ABC_COMPANY_ID: string = import.meta.env.VITE_ABC_COMPANY_ID;
const QUIZ_VIDEO_PAGE_PATH_PATTERN = /^\/abc\/video\/[^/]+$/;

export const QuizBanner = () => {
    const { pathname } = useLocation();

    const isQuizVideoPage = React.useMemo(
        () => QUIZ_VIDEO_PAGE_PATH_PATTERN.test(pathname),
        [pathname]
    );

    const { data: companyDetails } = useGetOpenCompany({
        params: { companyId: ABC_COMPANY_ID },
        enabled: true
    });

    if (isQuizVideoPage) {
        return <QuizVideoViewBanner logoUrl={companyDetails?.logoUrl} />;
    }

    return (
        <Box py={2.5} px={2} display="flex" borderBottom="1px solid #EDEDED">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                flex={1}
            >
                <Typography
                    variant="body1"
                    fontWeight={700}
                    color={grey[900]}
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    lineHeight="normal"
                    mb={0.5}
                >
                    Pre-Induction Assessment
                </Typography>
                <PoweredByText />
            </Box>
            <Box flex={0} display="flex" alignItems={'center'}>
                {companyDetails?.logoUrl ? (
                    <img
                        src={companyDetails?.logoUrl}
                        style={{ width: '115px' }}
                    />
                ) : null}
            </Box>
        </Box>
    );
};
