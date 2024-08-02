module.exports=(sequelize,dataTypes)=>{
    let alias = "Categorias";
    
    let cols={
        idCategoria: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        nombre:{
            type:dataTypes.STRING(75)
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
