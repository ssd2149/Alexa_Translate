const Alexa = require("alexa-sdk");
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('RapidAPI2593', 'ee4578ae-93c9-4043-9b2a-8479eb3ab41b');

var handlers = {
  'LaunchRequest': function() {
    this.emit(':ask', "Welcome to the translate skill. Say something like translate butterfly to German");
  },

  'Translate': function() {
   const langCodes = {
        "German" : "de",
        "Dutch" : "nl",
        "English" : "en",
        "French" : "fr",
        "Italian" : "it",
        "Polish" : "pl",
        "Russian" : "ru",
        "Spanish" : "es"
    };

    var language = this.event.request.intent.slots.Language.value;
    var word = this.event.request.intent.slots.Source.value;
    var langCode = langCodes[language];

    rapid.call('GoogleTranslate', 'translateAutomatic', {
	     'apiKey': 'AIzaSyDLILpqy5Mu5HcdLWwQm4j8snZ9_Kazcb8',
	      'string': word,
	      'targetLanguage': langCode

    }).on('success', (payload) => {
      this.emit(":tell", `${word} is ${payload} in ${language}`);
    }).on('error', (payload) => {
      this.emit(":tell", "Sorry, translation was unsuccessful..");
    });

  }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
