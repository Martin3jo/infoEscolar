module.exports=(sequelize,dataTypes)=>{
    let alias = "Docentes";
    
    let cols={
        idDocente: {
            type:dataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true
    },
    dni: {
        type:dataTypes.INTEGER
    }, 
    nombre: {
        type:dataTypes.STRING
    },
    apellido:{
        type:dataTypes.STRING
    } ,
    telefono: {
        type:dataTypes.STRING
    },
    email: {
        type:dataTypes.STRING
    },
    idUsuario: {
        type: dataTypes.BIGINT
    }
    };
    
    let config={
        tableName:"docente",
        timestamps:false
    }
    
    const Docente=sequelize.define(alias,cols,config);
    Docente.associate = (models) => {
        Docente.belongsTo(models.Usuarios, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
        Docente.hasMany(models.Publicaciones, {
            foreignKey: 'idDocente',
            as: 'publicaciones'
        });
    };
        return Docente;
    };
    