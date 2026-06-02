export function getCart() {
	let cart = localStorage.getItem("cart");
    
	if (cart == null) {
		cart = [];
		localStorage.setItem("cart", JSON.stringify(cart)); // Store the empty array as a string in localStorage
	}else{
        cart = JSON.parse(cart); // Convert the string back to an array
    }
	return cart;
}

export function removeFromCart(productId) {
    let cart = getCart();

    const newCart = cart.filter(
        (item)=>{
            return item.productId != productId;
        }
    )

    localStorage.setItem("cart", JSON.stringify(newCart));
}

export function addToCart(product, qty) {
	let cart = getCart(); // Get the existing cart from localStorage

	let index = cart.findIndex((item) => {
		return item.productId == product.productId; // Check if the product is already in the cart
	});

    if(index == -1){
        cart[cart.length] = {                   // If the product is not in the cart, add it as a new item
            productId : product.productId,
            productName : product.productName,
            imgUrls : [product.imgUrls[0]],
            sellingPrice : product.sellingPrice,
            labeledPrice : product.labeledPrice,
            qty : qty
        }
    }else{
        const newQty = cart[index].qty + qty; // If the product is already in the cart, update the quantity
        if(newQty<=0){
            removeFromCart(product.productId); // If the new quantity is less than or equal to 0, remove the product from the cart
            return;
        }else{
            cart[index].qty = newQty;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getTotal(){
    let cart = getCart();

    let total = 0;

    for(let i=0;i<cart.length;i++){
        total += cart[i].sellingPrice * cart[i].qty;
    }
    return total;
}