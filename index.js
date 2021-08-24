const polimemes = require('./polimemes');
const port = process.env.PORT || 8000;

polimemes.listen(port, ()=>{
    console.log("App is running on port " + port);
    console.log("####BACKEND###");
})