
const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
   body:{
       type:String,
       required:true
   },
}, {
    timestamps: true
});

const Note = mongoose.model('Nonte',NoteSchema);

module.exports={
    Note,
    NoteSchema
}