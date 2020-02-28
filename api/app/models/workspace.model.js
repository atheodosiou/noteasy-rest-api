const mongoose = require('mongoose');
const {NoteSchema} = require('./note.model');

const WorkspaceSchema = mongoose.Schema({
    description: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            console.log('I should add email validation here!!!',value)
        }
    },
    notes:{
        type:[NoteSchema]
    }
}, {
    timestamps: true
});

const Workspace = mongoose.model('Workspace',WorkspaceSchema);

module.exports={
    Workspace,
    WorkspaceSchema
}