var Hapi = require('hapi');
var server = new Hapi.Server('localhost', 3000);

server.route({
  method: 'GET',
  path: '/users',
  config: {
    handler: function (request, reply) {
      var result = {};
      setTimeout(function () {
        result.users = [{
          first: 'Abraham',
          last: 'Lincoln'
        }, {
          first: 'Andrew',
          last: 'Johnson'
        }, {
          first: 'Ulysses',
          last: 'Grant'
        }];
        result.time = Date.now();

        return reply(result).header('X-Special-Header', 'MEAN Stack');
      }, 3000);
    }
  }
});

var plug = {
  register: function (plugin, options, next) {
    plugin.route({
      method: 'GET',
      path: options.prefix + '/view',
      config: {
        handler: function (request, reply) {
          request.server.inject({
            url: '/users'
          }, function (res) {
            var users = res.result.users;
            var view = '<!DOCTYPE html><html lang="en"><body><h1>User Output</h1><table>';

            for (var i = 0; i < users.length; i++) {
              var user = users[i];
              view += '<tr><td>' + user.first + '</td><td>' + user.last + '</td></tr>';
            }

            view += '</table></body></html>';
            reply(view);
          });
        }
      }
    });

    next();
  }
};
plug.register.attributes = {
  name: 'viewer',
  version: '1.0.0'
};

server.pack.register({
  plugin: plug,
  options: {
    prefix: '/users'
  }
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    server.start();
  }
});
