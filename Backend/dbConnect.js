import mongoose from 'mongoose';



const db_connection = async () =>{

    try {

      const connection = await  mongoose.connect('mongodb+srv://imhamzee:hamza1234@cluster0.4wj5hdc.mongodb.net/fullstackcrud').then(()=>{
            console.log("Mongo DB connection successfull !!!!!! ") ;
        })
        
    } catch (error) {
        console.log("Mongo DB connection failed !!!!!! :" , error)
    }

}


export default db_connection;