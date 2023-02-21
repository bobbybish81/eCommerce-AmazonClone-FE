export function compareProductCategory(a, b) {
  if (a.category < b.category) {
      return -1;
  }
  if (a.category > b.category) {
      return 1;
  }
  return 0;
}

export const newTotal = (price, quantity) => {
  const total = price * quantity;
  return total.toFixed(2)
}

export const totalItems = (cart) => {
  const totalItems = cart.map(product => product.quantity);
  return totalItems.reduce((a,b) => a + b);
}

export const totalAmount = (cart) => {
  const productTotals = cart.map(product => product.price * product.quantity);
  const total = productTotals.reduce((a,b) => a + b);
  return total.toFixed(2);
}

export const addToCart = (product) => {
  const getCart = JSON.parse(localStorage.getItem('MY_CART'));
  const existingItem = getCart.find(item => item.id === product.id);
  const allOtherItems = getCart.filter(item => item.id !== product.id);
  if (existingItem) {
    existingItem.quantity = existingItem.quantity + 1;
    existingItem.total = newTotal(existingItem.price, existingItem.quantity);
    const updateCart = [existingItem, ...allOtherItems];
    localStorage.setItem('MY_CART', JSON.stringify(updateCart))
    alert(`${product.title} added to cart`);
  }
  if (!existingItem) {
    const priceStr = product.price.replace('$', '');
    const price = parseFloat(priceStr);
    const newItem = {id: product.id, title: product.title, price: price, quantity: 1, total: price}
    const newCart = [newItem, ...allOtherItems];
    localStorage.setItem('MY_CART', JSON.stringify(newCart));
    alert(`${product.title} added to cart`);
  }
}

export const deleteFromCart = (title, setCart) => {
  const getCart = JSON.parse(localStorage.getItem('MY_CART'));
  const index = getCart.findIndex(product => product.title === title);
  getCart.splice(index, 1);
  setCart(getCart);
  alert(`${title} removed from cart`)
}

export default {
  compareProductCategory,
  newTotal,
  totalAmount,
  addToCart,
  deleteFromCart,
}