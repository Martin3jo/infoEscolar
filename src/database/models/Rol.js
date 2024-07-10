module.exports=(sequelize,dataTypes)=>{
    let alias = "Roles";
    
    let cols={
        idRol: {
            type:dataTypes.BIGINT,
            primaryKey:true
    },
        rol:{
            type:dataTypes.STRING
        }
    };
    
    let config={
        tableName:"rol",
        timestamps:false
    }
    
    const Rol=sequelize.define(alias,cols,config);
    Rol.associate = (models) => {
        Rol.hasMany(models.Usuarios, {
            foreignKey: 'idRol',
            as: 'usuarios'
        });
    };
        return Rol;
    };
    