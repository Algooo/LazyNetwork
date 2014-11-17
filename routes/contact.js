define(['app'], function (app) {
    var self = this;
    self.renderContact = function(req, res){
        res.render('application/contact');
    }
    app.get('/partials/contact', self.renderContact);
});
