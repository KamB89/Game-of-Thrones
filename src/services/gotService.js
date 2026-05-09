class GotService {
  _apibase = 'https://thronesapi.com/api/v2/'
  _apibase_quotes = 'https://api.gameofthronesquotes.xyz/v1/author/'

  getResource = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const text = await res.text();

      if (!text) {
        return null;
      }

      return JSON.parse(text);

    } catch (e) {
      console.error('Fetch error:', e);
      return null;
    }
  };

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apibase}Characters`)
    return res
  }
  getQuotes = async () => {
    const res = await this.getResource(`${this._apibase_quotes}`)

    return res
  }

  getQuoteByName = async (name) => {
    const res = await this.getResource(
      `${this._apibase_quotes}${name}/2`
    );

    if (!res || !Array.isArray(res) || res.length === 0) {
      return 'No quote available';
    }

    return res[0].sentence;
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apibase}Characters/${id}`)
    return this._transformCharacter(res)
  }

  // getBooks = async(name)=>{
  //   const res = await fetch("https://www.anapioficeandfire.com/api/characters")
  //   const data = await res.json()
    
  //   return data

  // }


   getBooks = async (name) => {

    const res = await fetch(
        `https://www.anapioficeandfire.com/api/characters?name=${name}`
    );

    return await res.json();
}


  _transformCharacter = (res) => {

    return {
      id: res.id || '',
      fullname: res.fullName || '',
      imageUrl: res.imageUrl || '',
      title: res.title || '',
      family: res.family || '',
    }

  }

 
}


export default GotService