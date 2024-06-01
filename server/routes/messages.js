var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Message = require("../models/message");

function returnError(res, error) {
  res.status(500).json({
    messages: "An error occurred",
    error: error
  });
}

router.get("/", (req, res, next) => {
  Message.find()
    .populate('sender')
    .then(messages => {
      res.status(200).json({
        message: "Messages fetched successfully",
        messages: messages
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const messages = new Message({
    id: maxMessageId,
    subject: req.body.name,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  messages
    .save()
    .then(createdMessage => {
      res.status(201).json({
        messages: "Message added successfully",
        messageId: createdMessage.id
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put("/:id", (req, res, next) => {
  Message.findOne({
      id: req.params.id
    })
    .then(messages => {
      console.log(req.body);
      messages.name = req.body.name;
      messages.description = req.body.description;
      messages.url = req.body.url;

      Message.updateOne({
          id: req.params.id
        }, messages)
        .then(result => {
          res.status(204).json({
            messages: "Message updated successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        messages: "Message not found.",
        error: {
          messages: "Message not found"
        }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({
      id: req.params.id
    })
    .then(messages => {
      Message.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            messages: "Message deleted successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;
