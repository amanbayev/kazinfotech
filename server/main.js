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
});
