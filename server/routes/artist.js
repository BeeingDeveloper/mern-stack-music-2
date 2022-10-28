const router = require('express').Router();
const artist = require('../models/artist.model');


//SAVE ARTIST INFORMATION-------------------------------------------------------------
router.post('/save', async(req, res)=>{
    const newArtist = artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    });

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({success : true, artist: savedArtist});
    } catch (error) {
        return res.status(400).send({success: false, msg: error});
    }

});
// -----------------------------------------------------------------------------------





//GET ALL ARTIST----------------------------------------------------------------------
router.get("/getOne/:id", async(req, res)=>{
    const findArtist = {_id: req.params.id};

    const data = await artist.findOne(findArtist);
    if(data){
        return res.status(200).send({success : true, artist: data});
    }else{
        return res.status(400).send({success: false, msg: "No data found"});
    }
});
// ------------------------------------------------------------------------------------





//GET ALL ARTISTS----------------------------------------------------------------------
router.get("/getAll", async(req, res)=>{
    const sortedData = {
        sort: {createdAt: -1}
    }
    const data = await artist.find(sortedData);

    if(data){
        return res.status(200).send({success : true, result: data});
    }else{
        return res.status(400).send({success: false, msg: "No data found"});
    }
});
// ------------------------------------------------------------------------------------






//UPDATE ARTIST------------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const artistId = {_id: req.params.id};

    const options = {
        upsert: true,
        new: true
    }
    const updatedArtist = {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    }

    try {
        const result = await artist.findOneAndUpdate(artistId, updatedArtist, options);
        return res.status(200).send({success: true, data: result});
    } catch (error) {
        return res.status(400).send({success: false, msg: error});
    }

})
// ------------------------------------------------------------------------------------







//DELETE ARTIST------------------------------------------------------------------------
router.delete("/delete/:id", async(req, res)=>{
    const delteArtist = {_id: req.params.id};

    const data = await artist.deleteOne(delteArtist);
    if(data){
        return res.status(200).send({success : true, artist: data});
    }else{
        return res.status(400).send({success: false, msg: "No data found"});
    }
});
// ------------------------------------------------------------------------------------


module.exports = router;