// src/pages/agency/AgencyBookings.jsx

import {
  useEffect,
  useMemo,
  useState
} from "react";


import {
  Search,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  Car
} from "lucide-react";


import axios from "../../api/axios";


import useAuth from "../../hooks/useAuth";


import Loading from "../../components/Loading";

import EmptyState from "../../components/EmptyState";


import {
  formatDate,
  formatPrice
} from "../../utils/formatters";


import {
  getErrorMessage
} from "../../utils/helpers";



const AgencyBookings = () => {


  const {
    token
  } = useAuth();




  const [bookings,setBookings] =
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
  // Fetch Agency Bookings
  // ============================


  const fetchBookings = async()=>{


    try{


      setLoading(true);



      const response =
        await axios.get(

          "/bookings/agency",

          {

            headers:{

              Authorization:
              `Bearer ${token}`

            }

          }

        );



      if(response.data.success){


        setBookings(
          response.data.bookings
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


    fetchBookings();


  },[]);







  // ============================
  // Filter Bookings
  // ============================


  const filteredBookings =
    useMemo(()=>{


      return bookings.filter(
        (booking)=>{


          const customer =
            booking.customerId?.name
            ?.toLowerCase() || "";



          const vehicle =
            booking.vehicleId?.name
            ?.toLowerCase() || "";



          const searchText =
            search.toLowerCase();




          const matchesSearch =

            customer.includes(searchText)

            ||

            vehicle.includes(searchText);





          const matchesStatus =

            status === "all"

            ||

            booking.status === status;




          return (

            matchesSearch

            &&

            matchesStatus

          );


        }


      );


    },[
      bookings,
      search,
      status
    ]);






  // ============================
  // Update Booking Status
  // ============================


  const updateStatus =
    async(
      id,
      newStatus
    )=>{


      try{


        await axios.put(

          `/bookings/${id}/status`,

          {

            status:newStatus

          },

          {

            headers:{

              Authorization:
              `Bearer ${token}`

            }

          }

        );



        fetchBookings();



      }
      catch(err){


        setError(
          getErrorMessage(err)
        );


      }


    };
    // Continue AgencyBookings.jsx


  if (loading) {

    return (
      <Loading message="Loading bookings..." />
    );

  }





  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">


      <div className="max-w-7xl mx-auto">



        {/* Header */}

        <div className="mb-8">


          <h1 className="text-3xl font-black text-slate-900 dark:text-white">

            Customer Bookings

          </h1>


          <p className="mt-2 text-slate-500 dark:text-slate-400">

            Manage customer rental requests and booking status.

          </p>


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


                placeholder="Search customer or vehicle..."


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

                All Bookings

              </option>


              <option value="pending">

                Pending

              </option>


              <option value="approved">

                Approved

              </option>


              <option value="completed">

                Completed

              </option>


              <option value="rejected">

                Rejected

              </option>



            </select>



          </div>



        </div>







        {/* Booking List */}


        {
          filteredBookings.length === 0 ? (


            <EmptyState


              title="No bookings found"


              description="Customer booking requests will appear here."

            />


          )


          :


          (


            <div className="space-y-6">


              {
                filteredBookings.map((booking)=>(



                  <div


                    key={booking._id}


                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6"


                  >



                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">





                      {/* Booking Info */}


                      <div className="flex-1">



                        <div className="flex items-center gap-3 mb-4">


                          <Car

                            size={28}

                            className="text-indigo-600"

                          />


                          <h2 className="text-xl font-black text-slate-900 dark:text-white">


                            {booking.vehicleId?.name || "Vehicle"}


                          </h2>


                        </div>






                        <div className="grid sm:grid-cols-2 gap-4 text-sm">



                          <div>


                            <p className="text-slate-500">

                              Customer

                            </p>


                            <p className="font-bold text-slate-900 dark:text-white">


                              {booking.customerId?.name || "Customer"}


                            </p>


                          </div>





                          <div>


                            <p className="text-slate-500">

                              Email

                            </p>


                            <p className="font-bold text-slate-900 dark:text-white">


                              {booking.customerId?.email || "-"}


                            </p>


                          </div>






                          <div>


                            <p className="text-slate-500">

                              Start Date

                            </p>


                            <p className="font-bold text-slate-900 dark:text-white">


                              {formatDate(booking.startDate)}


                            </p>


                          </div>






                          <div>


                            <p className="text-slate-500">

                              End Date

                            </p>


                            <p className="font-bold text-slate-900 dark:text-white">


                              {formatDate(booking.endDate)}


                            </p>


                          </div>



                        </div>




                      </div>







                      {/* Status & Actions */}


                      <div className="lg:text-right">



                        <span


                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold

                          ${
                            booking.status === "approved"

                            ?

                            "bg-green-100 text-green-700"

                            :

                            booking.status === "pending"

                            ?

                            "bg-yellow-100 text-yellow-700"

                            :

                            booking.status === "completed"

                            ?

                            "bg-blue-100 text-blue-700"

                            :

                            "bg-red-100 text-red-700"

                          }

                          `}


                        >


                          {
                            booking.status === "pending"

                            ?

                            <Clock size={16}/>

                            :

                            booking.status === "approved"

                            ?

                            <CheckCircle size={16}/>

                            :

                            <XCircle size={16}/>

                          }


                          {booking.status}


                        </span>





                        <p className="mt-4 text-xl font-black text-indigo-600">


                          {formatPrice(booking.totalCost)}


                        </p>





                        {/* Buttons */}



                        <div className="flex flex-wrap gap-3 mt-5 lg:justify-end">



                          {
                            booking.status === "pending" && (

                              <>


                              <button


                                onClick={()=>updateStatus(

                                  booking._id,

                                  "approved"

                                )}


                                className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"


                              >

                                Approve

                              </button>





                              <button


                                onClick={()=>updateStatus(

                                  booking._id,

                                  "rejected"

                                )}


                                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"


                              >

                                Reject

                              </button>


                              </>

                            )
                          }





                          {
                            booking.status === "approved" && (


                              <button


                                onClick={()=>updateStatus(

                                  booking._id,

                                  "completed"

                                )}


                                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"


                              >

                                Complete

                              </button>


                            )
                          }



                        </div>



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



export default AgencyBookings;
