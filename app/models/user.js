var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 
var UserSchema = new mongoose.Schema({
 
    forename:{
        type:String,
        lowercase:true,
        unique:false,
        required:true
    },
    surname:{
        type:String,
        lowercase:true,
        unique:false,
        required:true
    },
    displayname:{
        type:String,
        lowercase:true,
        unique:false,
        required:false
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Employee','BusinessAdmin','QCFAdmin'],
        default: 'Employee'
    },
    isfirstlogin: {
        type:String,
        default: 'true'
    },
    resetpasswordtoken: String,
    resetpasswordexpires:Date,
    companyid:{
        type:String,
        required:true,
        unique:false
    },
    department:{
        type:String,
        required:false,
        unique:false
    },
    imagepath:{
        type:String,
        required:false
    }
 
}, {
    timestamps: true
});
 
UserSchema.pre('save', function(next){
 
    var user = this;
    var SALT_FACTOR = 5;
 
    if(!user.isModified('password')){
        return next();
    }
 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
 
        bcrypt.hash(user.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
 
            user.password = hash;
            next();
 
        });
 
    });
 
});
 
UserSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}
 
module.exports = mongoose.model('User', UserSchema);