// Resource.request.js
import axios from "axios";

const api = 'https://back-brightmind.vercel.app/PE/resource/';

const resourceRequest = axios.create({
    baseURL: api,
    withCredentials: true,
});
// Funcipon para obtener todos los recursos
export const getAllResources = () => resourceRequest.get('/getAllResources');
// Función para obtener los recursos
export const getResource = (courseId) => resourceRequest.get(`/getResource/${courseId}`);

//Función obtenere Recursos vista Usuario
export const getResourceUser = (id) => resourceRequest.get(`/getResourceUser/${id}`);

// Función para crear un recurso
export const createResource = async (resourceData) => {
    try {
        const formData = new FormData();
        if (resourceData.courseId) formData.append('courseId', resourceData.courseId);
        if (resourceData.title) formData.append('title', resourceData.title);
        if (resourceData.description) formData.append('description', resourceData.description);
        if (resourceData.file) formData.append('file', resourceData.file);
        if (resourceData.link) formData.append('link', resourceData.link);

         // Añadir quizzes si existen
        if (resourceData.quizzes && resourceData.quizzes.length > 0) {
            formData.append('quizzes', JSON.stringify(resourceData.quizzes)); // Enviar el array de quizzes como JSON string
        }

        console.log([...formData]);  // Verifica qué datos estás enviando

        return resourceRequest.post('/createResource', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error("Error al crear recurso:", error);
        throw error;
    }
};

// Función para editar un recurso
export const updateResource = async (id, resourceData) => {
    try {
        const formData = new FormData();
        if (resourceData.title) formData.append('title', resourceData.title);
        if (resourceData.description) formData.append('description', resourceData.description);
        if (resourceData.file) formData.append('file', resourceData.file);
        if (resourceData.link) formData.append('link', resourceData.link);

        // Añadir quizzes si existen
        if (resourceData.quizzes && resourceData.quizzes.length > 0) {
            formData.append('quizzes', JSON.stringify(resourceData.quizzes)); // Enviar el array de quizzes como JSON string
        }

         // Verifica qué datos estás enviando
         console.log([...formData]);

        return resourceRequest.put(`/updateResource/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error("Error al actualizar recurso:", error);
        throw error;
    }
};

// Función para eliminar un recurso
export const deleteResource = (id) => resourceRequest.delete(`/deleteResource/${id}`);

export default resourceRequest;
