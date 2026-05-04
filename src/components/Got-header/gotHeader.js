import './gotHeader.scss';

const GotHeader = () => {

  

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