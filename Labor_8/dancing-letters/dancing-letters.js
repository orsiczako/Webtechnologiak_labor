function isWhitespace(ch) {
  return /\s/.test(ch);
}

function wrapCharsInSpan(element) {
    const text = element.textContent;
    element.textContent = "";
    const fragment = document.createDocumentFragment();
    for (const ch of text) {
        if (!isWhitespace(ch)) {
            const span = document.createElement("span");
            span.textContent = ch;
            fragment.appendChild(span);
        } else {
            fragment.appendChild(document.createTextNode(ch));
        }
    }
    element.appendChild(fragment);
}

document.querySelectorAll(".dancing-letters").forEach(wrapCharsInSpan);