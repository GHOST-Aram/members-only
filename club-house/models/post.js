import { Model, ModelSchema } from "../../zghost/db/model.js";

const postSchema = new ModelSchema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        createdAt: Date,
    },
    author: {
        type: ModelSchema.Types.ObjectId,
        ref: 'User'
    }
})

postSchema.virtual('url').get(function(){
    return  `/club-house/post/${this._id}`
})
export const Post = new Model('Message', postSchema)