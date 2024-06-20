import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Input, Select } from "antd";
import { useCoursesContext } from "../../../context/courses/courses.context";
import { useCategoryContext } from "../../../context/courses/category.context";

const { Option } = Select;

const UpdateCourseForm = ({ visible, onClose, onUpdate, courseId }) => {
  const { categories } = useCategoryContext();
  const { updateCourse, getCourse } = useCoursesContext();
  const MAX_DESCRIPCION_LENGTH = 150;

  const [curso, setCurso] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    imagen: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const imagenRef = useRef(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (courseId) {
        const courseData = await getCourse(courseId);
        setCurso({
          nombre: courseData.title,
          categoria: courseData.category,
          descripcion: courseData.description,
          imagen: null,
        });
      }
    };
    if (visible) {
      fetchCourseData();
    }
  }, [courseId, getCourse, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCurso({ ...curso, imagen: file });
      setErrorMessage("");
    } else {
      e.target.value = null;
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title: curso.nombre,
      category: curso.categoria,
      description: curso.descripcion,
      image: curso.imagen,
    };
    try {
      await updateCourse(courseId, courseData);
      onUpdate(courseData);
      onClose();  // Close the modal without resetting the form
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      className="lg:absolute top-14 left-1/3"
      maskStyle={{ backdropFilter: "blur(10px)" }}
    >
      <form onSubmit={handleSubmit} className="shadow-black bg-gradient-to-r from-violet-500 to-fuchsia-400 p-4 relative shadow-orange rounded overflow-x-hidden ">
        <button
          className="absolute top-2 right-2 text-black hover:bg-red-500 w-6 h-6 text-base bg-red-400"
          onClick={onClose}  // Use onClose directly
        >
          X
        </button>
        <div>
          <h1 className="text-4xl font-black text-center mb-4 text-white">Update Course</h1>
          <div className="mb-4">
            <label className="block text-zinc-100 text-base font-medium mb-4">
              Nombre: <br />
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-2 font-normal"
                type="text"
                name="nombre"
                value={curso.nombre}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <label className="block text-zinc-100 text-base font-medium mb-4">
              Categoría:
              <Select className="font-normal text-black mt-2 "
                style={{ width: "100%" }}
                value={curso.categoria}
                onChange={(value) => setCurso({ ...curso, categoria: value })}
              >
                {categories.map(category => (
                  <Option key={category._id} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </label>
          </div>
          <div className="">
            <label className="block text-zinc-100 text-base font-medium mb-2">
              Descripción:
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight font-normal focus:outline-none focus:shadow-outline mt-2 resize-none"
                name="descripcion"
                value={curso.descripcion}
                onChange={handleChange}
                maxLength={MAX_DESCRIPCION_LENGTH}
                style={{ minHeight: "100px" }}
              />
              <div className="text-gray-500 text-right">{curso.descripcion.length}/{MAX_DESCRIPCION_LENGTH}</div>
            </label>
          </div>
          <div className="">
            <label className="block text-zinc-100 text-lg font-bold mb-2">
              Imagen:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline-red-100 italic mt-2"
                type="file"
                accept="image/*"
                ref={imagenRef}
                onChange={handleImagenChange}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}  // Use onClose directly
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            type="submit"
          >
            Update Course
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateCourseForm;