import { Link } from "react-router-dom";
import styles from "./Videogame.module.css";

export default function Videogame({name, image, genres, id }){
  //nombre, imágen, genero/s
  // vg = videogame
  // console.log(genres)
  
    return (
      <div className={styles.contenedor}>
        <Link to={`/videogames/details/${id}`} style={{ textDecoration: 'none'}}>
          <div className="vgCard"> 
            <img src={image} alt="img not found" className={styles.cardImage}/>
          </div>
        </Link>
          <div className={styles.vdName}>
        <Link to={`/videogames/details/${id}`} style={{ textDecoration: 'none'}}>
            <h2>{name}</h2>
        </Link>
          </div>
        <div className="vgGenre">
          <p>Genre: 
            {
              genres.map((g, i) => {
                if(genres.length && i === genres.length - 1){
                  return " " + g.name + "."
                } else if(genres.length && i < genres.length - 1){
                  return " " + g.name + ","
                }
              })
              
            }
          </p>
        </div>
      </div>
  )
}



    // <div className={'card.contenedor'}>
    //   <h4>{props.name}</h4>
    //   <div className={'card.infoContenedor'}>
    //   <div>
    //     <h6>Min</h6>
    //     <p>{props.min}</p>
    //   </div>
    //   <div>
    //     <h6>Max</h6>
    //     <p>{props.max}</p>
    //   </div>
    //   <div className={'card.img'}>
    //   <img src={`http://openweathermap.org/img/wn/${props.img}@2x.png`} alt="Imagen clima" />
    //   </div>
    //   </div>
    // </div>
     