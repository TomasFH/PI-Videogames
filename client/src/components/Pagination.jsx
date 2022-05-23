import styles from "./Pagination.module.css";

export default function Pagination({videogamesPerPage, totalVideogames, paginate}){

    const pageNumber = [];

    // console.log("Pagination videogamesPerPage: ", videogamesPerPage);
    // console.log("Pagination totalVideogames: ", totalVideogames);

    for(let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++){
        pageNumber.push(i);
    }
    // console.log(pageNumber)

    return(
        <nav>
            <ul className={styles.ul}>
                {pageNumber.map(p => {
                    return (<li key={p} onClick={(e) => {
                        e.preventDefault();
                        paginate(p);
                        }} 
                        href="">
                        <a>
                            {p}
                        </a>
                    </li>)
                })}
            </ul>
        </nav>
    )
}