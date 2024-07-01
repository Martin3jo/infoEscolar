
/*3 Parametros (nombre de tabla,objeto literal con elementos de la tabla,)*/
module.exports=(sequelize,dataTypes)=>{
let alias = "Alumnos";

let cols={
    idAlumno: {
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
    fechaNacimiento:{
        type:dataTypes.DATE
    } , 
    direccion: {
        type:dataTypes.TEXT
    },
    fechaRegistro:{
        type:dataTypes.DATE
    } ,
    telefono: {
        type:dataTypes.STRING
    },
    email: {
        type:dataTypes.STRING
    } ,
    curso: {
        type:dataTypes.STRING
    }
};

let config={
    tableName:"alumno",
    timestamps:false
}

const Alumno=sequelize.define(alias,cols,config);

    return Alumno;
};
