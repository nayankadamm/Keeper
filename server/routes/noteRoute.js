const express = require("express")
const router = express.Router();
const Note = require("../db/noteSchema");

//save the note
router.post('/', async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ msg: 'Please provide a title and description' });
    }
    try {
      const newNote = new Note({
        title,
        description,
      });
  
      const note = await newNote.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  //get all the notes
  router.get("/",async(req,res)=>{
    const notes =await Note.find();
    res.json(notes);
  })
  

  //delete the note
  router.delete('/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ message: 'Note deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  })

//edit the note
router.put('/edit/:id',async(req,res)=>{
  const {id} = req.params;
  const {title,description} = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      id,{title,description},
      {new:true});
      if(!note){
        return res.status(404).send({ message: 'Note not found' });
      }
      res.send(note);
    
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
})

  module.exports = router;