import img from '../resources/img/error.gif'
const ErrorMessage = () =>{
    return(
        <img src={img} alt="Error" style = {{display : 'block', height: '250px', 
            objectFit: 'contain', margin: '0 auto' }} />
    )
}

export default ErrorMessage