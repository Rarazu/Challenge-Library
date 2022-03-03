const {body} = require("express-validator")

exports.validate = [
    // validasi password
    body(`password`)
    .isLength({ min: 8})
    .withMessage(`Password at least 8 characters`)
    .notEmpty()
    .withMessage(`Password must be filled`),

    // validasi username
    body(`username`).notEmpty()
    .withMessage(`Username must be filled`),

    // validasi nama
    body(`nama`).notEmpty()
    .withMessage(`Name of user must be filled`),

    // validasi kontak
    body(`kontak`).notEmpty()
    .withMessage(`Kontak of user must be filled`)
]