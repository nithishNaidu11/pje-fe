import Typography from '@mui/material/Typography';
import { JobQueryCompanyDetails } from './JobQueryCompanyDetails';

interface JobQueryCheckInterestHeaderProps {
    companyName: string;
    companyLogo: string;
    title: string;
    header: string;
}

export const JobQueryCheckInterestHeader = ({
    companyName,
    companyLogo,
    title,
    header
}: JobQueryCheckInterestHeaderProps) => {
    return (
        <>
            <JobQueryCompanyDetails
                companyName={companyName}
                companyLogo={companyLogo}
            />
            <Typography variant="h5" mb={2}>
                {title}
            </Typography>
            <Typography component="p" variant="body2">
                {header}
            </Typography>
        </>
    );
};
