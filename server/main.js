import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    var options = {
      username: 'admin',
      password: '1234',
      email: 'amanbayev@gmail.com',
      profile: {
        firstName: 'Admin',
        lastName: 'Super',
        company: 'KazInfoTech'
      }
    };
    var cUser = Accounts.createUser(options);
    Roles.addUsersToRoles(cUser, 'admin');
  }

  Meteor.publish("allUsers", function(){
    return Meteor.users.find();
  });

  Meteor.methods({
    checkUsername:function(username){
       var cFound = Accounts.findUserByUsername(username);
       if (cFound){
         return cFound;
       } else {
         return false;
       }
    },
    createUser2:function(uname, pw, profile) {
      var options = {
        username: uname,
        password: pw,
        profile: profile
      }
      var cUser = Accounts.createUser(options);
      Roles.addUsersToRoles(cUser, 'student');
      return cUser;
    }
  });
});
