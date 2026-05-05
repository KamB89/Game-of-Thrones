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

    // 👉 ВОТ КЛЮЧЕВОЕ
    if (!text) {
      return null; // не падаем
    }

    return JSON.parse(text);

  } catch (e) {
    console.error('Fetch error:', e);
    return null; // не валим приложение
  }
};

        getAllCharacters = async () => {
          const res = await this.getResource(`${this._apibase}Characters`)
           return res
        }
        getQuotes = async () =>{
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

       getCharacter = async(id) => {
        const res = await this.getResource(`${this._apibase}Characters/${id}`)
        return res
       } 
}


export default GotService