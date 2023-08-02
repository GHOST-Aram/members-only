import { Model, ModelSchema } from "../zghost/db/model.js";

const codeSchema = new ModelSchema({
    code: String,
    createdAt: {
        type: Date,
        default: new Date().getTime()
    }
})

export const Code = new Model('Code', codeSchema)