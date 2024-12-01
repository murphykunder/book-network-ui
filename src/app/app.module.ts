import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { CheckmarkComponent } from './pages/common/checkmark/checkmark.component';
import { SuccessModalComponent } from './pages/common/success-modal/success-modal.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CheckmarkComponent,
    SuccessModalComponent,
    ActivateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,   // indicates the type of the provider
      useClass: HttpTokenInterceptor,  // mention the custom interceptor class created to inject the jwt token
      multi: true  // indicates there multiple other interceptors in the application along with the custom HttpTokenInterceptor class
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
