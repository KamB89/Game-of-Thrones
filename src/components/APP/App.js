import GotHeader from '../Got-header/gotHeader';
import RandomChar from '../Random-char/randomChar';
import CharList from '../Char-list/charList';
import CharInfo from '../Char-info/charInfo';
import { Component } from 'react';

class App extends Component{

state = {
  selectedChar: null,
  quote: null

}
 onCharSelected = (id) =>{
  this.setState({
    selectedChar: id
  })
 }

  render(){
    return (
<div className="App">
    <GotHeader/>
    <RandomChar/>
    <div className="char__content">
    <CharList onCharSelected ={this.onCharSelected} />
    <CharInfo  charId = {this.state.selectedChar} />
</div>
   


</div>

  );
}
}

export default App;
