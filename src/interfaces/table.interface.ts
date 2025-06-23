import { SORT_ORDER } from 'Enum';
import type { AuditMetadata } from './form.interface';

export interface Sort {
    key: string;
    order: SORT_ORDER.ASC | SORT_ORDER.DESC;
}

export type HandleSortProps = (sortBy: {
    key: string;
    order: SORT_ORDER;
}) => void;

export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    total: number;
    itemsPerPage: number;
    page: number;
}

export interface SelectAllClickProps {
    data: Record<string, any>[];
    recordKey: 'workerId' | 'candidateId' | 'referrerId';
    paginationInfo?: PaginationInfo;
}

export enum STATUS_TYPE {
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING',
    DANGER = 'DANGER'
}
