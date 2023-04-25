import { PagedFilter } from "./paged-filter";

/**
 * Lista paginada de resultados.
 */
export interface PagedList<T> extends PagedFilter {
    results: T[];
    totalResults: number;
}
