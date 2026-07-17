// src/context/AuthContext.jsx

import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "../api/axios";


export const AuthContext = createContext();



const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);



  // ============================
  // Load User On Refresh
  // ============================

  useEffect(() => {


    const loadUser = async () => {


      if (!token) {

        setLoading(false);

        return;

      }



      try {


        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;



        const response =
          await axios.get("/auth/profile");



        if (response.data.success) {

          setUser(
            response.data.user
          );

        }


      } catch (error) {


        console.log(
          "Authentication failed",
          error
        );


        logout();


      } finally {


        setLoading(false);


      }


    };



    loadUser();


  }, [token]);





  // ============================
  // Register User
  // ============================

  const register = async (formData) => {


    const response =
      await axios.post(
        "/auth/register",
        formData
      );



    if (response.data.success) {


      const {
        token,
        user
      } = response.data;



      localStorage.setItem(
        "token",
        token
      );



      setToken(token);

      setUser(user);



      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;


    }



    return response.data;


  };





  // ============================
  // Login User
  // ============================

  const login = async (credentials) => {


    const response =
      await axios.post(
        "/auth/login",
        credentials
      );



    if (response.data.success) {


      const {
        token,
        user
      } = response.data;



      localStorage.setItem(
        "token",
        token
      );



      setToken(token);

      setUser(user);



      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;


    }



    return response.data;


  };





  // ============================
  // Logout User
  // ============================

  const logout = () => {


    localStorage.removeItem(
      "token"
    );



    delete axios.defaults.headers.common[
      "Authorization"
    ];



    setToken(null);

    setUser(null);


  };





  // ============================
  // Authentication Status
  // ============================

  const isAuthenticated =
    Boolean(user && token);





  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        loading,

        isAuthenticated,

        register,

        login,

        logout,

      }}

    >

      {children}


    </AuthContext.Provider>

  );


};



export default AuthProvider;
