import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import generateRandomInt from '../../utils/generateRandomInt';
import { AppStateService } from '../services/app-state.service';
@Component({
	selector: 'app-new-product',
	templateUrl: './new-product.component.html',
	styleUrl: './new-product.component.css',
})
export class NewProductComponent {
	public formGroup!: FormGroup;
	public product: Product = {
		id: generateRandomInt(),
		name: '',
		price: 0,
		checked: false,
	};

	constructor(
		private formBuilder: FormBuilder,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			name: this.formBuilder.control(''),
			price: this.formBuilder.control(0),
			checked: this.formBuilder.control(false),
		});
	}

	public saveProduct() {
		this.product = { ...this.formGroup.value, id: Math.random() * 10630303 };
		this.productService.saveProduct(this.product).subscribe((product) => {
			alert('Product saved');
			console.log('Product saved:', product);
		});
	}

	public resetForm() {
		this.formGroup.reset();
	}
}
