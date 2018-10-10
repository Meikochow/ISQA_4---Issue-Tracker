/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect      = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId    = require('mongodb').ObjectID;
// const mongoose  = require('mongoose');
const shortid   = require('shortid');

const CONNECTION_STRING = process.env.DB;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
  .get(function(req,res){
  let project  = req.params.project;
  let toLookUp = req.query;
  if (toLookUp._id) {toLookUp._id = new ObjectId(toLookUp._id)};
  if (toLookUp.open) {toLookUp.open = String(toLookUp.open) == "true" }
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        var collection = db.collection(project);
         collection.find(toLookUp).toArray(function(err,docs){res.json(docs)});
      });
  })
  
    //   .get(function (req, res){
    //   var project = req.params.project;
    //   var searchQuery = req.query;
    //   if (searchQuery._id) { searchQuery._id = new ObjectId(searchQuery._id)}
    //   if (searchQuery.open) { searchQuery.open = String(searchQuery.open) == "true" }
    //   MongoClient.connect(CONNECTION_STRING, function(err, db) {
    //     var collection = db.collection(project);
    //     collection.find(searchQuery).toArray(function(err,docs){res.json(docs)});
    //   });
    // })

    .post(function (req, res){
      var project = req.params.project;
    
      let tempId1 = shortid.generate();
      let tempId2 = shortid.generate();
      let tempId  =tempId1+tempId2; 
      let data = {
      _id          :tempId,
      issue_title  :req.body.issue_title,
      issue_text   :req.body.issue_text,
      created_on   :new Date(),
      updated_on   :new Date(),
      created_by   :req.body.created_by,
      assigned_to  :req.body.assigned_to,
      open         :true,
      status_text  :req.body.status_text
    };
      if(!data.issue_title||!data.issue_text||!data.created_by){
        res.send("missing inputs");
      }else{
      MongoClient.connect(CONNECTION_STRING,(err,db)=>{
      let collection = db.collection(project);
      collection.insertOne(data,(err,docs)=>{
        res.json(data);
      })
      })
      }
    })
    
  .put(function(req,res){
    let project = req.params.project;
    let idToLookUp = req.body._id;   
    delete req.body._id;
    let newData = req.body;
    for(let inputs in newData){
    if(!newData[inputs]){
    delete newData[inputs];
    }
    }
    if (newData.open) {newData.open = String(newData.open) == "true" }
    if(Object.keys(newData).length==0){
    res.send('no updated field sent');
    }else{
    //newData.open = newDataOpen;
    newData.updated_on = new Date();
    MongoClient.connect(CONNECTION_STRING,(err,db)=>{
    let collection = db.collection(project);
    collection.findAndModify({_id:idToLookUp},[['_id',1]],{$set:newData},{new:true},(err,doc)=>{
    if(err){res.send("could not update " + idToLookUp);
           }else{
            res.send("succesfully updated");
           }
    })
    })
    }
  })
  
  .delete(function(req,res){
  let project = req.params.project;
  let idToLookUp = req.body._id;
    if(!idToLookUp){
      res.send("_id error");
    }else{
    MongoClient.connect(CONNECTION_STRING,(err,db)=>{
    let collection = db.collection(project);
    collection.findAndRemove({_id:idToLookUp},(err,doc)=>{
    if(err){res.send("could not remove "+idToLookUp);
    }else{
       res.send("removed "+idToLookUp);
         }
                                                         })
                                                     })
         }
  }) 
};
