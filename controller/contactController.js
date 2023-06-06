const asyncHandler = require( 'express-async-handler');

const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get all contacts' });
});

const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is: ' + req.body);
    const {name, email, phone} = req.body;
    if (!name ||!email || !phone){
        res.status(404);
        throw new Error('All fields are mandatory!');
    }
    res.status(201).json({ message: 'Create contacts' });
});

const getContactById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get contacts for ${req.params.id}` });
});
const deleteContactById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
});

const updateContactById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contacts for ${req.params.id}` });
});

module.exports = {
    getContacts,
    createContact,
    getContactById,
    deleteContactById,
    updateContactById
};