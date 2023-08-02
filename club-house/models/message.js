import { Model, ModelSchema } from "../../zghost/db/model.js";

const messageSchema = new ModelSchema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        createdAt: Date,
        author: {
            type: ModelSchema.Types.ObjectId,
            ref: 'User'
        }
    }
})

messageSchema.virtual('url').get(function(){
    return  `/club-house/post/${this._id}`
})
export const Message = new Model('Message', messageSchema)