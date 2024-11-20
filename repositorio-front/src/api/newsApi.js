import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const backendUrl = import.meta.env.VITE_BACKEND_URL
// console.log(backendUrl)

export const newsApi = createApi({
  reducerPath: "newsApi", // Reducer para este slice de RTK Query
  baseQuery: fetchBaseQuery({
    // baseUrl: backendUrl, // Ajusta la URL base para tu backend
    baseUrl: "http://localhost:5000",
  }),

  tagTypes: ["News"], // Etiquetas para el manejo de caché
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news", // Endpoint para obtener noticias
      providesTags: ["News"], // Etiquetas para cache
    }),
    createNews: builder.mutation({
      query: (newNews) => ({
        url: "/news",
        method: "POST",
        body: newNews,
      }),
      invalidatesTags: ["News"], // Invalida el caché cuando se crea una noticia
    }),
    deleteNews: builder.mutation({
      query: (newsId) => ({
        url: `/news/${newsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"], // Invalida el caché cuando se elimina una noticia
    }),
    updateNews: builder.mutation({
      query: (newsId) => ({
        url: `/news/${newsId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["News"], // Invalida el caché cuando se archiva/actualiza una noticia
    }),
  }),
});

export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} = newsApi;
