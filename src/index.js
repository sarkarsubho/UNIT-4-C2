const express=require("express");
const mongoose=require("mongoose");

const app=express();

const connect=()=>{mongoose.connect(
    "mongodb+srv://subho:subho0905@cluster0.dyutf.mongodb.net/mongocon?retryWrites=true&w=majority"
)};

app.use(express.json());


// User Schima

const userSchema=new mongoose.Schema(
    {
        firstName :{type:String,required:true},
        middleName :{type:String,required:false},
        lastName:{type:String,required:true},
        age :{type:Number,required:true},
        email :{type:String,required:true},
        address :{type:String,required:true},
        gender :{type:String,required:false,default:"Female"},
        type:{type:String,required:false,default:"customer"},

    },
    {
        versionKey:false,
        timestamps:true
    }
);

const users=mongoose.model("user",userSchema);

//BranchDetailSchema

const BranchDetailSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        MICR:{type:Number,required:false},

    },
    {
        versionKey:false,
        timestamps:true
    }
);
const BranchDetails= mongoose.model("BranchDetail",BranchDetailSchema);

//Master Account
const MasterAccountSchima=new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
        Account_detail:{type:mongoose.Schema.Types.ObjectId,ref:"BranchDetail"},
        balance:{type:Number,required:true},

    },
    {
        versionKey:false,
        timestamps:true
    }
);

const MasterAccounts=mongoose.model("MasterAccount",MasterAccountSchima);

//SavingsAccount

const SavingsAccountSchema =new mongoose.Schema(
    {
        account_number :{type:String,required:true,unique:true},
        balance :{type:Number,required:true},
        interestRate:{type:String,required:true},
    },
    {
        versionKey:false,
        timestamps:true
    }
);

const SavingsAccounts=mongoose.model("SavingsAccount",SavingsAccountSchema);

// Fixed Account 

const FixedAccountSchema =new mongoose.Schema(

    {
        account_number:{type:String,required:true,unique:true},
        balance :{type:Number,required:true},
        interestRate:{type:String,required:true},
        startDate :{type:String,required:true},
        maturityDate :{type:String,required:true},

    },
    {
        versionKey:false,
        timestamps:true
    }
);

const FixedAccounts=mongoose.model("FixedAccount",FixedAccountSchema);

app.get("/MasterAccount",async(req,res)=>{
    try{
    const MasterAccounts=await MasterAccount.find().populate("userId").lean().exec();

    return res.status(200).send(MasterAccounts);
    }catch(err){
        res.send(err);
    }

});







app.listen(5000,async()=>{
    try{
        await connect();
    console.log ("Listning on Port 5000");
    }catch(err){
        console.log(err,"something went wrong please try again leter")
    }


    
})