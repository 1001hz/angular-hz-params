 // server/routes.js


// setup ==========================================
var express = require('express');
var router = express.Router();
var done = false;

// error handling ==========================================
var domain = require('domain');
var d = domain.create();
d.on('error', function (err) {
    console.error(err);
});


/* Routes */

//log requested route
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

router.get('/', function (req, res) {
    d.run(function () {
        res.sendfile('./dev/index.html');
    });
});

 router.get('/dist/*', function (req, res) {
     d.run(function () {
         res.sendfile('./' + req.url);
     });
 });

router.get('/*', function (req, res) {
    d.run(function () {
        res.sendfile('./dev/' + req.url);
    });
});



module.exports.router = router;
