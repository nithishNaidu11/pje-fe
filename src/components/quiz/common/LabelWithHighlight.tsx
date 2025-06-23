import { Box, Typography, useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

interface LabelWithHighlightProps {
    label: string;
    highlight?: string;
}

export const LabelWithHighlight = ({
    label,
    highlight
}: LabelWithHighlightProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                borderRadius: '12px 12px 12px 0px',
                padding: '12px 16px',
                width: 'fit-content',
                background: theme.palette.quiz.bgColor.warmIvory
            }}
        >
            <Typography
                component="span"
                variant="body2"
                fontWeight={400}
                color={blueGrey[900]}
            >
                {label}
                {highlight ? (
                    <Typography
                        component="span"
                        variant="body2"
                        fontWeight={600}
                        color={blueGrey[900]}
                        ml={0.5}
                    >
                        {highlight}
                    </Typography>
                ) : null}
            </Typography>
        </Box>
    );
};
