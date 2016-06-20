import './singleTest.html';
import { Tests } from '../../api/Tests.js';

Template.singleTest.onCreated(function(){
  Meteor.subscribe('Tests');
});

Template.singleTest.helpers({
  answers: function(){
    var testId = FlowRouter.getParam("testId");
    var position = FlowRouter.getParam("questionId");
    var cTest = Tests.findOne({_id: testId});
    if (cTest) {
      var questions = cTest.questions;
      return questions[position-1].answers;
    }
  },
  getTestId: function(){
    var testId = FlowRouter.getParam("testId");
    return testId;
  },
  testName: function(){
    var testId = FlowRouter.getParam("testId");
    Session.set('testId',testId);
    var cTest = Tests.findOne({_id: testId});
    if (cTest) {
      return cTest.name;
    }
  },
  isQuestionActive: function(quesId){
    var questionId = FlowRouter.getParam("questionId");
    if (quesId == questionId) {
      return 'active';
    } else {
      return '';
    }
  },
  getQuestion: function(){
    var testId = FlowRouter.getParam("testId");
    var position = FlowRouter.getParam("questionId");
    var cTest = Tests.findOne({_id: testId});
    if (cTest) {
      var questions = cTest.questions;
      return questions[position-1].question;
    }
  }
});
