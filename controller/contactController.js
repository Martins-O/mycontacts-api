const asyncHandler = require( 'express-async-handler');
const Contact = require( '../model/contactModel')

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is: ' + req.body);
    const {name, email, phone} = req.body;
    if (!name ||!email || !phone){
        res.status(404);
        throw new Error('All fields are mandatory!');
    }
    const contact = Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json({ message: 'Create contacts' }, contact);
});

const getContactById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get contacts for ${req.params.id}` });
});
const deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    await contact.deleteOne({_id: req.params.id });
    res.status(200).json(contact);
});

const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    if (contact.user_id.toString() !== req.user.user_id){
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json({ message: `Update contacts for ${req.params.id}` }, updatedContact);
});

module.exports = {
    getContacts,
    createContact,
    getContactById,
    deleteContactById,
    updateContactById
};