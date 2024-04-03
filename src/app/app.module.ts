import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/[deprecated] home/home.component';
import { EnvironmentsComponent } from './components/[deprecated] environments/environments.component';
import { ConnectionsDialogComponent } from './components/toolbar/connections-dialog/connections-dialog.component';
import { FailedComponent } from './components/[deprecated] failed/failed.component';
import { MainToolbarComponent } from './components/toolbar/main-toolbar/main-toolbar.component';
import { ViewContainerComponent } from './components/main-view/view-container/view-container.component';
import { FetchParentComponent } from './components/main-view/fetch-master/fetch-parent/fetch-parent.component';
import { ConnectionsComponent } from './components/toolbar/connections/connections.component';
import { MenuComponent } from './components/toolbar/menu/menu.component';
import { UserInfoComponent } from './components/toolbar/user-info/user-info.component';
import { TreePanelComponent } from './components/main-view/fetch-master/left-panel/tree-panel/tree-panel.component';
import { ControlPanelComponent } from './components/main-view/fetch-master/left-panel/control-panel/control-panel.component';
import { CodeEditorComponent } from './components/main-view/fetch-master/right-panel/code-editor/code-editor.component';
import { CodeEditorFooterComponent } from './components/main-view/fetch-master/right-panel/code-editor-footer/code-editor-footer.component';

import { MsalRedirectComponent } from '@azure/msal-angular';
import { MsalConfigDynamicModule } from './msal-config-dynamic.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { AngularSplitModule } from 'angular-split';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TreeModule } from '@ali-hm/angular-tree-component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnvironmentsComponent,
    FailedComponent,
    MainToolbarComponent,
    ViewContainerComponent,
    FetchParentComponent,
    ConnectionsComponent,
    MenuComponent,
    UserInfoComponent,
    ConnectionsDialogComponent,
    ControlPanelComponent,
    TreePanelComponent,
    CodeEditorComponent,
    CodeEditorFooterComponent,

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
    TreeModule,
    FormsModule,
    CdkTreeModule,
    MsalConfigDynamicModule.forRoot('assets/configuration.json')
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }