var Story = require('../models/story');

exports.getStories = function(req, res, next){

   Story.find(function(err, stories) {

       if (err){
           res.send(err);
       }

       res.json(stories);

   });

}

exports.getApprovedStories = function(req, res, next){
    console.log("Starting Approved Retrieval");
    var companyid = req.params.company_id;
    console.log("CompanyID:" + companyid);

       Story.find({$or:[{companyid: company_id},{companyid:'5ab7dbc0bc24e3001440543c'}],approved:'true'},function(err, stories) {
    
           if (err){
               res.send(err);
           }
    
           res.json(stories);
    
       });
    
    }

    exports.getUnapprovedStories = function(req, res, next){
        console.log("Starting unaproved Retrieval");
        var companyid = req.params.company_id;
        console.log("CompanyID:" + companyid);
           Story.find({$or:[{companyid: companyid},{companyid:'5ab7dbc0bc24e3001440543c'}],approved:'false'}, function(err, stories) {
        
               if (err){
                   res.send(err);
               }
        
               res.json(stories);
        
           });
        
        }

exports.createStory = function(req, res, next){

    var companyid = "";

    if(req.body.companyid == null){
        companyid = "5ab7dbc0bc24e3001440543c";
    }else{
        companyid = req.body.companyid;
    }

   Story.create({
       storytitle : req.body.storytitle,
       story : req.body.story,
       themeid : req.body.themeid,
       imagepath : req.body.imagepath,
       storyauthor: req.body.storyauthor,
       publisheddate: req.body.publisheddate,
       likes : req.body.likes,
       type :req.body.type,
       approved: false,
       companyid:companyid
      

   }, function(err, story) {

       if (err){
           res.send(err);
       }

       Story.find(function(err, stories) {

           if (err){
               res.send(err);
           }

           res.json(stories);

       });

   });

}

exports.updateStory = function(req, res, next){
   
    console.log(req);
      var storytitle = req.body.story.storytitle;
      var companyid = "";
      
        if(req.body.story.companyid == null){
            companyid = "5ab7dbc0bc24e3001440543c";
        }else{
            companyid = req.body.story.companyid;
        }
     
        console.log("Updating Story:" + storytitle);

      if(!storytitle){
          return res.status(422).send({error: 'You must enter an storytitle'});
      }
   
      
      Story.findOne({storytitle: storytitle}, function(err, existingStory){
          
          if(err){
              return next(err);
          }
   
          if(!existingStory){
              return res.status(422).send({error: 'Cannot find your story.'});
          }
          console.log("Found story and updating");
          //add company id check here....
          existingStory.storytitle = req.body.story.storytitle;
          existingStory.story = req.body.story.story;
          existingStory.themeid = req.body.story.themeid;
          existingStory.imagepath = req.body.story.imagepath;
          existingStory.storyauthor = req.body.story.storyauthor;
          existingStory.publiseddate = req.body.story.publisheddate;
          existingStory.likes = req.body.story.likes;
          existingStory.type = req.body.story.type;
          existingStory.approved = req.body.story.approved;
          existingStory.companyid = companyid;
          
          
   
          existingStory.save(function(err, story){
   
              if(err){
                  return next(err);
              }
   
              //var userInfo = setUserInfo(user);
   
              res.status(201).json({
                  story: existingStory
              })
   
          });
   
      });
   
  }

exports.deleteStory = function(req, res, next){

   Story.remove({
       _id : req.params.story_id
   }, function(err, story) {
       res.json(story);
   });

}