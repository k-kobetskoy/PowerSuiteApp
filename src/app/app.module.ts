import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
import { EntityFormComponent } from './components/query-builder/control-panel/query-forms/entity-form/entity-form.component';
import { RootFormComponent } from './components/query-builder/control-panel/query-forms/root-form/root-form.component';
import { AttributeFormComponent } from './components/query-builder/control-panel/query-forms/attribute-form/attribute-form.component';
import { FilterFormComponent } from './components/query-builder/control-panel/query-forms/filter-form/filter-form.component';
import { FilterConditionFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/filter-condition-form.component';
import { NumberFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/number-form/number-form.component';
import { BooleanFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/boolean-form/boolean-form.component';
import { DateTimeFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/date-time-form/date-time-form.component';
import { IdFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/id-form/id-form.component';
import { PicklistFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/picklist-form/picklist-form.component';
import { StringFormComponent } from './components/query-builder/control-panel/query-forms/filter-condition-form/string-form/string-form.component';
import { LinkEntityFormComponent } from './components/query-builder/control-panel/query-forms/link-entity-form/link-entity-form.component';
import { OrderFormComponent } from './components/query-builder/control-panel/query-forms/order-form/order-form.component';
import { QueryTreeButtonBlockComponent } from './components/query-builder/query-tree-button-block/query-tree-button-block.component';

import { MsalRedirectComponent } from '@azure/msal-angular';
import { MsalConfigDynamicModule } from './msal-config-dynamic.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { AngularSplitModule } from 'angular-split';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { ACTIVE_ENVIRONMENT_URL, USER_IS_LOGGED_IN } from './models/tokens';
import { ResultTableComponent } from './components/query-builder/result-table/result-table.component';

@NgModule({ declarations: [
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
        EntityFormComponent,
        RootFormComponent,
        AttributeFormComponent,
        FilterFormComponent,
        FilterConditionFormComponent,
        NumberFormComponent,
        BooleanFormComponent,
        DateTimeFormComponent,
        IdFormComponent,
        PicklistFormComponent,
        StringFormComponent,
        LinkEntityFormComponent,
        OrderFormComponent,
        QueryTreeButtonBlockComponent,
        ResultTableComponent
    ],
    bootstrap: [AppComponent, MsalRedirectComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
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
        MatCheckboxModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTableModule,        
        MsalConfigDynamicModule.forRoot('assets/configuration.json')
        ], providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        { provide: ACTIVE_ENVIRONMENT_URL, useValue: new BehaviorSubject<string>('') },
        { provide: USER_IS_LOGGED_IN, useValue: new BehaviorSubject<boolean>(false) },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }