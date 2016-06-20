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
  "click #editUserBtn": function(e,t){
    e.preventDefault();
    var id = $(event.target).data('id');
    toastr.warning('Вы пытались изменить элемент '+id+'. В целях экономии времени не реализовано','Изменение пользователя');
  },
  "click #removeUserBtn": function(e,t){
    e.preventDefault();
    var id = $(event.target).data('id');
    toastr.error('Вы пытались удалить элемент '+id+'. В целях экономии времени не реализовано','Удаление пользователя');
  },
  "click #addUserBtn": function(e, t){
     e.preventDefault();
     Session.set('isCreatingUser', true);
  },
  "click #cancelCreateUserBtn": function(e,t){
    e.preventDefault();
    Session.set('isCreatingUser', false);
    $('#nameField').val('');
    $('#usernameField').val('');
    $('#lastnameField').val('');
    $('#passwordField').val('');
  },
  "click #saveUserBtn": function(e,t){
    e.preventDefault();
    var profile = {};
    profile.firstName = t.find('#nameField').value;
    profile.lastName = t.find('#lastnameField').value;
    var username = t.find('#usernameField').value;
    var password = t.find('#passwordField').value;
    Meteor.call("checkUsername", username, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log(result);
      } else {
        Meteor.call("createUser2", username, password, profile, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
             console.log(result);
             toastr.success('Пользователь '+profile.firstName+' '+profile.lastName+' успешно добавлен!','Пользователь добавлен');
             $('#nameField').val('');
             $('#usernameField').val('');
             $('#lastnameField').val('');
             $('#passwordField').val('');
          }
        });
      }
    });
  }
});
