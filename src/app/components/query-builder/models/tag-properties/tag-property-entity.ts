import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyEntity implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ENTITY;

    entityName?: TagProperty<string> = new TagProperty<string>( TagPropertyNames.entityName );
    entityAlias?: TagProperty<string> = new TagProperty<string>( TagPropertyNames.entityAlias );

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
