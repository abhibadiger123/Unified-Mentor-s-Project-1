// src/pages/agency/AddVehicle.jsx

import {
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  Car,
  IndianRupee,
  Image,
  Fuel,
  Settings
} from "lucide-react";


import axios from "../../api/axios";


import useAuth from "../../hooks/useAuth";


import {
  getErrorMessage
} from "../../utils/helpers";



const AddVehicle = () => {


  const navigate =
    useNavigate();



  const {
    token
  } = useAuth();





  const [loading,setLoading] =
    useState(false);



  const [error,setError] =
    useState("");



  const [success,setSuccess] =
    useState("");





  const [vehicle,setVehicle] =
    useState({

      name:"",
      brand:"",
      modelYear:"",
      type:"",
      fuelType:"",
      transmission:"",
      registrationNumber:"",
      description:"",

      pricing:{
        daily:"",
        weekly:"",
        monthly:""
      },

      image:""

    });





  // ============================
  // Input Handler
  // ============================

  const handleChange = (e)=>{


    const {
      name,
      value
    } = e.target;




    if(
      name.includes(".")
    ){

      const [
        parent,
        child
      ] = name.split(".");



      setVehicle({

        ...vehicle,


        [parent]:{

          ...vehicle[parent],

          [child]:value

        }

      });


    }
    else{


      setVehicle({

        ...vehicle,

        [name]:value

      });


    }


  };






  // ============================
  // Submit Vehicle
  // ============================

  const handleSubmit = async(e)=>{


    e.preventDefault();



    setError("");

    setSuccess("");





    if(
      !vehicle.name ||
      !vehicle.brand ||
      !vehicle.type ||
      !vehicle.fuelType
    ){

      setError(
        "Please fill all required fields."
      );


      return;

    }






    try{


      setLoading(true);




      const response =
        await axios.post(

          "/vehicles",

          vehicle,

          {

            headers:{

              Authorization:
              `Bearer ${token}`

            }

          }

        );





      if(response.data.success){


        setSuccess(
          "Vehicle added successfully!"
        );



        setTimeout(()=>{


          navigate(
            "/agency/manage-vehicles"
          );


        },1500);


      }



    }
    catch(err){


      setError(
        getErrorMessage(err)
      );


    }
    finally{


      setLoading(false);


    }


  };
    return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">

      <div className="max-w-5xl mx-auto">


        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Add New Vehicle
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Register your vehicle and make it available for customers.
          </p>

        </div>





        {/* Messages */}


        {
          error && (

            <div className="mb-5 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">

              {error}

            </div>

          )
        }




        {
          success && (

            <div className="mb-5 rounded-xl bg-green-100 dark:bg-green-900/30 p-4 text-green-700 dark:text-green-300">

              {success}

            </div>

          )
        }





        {/* Form */}


        <form

          onSubmit={handleSubmit}

          className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 space-y-8"

        >



          {/* Basic Information */}

          <div>


            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">

              <Car size={22}/>

              Basic Information

            </h2>



            <div className="grid md:grid-cols-2 gap-5">



              <input

                name="name"

                value={vehicle.name}

                onChange={handleChange}

                placeholder="Vehicle Name"

                className="input-style"

              />



              <input

                name="brand"

                value={vehicle.brand}

                onChange={handleChange}

                placeholder="Brand"

                className="input-style"

              />



              <input

                name="modelYear"

                value={vehicle.modelYear}

                onChange={handleChange}

                placeholder="Model Year"

                type="number"

                className="input-style"

              />



              <input

                name="registrationNumber"

                value={vehicle.registrationNumber}

                onChange={handleChange}

                placeholder="Registration Number"

                className="input-style"

              />


            </div>


          </div>





          {/* Specifications */}


          <div>


            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5">

              Vehicle Specifications

            </h2>



            <div className="grid md:grid-cols-3 gap-5">


              <select

                name="type"

                value={vehicle.type}

                onChange={handleChange}

                className="input-style"

              >

                <option value="">
                  Select Type
                </option>

                <option value="car">
                  Car
                </option>

                <option value="bike">
                  Bike
                </option>

                <option value="suv">
                  SUV
                </option>

                <option value="van">
                  Van
                </option>

              </select>





              <select

                name="fuelType"

                value={vehicle.fuelType}

                onChange={handleChange}

                className="input-style"

              >

                <option value="">
                  Select Fuel
                </option>

                <option value="petrol">
                  Petrol
                </option>

                <option value="diesel">
                  Diesel
                </option>

                <option value="electric">
                  Electric
                </option>

                <option value="hybrid">
                  Hybrid
                </option>

              </select>





              <select

                name="transmission"

                value={vehicle.transmission}

                onChange={handleChange}

                className="input-style"

              >

                <option value="">
                  Select Transmission
                </option>

                <option value="manual">
                  Manual
                </option>

                <option value="automatic">
                  Automatic
                </option>


              </select>



            </div>


          </div>





          {/* Pricing */}


          <div>


            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">

              <IndianRupee size={22}/>

              Pricing

            </h2>




            <div className="grid md:grid-cols-3 gap-5">



              <input

                name="pricing.daily"

                value={vehicle.pricing.daily}

                onChange={handleChange}

                placeholder="Daily Price"

                type="number"

                className="input-style"

              />




              <input

                name="pricing.weekly"

                value={vehicle.pricing.weekly}

                onChange={handleChange}

                placeholder="Weekly Price"

                type="number"

                className="input-style"

              />




              <input

                name="pricing.monthly"

                value={vehicle.pricing.monthly}

                onChange={handleChange}

                placeholder="Monthly Price"

                type="number"

                className="input-style"

              />



            </div>


          </div>
          
          {/* ============================
              Vehicle Image
          ============================ */}

          <div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">

              <Image size={22}/>

              Vehicle Image

            </h2>


            <input

              name="image"

              value={vehicle.image}

              onChange={handleChange}

              placeholder="Enter image URL"

              className="input-style"

            />

          </div>





          {/* ============================
              Description
          ============================ */}

          <div>


            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5">

              Description

            </h2>



            <textarea

              name="description"

              value={vehicle.description}

              onChange={handleChange}

              rows="5"

              placeholder="Enter vehicle description"

              className="input-style resize-none"

            />


          </div>





          {/* ============================
              Submit Button
          ============================ */}


          <button

            type="submit"

            disabled={loading}

            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition disabled:opacity-50"

          >

            {
              loading

              ?

              "Adding Vehicle..."

              :

              "Add Vehicle"

            }


          </button>



        </form>



      </div>


    </div>

  );

};


export default AddVehicle;
