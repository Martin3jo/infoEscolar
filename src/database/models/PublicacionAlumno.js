module.exports = (sequelize, dataTypes) => {
    let alias = "PublicacionesAlumnos";
  
    let cols = {
      idPublicacion: {
        type: dataTypes.BIGINT,
        primaryKey: true,
        
      },
      idAlumno: {
        type: dataTypes.BIGINT,
        primaryKey:true
      },
      fechaComentario: {
        type: dataTypes.DATE,
      },
      comentario: {
        type: dataTypes.TEXT,
      },
      
    };
  
    let config = {
      tableName: "publicacionalumno",
      timestamps: false,
    };
  
    const PublicacionAlumno = sequelize.define(alias, cols, config);
    PublicacionAlumno.associate = (models) => {
      PublicacionAlumno.belongsTo(models.Publicaciones, {
          foreignKey: 'idPublicacion',
          as: 'publicacion'
      });
      PublicacionAlumno.belongsTo(models.Alumnos, {
          foreignKey: 'idAlumno',
          as: 'alumno'
      });
  };
    return PublicacionAlumno;
  };
  