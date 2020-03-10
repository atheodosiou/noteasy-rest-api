const express = require('express');
const router = express.Router();

const notebookController = require('../controlers/notebook.controller');

// Create a new Note
router.post('/notebooks', notebookController.createOne);
router.get('/notebooks/:notebookId', notebookController.getOne);
router.get('/notebooks', notebookController.getAll);
router.put('/notebooks/:notebookId', notebookController.updateOne);
router.delete('/notebooks/:notebookId', notebookController.deleteOne);

module.exports=router;