import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory,Link } from "react-router-dom";


const NewPirate = () => {

    const [pirates, setpirates] = useState([]);
    const [name, setname] = useState("");
    const [image, setImage] = useState("");
    const [treasure, setTreasure] = useState("");
    const [phrase, setphrase] = useState("");
    const [position, setposition] = useState([]);
    const [pepLeg, setpepLeg] = useState(true);
    const [eyePatch, seteyePatch] = useState(true);
    const [hookHand, sethookHand] = useState(true);
    const [validationCaptain,setvalidationCaptain] = useState(false);
    const listRange = ["Contramaestre","Grumete","Artillero"];


    const url = "http://localhost:8000/api/pirates";


    const [errors, setErrors] = useState({});
    console.log(errors);

    const history = useHistory();

    useEffect(() => {
        theCaptain();

    }, [])


const theCaptain = e =>{
    axios.get("http://localhost:8000/api/pirates")
    .then(res =>{ console.log("data",res.data);
    setpirates(res.data);
        const newList = res.data.filter(pirates => pirates.position === "Capitan");
        console.log(newList);
        if(newList.length > 0  ){
        setvalidationCaptain(true);}
        })
    .catch(err => console.log(err));
}




    const savePirate = e => {
    
        e.preventDefault();

        axios.post("http://localhost:8000/api/pirates", {
            name,
            image,
            phrase,
            treasure,
            position,
            pepLeg,
            eyePatch,
            hookHand
        })
            .then(res => history.push("/"))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div className="container">
            <h1>Nuevo Pirata</h1>
            <form onSubmit={savePirate}>
                <div className="form-group">
                    <label htmlFor="name">Ingresa tu nombre Pirata:</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setname(e.target.value)} className="form-control" />
                    {errors.name ? <span className="text-danger">{errors.name.message}</span>: null}
                </div>
                <div className="form-group">
                    <label htmlFor="image">URL de Imagen:</label>
                    <div className="row">
                        <div className="col-6">
                            <input type="text" id="image" name="image" value={image} onChange={e => setImage(e.target.value)} className="form-control" />
                            {errors.image ? <span className="text-danger">{errors.image.message}</span>: null}
                        </div>
                        <div className="col-6">
                            <p>Vista previa de tu foto de perfil</p>
                            <img src={image} className="img-fluid"  width="200px" alt="pirate" />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="treasure">¿Cuantos tesoros tienes?:</label>
                    <input type="number" id="treasure" name="treasure" value={treasure} onChange={e => setTreasure(e.target.value)} className="form-control" />
                    {errors.treasure ? <span className="text-danger">{errors.treasure.message}</span>: null}
                </div>

                <div className="form-group">
                    <label htmlFor="phrase"> escribe tu frase favorita :</label>
                    <textarea className="form-control"  value={phrase}  onChange={e => setphrase(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                    {errors.phrase ? <span className="text-danger">{errors.phrase.message}</span>: null}
                </div>

                <select className="form-select form-select-lg mb-3 col-6 p-2" aria-label=".form-select-lg example"  onChange={e => setposition(e.target.value)}>
                    <option value="rango" hidden >Selecciona tu rango Pirata</option>
                    {validationCaptain === false ?
                    <option value= "Capitan" > Capitan</option> :
                    null}
                    {listRange.map(range =>
                    <option value={range } >{range}</option>
                    


                )  }
{/* 
{validationCaptain === false ? <>
                    
                    <option value={range} >{range}</option>
                    </>
                    :
                    <option value={index } >{range}</option>
            } */}



                </select> 
                {errors.position ? <span className="text-danger">{errors.position.message}</span>: null}



                <p>Posees alguno de estos implementos en tu cuerpo</p>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="pepLeg" name="pepLeg" checked={pepLeg} onChange={e => setpepLeg(e.target.checked)} />
                    <label className="form-check-label" htmlFor="pepLeg">
                        Pata de palo
                    </label>
                </div>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="eyePatch" name="eyePatch" checked={eyePatch} onChange={e => seteyePatch(e.target.checked)} />
                    <label className="form-check-label" htmlFor="eyePatch">
                        Parche en el ojo
                    </label>
                </div>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="hookHand" name="hookHand" checked={hookHand} onChange={e => sethookHand(e.target.checked)} />
                    <label className="form-check-label" htmlFor="hookHand">
                        Garfio
                    </label>
                </div>
                <input type="submit" className="btn btn-success" value="Guardar" />
                <Link to="/" className="btn btn-danger mx-2">Cancelar</Link>
            </form>
        </div>
    )

}

export default NewPirate;