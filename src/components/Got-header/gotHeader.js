import './gotHeader.scss';
import GotService from '../../services/gotService';

const GotHeader = () => {

   const got_service = new GotService()

   got_service.getAllCharacters()
              .then(res => console.log(res))

    return (
        <header className="app__header">
            <h1 className="app__title">
                <button className="link">
                    <span>Marvel</span> information portal
                </button>
            </h1>

            <nav className="app__menu">
                <ul>
                    <li><button className="link">Characters</button></li>
                    /
                    <li><button className="link">Comics</button></li>
                </ul>
            </nav>
        </header>


    )
}

export default GotHeader