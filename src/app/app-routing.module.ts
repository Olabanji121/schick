import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './admin/home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { PrintComponent } from './print/print.component';
import { DigitalsComponent } from './digitals/digitals.component';
import { SettingsComponent } from './settings/settings.component';
import { ScrapBooksComponent } from './scrap-books/scrap-books.component';

const redirectLoggedInToUser = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '', component: OnboardingComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToUser }
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'print', component: PrintComponent
  },
  { 
    path: 'profile', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { 
    path: 'downloads', component: DownloadsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { 
    path: 'admin', component: HomePageComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'digitals', component: DigitalsComponent
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'scrap', component: ScrapBooksComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToUser }
  },
  {
    path: 'pdf', component: PdfViewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
