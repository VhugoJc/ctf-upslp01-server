require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const api = express.Router();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
// Configure Header HTTP para que no dé error de cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

 const addNewStudent = (req, res)=>{//función de validación
    let {id,password} = req.body;
    let response ={
      id: id
    }

    for(var i=0; i<id.length; i++){
      password = password.replace( `${id[i]}`,'Ja'); 
    }
    //console.log(password);
    response.message = `tu contraseña se ha guardado como ${password}`;
    password = parseInt(password);

    if(`${password}`===id){
      response.id = process.env.POLIMEMESFLAG;
      response.message = "Eres un crack!!!";
      res.send(response)
    }else{
      res.send(response)
    }
}

  const polimemes = api.post('/add-new-student',addNewStudent);
  app.use('/api',polimemes);
  module.exports = app;