import './singleTest.html';
import { Tests } from '../../api/Tests.js';

Template.singleTest.onCreated(function(){
  Meteor.subscribe('Tests');
  Session.set('qValue', undefined);
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
  },
  "click .questionOptionBtn": function(e,t){
    e.preventDefault();
    var qId = FlowRouter.getParam("questionId");
    console.log('qId = '+qId);
    Session.set(qId, $(e.currentTarget).data('value'));
    Session.set('qValue', $(e.currentTarget).data('value'));
  },
  "click #answerQuestionBtn": function(e,t){
    e.preventDefault();
    var qId = FlowRouter.getParam("questionId");
    var testId = FlowRouter.getParam("testId");
    var answered = Session.get(qId);
    var userTests = Meteor.user().profile.tests;
    var found = false;
    var testInUserProfile = {};
    var answeredValue = Session.get('qValue', undefined);
    console.log(answeredValue);
    var testIndex = undefined;
    for (var i = 0; i < userTests.length; i++) {
        if (userTests[i].id == testId) {
            found = true;
            testIndex = i;
            testInUserProfile = userTests[i];
            break;
        }
    }
    var answered = 0;
    if (found) {
      answered = testInUserProfile.answered;
      var temp = parseInt(answered) + 1;
      var temp2 = parseInt(userTests[testIndex].correct);
      var correctAns = testInUserProfile.correct;
      var cTest = Tests.findOne({_id: testId});
      console.log(cTest);
      var quests = cTest.questions;
      var questId = parseInt(qId) - 1;
      var cQuest = quests[questId];
      console.log('question is:');
      console.log(cQuest);
      var correctAns = cQuest.correct;
      console.log(correctAns);
      if (Session.get('qValue') == correctAns) {
        console.log('it is correct!');
        userTests[testIndex].correct = temp2 + 1;
        var correctIds = userTests[testIndex].correctIds;
        if (!correctIds) {
          correctIds = [];
        }
        correctIds.push(qId);
        userTests[testIndex].correctIds = correctIds;
      }
      userTests[testIndex].answered = temp;
      if (!userTests[testIndex].answeredQuestionIds) {
        userTests[testIndex].answeredQuestionIds = [];
      }
      userTests[testIndex].answeredQuestionIds.push(qId);
      var newProfile = Meteor.user().profile;
      newProfile.tests = userTests;
      Meteor.users.update(Meteor.userId(), {
        $set: {profile: newProfile}
      });
    }
  }
});

Template.singleTest.helpers({
  hasMoreQuestions: function(){
    var testId = FlowRouter.getParam("testId");
    var found = false;
    var userTests = Meteor.user().profile.tests;
    var testInUserProfile = undefined;
    for (var i = 0; i < userTests.length; i++) {
        if (userTests[i].id == testId) {
            found = true;
            testInUserProfile = userTests[i];
            break;
        }
    }
    return  (testInUserProfile.qCount !== testInUserProfile.answered);
  },
  isPageDisabled: function(){
    return '';
  },
  hasSelectedAnswer: function(){
    var qId = FlowRouter.getParam("questionId");
    var answered = Session.get(qId, undefined);
    if (answered) {
      return '';
    } else {
      return 'disabled';
    }
  },
  isAnswerDisabled: function(){
    var qId = FlowRouter.getParam("questionId");
    var testId = FlowRouter.getParam("testId");
    var userTests = Meteor.user().profile.tests;
    var testIndex = undefined;
    var testInUserProfile = undefined;
    var found = false;
    for (var i = 0; i < userTests.length; i++) {
        if (userTests[i].id == testId) {
            found = true;
            testIndex = i;
            testInUserProfile = userTests[i];
            break;
        }
    }
    var hasAnswered = false;
    if (testInUserProfile.answeredQuestionIds){
      for (var i = 0; i < testInUserProfile.answeredQuestionIds.length; i++){
        if (testInUserProfile.answeredQuestionIds[i] == qId) {
          hasAnswered = true;
          break;
        }
      }
    }
    return hasAnswered;
  },
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
