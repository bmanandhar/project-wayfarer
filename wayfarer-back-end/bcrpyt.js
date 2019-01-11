const bcrypt = require('bcrypt')

let SALT_FACTOR = 10,
    password = "password123"

bcrypt.hash(password,SALT_FACTOR,(err,hash)=>{
  if (err) { console.log(err) }
  else { console.log(password) ; console.log(hash) }
})
