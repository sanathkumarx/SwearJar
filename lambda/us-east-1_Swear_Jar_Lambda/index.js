/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
var endFlag = 0;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to your swear jar, how can i help you?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('swe*r j*r', speechText)
      .getResponse();
  },
};

const addCoinIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'addCoinIntent';
  },
  
  async handle(handlerInput) {
    let speechText = ``;
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    const Coins = handlerInput.requestEnvelope.request.intent.slots.noCoins.value;
    console.log('XXXXXXXXXXXXXX'+ Coins);
    var flagcoin = 0;
    var noCoins = parseInt(Coins, 10);
    if (isNaN(noCoins) || noCoins == 0) noCoins = 1;
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'+ noCoins);
    if(noCoins != null ){flagcoin = 1;}
    if (Object.keys(attributes).length === 0){
      attributes.noOfcoins = 1;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechText = `You have ${attributes.noOfcoins} coin in your jar`;
    } else{
      if(flagcoin == 1){attributes.noOfcoins += noCoins;}
      else{attributes.noOfcoins += 1;}
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechText = `You now have ${attributes.noOfcoins} coins in your jar`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('swe*r j*r', speechText)
      .getResponse();
  },
};


const whatsInMyJarIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'whatsInMyJarIntent';
  },
  async handle(handlerInput) {
    let speechText = ``;
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    if (Object.keys(attributes).length === 0){
      attributes.noOfcoins = 0;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechText = 'Your jar is empty';
    } else{
      speechText = `You have ${attributes.noOfcoins} coins in your jar .Do you want to add coins to your jar?`;
    }
    const reprompttext = "How can i help you?"
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('swe*r j*r', speechText)
      .reprompt(reprompttext)
      .getResponse();
  },
};

const removeCoinsIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'removeCoinsIntent';
  },
  async handle(handlerInput) {
    let speechText = ``;
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    const Coins = handlerInput.requestEnvelope.request.intent.slots.noCoins.value;
    var flagcoin = 0;
    var noCoins = parseInt(Coins, 10);
    if (isNaN(noCoins) || noCoins == 0) noCoins = 1;
    if(noCoins != null ){flagcoin = 1;}
    var flag =0;
    if (Object.keys(attributes).length === 0){
      attributes.noOfcoins = 0;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechText = 'I can\'t remove coins from an empty jar can I?';
    } else{
      if(attributes.noOfcoins <=0){attributes.noOfcoins = 0; flag=1;}
      else if(flagcoin == 1){attributes.noOfcoins -= noCoins;}
      else{attributes.noOfcoins -= 1;}
      if(attributes.noOfcoins < 0){attributes.noOfcoins =0;}
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      if(flag==1){speechText = `There are no coins in your jar for them to be removed`;}
      else{speechText = `You now have ${attributes.noOfcoins} coins in your jar`;}
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('swe*r j*r', speechText)
      .getResponse();
  },
};

const emptyMyJarIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'emptyMyJarIntent';
  },
  async handle(handlerInput) {
    let speechText = '';
    const attributesManager = handlerInput.attributesManager;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var flag =0;
    if (Object.keys(attributes).length === 0){
      attributes.noOfcoins = 0;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      speechText = 'I can\'t empty an empty jar can I?';
    } else{
      if(attributes.noOfcoins == 0){flag =1;}
      attributes.noOfcoins = 0;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
      if(flag ==1){speechText = 'I can\'t empty an empty jar can I?';}
      else{speechText = 'I have emptied your jar';}
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('swe*r j*r', speechText)
      .getResponse();
  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'I can add and remove coins to your jar. How many coins you want to add or remove from your jar?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const FallbackHandler = {

  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },

  handle(handlerInput) {
  const FALLBACK_MESSAGE = ` I can't help you with that. I can help you add and remove coins to your jar. What do you want me to do?`;
  const FALLBACK_REPROMPT = 'If you want to know how many coins you have in your jar say, Whats in my jar?. What would you like me to do?';
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};


const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    addCoinIntent,
    whatsInMyJarIntent,
    removeCoinsIntent,
    emptyMyJarIntent,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('Swear_jar')
  .withAutoCreateTable(true)
  .lambda();
