import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators'; // Import finalize operator
import { AppStateService } from './services/app-state.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
	constructor(private appState: AppStateService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler) {
		this.appState.appState.status = 'LOADING...';

		console.log('Request is sent to server');

		return next.handle(request).pipe(
			finalize(() => {
				this.appState.appState.status = 'LOADED';
			})
		);
	}
}
