import { router, store } from '../../pbj-bundle.js';

// Private event handler functions inside this file's scope
function onAddItemClick() {
  store.dispatch('ADD_TO_CART', 1);
}

function onHeaderHover(e) {
  e.target.style.color = 'var(--primary-color)';
}

// Export a clean, standardized page controller object
export const screen1View = {
  title: 'Example',
  
  render() {
    const { user, cartCount } = store.getState();
    return html`
      <h1 id="dash-title">Welcome, ${user.name}!</h1>
      <p>Cart items: <strong>${cartCount}</strong></p>
      <button id="add-btn">Add Item</button>
    `;
  },

  initEvents() {
    // Easily bind multiple complex events here
    document.getElementById('add-btn')?.addEventListener('click', onAddItemClick);
    document.getElementById('dash-title')?.addEventListener('mouseover', onHeaderHover);
  }
};