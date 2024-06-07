const express = require('express');
const ItemsController = require('../controllers/ItemsController');
const { isLoggedIn } = require('../lib/auth');
const router = express.Router();

router.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica"', (err, image) => {
      conn.query('SELECT * FROM images ', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
});


router.get('/create',isLoggedIn, ItemsController.create);
router.post('/create', isLoggedIn,ItemsController.store);

router.post('/delete/:id', isLoggedIn, ItemsController.destroy);
router.get('/update/:id',isLoggedIn, ItemsController.updateform);
router.post('/update/:id',isLoggedIn, ItemsController.update);


module.exports = router;