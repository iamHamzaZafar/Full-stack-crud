import React, { useState, useEffect } from "react";
import "./App.css";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


// axios.defaults.baseURL = "http://localhost:5000"
function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  // State for user data
  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    const data = await axios.get("http://localhost:5000/");
    // console.log(data);
    if (data.data.msg) {
      setUserData(data.data.data);
      // alert(data.data.message)
    }
    // alert(data.message)
  };

  useEffect(() => {
    getUserData();
  }, [userData]);

  const handelOnChange = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const data = await axios.post("http://localhost:5000/create", formData);

      if (data.data.msg) {
        setAddSection(false);
        alert(data.data.message);
      } else if (data.data.msg == false) {
        alert(data.data.error); // Show alert for existing user
      }
      console.log(userData)
    } catch (error) {
      console.log("Error connectiong to the server", error);
    }
   
  };

  

  // handling Delete Section  

  const handleDelete = async ( id ) =>{
    const data =  await axios.delete(`http://localhost:5000/delete/${id}`); 
    try {
      if(data.data.msg){
        alert(data.data.success);
        getUserData();
      }
      else {
        alert(data.data.msg);
      }
    } catch (error) {
      
    console.error("Error deleting user:", error);
    }
  }



  return (
    <div className=" max-w-[700px] m-auto mt-20 flex flex-col items-center justify-center relative">
      <button
        onClick={() => setAddSection(true)}
        className="text-white border-none mb-10 hover:bg-slate-300 hover:text-black ml-4 px-4 py-2 cursor-pointer rounded-md text-xl bg-[#194064]"
      >
        Add
      </button>
      {addSection && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
          <div className="bg-slate-100 rounded-md shadow-xl p-6">
            <form onSubmit={handleSubmit} className="w-[400px] flex flex-col">
              <div className="ml-auto mb-4">
                <IoClose
                  onClick={() => setAddSection(false)}
                  className="hover:cursor-pointer hover:bg-red-500"
                  size={"20px"}
                />
              </div>
              <label htmlFor="name">Name:</label>
              <input
                className="border-[2px] py-2 outline-2 rounded-md mb-4"
                type="text"
                onChange={handelOnChange}
                name="name"
                id="name"
              />

              <label htmlFor="email">Email:</label>
              <input
                onChange={handelOnChange}
                className="border-[2px] py-2 outline-2 rounded-md mb-4"
                type="email"
                name="email"
                id="email"
              />

              <label htmlFor="contact">Contact:</label>
              <input
                onChange={handelOnChange}
                className="border-[2px] py-2 outline-2 rounded-md mb-4"
                type="number"
                name="contact"
                id="contact"
              />

              <button className="mt-3 border-[1px] bg-blue-700 py-3 text-white rounded-md hover:bg-blue-400 hover:text-black">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className=" border-[2px] w-full">
        <table className="min-w-[700px] overflow-hidden text-center w-full">
          {/* head */}
          <thead className="bg-[#f0eaea]">
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {  userData.length === 0 ? (<p className=" items-center text-red-500 font-bold " >No Data Found</p>) :(
            userData.map((elem) => (
              <tr key={elem._id} className="border-b">
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>{elem.contact}</td>
                <td className=" flex items-center justify-center cursor-pointer ">
                  <FaEdit size={20} /> <MdDelete onClick={()=>handleDelete(elem._id)}  size={20} />
                </td>
              </tr>
            ))) } 
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default App;
