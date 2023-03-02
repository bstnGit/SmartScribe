// ↓ Put your API key here ↓
const API_KEY = "";

// Submit button
const submitButton = document.getElementById("submit-button");

// Input text area
const inputText = document.getElementById("text-input");

// Writing style selection & container
const writingStyleContainer = document.getElementById("writing-style-container");
const writingStyleSelection = document.getElementById("writing-style");

// Level of correction as written text
const lvlOfCorrectionList = ["Basic spelling and grammar correction.", "Advanced spelling, grammar correction and an improved style.", "Full rewriting of the text in a"];
// Level of correction selection
const lvlOfCorrectionSelection = document.getElementById("lvlOfCorrection");

// Submit button on click listener
submitButton.addEventListener("click", async () => {
  const selectedWritingStyle = writingStyleSelection.options[writingStyleSelection.selectedIndex].value;
  const selectedLvlOfCorrection = lvlOfCorrectionSelection.options[lvlOfCorrectionSelection.selectedIndex].value;

  // Prompt to send to API split into Instructions, Text, and Response
  const prompt = "Instructions:" + lvlOfCorrectionList[selectedLvlOfCorrection] + ((selectedLvlOfCorrection == 0) ? selectedWritingStyle + "style" : "") + "\n" +
                  "Text: " + inputText.value + "\n" +
                  "Return:";

  inputText.value = prompt;

  const text = await apiRequest(prompt, 128, 0.7);
  inputText.value = text;
});

async function apiRequest(prompt, max_tokens, temperature) {
  const apiUrl = "https://api.openai.com/v1/completions";
  const model = "text-davinci-003";

  // Body of request that is send to the API
  const requestBody = {
    model: model,
    prompt: prompt,
    max_tokens: max_tokens,
    temperature: temperature,
  };

  // Request to the API is saved in response and saved as a JSON file
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const responseBody = await response.json();
  // Get necessary part from JSON responds
  const text = responseBody.choices[0].text.trim();

  return text;
}

lvlOfCorrectionSelection.addEventListener("change", () => {
  if (lvlOfCorrectionSelection.value > 0) {
    writingStyleContainer.style.display = "none";
  } else {
    writingStyleContainer.style.display = "block";
  }
});