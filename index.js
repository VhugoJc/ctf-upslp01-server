require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const api = express.Router();
const cors = require('cors');
const port= process.env.PORT || 4000;
const flag = process.env.POLIMEMESFLAG;

app.use(cors());
//Config:
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

//console.log(flag);
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
      response.id = flag;
      res.status(200).send({id:flag, message:"Eres un crack!!!"})
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
