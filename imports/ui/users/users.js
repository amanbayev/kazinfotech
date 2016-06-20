import './users.html';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';

Template.users.onCreated(function(){
  Meteor.subscribe("allUsers");
});

Template.users.helpers({
  isCreatingUser: function(){
    return Session.get('isCreatingUser', false);
  },
  getUsers: function(){
    return Meteor.users.find({});
  },
  addOne: function(n) {
    return n+1;
  }
});

Template.users.events({
  "click #addUserBtn": function(e, t){
     e.preventDefault();
     Session.set('isCreatingUser', true);
  },
  "click #cancelCreateUserBtn": function(e,t){
    e.preventDefault();
    Session.set('isCreatingUser', false);
  },
  "click #saveUserBtn": function(e,t){
    e.preventDefault();
    var profile = {};
    profile.firstName = t.find('#nameField').value;
    profile.lastName = t.find('#nameField').value;
    var username = t.find('#usernameField').value;
    var password = t.find('#passwordField').value;
    Meteor.call("checkUsername", username, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        if (result){
          console.log(result);
        } else {
          console.log('nothing found');
        }
      }
    });
  }
});
