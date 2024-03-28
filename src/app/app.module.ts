import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EnvironmentsComponent } from './components/environments/environments.component';

import { HttpClientModule } from '@angular/common/http';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { MsalConfigDynamicModule } from './msal-config-dynamic.module';
import { FailedComponent } from './components/failed/failed.component';
import { MainToolbarComponent } from './components/toolbar/main-toolbar/main-toolbar.component';
import { MainSectionComponent } from './components/content/main-section/main-section.component';
import { FetchMasterComponent } from './components/content/fetch-master/fetch-master.component';
import { ConnectionsComponent } from './components/toolbar/connections/connections.component';
import { MenuComponent } from './components/toolbar/menu/menu.component';
import { UserInfoComponent } from './components/toolbar/user-info/user-info.component';
import {ButtonModule} from 'primeng/button';
import { ConnectionsDialogComponent } from './components/toolbar/connections-dialog/connections-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnvironmentsComponent,
    FailedComponent,
    MainToolbarComponent,
    MainSectionComponent,
    FetchMasterComponent,
    ConnectionsComponent,
    MenuComponent,
    UserInfoComponent,
    ConnectionsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MsalConfigDynamicModule.forRoot('assets/configuration.json')
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }





// import { BrowserModule } from '@angular/platform-browser';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { NgModule } from '@angular/core';

// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatListModule } from '@angular/material/list';
// import { MatMenuModule } from '@angular/material/menu';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile.component';

// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
// import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
// import { FailedComponent } from './failed/failed.component';
// import { environment } from 'src/environments/environment';

// export function loggerCallback(logLevel: LogLevel, message: string) {
//   console.log(message);
// }

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: environment.msalConfig.auth.clientId,
//       authority: environment.msalConfig.auth.authority,
//       redirectUri: '/',
//       postLogoutRedirectUri: '/'
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage
//     },
//     system: {
//       allowNativeBroker: false, // Disables WAM Broker
//       loggerOptions: {
//         loggerCallback,
//         logLevel: LogLevel.Info,
//         piiLoggingEnabled: false
//       }
//     }
//   });
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set(environment.apiConfig.uri, environment.apiConfig.scopes);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap
//   };
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: [...environment.apiConfig.scopes]
//     },
//     loginFailedRoute: '/login-failed'
//   };
// }

// @NgModule({
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     ProfileComponent,
//     FailedComponent,
//     ProfileComponent,
//     FailedComponent
//   ],
//   imports: [
//     BrowserModule,
//     NoopAnimationsModule, // Animations cause delay which interfere with E2E tests
//     AppRoutingModule,
//     MatButtonModule,
//     MatToolbarModule,
//     MatListModule,
//     MatMenuModule,
//     HttpClientModule,
//     MsalModule
//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: MsalInterceptor,
//       multi: true
//     },
//     {
//       provide: MSAL_INSTANCE,
//       useFactory: MSALInstanceFactory
//     },
//     {
//       provide: MSAL_GUARD_CONFIG,
//       useFactory: MSALGuardConfigFactory
//     },
//     {
//       provide: MSAL_INTERCEPTOR_CONFIG,
//       useFactory: MSALInterceptorConfigFactory
//     },
//     MsalService,
//     MsalGuard,
//     MsalBroadcastService
//   ],
//   bootstrap: [AppComponent, MsalRedirectComponent]
// })
// export class AppModule { }