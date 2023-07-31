import { ModelSchema, Model } from "../zghost/db/model.js";

const userSchema = new ModelSchema({
    fist_name: {
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