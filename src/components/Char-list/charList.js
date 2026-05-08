import { Component } from 'react';

import GotService from '../../services/gotService';
import ErrorMessage from '../../services/errorMessage';

import Spinner from '../../services/Spinner';
import './charList.scss';

class CharList extends Component{
    
   state = {
   chars: [],
   loading: true,
   error: false
   } 
   

   gotService = new GotService()

updateCharList = () => {
    this.setState({
        loading: true
    })
    this.gotService.getAllCharacters()
        .then(res => {
            this.setState({
                chars: res.slice(0, 9),
                loading: false
            });
        })
        .catch(this.onError);
}

onError = ()=>{
    this.setState({
        loading: false,
        error: true
    })
}

componentDidMount(){
    this.updateCharList()
}


    render(){
       const{chars, loading, error} = this.state 

        const items = chars.map(item => {
            return(

 <li  key = {item.id} className="char__item"
 onClick = {()=> this.props.onCharSelected(item.id)}>
                    <img src={item.imageUrl} alt={item.fullName}/>
                    <div className="char__name">{item.fullName}</div>
                </li> 

            )
        })
      
        const load = loading? <Spinner/> : null
        const errorMessage = error? <ErrorMessage/>: null
        const content= !(loading || error)? items : null 
        


        return (
        <div className="char__list">
            <ul className="char__grid">
                    {load}
                    {errorMessage}
                    {content}

                
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;