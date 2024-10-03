const tagSelect = document.getElementById('tagSelect');
const contentInput = document.getElementById('contentInput');
const addContentBtn = document.getElementById('addContentBtn');
const contentContainer = document.getElementById('contentContainer');
const clearContentBtn = document.getElementById('clearContentBtn');

const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');


let savedContent = JSON.parse(localStorage.getItem('pageContent')) || [];

// Function to render the saved content
function renderContent() {
    contentContainer.innerHTML = ''; 
    savedContent.forEach((block, index) => {
        const contentBlock = document.createElement(block.tag);
        contentBlock.innerHTML = block.content;
        contentBlock.contentEditable = 'true'; 
        contentBlock.classList.add('editable');
        
        // Save changes to localStorage when the content is edited
        contentBlock.addEventListener('input', () => {
            savedContent[index].content = contentBlock.innerHTML;
            localStorage.setItem('pageContent', JSON.stringify(savedContent));
        });

        contentContainer.appendChild(contentBlock);
    });
}

// Function to add new content
function addContent() {
    const tag = tagSelect.value;
    const content = contentInput.value.trim();
    if (!content) {
        alert('Please enter some content!');
        return;
    }

    const newContentBlock = { tag, content };
    savedContent.push(newContentBlock);
    localStorage.setItem('pageContent', JSON.stringify(savedContent)); 
    renderContent(); 

    contentInput.value = ''; 
}

// Text styling function using Selection and Range API
function wrapSelectedText(tag) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Create the desired tag (b, i, u)
        const wrapper = document.createElement(tag);
        wrapper.appendChild(range.extractContents());
        range.insertNode(wrapper);

        // Clear the selection
        selection.removeAllRanges();
    }
}

// Apply bold style
boldBtn.addEventListener('click', () => wrapSelectedText('b'));

// Apply italic style
italicBtn.addEventListener('click', () => wrapSelectedText('i'));

// Apply underline style
underlineBtn.addEventListener('click', () => wrapSelectedText('u'));

// Add new content on button click
addContentBtn.addEventListener('click', addContent);

// Clear all content and reset localStorage
clearContentBtn.addEventListener('click', () => {
    localStorage.removeItem('pageContent');
    savedContent = [];
    renderContent();
});

// Render saved content on page load
window.addEventListener('load', renderContent);
