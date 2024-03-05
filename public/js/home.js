document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');
    const text = textElement.innerText;
    textElement.innerText = ''; // Clear text content
  
    let index = 0;
    let isTyping = true;
  
    function typeText() {
      if (index < text.length && isTyping) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100); // Adjust typing speed here (in milliseconds)
      } else {
        isTyping = false;
        cursorElement.style.opacity = '0'; // Hide cursor when finished typing
        setTimeout(eraseText, 1000); // Wait 1 second before erasing
      }
    }
  
    function eraseText() {
      if (index >= 0 && !isTyping) {
        const newText = text.substring(0, index - 1);
        textElement.textContent = newText;
        index--;
        setTimeout(eraseText, 100); // Adjust erasing speed here (in milliseconds)
      } else {
        isTyping = true;
        cursorElement.style.opacity = '1'; // Show cursor when finished erasing
        setTimeout(typeText, 1000); // Wait 1 second before typing again
      }
    }
  
    typeText(); // Start typing initially
});
  