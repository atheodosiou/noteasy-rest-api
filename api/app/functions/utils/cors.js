exports.handleCORS = (req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    
    if(req.method==='OPTIONS'){
        res.status.header('Access-Control-Allow-Methods','PUT,POST, PUTCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
};