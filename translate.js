const OpenAI = require('openai-api');
const openai = new OpenAI('YOUR_API_KEY');

async function vnToEn(text) {
  const prompt = `Translate this topic title of cyber security from Vietnamese to English:\n\n"${text}"\n\nEnglish translation:`;
  const response = await openai.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 1024,
    n: 1,
    stop: '\n\n',
    temperature: 0.7
  });
  const { choices } = response.data;
  const { text: translation } = choices[0];
  return translation.trim();
}

// Translate English to Vietnamese
async function enToVn(text) {
  const prompt = `Translate this topic title of cyber security English to Vietnamese:\n\n"${text}"\n\nVietnamese translation:`;
  const response = await openai.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 1024,
    n: 1,
    stop: '\n\n',
    temperature: 0.7
  });
  const { choices } = response.data;
  const { text: translation } = choices[0];
  return translation.trim();
}

module.exports = {
    enToVn,
    vnToEn
}