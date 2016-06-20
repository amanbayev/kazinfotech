FlowRouter.route('/', {
  action: function(){
    BlazeLayout.render('login');
  }
});

FlowRouter.route('/login', {
  action: function(){
    BlazeLayout.render('login');
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
    BlazeLayout.render('dashboard', {content: 'testsPage'});
  }
});

FlowRouter.route('/tests/:testId/:questionId', {
  action: function(params, queryParams){
    BlazeLayout.render('dashboard', {content: 'singleTest'});
  }
});
