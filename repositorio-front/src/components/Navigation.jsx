import React, { useState } from "react";
import CardNews from "./CardNews";
import { useGetNewsQuery } from "../api/newsApi";

export default function Navigation() {

  const { data: newsDataApi } = useGetNewsQuery();

  const [ isArchivedNew, setIsArchiveNew ] = useState(true)

  const filteredNews = newsDataApi?.filter((news) =>
      isArchivedNew ? !news.archiveDate : news.archiveDate // Filtra según la existencia de archiveDate
    )
    .sort((a, b) =>
      isArchivedNew
        ? new Date(b.date) - new Date(a.date) // Ordena por `date` para nuevas
        : new Date(b.archiveDate) - new Date(a.archiveDate) // Ordena por `archiveDate` para archivadas
    );

    return (
      <div>
        <ul className="nav nav-tabs mb-5">
          <li className="nav-item me-1">
            <button
              className={`nav-link ${isArchivedNew ? "active" : ""}`}
              onClick={() => setIsArchiveNew(true)}
            >
              Nuevas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${isArchivedNew ? "" : "active"}`}
              onClick={() => setIsArchiveNew(false)}
            >
              Archivadas
            </button>
          </li>
        </ul>
        <div className="tab-content">
          {filteredNews?.length > 0 ? (
            filteredNews?.map((item, index) => <CardNews key={index} {...item} />)
          ) : (
            <p>No hay noticias disponibles en esta categoría.</p>
          )}
        </div>
      </div>
    );
  }