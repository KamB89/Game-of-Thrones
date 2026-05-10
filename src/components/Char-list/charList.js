import { Component } from 'react';


import GotService from '../../services/gotService';
import ErrorMessage from '../../services/errorMessage';

import Spinner from '../../services/Spinner';
import './charList.scss';

class CharList extends Component{
    
   state = {
   chars: [],
   loading: true,
   error: false,
   visibleCount: 9,
   } 
   

   gotService = new GotService()

updateCharList = () => {
    this.gotService.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError);
}

onCharListLoaded = (chars) =>{

   
    this.setState({
        chars,
        loading: false,
        newItemLoading: false,
    })
}




onError = ()=>{
    this.setState({
        loading: false,
        error: true
    })
}

componentDidMount(){
        console.log('MOUNT');

    this.updateCharList()
}


loadMore = () =>{
    this.setState(({visibleCount}) => ({
        visibleCount: visibleCount +9,
        }))
}


    render(){
       const{chars, loading, error, visibleCount, charEnded} = this.state 
        const visibleChars  = chars.slice(0, visibleCount)
        const Ended = visibleCount >= chars.length;
        const items = visibleChars.map(item => {
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
            <button className="button button__main button__long"
            disabled = {visibleCount >= chars.length }
            style = {{'display': Ended? 'none': 'block'}}
            onClick={()=>{this.loadMore()}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;