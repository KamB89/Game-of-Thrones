import Got2 from '../../resources/img/GoT.png'
import ErrorMessage from '../../services/errorMessage'
import { Component } from 'react'
import GotService from '../../services/gotService'
import Spinner from '../../services/Spinner'

import './randomChar.scss'


class RandomChar extends Component {


    state = {
        char: {},
        quotes: null,
        loading: true,
        error: false

    }

    gotService = new GotService()

    onCharLoaded = (char) => {
        this.setState({ char, loading: false})
        // this.setState({ loading: false })

    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 53)
        this.setState({ quotes: null })
        this.gotService
            .getCharacter(id)
            .then(char => {
                this.onCharLoaded(char);
                this.updateQuote(char.fullname);
            }

            )
            .catch(this.onError)

    }

    onError = () =>{
        this.setState({
            loading: false,
            error: true
        })
    }

    updateQuote = (name) => {
        console.log('NAME:', name);
        const slug = (name || '').toLowerCase().split(' ')[0]
        this.gotService.getQuoteByName(slug)
            .then(res => {

                console.log('QUOTE RESPONSE:', res);

                this.setState({
                    quotes: res
                })
            })
    }

    componentDidMount() {
        this.updateChar()
    }





    render() {
const{char, loading, error} =this.state
const errorMessage = error?  <ErrorMessage/> : null
const spinner = loading? <Spinner/> : null
const content = !(loading || error) ? <View char = {char} quotes = {this.state.quotes}/>: null

        return (
            <div className="randomchar">
                 {errorMessage}
                 {spinner}
                 {content}


                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={Got2} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )

    }

}

const View = ({ char, quotes }) => {
    const { fullname, imageUrl } = char

    return (
        <div className="randomchar__block">
            <img src={imageUrl} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{fullname}</p>
                <p className="randomchar__descr">
                    {quotes}
                </p>
                <div className="randomchar__btns">
                    <a href="!#" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href="!#" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )

}


export default RandomChar