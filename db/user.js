const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');

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

User.signUp = function (email, password, name) {
    return hash(password, 8)
    .then(encrypted => {
        const user = new User({ email, name, password: encrypted });
        return user.save();
    });
};

User.signIn = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email khong ton tai.');
    const same = await compare(password, user.password);
    if (!same) throw new Error('Sai password.');
    return { email: user.email, name: user.name };
};
