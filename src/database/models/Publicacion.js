module.exports = (sequelize, dataTypes) => {
  let alias = "Publicaciones";

  let cols = {
    idPublicacion: {
      type: dataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: dataTypes.TEXT,
    },
    contenido: {
      type: dataTypes.TEXT,
    },
    imagen: {
      type: dataTypes.TEXT,
    },
    fechaPublicacion: {
      type: dataTypes.DATE,
    },
    idDocente: {
      type: dataTypes.BIGINT,
    },
    esFijado: {
      type: dataTypes.BOOLEAN,
    },
    idCategoria: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "publicacion",
    timestamps: false,
  };

  const Publicacion = sequelize.define(alias, cols, config);
  Publicacion.associate = (models) => {
    Publicacion.belongsTo(models.Docentes, {
      foreignKey: 'idDocente',
      as: 'docente'
    });
    Publicacion.belongsTo(models.Categorias, {
      foreignKey: 'idCategoria',
      as: 'categoria'
    });
    Publicacion.hasMany(models.PublicacionesAlumnos, {
      foreignKey: 'idPublicacion',
      as: 'comentarios'
    });
  };
  return Publicacion;
};
