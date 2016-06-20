import './testsPage.html';
import { Tests } from '../../api/Tests.js';

Template.testsPage.onCreated(function(){
  Meteor.subscribe('Tests');
});

Template.testsPage.helpers({
  getTests: function(){
    return Tests.find({});
  },
  isCreatingTest: function(){
    return Session.get('isCreatingTest', false);
  }
});

Template.testsPage.events({
  "click #createTestBtn": function(e, t){
     e.preventDefault();
     Session.set('isCreatingTest', true);
  },
  "click #cancelCreateTestBtn": function(e,t) {
    e.preventDefault();
    Session.set('isCreatingTest', false);
  },
});
