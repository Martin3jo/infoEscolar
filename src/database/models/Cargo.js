
/*3 Parametros (nombre de tabla,objeto literal con elementos de la tabla,)*/
module.exports=(sequelize,dataTypes)=>{
    let alias = "Cargos";
    
    let cols={
        idDocente: {
            type:dataTypes.BIGINT,
            primaryKey:true
    },
        cargo:{
            type:dataTypes.STRING
        }
    };
    
    let config={
        tableName:"cargo",
        timestamps:false
    }
    
    const Cargo=sequelize.define(alias,cols,config);
    
        return Cargo;
    };
    