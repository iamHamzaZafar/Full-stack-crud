import React, { useState } from "react";
import "./App.css";
import { IoClose } from "react-icons/io5";
import axios from "axios"



// axios.defaults.baseURL = "http://localhost:5000"
function App() {
  const [formData , setData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const handelOnChange = (e) =>{
    const {value , name} = e.target ;
    setData((pre)=>{
      return {
       ...pre ,
        [name] : value
      }
    })
  }
  const [addSection, setAddSection] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const data = await axios.post("http://localhost:5000/create" , formData)
      console.log(data) ; 
      setAddSection(false) ;
    } catch (error) {
      console.log("Error connectiong to the server" , error)
    }
    // console.log(formData)
  };
  return (
    <div className=" h-14  max-w-[700px] m-auto mt-20 flex items-center justify-center ">
      <button onClick={()=> setAddSection(true)}  className=" text-white  border-none mb-10 hover:bg-slate-300 hover:text-black  ml-4 px-4 py-2 cursor-pointer rounded-md text-xl bg-[#194064] ">
        Add
      </button>
      {addSection && (
        <div className=" absolute mt-[400px] bg-slate-100 rounded-md shadow-xl flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" w-[400px]  flex flex-col px-10 py-14  "
            action=""
          >
            <div className="ml-auto ">
              <IoClose  
              onClick={() => setAddSection(false)}
                className=" hover:cursor-pointer hover:bg-red-500 "
                size={"20px"}
              />
            </div>
            <label htmlFor="name">Name:</label>
            <input
              className=" border-[2px]  py-2 outline-2 rounded-md   "
              type="text"
              onChange={handelOnChange}
              name="name"
              id="name"
            />

            <label htmlFor="email">Email:</label>
            <input
              onChange={handelOnChange}
              className=" border-[2px]  py-2 outline-2 rounded-md   "
              type="email"
              name="email"
              id="email"
            />

            <label htmlFor="contact">Contact:</label>
            <input
              onChange={handelOnChange}
              className=" border-[2px]  py-2 outline-2 rounded-md   "
              type="number"
              name="contact"
              id="contact"
            />

            <button className="mt-3 border-[1px] bg-blue-700 py-3 text-white rounded-md hover:bg-blue-400 hover:text-black ">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
