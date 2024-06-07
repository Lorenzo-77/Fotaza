
function index2(req, res) {
  const id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query(`SELECT images.*, users.name AS user_name, users.lastname AS user_lastname , users.email AS user_email FROM images JOIN users ON images.user_id = users.user_id 
    WHERE images.img_id = ?`,[id], (err, image) => {
      conn.query('SELECT comments.*, users.name, users.lastname FROM comments JOIN users ON comments.user_id = users.user_id WHERE comments.image_id = ?',[id], (err, comment) => {
        conn.query('SELECT AVG(rating) AS averageRating FROM ratings WHERE image_id = ?',[id], (err, ratings) => {
          const averageRating = ratings[0] ? parseFloat(ratings[0].averageRating).toFixed(1) : null;
        res.render('galeria/producto', { image, comment, averageRating });
      });
    });
  });
});
}


function agregarComentario(req, res) { 
  const image_id = req.params.id;
  const {description} = req.body;
  const id = req.user.user_id;
  const data = {
    image_id,
    user_id: id,
    description,
    comment_date: new Date(),
  };

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO comments SET ?', [data], (err, rows) => {
      res.redirect('/producto/' + image_id);
    });
  });
  
}

function agregarValoracion(req, res) {
  const image_id = req.params.id;
  const user_id = req.user.user_id;
  const rating = req.body.rating;

  // Verificar si el usuario ya ha valorado esta imagen
  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    conn.query(
      'SELECT * FROM ratings WHERE image_id = ? AND user_id = ?',
      [image_id, user_id],
      (err, existingRating) => {
        if (err) {
          console.error('Error al buscar valoración existente:', err);
          return res.status(500).send('Error interno del servidor');
        }
        if (existingRating.length > 0) {
          // El usuario ya ha valorado esta imagen, puedes manejar esto como desees
          
          return res.redirect(`/producto/${image_id}?alert=1`); // falta un cartel para mostrar
        }

        // El usuario no ha valorado esta imagen, puedes continuar con la lógica de almacenamiento
        const data = {
          image_id,
          user_id,
          rating,
          rating_date: new Date(),
        };

        conn.query('INSERT INTO ratings SET ?', [data], (err, result) => {
          if (err) {
            console.error('Error al insertar valoración en la base de datos:', err);
            return res.status(500).send('Error interno del servidor');
          }

          // Resto de tu lógica después de la inserción, como calcular el promedio, etc.
          res.redirect(`/producto/${image_id}`);
        });
      }
    );
  });
}


function profileUser(req, res) {
  const id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE user_id = ?', [id], (err, use) => {
      conn.query('SELECT * FROM images WHERE  user_id = ?', [id], (err, image) => {
        if (err) {
          res.json(err);
        }
        res.render('galeria/profileUser', { use, image });
      });
    });
  });
 

}


module.exports = {
  index2: index2,
  agregarComentario:agregarComentario,
  agregarValoracion:agregarValoracion,
  profileUser:profileUser,

}