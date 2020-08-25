import React, {useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import Axios from 'axios';

const Startup = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

const Form = (props) => {
  const initialState = {
    currentTag: '',
    startup: {
      id: null,
      name: null,
      tags: new Set(),
    }
  }
  const [state, setstate] = useState(initialState);
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setstate({
      ...state,
      startup: {
        ...state.startup,
        [name]: value,
      }
    });
    console.log(state);
  }
  const addTag = (value) => {
    let {tags} = state.startup;
    tags.add(value)
    setstate({
      ...state,
      startup: {
        ...state.startup,
        tags,
      },
      currentTag: '',
    });
  }

  const changeCurrentTag = (evt) => {
    setstate({
      ...state,
      currentTag: evt.target.value,
    })
  }

  const keyPress = (evt) => {
    if (evt.keyCode === 13) {
      addTag(evt.target.value);
    }
  }
  const save = () => {
    let {startup} = state;
    console.log(startup);
    startup.id = startup.id === '' ? null : startup.id;
    startup.tags = Array.from(startup.tags).map(tag => ({
      id:null,
      name: tag,
    }));
    Axios.post('http://localhost:9090/db/startup/add', startup)
    .then(resp => resp.json())
    .then(console.log)
    .catch(console.log);
  }
  const fetch = () => {
    console.log('fecth ...')
    Axios.get('http://localhost:9090/db/startups')
    .then(resp => resp.json())
    .then(console.log)
    .catch(console.log);
  }

  const update = () => {
    let {startup} = state;
    console.log(startup);
    startup.id = startup.id === '' ? null : startup.id;
    startup.tags = Array.from(startup.tags).map(tag => ({
      id:null,
      name: tag,
    }));
    Axios.put('http://localhost:9090/db/startup/update', startup)
    .then(resp => resp.json())
    .then(console.log)
    .catch(console.log);
  }

return (
    <div style={{margin: 15}}>
      <div>
      <TextField name="id" onChange={handleChange} value={props.id} label="id" variant="outlined" />
      <br/>
      <TextField name="name" onChange={handleChange} value={props.name} label="name" variant="outlined" />
      <br/>
      <TextField name="tag" onChange={changeCurrentTag} onKeyDown={keyPress} value={state.currentTag} label="tag" variant="outlined" />
      <br/>
      {
        Array.from(state.startup.tags).map(tag => (
          <span key={tag}>{tag} </span>
        ))
      }
      </div>
      <div>
        <Button onClick={save} >Save</Button>
        <Button onClick={update} >Update</Button>
        <Button onClick={fetch} >fetch</Button>
      </div>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <Form/>
    </div>
  );
}

export default App;
