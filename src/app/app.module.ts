import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EnvironmentsComponent } from './components/environments/environments.component';
import { ConnectionsDialogComponent } from './components/toolbar/connections-dialog/connections-dialog.component';
import { FailedComponent } from './components/failed/failed.component';
import { MainToolbarComponent } from './components/toolbar/main-toolbar/main-toolbar.component';
import { MainSectionComponent } from './components/content/main-section/main-section.component';
import { FetchParentComponent } from './components/content/fetch-master/fetch-parent/fetch-parent.component';
import { ConnectionsComponent } from './components/toolbar/connections/connections.component';
import { MenuComponent } from './components/toolbar/menu/menu.component';
import { UserInfoComponent } from './components/toolbar/user-info/user-info.component';
import { RightSectionComponent } from './components/content/fetch-master/right-section/right-section.component';
import { LeftTopSectionComponent } from './components/content/fetch-master/left-top-section/left-top-section.component';
import { LeftBottomSectionComponent } from './components/content/fetch-master/left-bottom-section/left-bottom-section.component';


import { MsalRedirectComponent } from '@azure/msal-angular';
import { MsalConfigDynamicModule } from './msal-config-dynamic.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { AngularSplitModule } from 'angular-split';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnvironmentsComponent,
    FailedComponent,
    MainToolbarComponent,
    MainSectionComponent,
    FetchParentComponent,
    ConnectionsComponent,
    MenuComponent,
    UserInfoComponent,
    ConnectionsDialogComponent,
    RightSectionComponent,
    LeftBottomSectionComponent,
    LeftTopSectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    AngularSplitModule,
    MatTabsModule,
    MatIconModule,
    MsalConfigDynamicModule.forRoot('assets/configuration.json')
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }