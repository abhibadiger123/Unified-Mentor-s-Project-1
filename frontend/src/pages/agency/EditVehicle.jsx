// src/pages/agency/EditVehicle.jsx

import {
  useEffect,
  useState
} from "react";


import {
  useNavigate,
  useParams
} from "react-router-dom";


import {
  Car,
  IndianRupee,
  Image
} from "lucide-react";


import axios from "../../api/axios";


import useAuth from "../../hooks/useAuth";


import {
  getErrorMessage
} from "../../utils/helpers";



const EditVehicle = () => {


  const {
    id
  } = useParams();



  const navigate =
    useNavigate();




  const {
    token
  } = useAuth();





  const [loading,setLoading] =
    useState(true);



  const [saving,setSaving] =
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
      image:"",

      status:"available",

      pricing:{

        daily:"",
        weekly:"",
        monthly:""

      }

    });





  // ============================
  // Fetch Vehicle
  // ============================

  const fetchVehicle = async()=>{


    try{


      setLoading(true);



      const response =
        await axios.get(

          `/vehicles/${id}`

        );



      if(response.data.success){


        setVehicle(
          response.data.vehicle
        );


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





  useEffect(()=>{


    fetchVehicle();


  },[id]);





  // ============================
  // Input Handler
  // ============================

  const handleChange = (e)=>{


    const {
      name,
      value
    } = e.target;




    if(name.includes(".")){


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
  // Update Vehicle
  // ============================

  const handleSubmit = async(e)=>{


    e.preventDefault();



    setError("");

    setSuccess("");





    try{


      setSaving(true);




      const response =
        await axios.put(

          `/vehicles/${id}`,

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
          "Vehicle updated successfully!"
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


      setSaving(false);


    }


  };





  if(loading){

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading vehicle...
      </div>
    );

  }
  
  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">

      <div className="max-w-5xl mx-auto">


        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-black text-slate-900 dark:text-white">

            Edit Vehicle

          </h1>


          <p className="mt-2 text-slate-500 dark:text-slate-400">

            Update your vehicle information.

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





          {/* Vehicle Specifications */}


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

                type="number"

                placeholder="Daily Price"

                className="input-style"

              />




              <input

                name="pricing.weekly"

                value={vehicle.pricing.weekly}

                onChange={handleChange}

                type="number"

                placeholder="Weekly Price"

                className="input-style"

              />




              <input

                name="pricing.monthly"

                value={vehicle.pricing.monthly}

                onChange={handleChange}

                type="number"

                placeholder="Monthly Price"

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

              value={vehicle.image || ""}

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

              value={vehicle.description || ""}

              onChange={handleChange}

              rows="5"

              placeholder="Vehicle description"

              className="input-style resize-none"

            />



          </div>





          {/* ============================
              Vehicle Status
          ============================ */}


          <div>


            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5">

              Availability Status

            </h2>



            <select

              name="status"

              value={vehicle.status}

              onChange={handleChange}

              className="input-style"

            >

              <option value="available">
                Available
              </option>


              <option value="booked">
                Booked
              </option>


              <option value="maintenance">
                Maintenance
              </option>


              <option value="inactive">
                Inactive
              </option>


            </select>



          </div>





          {/* ============================
              Submit Button
          ============================ */}



          <button

            type="submit"

            disabled={saving}

            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition disabled:opacity-50"

          >

            {
              saving

              ?

              "Updating Vehicle..."

              :

              "Save Changes"

            }


          </button>



        </form>


      </div>


    </div>

  );


};



export default EditVehicle;
