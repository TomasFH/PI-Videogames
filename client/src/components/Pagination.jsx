export default function Pagination({videogamesPerPage, totalVideogames, paginate}){

    const pageNumber = [];

    console.log("Pagination videogamesPerPage: ", videogamesPerPage);
    console.log("Pagination totalVideogames: ", totalVideogames);

    for(let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++){
        pageNumber.push(i);
    }
    console.log(pageNumber)

    return(
        <nav>
            <ul>
                {pageNumber.map(p => {
                    return (<li key={p}>
                        <a onClick={(e) => {
                            e.preventDefault();
                            paginate(p);
                            }} 
                            href="">
                            {p}
                        </a>
                    </li>)
                })}
            </ul>
        </nav>
    )
}