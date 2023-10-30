let globalStyleElement: HTMLStyleElement;
const isClient = typeof window !== 'undefined';

function justOnceCreateStyleElement() {
  if (!globalStyleElement && isClient) {
    globalStyleElement = document.createElement('style');
    document.head.appendChild(globalStyleElement);
  }

  return globalStyleElement;
}

const isInserted = new Set();

export function insertionCSS(rule: string) {
  if (!isInserted.has(rule) && isClient) {
    isInserted.add(rule);
    const styleElement = justOnceCreateStyleElement();
    styleElement.textContent = rule;
  }
}
