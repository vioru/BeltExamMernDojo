import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AllPirates from './components/AllPirates';
import NewPirate from './components/newPirate';
import Pirate from './components/Pirate';

function App() {
  return (
    <div className="App">
            <BrowserRouter>
        <Switch>
        <Route path="/"  exact render={ ()=> <AllPirates/>}/>
        <Route path="/new" exact render={() => <NewPirate />} />
        <Route path="/:id" exact render={() => <Pirate />} />
        {/*<Route path="/new" exact render={() => <NuevoAutor />} />
        <Route path="/edit/:id" exact render={() => <UpdateAutor />} />
        <Route path="/error" exact render={() => <Error/>} />
        <Route path="*" render={() => <Error /> } /> */}
        </Switch>
      </BrowserRouter>





    </div>
  );
}

export default App;
