import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomePageComponent } from './admin/home-page/home-page.component';
import { TopNavComponent } from './admin/top-nav/top-nav.component';
import { UploadComponent } from './admin/upload/upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotifyComponent } from './notify/notify.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { ExpansionComponent } from "./modal/expansion/expansion.component";

import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { OnboardingComponent } from './onboarding/onboarding.component';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { PdfViewerModule } from "ng2-pdf-viewer";
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PrintComponent } from './print/print.component';
import { DigitalsComponent } from './digitals/digitals.component';
import { ScrapBooksComponent } from './scrap-books/scrap-books.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopNavComponent,
    UploadComponent,
    DashboardComponent,
    DownloadsComponent,
    HomeComponent,
    LoginComponent,
    NotifyComponent,
    SignUpComponent,
    ExpansionComponent,
    UserNavComponent,
    OnboardingComponent,
    NavBarComponent,
    PdfViewComponent,
    SideNavComponent,
    PrintComponent,
    DigitalsComponent,
    ScrapBooksComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    PdfViewerModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [SplashScreen, StatusBar, PayPal],
  bootstrap: [AppComponent]
})
export class AppModule { }
