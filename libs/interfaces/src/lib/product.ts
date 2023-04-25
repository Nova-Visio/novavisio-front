import { ProductCategory } from './product-category';

/**
 * Producto.
 */
export interface Product {
    id: number;
    name: string;
    make: string;
    category: ProductCategory[];
    price: number;
}
