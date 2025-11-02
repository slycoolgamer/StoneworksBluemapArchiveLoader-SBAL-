// Create and inject image overlay on the Stoneworks map
function injectImageOverlay() {
  // Check if overlay already exists
  if (document.getElementById('slys-tools-overlay')) {
    return;
  }

  // Create image element
  const overlay = document.createElement('img');
  overlay.id = 'slys-tools-overlay';
  overlay.src = chrome.runtime.getURL('icons/label.png'); // Change this to your image path
  
  // Style the overlay
  overlay.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 600px;
    height: 140px;
    z-index: 10000;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.2s;
  `;

  // Add hover effect
  overlay.addEventListener('mouseenter', () => {
    overlay.style.transform = 'scale(1.1)';
  });

  overlay.addEventListener('mouseleave', () => {
    overlay.style.transform = 'scale(1)';
  });

  // Optional: Click to open extension popup or perform action
  overlay.addEventListener('click', () => {
    console.log('Slys Tools overlay clicked!');
    // You could add functionality here
  });

  // Inject into page
  document.body.appendChild(overlay);
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectImageOverlay);
} else {
  injectImageOverlay();
}