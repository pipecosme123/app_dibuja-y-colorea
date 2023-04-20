import axios from "axios";
import { useState } from "react";
import { urlApi } from "../constantes/RoutersLinks";

export const useApi = () => {

   const [loading, setLoading] = useState(false);

   const conexion = axios.create({
      baseURL: urlApi,
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })

   const api_handleSubmit = async (config, form) => {

      setLoading(true);

      return await new Promise((resolve, reject) => {
         conexion({
            method: config.method,
            url: config.url,
            data: form
         })
            .then((response) => {
               resolve(response);
            })
            .catch((error) => {
               reject(error.response)
            })
            .finally(() => {
               setLoading(false);
            })
      });
   };

   return {
      loading,
      api_handleSubmit
   }
}