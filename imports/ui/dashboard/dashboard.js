import './dashboard.html';

Template.dashboard.events({
  "click #logoutBtn": function(e, t){
    e.preventDefault();
    Meteor.logout();
    FlowRouter.go('/login');
  }
});
Template.dashboard.helpers({
  getUserNameFull: function(){
    if (Meteor.user()){
      return Meteor.user().profile.firstName;
    } else {
      return 'Гость';
    }
  }
});
