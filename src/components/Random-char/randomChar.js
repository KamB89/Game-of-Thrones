import GoT from '../../resources/img/GoT.png'
import Got2 from '../../resources/img/GoT.png'

import { Component } from 'react'
import GotService from '../../services/gotService'

import './randomChar.scss'


class RandomChar extends Component {


    state = {
        fullname: null,
        quotes: null,
        imageUrl: null

    }

    gotService = new GotService()

    updateChar = () => {
        const id = Math.floor(Math.random() * 53)
        this.gotService
            .getCharacter(id)
            .then(res => {
                this.setState({
                    fullname: res.fullName,
                    imageUrl: res.imageUrl
                })

                this.updateQuote(res.fullName)
            })

    }

    updateQuote = (name)=>{
        const slug = name.toLowerCase().split(' ')[0]
        this.gotService.getQuoteByName(slug)
        .then(res=>{

            console.log('QUOTE RESPONSE:', res);

            this.setState({
                quotes: res
            })
        })
    }

componentDidMount(){
    this.updateChar()
}
   



    render() {

        const { fullname, imageUrl, quotes } = this.state
        return (
            <div className="randomchar">
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

export default RandomChar