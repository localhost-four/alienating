var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Document = require("../models/document");

function returnError(res, error) {
  res.status(500).json({
    documents: "An error occurred",
    error: error
  });
}

router.get("/", (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
        message: "Documents fetched successfully",
        documents: documents
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post("/", (req, res, next) => {
  const maxDocumenetId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumenetId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document
    .save()
    .then(createdMessage => {
      res.status(201).json({
        document: createdMessage,
        message: "Document added successfully"
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(documents => {
      console.log(req.body);
      documents.name = req.body.name;
      documents.description = req.body.description;
      documents.url = req.body.url;

      Document.updateOne({ id: req.params.id }, documents)
        .then(result => {
          res.status(204).json({
            documents: "Document updated successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        documents: "Document not found.",
        error: { documents: "Document not found" }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(documents => {
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ documents: "Document deleted successfully" });
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