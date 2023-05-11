import axios from "axios";
import { useState } from "react";
import { urlApi } from "../constantes/RoutersLinks";

export const useApi = () => {

   const [loading, setLoading] = useState(false);

   const Conexion = axios.create({
      baseURL: urlApi,

   })

   const api_handleSubmit = async (config, form) => {

      setLoading(true);
      const auth = get_Auth(config);

      return await new Promise((resolve, reject) => {
         Conexion({
            method: config.method,
            url: config.url,
            data: form,
            params: config.params,
            auth: auth,
            headers: {
               authorization: `Bearer ${localStorage.getItem('token')}`,
               'Content-Type': config.formData ? 'multipart/form-data' : null
            }
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

   const get_Auth = (form) => {

      if (form.auth) {
         return {
            username: form.auth.username,
            password: form.auth.password
         }
      } else { return null }
   }


   return {
      loading,
      api_handleSubmit
   }
}