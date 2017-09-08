let defaultTop = {
  "0x02A0DF": "bartaz test 43 13",
  "0xB2A0AB": "bartaz test 43 10",
  "0x440091": "bartaz test 64  9"
};

function readTopScores() {
  let scores;
  if (localStorage) {
    try {
      scores = localStorage.getItem('LOST_IN_CYBERSPACE_TOP_HACKERS');
      scores = JSON.parse(scores);
    } catch (e) {
      // just ignore and return default
    }
  }
  return scores || JSON.parse(JSON.stringify(defaultTop));
}

function saveTopScores(scores) {
  if (localStorage) {
    localStorage.setItem('LOST_IN_CYBERSPACE_TOP_HACKERS', JSON.stringify(scores));
  }
}

function getTopScores(code, name) {
  let scores = readTopScores();

  if (code) {
    scores[code] = name;
  }

  saveTopScores(scores);

  let scoresList = [];
  Object.keys(scores).forEach(key => scoresList.push([ key, scores[key] ]));

  scoresList = scoresList.map(entry => {
    let score = codeToScore(entry[0]);
    return { code: entry[0], name: entry[1], time: score.time, moves: score.moves }
  });

  scoresList.sort((a, b) => a.time !== b.time ? b.time - a.time : a.moves - b.moves);

  return scoresList;
}
