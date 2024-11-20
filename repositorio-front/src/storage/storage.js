import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "../api/newsApi"; // Importa tu API configurada con RTK Query

export const store = configureStore({
  reducer: {
    // Agrega los reducers necesarios para el store
    [newsApi.reducerPath]: newsApi.reducer, // Agrega RTK Query para las noticias
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware), // Middleware para RTK Query
});
