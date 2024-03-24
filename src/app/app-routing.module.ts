import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { EnvironmentsComponent } from './components/environments/environments.component';
import { HomeComponent } from './components/home/home.component';
import { FailedComponent } from './components/failed/failed.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { FetchMasterComponent } from './components/content/fetch-master/fetch-master.component';

const routes: Routes = [
  { path: '', redirectTo: '/tools/fetch', pathMatch: 'full' },
  { path: 'tools/fetch', component: FetchMasterComponent},
  { path: 'environmens', component: EnvironmentsComponent, canActivate: [MsalGuard] },
  { path: 'environmens/:environment', component: EnvironmentComponent, canActivate: [MsalGuard] },
  { path: 'login-failed', component: FailedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }