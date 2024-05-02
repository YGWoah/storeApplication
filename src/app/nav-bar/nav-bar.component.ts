import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
	actions: Array<any> = [
		{ title: 'Home', route: '/home', icon: 'house' },
		{ title: 'Products', route: '/products', icon: 'list' },
		{ title: 'New Product', route: '/new-product', icon: 'file-plus' },
		{ title: 'Customers', route: '/customers', icon: 'people' },
	];

	setCurrentAction(action: any) {
		this.currentAction = action;
	}

	currentAction: any = this.actions[0];

	constructor(public appState: AppStateService) {}
}
