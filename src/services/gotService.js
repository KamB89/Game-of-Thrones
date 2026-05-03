class GotService {
    _apibase = 'https://thronesapi.com/api/v2/'


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
}


export default GotService