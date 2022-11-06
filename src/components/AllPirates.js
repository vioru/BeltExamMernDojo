import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const AllPirates = () => {

    const [pirates, setpirates] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates")
            .then(res => setpirates(res.data))
            .catch(err => console.log(err));
    }, [])


    const DeletePirate = id => {
        axios.delete("http://localhost:8000/api/pirates/"+id)
            .then(res =>{

                let newList = pirates.filter(pirates => pirates._id !== id);
                    setpirates(newList);

            })
    }



    return (
        <div className="container">
            <div className="row my-4 bg-warning">
            <h1 className=" col-9 text-center">Tripulación</h1>
            <div className="col-3 my-4">
            <Link to="/new" className="btn-sm btn-success p-2 mt-3">Agrega un nuevo pirata</Link>
            </div>
            </div>
            { pirates == "" ?
            <h4 className="text-center">Un Barco no es nada sin su tripulacion, <br/>¿que tal si recultas nuevos piratas?
            <br/>haz click en el boton verde de arriba </h4> :<>

            {
                pirates.map((pirate, index) => (
            <div className="card col-12 my-4 ">
                <div className="row align-items-center my-2 ">
                    

                    <div className=" col-4">
                    <img   src={pirate.image} alt="pirate" className="img-fluid"  height="350px" width="250px" />
                    
                    </div>

                    <div className="col-8 " key={index}>
                        <h2 className="text-center">{pirate.name} </h2>
                        <div className="text-center px-3 mx-3">
                        <Link className="btn btn-warning  mx-3"  to={`/${pirate._id}`}>Ver pirata</Link>  
                        {pirate.position =="Capitan"? null:

                        <button className="btn btn-danger"  onClick={()=>DeletePirate(pirate._id)} >Que camine por la plancha</button>
}

                        </div>
    
                    
                    </div>
                
                </div>
                

            </div>
                                    ))
                                }

</>}
            


        </div>

    )

}


export default AllPirates;
