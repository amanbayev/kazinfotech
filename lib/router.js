FlowRouter.route('/', {
  action: function(){
    BlazeLayout.render('login');
  }
});

FlowRouter.route('/login', {
  action: function(){
    BlazeLayout.render('login');
  }
})

FlowRouter.route('/dashboard', {
  action: function(){
    BlazeLayout.render('dashboard', {content: 'users'});
  }
});

FlowRouter.route('/users', {
  action: function(){
    BlazeLayout.render('dashboard', {content: 'users'});
  }
});

FlowRouter.route('/api', {
  action: function(){
    BlazeLayout.render('dashboard', {content: 'api'});
  }
});

FlowRouter.route('/tests', {
  action: function(){
    BlazeLayout.render('dashboard', {content: 'tests'});
  }
});
