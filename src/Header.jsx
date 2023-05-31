import axios from "axios";
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const Header = () => {
  async function summarizeText(url) {
    try {
      const response = await axios.post(apiUrl, {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": "Extract the main contents from the following url : " + url + " and then Summarize content in atmost 1000 words in nice and efficient manner" }],
        "temperature": 0.9
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });

      document.getElementById('summarize_txt').style.display = 'block';
      document.getElementById('loader').style.display = 'none';
      const summary = response.data.choices[0].message["content"].trim();
      console.log('Summary:', summary);
      document.getElementById('summarize_txt').innerHTML = summary;
    } catch (error) {
      console.error('Error occurred while summarizing:', error);
    }
  }

  function summarize() {
    const url = document.getElementById('url').value.trim();

    if (validate(url)) {
      document.getElementById('error_txt').style.display = 'none';
      document.getElementById('summarize_txt').style.display = 'none';
      document.getElementById('loader').style.display = 'block';
      summarizeText(url);
    } else {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('error_txt').style.display = 'block';
      document.getElementById('url').focus();
    }
  }

  function validate(url) {
    var pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (url === null || url === "" || !pattern.test(url)) {
      return false;
    }
    return true;
  }


  return (
    <div className="header">
      <h1 id="title">Article Summarizer</h1>
      <p id="metadata">Say hello to Article Summarizer - Ultimate Tool For Busy Readers</p>
      <div className="form-group">
        <input type='url' placeholder='Enter article link for summary' className="form-control col-md-6" id='url' required />
      </div>
      <p><span id="error_txt" className="text-danger" style={{ display: 'none' }}>Please enter valid URL !!</span></p>
      <button type='button' className="btn btn-primary" onClick={(e) => summarize()}>Summarize</button>
    </div>
  );
}

export default Header;
