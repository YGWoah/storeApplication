import { NgModule } from '@angular/core';
import {
	BrowserModule,
	provideClientHydration,
} from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppErrorsComponent } from './app-errors/app-errors.component';
import { AppHttpInterceptor } from './app-http.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NewProductComponent,
		ProductsComponent,
		EditProductComponent,
		DashboardComponent,
		NavBarComponent,
		AppErrorsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [
		provideClientHydration(),

		{
			provide: HTTP_INTERCEPTORS,
			useClass: AppHttpInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
