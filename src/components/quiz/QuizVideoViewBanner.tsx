import { Box, useTheme, useMediaQuery } from '@mui/material';

interface QuizQuestionsViewBannerProps {
    logoUrl?: string;
}

export const QuizVideoViewBanner = ({
    logoUrl
}: QuizQuestionsViewBannerProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            height={isMobile ? '48px' : '58px'}
            px={isMobile ? 2 : 2.5}
            py={isMobile ? 1.5 : 1}
            boxSizing="border-box"
            bgcolor={theme.palette.quiz.bgColor.light}
            display="flex"
            alignItems="center"
        >
            {logoUrl ? (
                <img
                    src={logoUrl}
                    style={{ width: isMobile ? '96px' : '120px' }}
                />
            ) : null}
        </Box>
    );
};
