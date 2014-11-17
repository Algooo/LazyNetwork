define(['app'], function (app) {
    var self = this;
    self.renderHome = function(req, res){
        res.render('application/home');
    }
    app.get('/partials/home', self.renderHome);
});