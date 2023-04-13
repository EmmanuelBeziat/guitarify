import bcrypt from 'bcrypt'

export const passwordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const passwordCompare = (plain, hash) => bcrypt.compareSync(plain, hash)
