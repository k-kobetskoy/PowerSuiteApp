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
import { AttributeEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/attribute-editor/attribute-editor.component';
import { ConditionEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/condition-editor/condition-editor.component';
import { EntityEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/entity-editor/entity-editor.component';
import { FilterEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/filter-editor/filter-editor.component';
import { LinkedEntityEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/linked-entity-editor/linked-entity-editor.component';
import { OrderEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/order-editor/order-editor.component';
import { RootEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/root-editor/root-editor.component';
import { ValueEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/value-editor/value-editor.component';
import { DefaultEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/default-editor/default-editor.component';

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
import { NodeStyleDirective } from './directives/node-style.directive';
import { BaseNodeEditorComponent } from './components/main-view/fetch-master/left-panel/control-panel/base-node-editor/base-node-editor.component';


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
    AttributeEditorComponent,
    ConditionEditorComponent,
    EntityEditorComponent,
    FilterEditorComponent,
    LinkedEntityEditorComponent,
    OrderEditorComponent,
    RootEditorComponent,
    ValueEditorComponent,
    DefaultEditorComponent,
    NodeStyleDirective,
    BaseNodeEditorComponent,
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