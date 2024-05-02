import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AppStateService {
	public appState: any = {
		products: [],
		keyword: '',
		currentPage: 1,
		totalPages: 0,
		pageSize: 5,
		totalProducts: 0,
		status: '',
		error: '',
		errorMessage: '',
	};

	setAppState(state: any) {
		this.appState = { ...this.appState, ...state };
	}
}
