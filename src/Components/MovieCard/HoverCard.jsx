import React, { useEffect } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { getGenreNames } from "../../Utility/genres";
import styles from "./HoverCard.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

function HoverCard({ movie, mediaType, rect, onClose }) {
  /* ---------- position maths ---------- */
  // 1.5x wider than the card, but never too small / too big
  const width = Math.min(Math.max(rect.width * 1.5, 300), 460);
  const mediaHeight = (width * 9) / 16;

  // centre horizontally over the card...
  const idealLeft = rect.left + rect.width / 2 - width / 2;
  // ...but clamp so it never leaves the screen (fixes first/last card problem)
  const maxLeft = document.documentElement.clientWidth - width - 8;
  const left = Math.max(8, Math.min(idealLeft, maxLeft));

  // centre the picture vertically over the card's picture
  const top = Math.max(8, rect.top + rect.height / 2 - mediaHeight / 2);

  /* ---------- the saved position becomes wrong if page scrolls/resizes ---------- */
  useEffect(() => {
    window.addEventListener("scroll", onClose, { passive: true });
    window.addEventListener("resize", onClose);
    return () => {
      window.removeEventListener("scroll", onClose);
      window.removeEventListener("resize", onClose);
    };
  }, [onClose]);

  const genres = getGenreNames(movie.genre_ids);
  const image = movie.backdrop_path || movie.poster_path;

  return (
    <div
      className={styles.hoverCard}
      style={{ left, top, width }}
      onMouseLeave={onClose}
    >
      <div className={styles.media}>
        <img className={styles.preview} src={`${IMAGE_BASE}${image}`} alt="" />
      </div>

      <div className={styles.info}>
        <div className={styles.buttonRow}>
          <FaCirclePlay className={styles.circleButton} size={40} color="white" />
          <BsPlusCircle className={styles.circleButton} size={40} color="white" />
          <GoCheckCircleFill className={styles.circleButton} size={40} color="white" />
          <IoIosArrowDropdownCircle
            className={`${styles.circleButton} ${styles.moreInfo}`}
            size={40}
            color="white"
          />
        </div>

        <div className={styles.title}>{movie.title || movie.name}</div>

        <div className={styles.metaRow}>
          <span className={styles.badge}>Recently added</span>
          <span>{movie.adult ? "18+" : "U/A 16+"}</span>
          <span>{mediaType === "tv" ? "TV Show" : "Movie"}</span>
          <span>HD</span>
        </div>

        <div className={styles.genres}>
          {genres.map((g, index) => (
            <span key={g}>
              {g}
              {index < genres.length - 1 && <span className={styles.dot}> • </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HoverCard;
