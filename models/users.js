const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt =require('bcrypt');


const userSchema = new Schema({
	username:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true		
	},
})

	userSchema.statics.login = async function(username,password) {
		const user = await this.findOne({username})
		if (user) {
			const auth = await bcrypt.compare(password, user.password)
			if (auth) {
				return user
			}else{
				throw Error('Wrong password')
			}
		}else{
			throw Error('User doesnt exist')
		}
	}


userSchema.pre('save', async function(next){
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password,salt)
	next()
})

const User = mongoose.model('User', userSchema) 

module.exports = User;