const { Telegraf } = require('telegraf');


let x;


fetch('http://localhost:3009/data-distance')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    x = data.dataDistance;
    console.log(x);

    if(x < 1000){
      const bot = new Telegraf ("7474411868:AAGn3ezpnzDB81N-ucX5ccJDq0Uyf9rZ3VQ");
      bot.telegram.sendMessage(6166088486, "Caixa d'agua esvaziando");
    }

  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });