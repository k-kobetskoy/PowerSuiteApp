import { Type } from "@angular/core";
import { IQueryFormComponent } from "../abstract/i-query-form-component";
import { EntityFormComponent } from "../../control-panel/query-forms/entity-form/entity-form.component";
import { QueryNodeType } from "./query-node-type";

export const QueryFormsMap: Record<QueryNodeType, Type<IQueryFormComponent>>  ={
    entity: EntityFormComponent,
    root: EntityFormComponent,
    attribute: EntityFormComponent,
    filter: EntityFormComponent,
    condition: EntityFormComponent,
    value: EntityFormComponent,
    link: EntityFormComponent,
    order: EntityFormComponent
}
