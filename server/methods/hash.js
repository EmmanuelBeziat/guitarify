import bcrypt from 'bcrypt'

/**
 * encrypt a password with hash and salt
 * @param { String } password the password to be encrypted
 * @returns hashed and salted password
 */
export const passwordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

/**
 * Compare clear password against hashed stored
 * @param { String } plain clear password to be tested
 * @param { String } hash hashed password to be tested against
 * @returns true if match
 */
export const passwordCompare = (plain, hash) => bcrypt.compareSync(plain, hash)
