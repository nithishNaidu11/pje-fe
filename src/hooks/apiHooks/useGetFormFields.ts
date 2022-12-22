import { formFields } from 'api/settings';
import { useGetReactQuery } from 'hooks';
import { FormFields } from 'interfaces';

export const useGetFormFields = () => {
    return useGetReactQuery({
        queryKey: ['formFields'],
        requestUrl: formFields,
        onSuccess: (data: FormFields): FormFields => data
    });
};
