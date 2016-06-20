import './login.html';

Template.login.events({
  "submit": function(e, t){
     e.preventDefault();
     var login = t.find('#loginField').value;
     var pass = t.find('#passwordField').value;
    //  console.log(login, pass);
     Meteor.loginWithPassword(login, pass, function(err){
       if (err) {
         toastr.error('Неверные данные для авторизации','Ошибка');
         $('#loginPanel').addClass('animated shake')
         $('#loginPanel').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
           $('#loginPanel').removeClass('shake');
           $('#loginField').val('');
           $('#passwordField').val('');
           $('#loginField').focus();
         });
       } else {
         toastr.success('Добро пожаловать, '+Meteor.user().profile.firstName+'!');
         FlowRouter.go('/tests');
       }
     });
  }
});
