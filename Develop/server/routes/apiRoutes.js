const express = require('express');
const router = express.Router();

  // GET route to obtain note data
router.get('/api/notes', async (req, res) => {
    const notes = await getDb();
    res.json(notes);
  });
  
  // PUT route to update the note value in indexDB
  router.put('/api/notes', async (req, res) => {
    const content = req.body;
    const result = await putDb(content);
    res.json(result);
  });
  
  module.exports = router;