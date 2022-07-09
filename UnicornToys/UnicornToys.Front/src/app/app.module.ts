
// Angular
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 3rd libs
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';

// Config
import { DefaultToastrConfig } from './config/toastr.config';
import { createTranslateLoader } from './config/createTranslateLoader';

// App
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

var components = [
  AppComponent
]

@NgModule({
  declarations: [
    components,
  ],
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    ToastrModule.forRoot(DefaultToastrConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
