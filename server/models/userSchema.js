import Mongoose from 'mongoose'

const userSchema = Mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        ocupation: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        }
    })

const User = Mongoose.model('User', userSchema)

export default User