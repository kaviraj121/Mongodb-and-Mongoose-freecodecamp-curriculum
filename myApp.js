require('dotenv').config();

// Install and Setup Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create A PersonModel
var Schema = mongoose.Schema;

var personSchema = new Schema({
  name : { type : String, require : true },
  age : Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

 let freecodecamp = function(done){
   return new Person ({
     name : "freecodecamp",
     age : 22,
     favoriteFoods : ["Pizza", "Sushi"]
   });
   if(error) return done(error);
   done(null, result);
 };

 // Create and Save Record of a model
 function createAndSavePerson(done){
   let anotherFreecodecamp = new Person ({
     name : "anotherFreecodecamp",
     age : 25,
     favoriteFoods : ["Butter Chicken", "Paneer"]
   });


   anotherFreecodecamp.save(function(err, data){
     if(err) return console.error(err);
     done(null, data)
   });
};

// Create Many Records with model.create()
var createManyPeople = function(arrayOfPeople, done){
  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.log(err);
    done(null,people);
  });
};

// Use model.find() to Search Your Database

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, peopleFound) =>{
    if(err) return console.log(err);
    done(null,peopleFound);
  } )
  
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, (err,individualFoodLover)=>{
    if(err) return console.log(err);
    done(null,individualFoodLover);
  })
  
};
// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,individual){
    if(err) return console.log(err);
    done(null,individual);
  });
  
};
// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person){
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data)=> {
      if(err) return console.log(err);
      done(null, data);
    })
  });

  
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name : personName}, {age : 20}, {new : true}, (err, foundPerson)=>{
    if(err) return console.log(err);
    done(null, foundPerson);
  });
};
// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personToRemove)=>{
    if(err) return console.log(err);
     done(null, personToRemove);
  })
 
};
//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = {name:"Mary"};
  Person.remove(nameToRemove, (err, removalInfo)=>{
    if(err) return console.log(err);
    done(null, removalInfo);
  })

  
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:'asc'}).limit(2).select('-age')
  .exec(function(err, searchResult){
    console.log(searchResult);
    done(null, searchResult);
  });
  
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
