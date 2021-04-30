const readline = require('readline');
const inbox = require('./inbox');

const askOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'single',
  borderColor: 'yellow',
  backgroundColor: '#333',
};

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(inbox(query, askOptions), (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

module.exports = askQuestion;
