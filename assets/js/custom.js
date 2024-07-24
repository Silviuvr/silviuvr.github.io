function addHeaderToCodeBlocks() {
    // Select all code blocks
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
        // Create a new header div
        const headerDiv = document.createElement('div');
        headerDiv.className = 'code-header';

        // Create a span for the left-side text with smaller font size
        const headerText = document.createElement('span');
        headerText.className = 'header-text';
        const languageClass = block.className.replace('language-', '');
        headerText.textContent = `swift`;

        // Create the copy button
        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-code-button');
        copyButton.innerHTML = '<i class="far fa-copy"></i>';

        // Add click event listener to copy button
        copyButton.addEventListener('click', () => {
            const codeToCopy = block.querySelector('code').innerText;
            navigator.clipboard.writeText(codeToCopy);

            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
            }, 1500);
        });

        // Append the header text and copy button to the header
        headerDiv.appendChild(headerText);
        headerDiv.appendChild(copyButton);

        // Insert the header div before the code block
        block.parentNode.insertBefore(headerDiv, block);
    });
}

document.addEventListener("DOMContentLoaded", addHeaderToCodeBlocks);
