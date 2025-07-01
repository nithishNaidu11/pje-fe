import { type UseQueryResult } from '@tanstack/react-query';

export type QueryResultProps<
    TData = unknown,
    TError = unknown
> = UseQueryResult<TData, TError>;
