import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-edit-product',
	templateUrl: './edit-product.component.html',
	styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
	public formGroup!: FormGroup;
	productId: number = 0;

	public product!: Product;
	constructor(
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.productId = this.activatedRoute.snapshot.params['id'];
		this.productService.getProductById(this.productId).subscribe((product) => {
			this.product = product;
			this.formGroup = this.formBuilder.group({
				name: this.formBuilder.control(this.product.name, [Validators.required]),
				price: this.formBuilder.control(this.product.price, [
					Validators.min(0),
					Validators.required,
					Validators.max(100000),
				]),
				checked: this.formBuilder.control(this.product.checked),
			});
		});
	}

	public updateProduct() {
		this.product = { ...this.formGroup.value, id: this.productId } as Product;
		this.productService.updateProduct(this.product).subscribe({
			next: (product) => {
				alert('Product updated' + JSON.stringify(product));
			},
			error: (error) => {
				console.error(error);
			},
		});
	}
}
