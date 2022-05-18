export default function SelectedInputAddVG({genre, onClose}){
    
    // console.log(genre);
    return <div>
        {genre.name} <button onClick={() => onClose(genre.name)}>x</button>
        </div>
}