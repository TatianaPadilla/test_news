import React, { useState } from "react";
import Form from "./Form";
import { useCreateNewsMutation } from "../api/newsApi";

export default function ModalNew() {
  const [createNews] = useCreateNewsMutation();
  const [show, setShow] = useState(false);
  const newsData = {
    title: "",
    description: "",
    content: "",
    author: "",
  };

  const [formData, setFormData] = useState(newsData);

  // Función para comprobar si todos los campos están completos y no existen espacios en blanco
  const validateForm = () => {
    var error = false;
    const { title, description, content, author } = formData;
    if (
      !title.trim() ||
      !description.trim() ||
      !content.trim() ||
      !author.trim()
    ) {
      error = true;
    }
    return error;
  };

  // Función para guardar nueva noticia
  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    try {
      await createNews(formData);
      setFormData(newsData);
      setShow(false);
    } catch (error) {
      console.error("Error al archivar la noticia", error);
    }
  };

  // Función para descartar nueva noticia
  const handleClose = () => {
    setShow(false);
    setFormData(newsData);
  };

  return (
    <div className="my-2">
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Crear nueva
        </button>
      </div>
      {show && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="mx-3 mt-3">
                <h1 className="modal-title fs-5">Nueva Noticia</h1>
              </div>
              <div className="modal-body">
                <Form formData={formData} setFormData={setFormData} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Descartar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
