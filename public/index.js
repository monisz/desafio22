const socket = io();

//Mensajes
const sendMessage = () => {
    const email = document.getElementById("email").value;
    const date = String(new Date().toDateString() + ' ' + new Date().toLocaleTimeString());
    const text = document.getElementById("text").value;
    const message = { email, date, text };
    socket.emit("newMessage", message);
    return false;
};


const showMessage = (message) => {
    const { email, date, text } = message;
    return `
        <div style="display:flex">
            <strong style="color:blue">${email}</strong> 
            <p style="color:brown">${date}</p>
            <i style="color:green"> : ${text}</i>
        </div>
    `;
};

const addMessage = (messages) => {
    const allMessages = messages.map(message => showMessage(message)).join(" ");
    document.getElementById("messages").innerHTML = allMessages;
    document.getElementById("text").value = '';
};

socket.on('messages', (messages) => {
    addMessage(messages);
});


//Productos
const sendProduct = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const timestamp  = Date.now();
    const product = { title, description, code, thumbnail, price, stock, timestamp };
    console.log("product en index", product)
    socket.emit("newProduct", product);
    return false;
};

const showProduct = (product) => {
    const { title, price, thumbnail } = product;
    return `
        <tr>
            <td>${title}</td>
            <td>${price}</td>
            <td><img src="${thumbnail}" height="50rem"></td>
        </tr>
    `;
};

const addProduct = (products) => {
    if (products.length == 0)
        document.getElementById("titles").innerHTML = `
            <h3 style="background-color:aquamarine; color:black">No se encontraron productos</h3><br>
        `;
    else {
        document.getElementById("titles").innerHTML = `
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        `;
        const allProducts = products.map(product => showProduct(product)).join(" ");
        document.getElementById("listProducts").innerHTML = allProducts;
        document.getElementById("title").value = '';
        document.getElementById("price").value = '';
        document.getElementById("thumbnail").value = '';
    }      
};

socket.on('products', (allProducts) => {
    addProduct(allProducts);
});