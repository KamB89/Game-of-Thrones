class GotService {
    _apibase = 'https://thronesapi.com/api/v2/'
    _apibase_quotes = 'https://api.gameofthronesquotes.xyz/v1/author/'

      getResource = async (url) => {
        const res = await fetch(`${url}`)
        if (!res.ok){
          throw new Error (`Could not fetch ${url}` )
        }
        return await res.json()

      }

        getAllCharacters = async () => {
          const res = await this.getResource(`${this._apibase}Characters`)
           return res
        }
        getQuotes = async () =>{
          const res = await this.getResource(`${this._apibase_quotes}`)

          return res
        }

        getQuoteByName = async (name) => {
        const res = await this.getResource(`${this._apibase_quotes}${name}`)   
        return res[0]?.sentence        
        }

       getCharacter = async(id) => {
        const res = await this.getResource(`${this._apibase}Characters/${id}`)
        return res
       } 
}


export default GotService