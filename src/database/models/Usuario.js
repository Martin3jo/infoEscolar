
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
        idDocente:{
            type:dataTypes.BIGINT
        } ,
        idAlumno:{
            type:dataTypes.BIGINT
        } , 
        idRol: {
            type:dataTypes.BIGINT
        }
        
    };
    
    let config={
        tableName:"usuario",
        timestamps:false
    }
    
    const Usuario=sequelize.define(alias,cols,config);
    
        return Usuario;
    };
    