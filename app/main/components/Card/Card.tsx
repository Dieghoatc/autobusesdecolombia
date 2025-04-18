"use client";

import "./card.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { ApiPhotosResponse } from "@/app/api/dto/photo.dto";
import { formatString } from "@/app/utils";
import Link from "next/link";

import { replaceStringSpaces } from "@/app/utils/replaceStringSpaces";

interface CardProps {
  photo: ApiPhotosResponse;
}

export function Card({ photo }: CardProps) {
  const {
    url,
    company,
    serial,
    bodywork,
    chassis,
    plate,
    service,
    author,
    location,
    country,
  } = photo;

  const plateUpperCase = plate.toUpperCase();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card-gallery">
      <figure className="card-gallery__image" onClick={openModal}>
        <picture>
          <source type="image/webp" srcSet={url} media="min-width: 1200px" />
          <source type="image/webp" srcSet={url} media="min-width: 768px" />
          <img
            src={url}
            role="presentation"
            loading="lazy"
            title={`Fotografía de la empresa ${company} numero ${serial}`}
            alt={`autobus de la empresa ${company} con serial ${
              serial === "n/a" ? "" : serial
            }`}
            decoding="async"
          />
        </picture>
      </figure>
      <div className="card-gallery__title">
        <h2>
          {formatString(company)}
          {serial === "n/a" ? "" : ` - ${serial}`}
        </h2>
        <p>{formatString(author)}</p>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="modal-photopreview__image">
            <Link
              href={`/image/${photo.photo_id}/${replaceStringSpaces(
                photo.company
              )}-${photo.serial}`}
            >
              <figure>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={url}
                    media="min-width: 1200px"
                  />
                  <source
                    type="image/webp"
                    srcSet={url}
                    media="min-width: 768px"
                  />
                  <img
                    src={url}
                    loading="lazy"
                    role="pesentation"
                    title={`Fotografía de la empresa ${company} numero ${serial}`}
                    alt={`autobus de la empresa ${company} con serial ${
                      serial === "n/a" ? " " : serial
                    }`}
                    decoding="async"
                  />
                </picture>
              </figure>
            </Link>
          </div>
          <div className="modal-photopreview__content">
            <div className="modal-photopreview__title">
              <h2>
                {formatString(company)}
                {serial === "n/a" ? "" : ` - ${serial}`}
              </h2>
            </div>
            <div className="modal-photopreview__details">
              <div>
                {!bodywork || bodywork === "n/a" ? null : (
                  <p>
                    <span className="modal-photopreview_label">
                      Carroceria:{" "}
                    </span>
                    {formatString(bodywork)}
                  </p>
                )}
                {!chassis || chassis === "n/a" || null ? null : (
                  <p>
                    <span className="modal-photopreview_label">Chasis: </span>
                    {formatString(chassis)}
                  </p>
                )}
                {!plate || plate === "n/a" || null ? null : (
                  <p>
                    <span className="modal-photopreview_label">Placa: </span>
                    {plateUpperCase}
                  </p>
                )}
                <p>
                  <span className="modal-photopreview_label">
                    Fotógrafo/a:{" "}
                  </span>{" "}
                  {formatString(author)}
                </p>
                <p>
                  <span className="modal-photopreview_label">Ubicación: </span>
                  {formatString(location)} - {formatString(country)}
                </p>
              </div>
              <div className="modal-photopreview_company-service">
                {!service || service === "n/a" || null ? null : (
                  <p>&quot;{formatString(service)}&quot;</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
