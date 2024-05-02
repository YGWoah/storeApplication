import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	constructor(public appState: AppStateService) {}

	public checkedProducts() {
		return this.appState.appState.products.filter(
			(product: any) => product.checked
		).length;
	}
}
