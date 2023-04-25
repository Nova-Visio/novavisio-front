import { PagedFilter } from './paged-filter';

/** Filtro de customers. */
export interface CustomerFilter extends PagedFilter {
    
    /** Nombre de proveedor. */
    name: string;
}