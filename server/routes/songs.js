const router = require('express').Router();

router.get('/getAll', (req, res)=>{
    return res.json("getting all songs");
})

module.exports = router;