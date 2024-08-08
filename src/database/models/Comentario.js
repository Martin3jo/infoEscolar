module.exports = (sequelize, dataTypes) => {
    let alias = "Comentarios";
  
    let cols = {
      idComentario: {
        type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idPublicacion: {
        type: dataTypes.BIGINT,
        allowNull: false,
      },
      idUsuario: {
        type: dataTypes.BIGINT,
        allowNull: false,
      },
      fechaComentario: {
        type: dataTypes.DATE,
      },
      comentario: {
        type: dataTypes.TEXT,
      },
    };
  
    let config = {
      tableName: "comentario",
      timestamps: false,
    };
  
    const Comentario = sequelize.define(alias, cols, config);
    Comentario.associate = (models) => {
      Comentario.belongsTo(models.Publicaciones, {
          foreignKey: 'idPublicacion',
          as: 'publicacion'
      });
      Comentario.belongsTo(models.Usuarios, {
          foreignKey: 'idUsuario',
          as: 'usuario'
      });
    };
    return Comentario;
  };