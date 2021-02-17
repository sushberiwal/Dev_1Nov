function checkAuth(req , res){
    if(req.user){
        // user is logged in
        res.json({
            isAuth: true ,
            user : req.user
        })
    }else{
        res.json({
            isAuth:false
        })
    }   
}

function googleAuth(req , res){
    res.send("<h1>GOOGLE CONSENT FORM !!</h1>")
}

function callbackAuth(req , res){
    res.redirect("http://localhost:3001/");
}

module.exports.checkAuth = checkAuth;
module.exports.googleAuth = googleAuth;
module.exports.callbackAuth = callbackAuth;