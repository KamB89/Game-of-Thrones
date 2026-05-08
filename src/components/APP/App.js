import GotHeader from '../Got-header/gotHeader';
import RandomChar from '../Random-char/randomChar';
import CharList from '../Char-list/charList';
import CharInfo from '../Char-info/charInfo';

function App() {
  return (
<div className="App">
    <GotHeader/>
    <RandomChar/>
    <div className="char__content">
    <CharList />
    <CharInfo />
</div>
   


</div>

  );
}

export default App;
