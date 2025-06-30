import mongoose from "mongoose";
import bcrypt from "bcrypt";

const authSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true,"Name is required"],
    trim:true,
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    trim:true,
    unique:true,
    index:true
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[6,"Password must be at least 6 characters"],
    trim:true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  role:{
    type:String,
    enum:["customer","admin"],
    default:"customer"
  },
  refreshToken:{type:String}

},{
  timestamps:true
})



authSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
  } catch (error) {
    next(error);
  }
});

authSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password,this.password);
};

const User = mongoose.model("User", authSchema);

export default User;
