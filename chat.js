// ===== CHAT FUNCTIONALITY =====
const WHATSAPP_NUMBER = '27718114209';

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatQuick = document.getElementById('chatQuick');

// Add a message to the chat
function addMsg(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${sender}`;
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  msgDiv.innerHTML = `
    ${text}
    <span class="time">${timeStr}</span>
  `;
  
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg bot';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) {
    typing.remove();
  }
}

// Send message to WhatsApp
function sendToWhatsApp(message) {
  if (!message || !message.trim()) return;
  
  // Add user message to chat
  addMsg(message, 'me');
  chatInput.value = '';
  
  // Show typing indicator
  showTyping();
  
  // Simulate bot response after delay
  setTimeout(() => {
    removeTyping();
    const botReply = `Thanks for your message! I'll open WhatsApp so we can continue the conversation there.`;
    addMsg(botReply, 'bot');
    
    // Open WhatsApp
    setTimeout(() => {
      const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
      window.open(url, '_blank');
    }, 700);
  }, 1000);
}

// ===== EVENT LISTENERS =====

// Send button click
if (chatSend) {
  chatSend.addEventListener('click', function() {
    sendToWhatsApp(chatInput.value);
  });
}

// Enter key on input
if (chatInput) {
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendToWhatsApp(chatInput.value);
    }
  });
}

// Quick reply buttons
if (chatQuick) {
  chatQuick.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const msg = this.dataset.msg;
      sendToWhatsApp(msg);
    });
  });
}

// Initial welcome message if chat is empty
document.addEventListener('DOMContentLoaded', function() {
  // Check if there are already messages (from HTML)
  const existingMessages = chatMessages.querySelectorAll('.msg');
  if (existingMessages.length === 0) {
    setTimeout(() => {
      addMsg('👋 Hi there! Welcome to Elion Tech.', 'bot');
      setTimeout(() => {
        addMsg('How can we help you today? Feel free to ask about our services, pricing, or share your project ideas!', 'bot');
      }, 800);
    }, 500);
  }
});