require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const api = express.Router();
const port= process.env.PORT || 4000;


//Config:
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Request-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


 const addNewStudent = (req, res)=>{//funcion de validacion de credenciales
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
      res.status(200).send(response)
    }else{
      res.status(200).send(response)
    }
}


//mandar archivo /source
const downloadFile = (req, res) =>{
  res.status(200).download(path.join(__dirname, '/index.js'));
}


const polimemes = api.post('/add-new-student',addNewStudent);
const getSource = api.get('/source',downloadFile);



//routes
  app.use('/api',polimemes);
  app.use('/api',getSource);

app.listen(port, ()=>{
    console.log("################");
    console.log("####API REST####");
    console.log("################");
    });
