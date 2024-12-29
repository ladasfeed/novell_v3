export const setCursorType = (cursorType: 'default' | 'grabbing' | 'pointer') => {

    document.getElementsByTagName("body")[0].style.cursor = cursorType
}