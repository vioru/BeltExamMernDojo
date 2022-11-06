import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";


const Pirate = () => {
    const { id } = useParams();
    const [pirate, setpirate] = useState({});
    const history = useHistory();
    const url = "http://localhost:8000/api/pirates/";


    useEffect(() => {
        axios.get(url + id)
            .then(res => {
                console.log(res.data);

                setpirate(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const Deletepirates = id => {
        console.log(id);
        axios.delete(url + id)
            .then(res => {

                history.push("/");
            })

    }


    const update = (id, pepLeg, eyePatch, hookHand) => {
        axios.put(url + id, {
            pepLeg,
            eyePatch,
            hookHand
        })
            .then(result => setpirate(result.data))

    }

    return (
        <div className="container">
        <div className="card col-12 my-4 ">
            <div className="row align-items-center my-2 ">


                <div className=" col-4">
                    <img src={pirate.image} alt="pirate" className="img-fluid" height="400px" width="400px" />
                    <h4>{pirate.phrase}</h4>

                </div>

                <div className="col-8 " >
                    <h2 className="text-center">{pirate.name} </h2>
                    <p>Position:<b>{pirate.position}</b></p>
                    <p>Tesoros:<b>{pirate.treasure}</b></p>
                    <p className="row">Pata de palo:


                        <>
                            <button className={pirate.pepLeg === true ? "btn btn-success mx-1 col-2" : "btn btn-outline-success mx-1 col-2"}
                                onClick={(e) => update(pirate._id, !pirate.pepLeg, pirate.eyePatch, pirate.hookHand)} >Si</button>
                            <button className={pirate.pepLeg === false ? "btn btn-danger mx-1 col-2" : "btn btn-outline-danger mx-1 col-2"}
                                onClick={(e) => update(pirate._id, !pirate.pepLeg, pirate.eyePatch, pirate.hookHand)} >No</button>
                        </>

                    </p>

                    <p className="d-flex">Parche en el ojo:

                        <  >
                            <button className={pirate.eyePatch === true ? "btn btn-success mx-1 col-2" : "btn btn-outline-success mx-1 col-2"}
                                onClick={(e) => update(pirate._id, pirate.pepLeg, !pirate.eyePatch, pirate.hookHand)} >Si</button>
                            <button className={pirate.eyePatch === false ? "btn btn-danger mx-1 col-2" : "btn btn-outline-danger mx-1 col-2"}
                                onClick={(e) => update(pirate._id, pirate.pepLeg, !pirate.eyePatch, pirate.hookHand)} >No</button>
                        </>

                    </p>


                    <p className="d-flex" >Garfio:

                        <>
                            <button className={pirate.hookHand === true ? "btn btn-success mx-1 col-2" : "btn btn-outline-success mx-1 col-2"}
                                onClick={(e) => update(pirate._id, pirate.pepLeg, pirate.eyePatch, !pirate.hookHand)} >Si</button>
                            <button className={pirate.hookHand === false ? "btn btn-danger mx-1 col-2" : "btn btn-outline-danger mx-1 col-2"}
                                onClick={(e) => update(pirate._id, pirate.pepLeg, pirate.eyePatch, !pirate.hookHand)} >No</button>
                        </>

                    </p>


                    <div className=" px-3 m-3">

                        <Link to="/" className="btn btn-primary mx-2">Regresar</Link>
                        {pirate.position =="Capitan"? 
                                                <button className="btn btn-danger" onClick={() => Deletepirates(pirate._id)} >Renunciar a ser Capitan</button>
                        :
                        <button className="btn btn-danger" onClick={() => Deletepirates(pirate._id)} >Que camine por la plancha</button>
}
                    </div>


                </div>

            </div>


        </div>

    </div>








    )


}

export default Pirate;