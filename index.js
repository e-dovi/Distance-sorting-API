
const express=require('express')
const app=express();


const haversine=require('haversine-distance');
const sort=require('./bubble')


app.use(express.json());

app.post('/locations/sort', (req, res)=>{
    const addresses=req.body.addresses;
    const reqLocation=req.body.location;
    
    const getData = async (address, position)=>{
        
        let ar=[];
        let location;

        try{
            const resp = await fetch("https://api.radar.io/v1/geocode/forward?query="+position, { method: "GET", cache: 'no-cache', headers: {
                "Content-Type": "application/json",
                "Authorization":"API_Key"}})

                if (resp.ok){
                    const jsres = await resp.json()
                    location={'latitude':jsres.addresses[0]['latitude'], 'longitude':jsres.addresses[0]['longitude']}
                }
            }
        catch(error){
            console.log(error)
                    }
        
        for(let i=0; i<address.length; i++){
            
            try{
            
            const response= await fetch("https://api.radar.io/v1/geocode/forward?query="+address[i], { method: "GET", cache: 'no-cache', headers: {
            "Content-Type": "application/json",
            "Authorization":"API_Key"}})
        
            if (response.ok){
                const jres = await response.json()
                ar.push({[address[i]]:{'latitude':jres.addresses[0]['latitude'], 'longitude':jres.addresses[0]['longitude']}})
                // console.log(ar)
                if(i===address.length-1){
                    let distances=[];
                    for(let i=0; i<ar.length; i++){
                    distances.push({[Object.keys(ar[i]).toString()]:haversine(location, Object.values(ar[i])[0])})
                    }
                //console.log(distances)
                res.send(sort(distances)) }   
            }
               }
        catch(error){
            console.log(error)
        }}
    }
       getData(addresses, reqLocation)
       
    })
    


app.listen(3000, ()=>{
    console.log('Listening on port 3000...')
})


