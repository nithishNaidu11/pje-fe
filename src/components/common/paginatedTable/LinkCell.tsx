import { Link, Typography } from '@mui/material';

interface LinkCellProps {
    value: string;
    link: string;
    target?: string;
}

export const LinkCell = ({ value, link, target = link }: LinkCellProps) => {
    return (
        <Link href={link} underline="hover" target={target}>
            <Typography variant="body2">{link ? value : ''}</Typography>
        </Link>
    );
};
