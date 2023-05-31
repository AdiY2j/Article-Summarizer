import './App.css';
import './Header';
import './Loader';

import Header from './Header';
import Loader from './Loader';
// const cheerio = require('cheerio');


const App = () => {
  // async function scrapeText(url) {
  //   try {
  //     const response = await axios.get(url);
  //     const html = response.data;
  //     const $ = cheerio.load(html);

  //     // Exclude image and link tags
  //     $('img, a, link, style, script, iframe, input, nav, header, footer').remove();

  //     //Extract desired text
  //     const scrapedText = $('body').text().trim();

  //     return scrapedText;
  //   } catch (e) {
  //     console.error('Error occurred : ', e);
  //   }
  // }
  return (
    <div>
      <div><img className="github-logo" src={require('./github-mark.png')} alt='Github' /></div>
      <div className='body-content'>
        <Header />
        <Loader />
        <p id='summarize_txt' style={{ display: 'none' }}></p>
      </div>
    </div>
  );
}

export default App;
