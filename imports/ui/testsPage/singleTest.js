import './singleTest.html';
import { Tests } from '../../api/Tests.js';

Template.singleTest.onCreated(function(){
  Meteor.subscribe('Tests');
});

Template.singleTest.events({
  "click #nextQuestionBtn": function(e, t){
     e.preventDefault();
     var questionPos = FlowRouter.getParam("questionId");
     var testId = FlowRouter.getParam("testId");
     var position = FlowRouter.getParam("questionId");
     var cTest = Tests.findOne({_id: testId});
     var questionsSize = 0;
     if (cTest) {
       questionsSize = cTest.questions.length;
     }
     if (questionPos < questionsSize) {
       questionPos = parseInt(questionPos) + 1;
       FlowRouter.go('/tests/'+testId+'/'+questionPos);
     } else {
       toastr.warning('Вы на последнем вопросе теста','Вопросов больше нет');
     }
  },
  "click #prevQuestionBtn": function(e, t){
     e.preventDefault();
     var questionPos = FlowRouter.getParam("questionId");
     var testId = FlowRouter.getParam("testId");
     if (questionPos > 1) {
       questionPos = parseInt(questionPos) - 1;
       FlowRouter.go('/tests/'+testId+'/'+questionPos);
     } else {
       toastr.warning('Вы на первом вопросе теста','Начало теста');
     }
  }
});

Template.singleTest.helpers({
  getProgressValue: function(){
    var testId = FlowRouter.getParam("testId");
    var position = FlowRouter.getParam("questionId");
    var cTest = Tests.findOne({_id: testId});
    var questionsSize = 0;
    if (cTest) {
      questionsSize = cTest.questions.length;
    }
    var userTests = Meteor.user().profile.tests;
    var found = false;
    var testInUserProfile = {};
    for (var i = 0; i < userTests.length; i++) {
        if (userTests[i].id == testId) {
            found = true;
            testInUserProfile = userTests[i];
            break;
        }
    }
    var answered = 0;
    if (found) {
      answered = testInUserProfile.answered;
    }
    var valueNow = Math.round(answered / questionsSize * 100, 2);
    return valueNow;
  },
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
  },
  getQuestions: function(){
    var testId = FlowRouter.getParam("testId");
    var position = FlowRouter.getParam("questionId");
    var cTest = Tests.findOne({_id: testId});
    if (cTest) {
      return cTest.questions;
    }
  }
});
