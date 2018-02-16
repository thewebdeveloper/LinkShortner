import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';


Meteor.startup(() => {
  Meteor.publish('links', function(){
    return Links.find({});
  });
});

// executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
  const link = Links.findOne({ token: req.params.token });

  if(link) {
    // if link found, increment the clicks by 1, and redirect to long URL
    Links.update(link, { $inc: { clicks: 1 } });
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // send back to our normal React app
    next();
  }

}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
