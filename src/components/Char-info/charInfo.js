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
        quotes: null,
        books: []

    }

    gotService = new GotService()

    componentDidMount() {
        this.updateChar()


    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {

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
            .then(char => {
                this.onCharLoaded(char);
                this.updateQuote(char.fullname || '');
                this.uptadeBooksList(char.fullname || ' ')
            })
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

uptadeBooksList = (name) => {

    this.gotService.getBooks(name)
        .then(res => {

            if (res.length > 0) {
                this.setState({
                    books: res[0].books
                });
            }

        })
        .catch(this.onError);
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

        const { char, loading, error, quotes, books } = this.state

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error || !char) ? <View char={char} quotes={quotes} /> : null
        const booksList = books? <Books books={books}/> : 'There is no books with this character'

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
                {booksList}

            </div>
        )
    }
}

const View = ({ char, quotes }) => {


    const { fullname, imageUrl } = char

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
            <div className="char__comics">Books:</div>

        </>
    )

}


const Books = ({ books }) => {


    return (
        <ul className="char__comics-list">
            {books.length > 0 ? null : 'There is no books with this characters'}
            {books.map((book, i) => (
                <li
                    key={i}
                    className="char__comics-item"
                >
                    {book}
                </li>
            ))}
        </ul>
    )
}

export default CharInfo;