import { useMutation } from '@tanstack/react-query';
import { upload } from 'api/jobQuery';
import { DOCUMENT_TYPE } from 'Enum';

import { type ApiError } from 'interfaces';

interface UploadDocumentProps {
    params: {
        companyId: string;
        jobQueryId: string;
    };
    documentType: DOCUMENT_TYPE;
    file: File;
    shortcode: string;
}

interface Response {
    links: string[];
}

export const useUploadJQDocument = () => {
    return useMutation<Response, ApiError, UploadDocumentProps>(
        (body: UploadDocumentProps) => {
            const { params, documentType, file, shortcode } = body;
            return upload.postForm({
                params: { ...params },
                body: {
                    file,
                    shortcode,
                    documentType
                }
            });
        }
    );
};
