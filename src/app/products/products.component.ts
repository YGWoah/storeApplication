import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
	constructor(
		private productService: ProductService,
		private router: Router,
		public appState: AppStateService
	) {}

	ngOnInit(): void {
		this.getProducts(
			this.appState.appState.currentPage,
			this.appState.appState.pageSize
		);
	}

	navigateToEditProduct(product: Product) {
		this.router.navigateByUrl(`/edit-product/${product.id}`);
	}

	goToPage(page: number) {
		this.appState.appState.currentPage = page;
		this.getProducts(
			this.appState.appState.currentPage,
			this.appState.appState.pageSize
		);
	}

	private getProducts(page: number, pageSize: number) {
		this.appState.appState.status = 'LOADING...';
		this.productService.getProducts(page, pageSize).subscribe({
			next: (res) => {
				this.appState.appState.totalProducts = parseInt((res.body as any)?.items);
				this.appState.appState.totalPages = Math.ceil(
					this.appState.appState.totalProducts / this.appState.appState.pageSize
				);
				this.appState.appState.products = (res.body as any)?.data as Product[];
				this.appState.appState.status = 'LOADED';
			},
			error: (error) => {
				console.error(error);
				this.appState.appState.status = 'ERROR';
				this.appState.appState.errorMessage = error;
				this.appState.appState.error = error.status;
			},
		});
	}

	goToNextPage() {
		this.appState.appState.currentPage++;
		this.getProducts(
			this.appState.appState.currentPage,
			this.appState.appState.pageSize
		);
	}

	goToPreviousPage() {
		this.appState.appState.currentPage--;
		this.getProducts(
			this.appState.appState.currentPage,
			this.appState.appState.pageSize
		);
	}

	handleCheckProduct(product: any) {
		this.productService.checkProduct(product).subscribe({
			next: (updatedProduct) => {
				this.appState.appState.products.map((p: any) => {
					if (p.id === updatedProduct.id) {
						p.checked = updatedProduct.checked;
					}
				});
			},
		});
	}

	handleDeleteProduct(product: Product) {
		if (confirm('Are you sure you want to delete this product?'))
			this.productService.deleteProduct(product).subscribe({
				next: () => {
					this.getProducts(
						this.appState.appState.currentPage,
						this.appState.appState.pageSize
					);
				},
			});
	}

	handleSearchProduct() {
		this.productService.searchProduct(this.appState.appState.keyword).subscribe({
			next: (data) => {
				this.appState.appState.products = data;
			},
		});
	}
}
