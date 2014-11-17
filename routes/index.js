
/*
 * GET home page.
 */

define(['app', '../data/models/navigation'], function (app, navigationModel) {
    var self = this;

    ///////////
    // get "/"
    ///////////
    self.renderIndex = function(req, res){
        res.render('index', { title: 'Express' });
    };
    app.get('/', self.renderIndex);

    /////////////////////////
    // get "partials/navigation/load"
    /////////////////////////
    self.createNavigation = function(navigationModel){
        var navModel = new navigationModel({
            key: "mainNavigation",
            navbarCollapsed: true,
            navbarMenuItems: [{
                key: "home",
                name: "Home",
                link: "",
                active: false,
                icon: "fa fa-home",
                showChildItems: false,
                childMenuItems: [
                {
                    key: "subHome",
                    name: "SubHome",
                    link: "",
                    active: false,
                    icon: "",
                    showChildItems: false,
                    childMenuItems: [
                        {
                            key: "subSubHome",
                            name: "SubSubHome",
                            link: "/home",
                            active: false,
                            icon: "",
                            showChildItems: false,
                            childMenuItems: []
                        },
                        {
                            key: "subSubAbout",
                            name: "SubSubAbout",
                            link: "/About",
                            active: false,
                            icon: "",
                            showChildItems: false,
                            childMenuItems: []

                        }
                    ]
                },
                {
                    key: "subAbout",
                    name: "SubAbout",
                    link: "/About",
                    active: false,
                    icon: "",
                    showChildItems: false,
                    childMenuItems: []
                }
                ]
            },
                {
                    key: "contact",
                    name: "Contact",
                    link: "/contact",
                    active: false,
                    icon: "fa fa-envelope",
                    showChildItems: false,
                    childMenuItems: []
                }
            ]
        });
        navModel.save( function(err, navModel){
            if (err) {
                console.log('Error in navigationModel.create() ' + err);
                return {};
            }
            return navModel;
            // saved!
        });
        return navModel;
    };
    self.loadNavigation = function (req, res, next){
        //setTimeout(function () {
            navigationModel.find({key: "mainNavigation"}, function(err, navigationObjArr) {
                if (err) {
                    return next(err);
                }
                if (!navigationObjArr || navigationObjArr.length <= 0) {
                    return res.send(self.createNavigation(navigationModel));
                }
                if(navigationObjArr.length > 0){
                    return res.send(navigationObjArr[0]);
                }
                return res.send("");
            });
        //}, 1000);
    };
    app.get('/partials/navigation/load', self.loadNavigation);

    // default route
    app.use(function(req, res) {
        self.renderIndex(req, res);
    });
});

