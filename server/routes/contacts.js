var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Contact = require("../models/contact");

function returnError(res, error) {
  res.status(500).json({
    contacts: "An error occurred",
    error: error
  });
}

router.get("/", (req, res, next) => {  
  Contact.find()
  .populate("group")
    .then(contacts => {
      res.status(200).json({
        message: "Contacts fetched successfully",
        contacts: contacts
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("contacts");

  const contacts = new Contact({
    id: maxMessageId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
  });

  contacts
    .save()
    .then(createdMessage => {
      res.status(201).json({
        contacts: "Contact added successfully",
        messageId: createdMessage.id
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contacts => {
      console.log(req.body);
      contacts.name = req.body.name;
      contacts.description = req.body.description;
      contacts.url = req.body.url;

      Contact.updateOne({ id: req.params.id }, contacts)
        .then(result => {
          res.status(204).json({
            contacts: "Contact updated successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        contacts: "Contact not found.",
        error: { contacts: "Contact not found" }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contacts => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ contacts: "Contact deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});


router.get("/:id", (req, res, next) => {
  Contact.findOne()
    .then(contact => {
      res.status(200).json({
        message: "Contacts featched successfully ",
        contact: contact
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});


module.exports = router;