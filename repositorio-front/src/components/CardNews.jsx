import { useDeleteNewsMutation, useUpdateNewsMutation } from "../api/newsApi";

export default function CardNews({ ...props }) {
  const { _id, title, description, date, content, author, archiveDate } = props;

  const [archiveNews] = useUpdateNewsMutation();
  const [deleteNews] = useDeleteNewsMutation();

  // Función para archivar nueva noticia
  const handleArchive = async () => {
    try {
      await archiveNews(_id);
    } catch (error) {
      console.error("Error al archivar la noticia", error);
    }
  };

  // Función para eliminar una noticia
  const handleDelete = async () => {
    try {
      await deleteNews(_id);
    } catch (error) {
      console.error("Error al eliminar la noticia", error);
    }
  };

  return (
    <div className="card mb-5 shadow-sm p-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fst-italic">{description}</p>
        <p className="card-text">{content}</p>
        <p className="card-text">{author}</p>
        <p className="card-text">Fecha creada: <span>{date.split("T")[0]}</span></p>
        {archiveDate && <p className="card-text">Fecha archivada: <span>{archiveDate.split("T")[0]}</span></p>}
        <div className="d-flex justify-content-end">
          {archiveDate ? (
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              Eliminar
            </button>
          ) : (
            <button className="btn btn-light" onClick={handleArchive}>
              Archivar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
