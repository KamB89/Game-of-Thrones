import './charInfo.scss';
import { Component } from 'react';
import GotService from '../../services/gotService';
import ErrorMessage from '../../services/errorMessage';
import Spinner from '../../services/Spinner';
import Skeleton from '../Skeleton/skeleton';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
        quotes: null

    }

    gotService = new GotService()

    componentDidMount() {
        this.updateChar()

    }

    componentDidUpdate (prevProps, prevState){
     if(this.props.charId !== prevProps.charId){

        this.updateChar()
     }

    }

    updateChar = () => {
        const { charId } = this.props
        if (charId === null || charId === undefined) {
            return;
        }
        this.onCharLoading()

        this.gotService.getCharacter(charId)
            .then(char=> {
                this.onCharLoaded(char);
                this.updateQuote(char.fullname || '')
            } )
            .catch(this.onError)

    }

    updateQuote = (name) => {
        
        const slug = (name || '').toLowerCase().split(' ')[0]
        this.gotService.getQuoteByName(slug)
            .then(res => {
              

                this.setState({
                    quotes: res
                })
            })
            .catch(this.onError)

    }



    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false,
            quotes: null
        })
    }

    onError = () => {
        this.setState({
            error: true
        })
    }






    render() {

        const{char, loading, error, quotes} = this.state

        const skeleton = char|| loading|| error?  null : <Skeleton/>
        const errorMessage = error? <ErrorMessage/> : null
        const spinner = loading? <Spinner/>: null
        const content = !(loading || error || !char)? <View char = {char} quotes ={quotes}/>: null

        return (
            <div className="char__info">
           {skeleton}
           {spinner}
           {errorMessage}
           {content}

            </div>
        )
    }
}

const View = ({ char ,quotes}) => {

const{fullname, imageUrl} = char

    return (
        <>
            <div className="char__basics">
                <img src={imageUrl} alt="abyss" />
                <div>
                    <div className="char__info-name">{fullname}</div>
                    <div className="char__btns">
                        <a href="#!" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#!" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                      {quotes}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
                <li className="char__comics-item">
                    Alpha Flight (1983) #50
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #503
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #504
                </li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Vengeance (2011) #4
                </li>
                <li className="char__comics-item">
                    Avengers (1963) #1
                </li>
                <li className="char__comics-item">
                    Avengers (1996) #1
                </li>
            </ul>
        </>
    )
}

export default CharInfo;