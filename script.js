// const phaseOne = document.querySelector('.lebron-james-js');
// const suggestion = document.querySelectorAll('.suggestion');
// const phaseTwo = document.querySelector('.micheal-jordan-js');

// const userInput = document.querySelector('.prompt-input');
// const displayInput = document.querySelector('.user-input-js');
// const layoutConversation = document.querySelector('.conversation-js'); 
// const apiResponse = document.querySelector('.api-response-js');

// function onclickShowConversation() {
//   suggestion.forEach(function (suggestionElement) {
//     suggestionElement.addEventListener('click', function () {
      
//       if (phaseOne) {
//         phaseOne.style.display = 'none';
//         phaseTwo.classList.add('micheal-jordan');
//         phaseTwo.style.display = 'flex';
//       }

//       if (phaseTwo) {
//         layoutConversation.classList.add('conversation');
//         displayInput.classList.add('user-input');

//         // Get the text inside the clicked suggestion
//         const clickedText = suggestionElement.querySelector('.suggestion-js').textContent;

//         // Set it as the displayed input
//         displayInput.textContent = clickedText;
//         displayInput.style.display = 'flex';
//         apiResponse.classList.add('api-response');
//       }
//     });
//   });
// };
// onclickShowConversation();



// function onEnterShowConversation(event) {
//   userInput.addEventListener('keydown', function (event) {
//     if (event.key === 'Enter' && userInput.value.trim() !== "") { // Ensure input isn't empty
//       if (phaseOne) {
//         phaseOne.style.display = 'none';
//         phaseTwo.classList.add('micheal-jordan');
//         phaseTwo.style.display = 'flex';
//         userInput.classList.add('user-input-phaseTwo');
//         userInput.style.display = 'flex'; 
//       }

//       if (phaseTwo) {
//         layoutConversation.classList.add('conversation');
//         displayInput.textContent = userInput.value; // Set text to user input
//         displayInput.classList.add('user-input');
//         apiResponse.classList.add('api-response');
//       }

//       // Clear input after showing text
//       userInput.value = "";
//     }
//   });
// }
// onEnterShowConversation();

const API_KEY = 'AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const phaseOne = document.querySelector('.lebron-james-js');
const suggestion = document.querySelectorAll('.suggestion');
const phaseTwo = document.querySelector('.micheal-jordan-js');

const userInput = document.querySelector('.prompt-input');
const userInputSection  = document.querySelector('.prompt-input-section') // Keep input always accessible
const displayInput = document.querySelector('.user-input-js');
const layoutConversation = document.querySelector('.conversation-js');
const apiResponseContainer = document.querySelector('.api-response-js'); // Container for responses

let promptHistory = []; // Store conversation history

// Function to send API request and update response div
async function fetchAIResponse(userText) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userText }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

        // Append AI response to conversation
        appendMessage("ai", aiText); 

        // Store in history
        promptHistory.push({ prompt: userText, response: aiText });

    } catch (error) {
        appendMessage("ai", "Error fetching response. Check API key or network.");
        console.error("API Error:", error);
    }
}

// Function to append messages dynamically
function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "ai-message");
    messageDiv.textContent = text;
    layoutConversation.appendChild(messageDiv);

    // Scroll to the latest message
    layoutConversation.scrollTop = layoutConversation.scrollHeight;
}

// Function to show phaseTwo and allow continuous conversation
function showConversation(userText) {
  if (phaseOne) {
      phaseOne.style.display = 'none';
      phaseTwo.classList.add('micheal-jordan');
      phaseTwo.style.display = 'flex';

      // Move input section inside phaseTwo dynamically
      if (!phaseTwo.contains(userInputSection)) {
          phaseTwo.appendChild(userInputSection);
      }

      userInputSection.style.display = 'flex'; // Make sure it's visible
  }

  appendMessage("user", userText);
  fetchAIResponse(userText);
}

// Event listener for clicking a suggestion
suggestion.forEach(suggestionElement => {
    suggestionElement.addEventListener('click', function () {
        const clickedText = suggestionElement.querySelector('.suggestion-js').textContent;
        showConversation(clickedText);
    });
});

function displayMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  // Format response (preserve paragraphs and simple formatting)
  text = text.replace(/\n/g, "<br>");
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // **bold**
  text = text.replace(/\*(.*?)\*/g, "<i>$1</i>"); // *italic*
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>"); // Inline code
  text = text.replace(/- (.*?)\n/g, "<li>$1</li>"); // Convert lists

  messageDiv.innerHTML = text;
  conversation.appendChild(messageDiv);

  conversation.scrollTop = conversation.scrollHeight; // Auto-scroll to the latest message
}

// Event listener for pressing Enter
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && userInput.value.trim() !== "") {
        const userText = userInput.value.trim();
        userInput.value = "";  // Clear input after sending
        showConversation(userText);
    }
});



// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Replace with your actual API key
//
// const genAI = new GoogleGenerativeAI(API_KEY);

// async function getGeminiResponse(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response.text();
//     console.log("Gemini Response:", response);
//   } catch (error) {
//     console.error("Error fetching response:", error);
//   }
// }

// // Example usage
// const userPrompt = "Explain how AI works in simple terms.";
// getGeminiResponse(userPrompt);


