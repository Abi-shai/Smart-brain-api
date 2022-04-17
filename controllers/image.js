const Clarifai = require('clarifai')

/** Clarifai api config */
const app = new Clarifai.App({
    apiKey: '5b13487abef14b698fb0e37a305edeb1'
})

const handleApiCall = (req, res) => {
    // Setting up the Clarifai Api for the face detection
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input
        )
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json("Unable to work with the Clarifai api")
        })
}


const handleImage = (req, res, database) => {
    const { id } = req.body

    /**
     * Takes the id of the user logged in / signed in
     * Increment the number of entries at each route in the entrie point
     * Returns the lastest & updated entries of the user 
    */

    return database('users')
        .where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
            .then(entries => {

                //Returning the raw integer value of the number of entries
                res.json(entries[0].entries)
            })
            .catch(error => {
                res.status(400).json(error)
            })
}


module.exports = {
    handleImage: handleImage,
    handleApiCall
}