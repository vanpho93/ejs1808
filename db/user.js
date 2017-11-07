const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
const { createToken } = require('../libs/jwt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
        type: String,
        unique: true, 
        trim: true,
        required: true,
        minlength: 4
    },
    name: { 
        type: String,
        required: true,
        minlength: 4
    },
    password: { 
        type: String, 
        required: true,
        minlength: 4
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
    expiredAt: { type: Date }
});

const User = mongoose.model('User', UserSchema);

User.signUp = function (email, password, name, phone) {
    return hash(password, 8)
    .then(encrypted => {
        const expiredAt = new Date(Date.now() + (7000 * 86400));
        const user = new User({ email, name, password: encrypted, phone, expiredAt });
        return user.save();
    });
};

User.signIn = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email khong ton tai.');
    const same = await compare(password, user.password);
    if (!same) throw new Error('Sai password.');
    const token = await createToken({ email: user.email, name: user.name });
    delete user.password;
    return { expiredAt: user.expiredAt, email, name: user.name, phone: user.phone, token };
};


module.exports = User;
/*
    Back-end
    Test User sign up
    Sign in return user and token
*/
