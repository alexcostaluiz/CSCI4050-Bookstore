const WikiService = {
  fetchAuthor: async (author) => {
    const base = 'https://en.wikipedia.org/w/api.php';
    let params =
      '?action=query&list=search&format=json&origin=*' +
      `&srsearch=${author.replaceAll(' ', '%20')}`;
    let url = `${base}${params}`;
    let response = await fetch(url);
    let data = await response.json();
    const results = data.query.search;

    let i = 0;
    while (results.length > i) {
      const pageid = results[i++].pageid;
      params =
        '?action=query&prop=extracts|pageimages&format=json&exintro' +
        '&explaintext&piprop=original&exchars=650&origin=*' +
        `&pageids=${pageid}`;
      url = `${base}${params}`;
      response = await fetch(url);
      data = await response.json();

      const pages = data.query.pages;
      const keys = Object.keys(pages);
      if (!keys.includes('-1')) {
        const wiki = pages[keys[0]];
        if (!wiki.extract.slice(0, 100).match(/.*refers? to.*/g)) {
          const semi = wiki.extract.indexOf(';');
          const paren = wiki.extract.indexOf('(');
          if (semi > 0 && semi < 100 && semi > paren) {
            wiki.extract =
              wiki.extract.slice(0, paren + 1) + wiki.extract.slice(semi + 2);
          }
          wiki.extract = wiki.extract.replaceAll('\n', '\n\n');
          return wiki;
        }
      }
    }
    return null;
  },
};

export default WikiService;
