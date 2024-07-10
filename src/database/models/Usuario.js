
/*3 Parametros (nombre de tabla,objeto literal con elementos de la tabla,)*/
module.exports=(sequelize,dataTypes)=>{
    let alias = "Usuarios";
    
    let cols={
        idUsuario: {
            type:dataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true
        },
        dni: {
            type:dataTypes.INTEGER
        }, 
        contrasenia: {
            type:dataTypes.STRING
        }, 
        idRol: {
            type:dataTypes.BIGINT
        }
        
    };
    
    let config={
        tableName:"usuario",
        timestamps:false
    }
    
    const Usuario=sequelize.define(alias,cols,config);
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Roles, {
            foreignKey: 'idRol',
            as: 'rol'
        });
        Usuario.hasOne(models.Alumnos, {
            foreignKey: 'idUsuario',
            as: 'alumno'
        });
        Usuario.hasOne(models.Docentes, {
            foreignKey: 'idUsuario',
            as: 'docente'
        });
    };
    
    
        return Usuario;
    };
    