import { INodeProperty } from "../abstract/i-node-property";

export class NodePropertyCondition implements INodeProperty{
    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
