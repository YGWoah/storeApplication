import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../../../CONFIG';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private http: HttpClient) {}

	public getProducts(page: number = 1, limit: number = 5) {
		return this.http.get(
			`${SERVER_URL}/products?_page=${page}&_per_page=${limit}`,
			{
				observe: 'response',
			}
		);
	}

	public checkProduct(product: Product): Observable<Product> {
		return this.http.patch<Product>(`${SERVER_URL}/products/${product.id}`, {
			checked: !product.checked,
		});
	}

	public deleteProduct(product: Product): Observable<void> {
		return this.http.delete<void>(`${SERVER_URL}/products/${product.id}`);
	}

	public saveProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(`${SERVER_URL}/products`, product);
	}

	public searchProduct(keyword: string): Observable<Array<Product>> {
		return this.http.get<Array<Product>>(
			`${SERVER_URL}/products?name=${keyword}`
		);
	}

	public getProductById(id: number): Observable<Product> {
		return this.http.get<Product>(`${SERVER_URL}/products/${id}`);
	}

	public updateProduct(product: Product): Observable<Product> {
		return this.http.put<Product>(
			`${SERVER_URL}/products/${product.id}`,
			product
		);
	}
}
