"use strict";

//create a model where all the data of projects is stored with reference to user and college
var _require = require('@hapi/joi'),
    bool = _require.bool,
    object = _require.object;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
  PName: {
    type: String,
    required: true
  },
  Desc: {
    type: String,
    required: true
  },
  Tags: [{
    type: String
  }],
  Rating: {
    type: Number,
    defalut: 0
  },
  PType: {
    type: String,
    required: true,
    "enum": ["Software", "Hardware"]
  },
  isChecked: {
    type: Boolean,
    defalut: false
  },
  uniqueRate: {
    type: Number
  },
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  SubjectId: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    "default": null
  },
  isPrivete: {
    type: Boolean,
    "default": true
  },
  Date: {
    type: Date,
    "default": Date.now
  },
  ProjectLink: [{
    type: String
  }],
  DownloadProjectLink: [{
    type: String
  }]
});
module.exports = mongoose.model("Project", ProjectSchema);