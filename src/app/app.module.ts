import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionsDialogComponent } from './components/toolbar/connections/connections-dialog/connections-dialog.component';
import { MainToolbarComponent } from './components/toolbar/main-toolbar/main-toolbar.component';
import { QueryBuilder } from './components/query-builder/query-builder.component';
import { ConnectionsComponent } from './components/toolbar/connections/connections.component';
import { MenuComponent } from './components/toolbar/menu/menu.component';
import { UserInfoComponent } from './components/toolbar/user-info/user-info.component';
import { TreePanelComponent } from './components/query-builder/tree-panel/tree-panel.component';
import { ControlPanelComponent } from './components/query-builder/control-panel/control-panel.component';
import { CodeEditorComponent } from './components/query-builder/code-editor/code-editor.component';
import { CodeEditorFooterComponent } from './components/query-builder/code-editor-footer/code-editor-footer.component';
import { NodeStyleDirective } from './directives/node-style.directive';
import { QuickActionsComponent } from './components/query-builder/control-panel/query-forms/quick-actions/quick-actions.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QueryNodeTree } from './components/query-builder/models/query-node-tree';
import { EntityFormComponent } from './components/query-builder/control-panel/query-forms/entity-form/entity-form.component';

import { MsalRedirectComponent } from '@azure/msal-angular';
import { MsalConfigDynamicModule } from './msal-config-dynamic.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { AngularSplitModule } from 'angular-split';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import{ ReactiveFormsModule} from '@angular/forms';
import { RequestService } from './services/request/request.service';


@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    QueryBuilder,
    ConnectionsComponent,
    MenuComponent,
    UserInfoComponent,
    ConnectionsDialogComponent,
    ControlPanelComponent,
    TreePanelComponent,
    CodeEditorComponent,
    CodeEditorFooterComponent,
    NodeStyleDirective,
    QuickActionsComponent,
    ConnectionsComponent,
    LoadingIndicatorComponent,
    PageNotFoundComponent,
    EntityFormComponent,
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
    FormsModule,
    CdkTreeModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,    
    MsalConfigDynamicModule.forRoot('assets/configuration.json')
  ],
  providers: [QueryNodeTree],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }