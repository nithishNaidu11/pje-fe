import { useMutation } from '@tanstack/react-query';
import { upload } from 'api/jobQuery';
import { DOCUMENT_TYPE } from 'Enum';

import { type ApiError } from 'interfaces';

interface UploadDocumentProps {
    companyId: string;
    documentType: DOCUMENT_TYPE;
    file: File;
    workerId?: string;
}

interface Response {
    links: string[];
}

export const useUploadDocument = () => {
    return useMutation<Response, ApiError, UploadDocumentProps>(
        (body: UploadDocumentProps) => {
            const { companyId, documentType, file, workerId } = body;
            return upload.postForm({
                params: { companyId },
                body: workerId
                    ? {
                          file,
                          documentType,
                          workerId
                      }
                    : { file, documentType }
            });
        }
    );
};
