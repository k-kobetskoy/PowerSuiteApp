import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { FetchParentComponent } from './components/main-view/fetch-master/fetch-parent/fetch-parent.component';

const routes: Routes = [
  { path: '', redirectTo: 'querybuilder', pathMatch: 'full' },
  { path: 'querybuilder', component: FetchParentComponent },  
  { path: '**', redirectTo: 'querybuilder', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }