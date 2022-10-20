const mongoose = require('mongoose');
const validatior = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validatior.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validatior: (value) =>
                validatior.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Password {VALUE} is not strong enough."
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validatior: function(value) {
                return value === this.password;
            },
            message: "Passwords don't match!",
        },
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
    },
    firstName: {
        type: String,
        required: [true, "Please enter a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },



}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("Users", userSchema);