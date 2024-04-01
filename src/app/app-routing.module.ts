import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { EnvironmentsComponent } from './components/[deprecated] environments/environments.component';
import { FailedComponent } from './components/[deprecated] failed/failed.component';
import { EnvironmentComponent } from './components/[deprecated] environment/environment.component';
import { FetchParentComponent } from './components/main-view/fetch-master/fetch-parent/fetch-parent.component';

const routes: Routes = [
  { path: '', redirectTo: '/tools/fetch', pathMatch: 'full' },
  { path: 'tools/fetch', component: FetchParentComponent},
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