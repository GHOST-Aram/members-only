import mongoose from "mongoose";

export class ModelSchema extends mongoose.Schema{}
export class Model{
    constructor(identifier, modelSchema){
        return mongoose.model(identifier, modelSchema)
    }
}

