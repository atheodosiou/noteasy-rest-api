const mongoose = require('mongoose');
const {NoteSchema} = require('./note.model');
const {UserSchema} = require('./user.model');

const WorkspaceSchema = mongoose.Schema({
    user:{
        type:UserSchema,
        required:true,
    },
    description: {
        type:String,
        required:true,
        unique:true
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