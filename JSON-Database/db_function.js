const fs=require('fs')

//to persist data we need two functions

function readDb(dbName='db.json'){
    //read JSON object from file
    const data = fs.readFileSync(dbName,'utf-8')

    //parse the JSON to Object and return it
    const converted_data=JSON.parse(data)
    return converted_data

}

function writeDb(obj,dbName='db.json'){
    //check that a user had passed in an object
    if(!obj){
        return
    }
    try{
         //convert our object to the JSON format
         let converted_data=JSON.stringify(obj)
         fs.writeFileSync(dbName,converted_data)
         console.log('Save successful')

         //Save JSON to out JSON database


    }
    catch(err){
        console.log('Failed to save data\n', err.message)
    } 

}
module.exports={
    readDb,writeDb
}