const handleRegister = (req, res, database, bcrypt) => {
    
    const {email, name, password} = req.body
    // Hashing the user password
    const hash = bcrypt.hashSync(password)


    if(!email || !password){
        return res.status(400).json('Enter valid registration')
    } else {
        return database.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(logingEmail => {
                return trx('users')
                            .returning('*')
                            .insert({
                                email: logingEmail[0].email,
                                name: name,
                                joined: new Date()
                            })
                                .then(user => {
                                    
                                    res.json(user[0])
                
                                })
                                .catch(error => {
                                    res.status(400).json("An error occured")
                                })
                
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(error => {
            res.status(400).json("Unable to register")
        })
    }
}

module.exports = {
    handleRegister: handleRegister
}