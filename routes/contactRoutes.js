const express = require('express');
const router = express.Router();
const {
    getContacts,
    createContact,
    getContactById,
    deleteContactById,
    updateContactById
} = require('../controller/contactController')

router.route('/').post(createContact).get(getContacts);
router.route('/:id').put(updateContactById).get(getContactById).delete(deleteContactById);


module.exports = router;