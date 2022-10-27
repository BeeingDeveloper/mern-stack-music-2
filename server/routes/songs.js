const router = require('express').Router();
const song = require('../models/song.model');



//CREATE NEW SONG---------------------------------------------------------------------
router.post('/save', async(req, res)=>{
    const newSong = song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category
    });

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({success: true, song: savedSong}); 
    } catch (error) {
        return res.status(400).send({success: false, msg: "Internal server error"})
    }
});
// ----------------------------------------------------------------------------------





//READ ALL SONGS----------------------------------------------------------------------
router.get('/getAll', async(req, res)=>{

    const data = await song.find();

    try {
        return res.status(200).send({success: true, result: data});
    } catch (error) {
        return res.status(400).send({success: false, msg: "No songs found"});
    }
});
// ----------------------------------------------------------------------------------






//READ SINGLE SONG-------------------------------------------------------------------
router.get('/getOne/:id', async(req, res)=>{
    const songId = {_id: req.params.id};

    const data = await song.findOne(songId);
    try {
        return res.status(200).send({success: true, result: data});
    } catch (error) {
        return res.status(400).send({success: false, msg: "No song found"});
    }
});
// ----------------------------------------------------------------------------------






//UPDATE SONG------------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const songId = {_id: req.params.id};

    const options = {
        upsert: true,
        new: true
    }

    const updatedSong = {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category
    };

    try {
        const result = await song.findByIdAndUpdate(songId, updatedSong, options);
        return res.status(200).send({success: true, data: result});
    } catch (error) {
        return res.status(400).send({success: false, msg: "Internal server error"});
    }
});
// ----------------------------------------------------------------------------------






//DELETE SONG------------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const songId = {_id: req.params.id};

    const deletedSong = await song.findByIdAndDelete(songId);
    if(deletedSong){
        return res.status(200).send({success: true, data: deletedSong});
    }
    else{
        return res.status(400).send({success: false, msg: "Internal server error"});
    }
})

module.exports = router;