export default function Form({ setFormData, formData }) {
  // Actualizar estado al cambiar los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Titulo"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <textarea
          type="text"
          placeholder="Descripción"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <textarea
          type="text"
          placeholder="Contenido"
          className="form-control"
          rows={6}
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Author"
          className="form-control"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
