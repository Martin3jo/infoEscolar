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
  };

  let config = {
    tableName: "publicacion",
    timestamps: false,
  };

  const Publicacion = sequelize.define(alias, cols, config);

  return Publicacion;
};
