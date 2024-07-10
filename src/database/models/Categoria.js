module.exports=(sequelize,dataTypes)=>{
    let alias = "Categorias";
    
    let cols={
        idCategoria: {
            type:dataTypes.BIGINT,
            primaryKey:true
    },
        nombre:{
            type:dataTypes.STRING
        }
    };
    
    let config={
        tableName:"categoria",
        timestamps:false
    }
    
    const Categoria=sequelize.define(alias,cols,config);
    Categoria.associate = (models) => {
        Categoria.hasMany(models.Publicaciones, {
            foreignKey: 'idCategoria',
            as: 'publicaciones'
        });
    };
    
        return Categoria;
    };
    