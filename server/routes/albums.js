const router = require('express').Router();
const album = require('../models/album.model');


//CREATE ALBUM----------------------------------------------------------------------
router.post('/save', async(req, res)=>{
    const newAlbum = album({
        name: req.body.name,
        imageURL: req.body.imageURL,
    });

    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({success: true, album: savedAlbum});
    } catch (error) {
        return res.status(400).send({success: false, msg: error});
    }
});
//----------------------------------------------------------------------------------





//READ ALL ALBUMS-------------------------------------------------------------------
router.get('/getAll', async(req, res)=>{

    const sortedAlbums = {
        sort: {createdAt: -1}
    }
    const data = await album.find(sortedAlbums);
    try {
        return res.status(200).send({success: true, results: data});
    } catch (error) {
        return res.status(400).send({success: false, msg: "No data found"});
    }
});
//----------------------------------------------------------------------------------





//READ ONE ALBUM--------------------------------------------------------------------
router.get('/getOne/:id', async(req, res)=>{
    const albumId = {_id: req.params.id};

    const data = await album.findOne(albumId);

    try {
        return res.status(200).send({success: true, result: data});
    } catch (error) {
        return res.status(400).send({success: false, msg: "No data found"});
    }
});
//----------------------------------------------------------------------------------






//UPDATE ALBUMS---------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const albumId = {_id: req.params.id};

    const updatedAlbum = {
        name: req.body.name,
        imageURL: req.body.imageURL,
    }
    const options = {
        upsert: true,
        new: true
    }

    try {
        const result = await album.findOneAndUpdate(albumId, updatedAlbum, options);
        return res.status(200).send({success: true, data: result});
    } catch (error) {
        return res.status(400).send({success: false, msg: error});
    }
});
//----------------------------------------------------------------------------------





//DELETE ALBUM----------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const albumId = {_id: req.params.id};

    const data = await album.findOneAndDelete(albumId);
    try{
        return res.status(200).send({success: true, album: data});
    }catch(error){
        return res.status(400).send({success: false, msg: "No data found"});
    }
})

module.exports = router;