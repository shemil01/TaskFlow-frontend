// 'use client'
// import apiClient from "@/utils/apiClient";
// import  { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setProjects } from "@/lib/features/projectSlice"; 


// function FetchProjects() {
//     const dispatch = useDispatch()
//   const fetchProjects = async () => {
//     try {
//       const response = await apiClient.get("/projects");
//       console.log(":",response)
//       dispatch(setProjects(response?.projects))
//       console.log("Projcts:", response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {

//     fetchProjects();
//   }, []);

//   return 
// }

// export default FetchProjects;
