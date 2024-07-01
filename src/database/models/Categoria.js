module.exports=(sequelize,dataTypes)=>{
    let alias = "Categorias";
    
    let cols={
        idPublicacion: {
            type:dataTypes.BIGINT,
            primaryKey:true
    },
        categoria:{
            type:dataTypes.INTEGER
        }
    };
    
    let config={
        tableName:"categoria",
        timestamps:false
    }
    
    const Categoria=sequelize.define(alias,cols,config);
    
        return Categoria;
    };
    