import './testsPage.html';
import { Tests } from '../../api/Tests.js';

Template.testsPage.onCreated(function(){
  Meteor.subscribe('Tests');
});

Template.testsPage.helpers({
  returnStatus: function(testId){
    var cUser = Meteor.user();
    return Spacebars.SafeString('<span class="label label-warning">Не пройден</span>');
  },
  getTests: function(){
    return Tests.find({});
  },
  isCreatingTest: function(){
    return Session.get('isCreatingTest', false);
  }
});

Template.testsPage.events({
  "click #selectTestForReview": function(e,t){
    var testId = $(e.currentTarget).data('id');
    console.log(testId);
    var newTest = {};
    var cTest = Tests.findOne({_id: testId});
    if (cTest) {
      newTest.name = cTest.name;
      newTest.id = cTest._id;
      newTest.qCount = cTest.questions.length;
      newTest.answered = 0;
      newTest.correct = 0;
      var cUser = Meteor.user();
      if (cUser){
        var profile2 = cUser.profile;
        if (profile2.tests) {
          var found = false;
          for (var i = 0; i < profile2.tests.length; i++) {
              if (profile2.tests[i].id == newTest.id) {
                  found = true;
                  break;
              }
          }
          if (found) {

          } else {
            profile2.tests.push(newTest)
          }
        } else {
          profile2.tests = [];
          profile2.tests.push(newTest);
        }
        Meteor.users.update(Meteor.userId(), {
          $set: {profile: profile2}
        });
      }
    }
  },
  "click #createTestBtn": function(e, t){
     e.preventDefault();
     Session.set('isCreatingTest', true);
  },
  "click #cancelCreateTestBtn": function(e,t) {
    e.preventDefault();
    Session.set('isCreatingTest', false);
  },
});
