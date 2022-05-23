import styles from "./AddVideogame.module.css";

export default function SelectedInputAddVG({genre, onClose}){
    
    // console.log(genre);
    return <div className={styles.selectedGenre}>
        {genre.name} <button onClick={() => onClose(genre.name)} className={styles.btnClose}>x</button>
        </div>
}