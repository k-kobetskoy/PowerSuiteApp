export class NotImplementError extends Error {
    constructor(msg: string) {
        super(msg)

        Object.setPrototypeOf(this, NotImplementError.prototype)
    }
}