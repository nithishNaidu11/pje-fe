import { Typography, type TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

interface PoweredByTextProps {
    fontVariant?: TypographyProps['variant'];
}

export const PoweredByText = ({
    fontVariant = 'caption'
}: PoweredByTextProps) => {
    return (
        <Typography
            variant={fontVariant}
            fontStyle="italic"
            fontWeight={400}
            color={grey[700]}
            textAlign="center"
            lineHeight="normal"
        >
            {`powered by Hunar.ai`}
        </Typography>
    );
};
