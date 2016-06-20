import { Mongo } from 'meteor/mongo';

export const Tests = new Mongo.Collection('Tests');

Tests.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Tests.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});

if (Meteor.isServer) {
  Meteor.publish('Tests', function TestsPublication() {
    return Tests.find({});
  });

  Meteor.methods({
    "addTests": function (TestsJSON) {
      Tests.createdAt = new Date();
      Tests.createdBy = Meteor.userId();
      var cTests = Tests.insert(TestsJSON);
      return cTests;
    }
  });
}
