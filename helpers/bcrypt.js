const bcrypt = require('bcryptjs')

let hash = (password) => bcrypt.hashSync(password)
let compare = (password) => bcrypt.compareSync(pass, dbPass)

module.exports = {hash, compare}