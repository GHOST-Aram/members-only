import { ModelSchema, Model } from "../zghost/db/model.js";

const userSchema = new ModelSchema({
    first_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 200,
    },

    last_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 200,
    },

    email: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200,
    },

    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },

    password: {
        type: String,
        required: true
    },

    isMember: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export const User = new Model('User', userSchema)