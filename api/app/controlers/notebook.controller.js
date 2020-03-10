const { Workspace } = require('../models/workspace.model');


//Each request must be excecuted as the logged in user!!

// Create new notebook
exports.createOne = async (req, res, next) => {
    try{
        const notebook=new Workspace(req.body);
        //Assign the new notebook to the logged in user
        notebook.user=req.user;
        res.status(201).json(await notebook.save());
    }catch(error){
        next(error);
    }
};

// Get a notebook
exports.getOne = async (req, res, next) => {
    try{
        console.log(req.user._id);
        res.status(200).json({notebook:await Workspace.findOne({_id:req.params.notebookId,"user._id":req.user._id})});
    }catch(error){
        next(error);
    }
};

// Get all notebooks
exports.getAll = async (req, res, next) => {
    try{
        const notebooks = await Workspace.find({"user._id":req.user._id});
        res.status(200).json(notebooks);
    }catch(error){
        next(error);
    }
};

// Update a notebook
exports.updateOne = async (req, res, next) => {
    try{
        const newData = req.body;
        res.status(200).json(await Workspace.findOneAndUpdate({_id:req.params.notebookId,"user._id":req.user._id},newData));
    }catch(error){
        next(error);
    }
};

// Delete a notebook
exports.deleteOne = async (req, res, next) => {
    try{
        res.status(204).json(await Workspace.remove({_id:req.params.notebookId,"user._id":req.user._id}));
    }catch(error){
        next(error);
    }
};