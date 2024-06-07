function buscarTitulo(req, res) {
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
      return;
    }
    const aux = req.query.id;
    const searchTerm = '%' + aux + '%';
    
    conn.query('SELECT * FROM images WHERE title LIKE ? OR label1 LIKE ? OR label2 LIKE ? OR label3 LIKE ?', [searchTerm, searchTerm, searchTerm, searchTerm], (err, image) => {
      if (err) {
        res.json(err);
        return;
      }

      res.render('galeria/index', { image });
    });
  });
}
/* buscador Por Categorias */

function nombreCategori1(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND category = "Naturaleza" ', (err, image) => {
      conn.query('SELECT * FROM images WHERE category = "Naturaleza"', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}

function nombreCategori2(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND category = "Arte y Cultura" ', (err, image) => {
      conn.query('SELECT * FROM images WHERE category = "Arte y Cultura"', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}

function nombreCategori3(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND category = "Viajes y Aventuras" ', (err, image) => {
      conn.query('SELECT * FROM images WHERE category = "Viajes y Aventuras" ', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}

function nombreCategori4(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND category = "Comida y Bebida" ', (err, image) => {
      conn.query('SELECT * FROM images WHERE category = "Comida y Bebida" ', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}

function nombreCategori5(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND category = "Gente y Retratos" ', (err, image) => {
      conn.query('SELECT * FROM images WHERE category = "Gente y Retratos"', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}

function nombreCategori6(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND category = "Tecnología y Ciencia" ', (err, image) => {
      conn.query('SELECT * FROM images WHERE category = "Tecnología y Ciencia"', (err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}

/* buscador Por tag */
function nombreTag(req, res) {
  const tag = req.params.tag;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE state = "Publica" AND (label1 = ? OR label2 = ? OR label3 = ?)',[tag,tag,tag],  (err, image) => {
      conn.query('SELECT * FROM images WHERE label1 = ? OR label2 = ? OR label3 = ?',[tag,tag,tag],(err, image1) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/index', { image, image1 });
      });
    });
  });
}


module.exports = {
  buscarTitulo : buscarTitulo,
  nombreCategori1: nombreCategori1,
  nombreCategori2: nombreCategori2,
  nombreCategori3: nombreCategori3,
  nombreCategori4: nombreCategori4,
  nombreCategori5: nombreCategori5,
  nombreCategori6: nombreCategori6,

  nombreTag: nombreTag,


}