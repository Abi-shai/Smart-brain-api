const handleProfile = (req, res, database) => {
    const { id } = req.params

    return database.select('*')
        .where({id})
        .from('users')

            // Checks if the input id, as a req.params is available in the users database
            .then(user => {
                if(user.length) {
                    res.json(user[0])
                } else {
                    res.status(404).json("No user found")
                }
            })
            .catch(error => {
                res.status(404).json(error)
            })
}

module.exports = {
    handleProfile: handleProfile
}