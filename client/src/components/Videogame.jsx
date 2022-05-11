export default function Videogame({name, image, genres }){
  //nombre, imágen, genero/s
  // vg = videogame
  
    return (
      <div>
        <div className="vgCard"> 
          <img src={image} alt="img not found" />
        </div>
        <div className="vdName">
          <h2>{name}</h2>
        </div>
        <div className="vgGenre">
          <p>Genre: 
            {
              genres.map(g => {
                return ' ' + g.name + ' | | '
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
     