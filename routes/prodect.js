const express = require("express");
const { Prodect } = require("../models/prodect");
const { Category } = require("../models/category");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

const rouret = express.Router();

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invaled Data type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = FILE_TYPE_MAP[file.mimetype];
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});

const upload = multer({ storage: storage });

rouret.get("/", async (req, res) => {
  const prodectList = await Prodect.find();
  // const prodectList = await Prodect.find().select("countIstock name");
  res.status(200).send(prodectList);
});

rouret.get("/getCount", async (req, res) => {
  const prodectList = await Prodect.countDocuments();
  res.status(200).send(prodectList);
});

rouret.get("/isfeatcher/:limt", async (req, res) => {
  const limt = req.params.limt ? req.params.limt : 0;
  const prodectList = await Prodect.find({ isFeatured: true }).limit(+limt);
  res.status(200).send(prodectList);
});

rouret.get("/:id", async (req, res) => {
  const prodectList = await Prodect.findById(req.params.id).populate(
    "Category",
  );
  res.status(200).send(prodectList);
});

rouret.post("/prodect", upload.single("image"), async (req, res) => {
  const cat = await Category.findById(req.body.category);

  const file = req.file

    if (!file) {
      res.status(400).json({ status: false, message: " no image add" });
    }

  if (!cat) {
    res.status(400).json({ status: false, message: " invaled category" });
  }

  const basePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  let pro = new Prodect({ ...req.body, image: basePath });
  pro = await pro.save();
  if (!pro) {
    res.status(400).json({ status: false });
  }
  res.status(200).json(pro);
});

rouret.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({
      sussecc: false,
      error: "no date add ",
    });
  }

  const ubdatecat = await Prodect.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!ubdatecat) {
    return res.status(404).json({
      sussecc: false,
      error: "no date add ",
    });
  }

  res.status(200).json({ status: true, data: ubdatecat });
});

module.exports = rouret;
