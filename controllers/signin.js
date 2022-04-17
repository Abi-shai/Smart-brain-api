const handleSignIn = (req, res, database, bcrypt) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json(`Enter valid registration`)
    } else {
        return database('users')

            // Checks and grabb the email in the database that === to the user email input from login table in the database
            .select('email', 'hash')
            .where('email', '=', email)
            .from('login')
                .then(data => {

                    // If user email exist, then check the password inserted
                    // Compare the password inserted by the user to the hash stored in the database
                    const isPasswordValid = bcrypt.compareSync(password, data[0].hash)

                    if(isPasswordValid){

                        // If the password inserted by the user match with the hash created by bcrypt
                        // Then return all the credentials of the correct matched user
                        return database
                            .select('*')
                                .from('users')
                                    .where('email', '=', email)
                                    .then(user => {
                                        res.json(user[0])
                                    })
                                    .catch(error => {
                                        res.status(400).json('Unable to get user')
                                    })
                    } else {
                        return res.status(400).json('Wrong credentials')
                    }
                })
                .catch(error => {
                    res.status(400).json('Enter valid credentials')
                })
    }
}

module.exports = {
    handleSignIn: handleSignIn
}