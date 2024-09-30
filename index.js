const express = require('express');

const app = express();

app.use(express.json());

const users = [
    {
        name : 'John',
        kidneys : [
            {healthy : false}
        ]
    }
]

// getting all the kidneys.
app.get('/',(req, res)=>{
    const johnKidneys = users[0].kidneys;
    const noOfKidenys = users[0].kidneys.length;
    let noOfHealthyKidneys = 0;
    for(let i = 0; i<noOfKidenys;i++){
        if(johnKidneys[i].healthy){
            noOfHealthyKidneys++;
        }
    };
    const noOfUnhealthyKidneys = noOfKidenys-noOfHealthyKidneys;
    res.json({
        noOfKidenys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    });
})

// creating new healthy kidneys.
app.post('/', (req, res)=>{
    const newKidney = req.body.isHealthy;
    const johnKidneys = users[0].kidneys;
    johnKidneys.push({healthy : newKidney});
    res.json({msg : "Done!"});
})

// updating all the unhealthy kidneys with healthy kidneys.
app.put('/',(req, res)=>{
    const johnKidneys = users[0].kidneys;
    for(let i = 0; i<johnKidneys.length; i++){
        johnKidneys[i].healthy = true;
    }
    res.json({msg: "updated"});
})

// removing all the unhealthy kidneys.
app.delete('/', (req, res)=>{
    // if there is no unhealthy kidneys return 411;
    if(checkForUnHealthyKidneys()){
        const newKidneys = [];
        const johnKidneys = users[0].kidneys;
        for(let i = 0; i<johnKidneys.length; i++){
            if(johnKidneys[i].healthy){
                newKidneys.push({healthy : true});
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg : "deleted"
        });
    } else{
        res.status(411).json({
            msg : "there are no kidneys to delete"
        })
    }
    
});

function checkForUnHealthyKidneys(){
    const johnKidneys = users[0].kidneys;
    let flag = false;
    for(let i = 0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy === false){
            flag = true;
        }
    }
    if(flag){
        return true;
    } else{
        return false;
    }
}

app.listen(8080,()=>{
    console.log('listening to port 8080')
})