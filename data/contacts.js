const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    postedDate: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

class ContactOps {
    async createContact(formData) {
        try {
            const newContact = new Contact(formData);
            await newContact.save(); // Mongoose handles the insertion logic
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }
}

module.exports = new ContactOps();