// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const cors = require("cors");

// server.use(middlewares);
// server.use(jsonServer.bodyParser);
// server.use(cors());

// // Endpoint to get user data by ID
// server.get('/users/:id/data', (req, res) => {
//   const userId = req.params.id;
//   const user = router.db.get('users').find({ id: userId }).value();

//   if (user) {
//     res.json(user.data);
//   } else {
//     res.sendStatus(404);
//   }
// });

// // Endpoint to add data to user
// server.post('/users/:id/data', (req, res) => {
//   const userId = req.params.id;
//   const user = router.db.get('users').find({ id: userId }).value();

//   if (user) {
//     user.data.push(req.body);
//     router.db.get('users').find({ id: userId }).assign(user).write();
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(404);
//   }
// });

// server.use(router);
// server.listen(3000, () => {
//   console.log('JSON Server is running');
// });


const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require("cors");

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cors());

// Endpoint to get user data by ID
server.get('/users/:id/data', (req, res) => {
  const userId = req.params.id;
  const user = router.db.get('users').find({ id: userId }).value();

  if (user) {
    res.json(user.data);
  } else {
    res.sendStatus(404);
  }
});

// Endpoint to add data to user
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

// Endpoint to update a transaction
server.put('/users/:userId/data/:transactionId', (req, res) => {
  const { userId, transactionId } = req.params;
  const newData = req.body;

  const user = router.db.get('users').find({ id: userId }).value();

  if (user) {
    const transaction = user.data.find(t => t.transactionID === transactionId);

    if (transaction) {
      Object.assign(transaction, newData);
      router.db.get('users').find({ id: userId }).assign(user).write();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

// Endpoint to delete a transaction
server.delete('/users/:userId/data/:transactionId', (req, res) => {
  const { userId, transactionId } = req.params;

  const user = router.db.get('users').find({ id: userId }).value();

  if (user) {
    const transactionIndex = user.data.findIndex(t => t.transactionID === transactionId);

    if (transactionIndex !== -1) {
      user.data.splice(transactionIndex, 1);
      router.db.get('users').find({ id: userId }).assign(user).write();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
