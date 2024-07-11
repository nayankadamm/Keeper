import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/notes' }), // Base URL points to /api/notes
  endpoints: (builder) => ({
    addNote: builder.mutation({
      query: (note) => ({
        url: '/', // The relative URL for the endpoint
        method: 'POST',
        body: note,
        headers: {
          'Content-Type': 'application/json', // Ensure the Content-Type header is set to application/json
        },
      }),
    }),
    getNote:builder.query({
      query:()=>({
        url:"/",
        method:'GET'
      })
    }),
    deleteNote:builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    updateNote:builder.mutation({
      query: ({id,title,description}) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body:{title,description}
      }),
    }),
    
  }),
});

export const { useAddNoteMutation,useGetNoteQuery,useDeleteNoteMutation,useUpdateNoteMutation } = noteApi;