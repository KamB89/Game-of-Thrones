import { Component } from 'react';

import GotService from '../../services/gotService';


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
    this.gotService.getAllCharacters()
        .then(res => {
            this.setState({
                chars: res.slice(0, 9),
                loading: false
            });
        });
}

componentDidMount(){
    this.updateCharList()
}


    render(){
       const{chars, loading, error} = this.state 

        const items = chars.map(item => {
            return(

 <li  key = {item.id} className="char__item char__item_selected">
                    <img src={item.imageUrl} alt={item.fullName}/>
                    <div className="char__name">{item.fullName}</div>
                </li> 

            )
        })
      
        const content = loading? <Spinner/> : items


        return (
        <div className="char__list">
            <ul className="char__grid">
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