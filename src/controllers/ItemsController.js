const sharp = require('sharp');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
});

const upload = multer({ 
  storage: storage,
  dest: path.join(__dirname , '../public/uploads') 
}).fields([{ name: 'image', maxCount: 1 }, { name: 'watermark_config', maxCount: 1 }]);

function create(req, res) {
  res.render('tasks/create'); //{marca,categoria}
}

function agregarMarcaDeAguaRepetida(archivoImagen, archivoMarcaAgua, destino) {
  sharp(archivoMarcaAgua)
    .resize(158, 158) 
    .png({ alphaQuality: 90 }) 
    .toBuffer()
    .then(resizedWatermarkBuffer => {
      sharp(archivoImagen)
        .composite([
          {
            input: resizedWatermarkBuffer, 
            tile: true, 
            blend: 'overlay', 
          }
        ])
        .toFile(destino, (err, info) => {
          if (err) {
            console.error('Error al agregar la marca de agua:', err);
          } else {
            console.log('Marca de agua agregada con éxito');
          }
        });
    })
    .catch(err => {
      console.error('Error al procesar la marca de agua:', err);
    });
}

function obtenerInformacionDeImagen(rutaImagen) {
  return sharp(rutaImagen).metadata();
}
const watermarkDefaultPath = path.join(__dirname, '..', 'public', 'img', 'agua.png');

function store(req, res) {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Error de Multer al cargar la imagen
      res.status(500).json(err);
    } else if (err) {
      // Otro tipo de error
      res.status(500).json(err);
    } else {
      const { title, rights, state, category, label1, label2, label3 } = req.body;
      const image_url = req.files['image'][0].originalname; // Cambio aquí
      console.log(rights);

     const stateValue = state || 'Privada';

     let rutaMarcaAgua;
     let watermark_config;
     if (rights === 'Copyright' && req.files['watermark_config'] && req.files['watermark_config'][0]) {
       watermark_config = req.files['watermark_config'][0].originalname;
       rutaMarcaAgua = req.files['watermark_config'][0].path;
     } else {
       rutaMarcaAgua = watermarkDefaultPath;
     }
     
      // Procesar los checkbox seleccionados
      const rutaImagenOriginal = req.files['image'][0].path;// Cambio aquí
      //const rutaMarcaAgua = path.join(__dirname, '..', 'public', 'img', 'agua.png'); // Utiliza image_url como el nombre de la marca de agua
      const nombreMarcaAgua = path.basename(image_url); // Extrae el nombre del archivo de image_url
      const nombreArchivoConMarcaAgua = `MarcaAgua-${nombreMarcaAgua}`; // Nombre del archivo de salida
      const rutaConMarcaAgua = path.join(__dirname,'..', 'public', 'uploads', nombreArchivoConMarcaAgua);
      const watermark_type = nombreArchivoConMarcaAgua;

      obtenerInformacionDeImagen(rutaImagenOriginal)
      .then(infoImagen => {
        const formatoImagen = infoImagen.format; // Formato de la imagen
        const resolucionImagen = `${infoImagen.width}x${infoImagen.height}`;
        console.log(resolucionImagen);

      agregarMarcaDeAguaRepetida(rutaImagenOriginal, rutaMarcaAgua, rutaConMarcaAgua);


        const data = {
          title,
          rights,
          category,
          image_url, 
          creation_date: new Date(),
          state: stateValue,
          format: formatoImagen,
          resolution: resolucionImagen,
          watermark_type,
          watermark_config,
          label1,
          label2,
          label3,
          user_id: req.user.user_id,
        };

        req.getConnection((err, conn) => {
          conn.query('INSERT INTO images SET ?', [data], (err, rows) => {
            if (err) {
              console.error('Error al insertar la imagen en la base de datos:', err);
              res.status(500).json(err);
            } else {
              const user_id = req.user.user_id;
              console.log(user_id);
              conn.query('SELECT img_id FROM images WHERE user_id = ? ORDER BY img_id DESC LIMIT 1', [user_id], (err, id) => {
                if (err) {
                  console.error('Error al obtener el ID de la imagen:', err);
                  res.status(500).json(err);
                } else {
                  const img_id = id[0].img_id;
                  res.redirect(`/producto/${img_id}`);
                }
              });
            }
          });
        });
      })
      .catch(error => {
        console.error('Error al obtener información de la imagen:', error);
        res.status(500).json(error);
      });
    }
  });
}


function destroy(req, res) {
  const imageId = req.params.id;

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return res.status(500).send('Error interno del servidor');
    }
    conn.query('SELECT image_url FROM images WHERE img_id = ?', [imageId], (err, image) => {
      if (err) {
        console.error('Error al obtener la imagen:', err);
        return res.status(500).send('Error interno del servidor');
      }
      if (image.length === 0) {
        return res.status(404).send('Imagen no encontrada');
      }

      const imagePath = path.join(__dirname, '..', 'public', 'uploads', image[0].image_url);

      conn.query('DELETE FROM comments WHERE image_id = ?', [imageId], (err) => {
        if (err) {
          console.error('Error al eliminar comentarios asociados:', err);
          return res.status(500).send('Error interno del servidor');
        }
        conn.query('DELETE FROM ratings WHERE image_id = ?', [imageId], (err) => {
          if (err) {
            console.error('Error al eliminar puntuaciones asociadas:', err);
            return res.status(500).send('Error interno del servidor');
          }
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo de la imagen:', err);
              return res.status(500).send('Error interno del servidor');
            }
            conn.query('DELETE FROM images WHERE img_id = ?', [imageId], (err) => {
              if (err) {
                console.error('Error al eliminar la imagen de la base de datos:', err);
                return res.status(500).send('Error interno del servidor');
              }


              res.redirect('/');
            });
          });
        });
      });
    });
  });
}

function updateform(req, res) {
  const imageId = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM images WHERE img_id = ?', [imageId], (err, img) => {
      res.render('tasks/update',{img});
    });
  });
}

function update(req, res) {
  const imageId = req.params.id;
  const {title, rights, state, category, label1, label2, label3} = req.body;
  const data ={title, rights, state, category, label1, label2, label3};
  console.log(data);
  req.getConnection((err, conn) => {
    conn.query('UPDATE images SET ? WHERE img_id = ?', [data, imageId], (err, result) => {
      if (err) {
        console.error('Error al actualizar la imagen:', err);
        return res.status(500).send('Error interno del servidor');
      }
      res.redirect('/');
    });
  });
}

module.exports = {
  
  create: create,
  store: store,
  destroy: destroy,
  updateform:updateform,
  update:update,

}