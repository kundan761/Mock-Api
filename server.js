const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users/:id/data', (req, res) => {
  const userId = req.params.id;
  const user = router.db.get('users').find({ id: userId }).value();

  if (user) {
    user.data.push(req.body);
    router.db.get('users').find({ id: userId }).assign(user).write();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

