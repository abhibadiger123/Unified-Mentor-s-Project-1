// src/pages/agency/ManageVehicles.jsx

import {
  useEffect,
  useMemo,
  useState
} from "react";


import {
  Link
} from "react-router-dom";


import {
  Search,
  Car,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";


import axios from "../../api/axios";


import useAuth from "../../hooks/useAuth";


import Loading from "../../components/Loading";

import EmptyState from "../../components/EmptyState";


import {
  getErrorMessage
} from "../../utils/helpers";



const ManageVehicles = () => {


  const {
    token
  } = useAuth();




  const [vehicles,setVehicles] =
    useState([]);



  const [loading,setLoading] =
    useState(true);



  const [error,setError] =
    useState("");



  const [search,setSearch] =
    useState("");



  const [status,setStatus] =
    useState("all");





  // ============================
  // Fetch Vehicles
  // ============================


  const fetchVehicles = async()=>{


    try{


      setLoading(true);



      const response =
        await axios.get(

          "/vehicles/my",

          {

            headers:{

              Authorization:
              `Bearer ${token}`

            }

          }

        );



      if(response.data.success){


        setVehicles(
          response.data.vehicles
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


    fetchVehicles();


  },[]);






  // ============================
  // Filter Vehicles
  // ============================


  const filteredVehicles =
    useMemo(()=>{


      return vehicles.filter(
        (vehicle)=>{


          const name =
            vehicle.name
            ?.toLowerCase() || "";



          const matchesSearch =
            name.includes(
              search.toLowerCase()
            );



          const matchesStatus =
            status === "all" ||
            vehicle.status === status;



          return (
            matchesSearch &&
            matchesStatus
          );


        }

      );


    },[
      vehicles,
      search,
      status
    ]);





  // ============================
  // Delete Vehicle
  // ============================


  const deleteVehicle =
    async(id)=>{


      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this vehicle?"
        );



      if(!confirmDelete)
        return;



      try{


        await axios.delete(

          `/vehicles/${id}`,

          {

            headers:{

              Authorization:
              `Bearer ${token}`

            }

          }

        );



        fetchVehicles();



      }
      catch(err){


        setError(
          getErrorMessage(err)
        );


      }


    };
    
  if (loading) {

    return (
      <Loading message="Loading vehicles..." />
    );

  }



  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">


      <div className="max-w-7xl mx-auto">



        {/* Header */}


        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">


          <div>


            <h1 className="text-3xl font-black text-slate-900 dark:text-white">

              Manage Vehicles

            </h1>



            <p className="mt-2 text-slate-500 dark:text-slate-400">

              View, edit and manage your rental vehicles.

            </p>


          </div>





          <Link

            to="/agency/add-vehicle"

            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"

          >

            + Add Vehicle

          </Link>



        </div>





        {/* Error */}


        {
          error && (

            <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">

              {error}

            </div>

          )
        }





        {/* Search & Filter */}


        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 mb-8">


          <div className="grid md:grid-cols-2 gap-5">



            {/* Search */}


            <div className="relative">


              <Search

                size={18}

                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"

              />



              <input


                type="text"


                placeholder="Search vehicle..."


                value={search}


                onChange={(e)=>setSearch(e.target.value)}


                className="input-style pl-11"


              />


            </div>





            {/* Status */}


            <select


              value={status}


              onChange={(e)=>setStatus(e.target.value)}


              className="input-style"


            >


              <option value="all">

                All Vehicles

              </option>



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



        </div>





        {/* Vehicle List */}



        {
          filteredVehicles.length === 0 ? (


            <EmptyState

              title="No vehicles found"

              description="Add vehicles to start your rental business."

            />


          )

          :

          (


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


              {
                filteredVehicles.map((vehicle)=>(



                  <div


                    key={vehicle._id}


                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden"


                  >



                    {/* Image */}


                    <div className="h-48 bg-slate-200 dark:bg-slate-800">


                      {
                        vehicle.image ? (


                          <img


                            src={vehicle.image}


                            alt={vehicle.name}


                            className="w-full h-full object-cover"


                          />


                        )

                        :

                        (


                          <div className="h-full flex items-center justify-center">


                            <Car

                              size={55}

                              className="text-slate-400"

                            />


                          </div>


                        )


                      }



                    </div>





                    {/* Details */}



                    <div className="p-5">



                      <div className="flex justify-between items-start">


                        <h2 className="text-xl font-black text-slate-900 dark:text-white">


                          {vehicle.name}


                        </h2>





                        <span


                          className={`px-3 py-1 rounded-full text-xs font-bold

                          ${
                            vehicle.status === "available"

                            ?

                            "bg-green-100 text-green-700"

                            :

                            vehicle.status === "booked"

                            ?

                            "bg-yellow-100 text-yellow-700"

                            :

                            "bg-red-100 text-red-700"

                          }

                          `}


                        >


                          {vehicle.status}


                        </span>



                      </div>





                      <p className="mt-2 text-slate-500 dark:text-slate-400">


                        {vehicle.brand} • {vehicle.type}


                      </p>





                      <p className="mt-3 font-bold text-indigo-600">


                        ₹{vehicle.pricing?.daily || 0}/day


                      </p>





                      {/* Actions */}


                      <div className="flex gap-3 mt-5">



                        <Link


                          to={`/agency/edit-vehicle/${vehicle._id}`}


                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700"


                        >


                          <Edit size={17}/>

                          Edit


                        </Link>





                        <button


                          onClick={()=>deleteVehicle(vehicle._id)}


                          className="px-4 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"


                        >


                          <Trash2 size={20}/>


                        </button>



                      </div>



                    </div>



                  </div>



                ))


              }



            </div>


          )

        }



      </div>


    </div>


  );


};


export default ManageVehicles;