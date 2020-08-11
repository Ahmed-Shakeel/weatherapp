const path = require("path");
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocoding');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
// setting paths
const publicPathDirectory = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')


// used to serve static assets
app.use(express.static(publicPathDirectory));

// settings
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Ahmed Shakeel"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        name: "Ahmed Shakeel"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        name: "Ahmed Shakeel"
    });
})

app.get('/weather',(req,res)=>{
    if(req.query.address === undefined){
        return res.send({
            error: "please provide an address"
        });
    }
    geocode(req.query.address,(error,locationData)=>{
        if(error){
            res.send({
                error
            });
        }
        else{
            forecast(locationData.long,locationData.lat,(error,tempData)=>{
                if(error){
                    res.send(error);
                }
                else{
                    res.send({
                        address: req.query.address,
                        location: locationData.location,
                        forecast: tempData
                    });
                    
                }
            });
        }

    });
    //res.send(req.query.address);
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Ahmed Shakeel",
        message: "Can't  find the help page",
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Ahmed Shakeel",
        message: "Can't  find the requested page",
    })
});

app.listen(port,()=>{
    console.log("up and running on " + port);
})
