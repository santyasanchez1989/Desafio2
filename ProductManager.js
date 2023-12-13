const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.nextId = 1;
        this.path = filePath;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log(`Ya existe un producto con el código ${code}. No se añadió ningún producto.`);
            return;
        }

      
        const product = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.nextId++;

        
        this.saveToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const foundProduct = this.products.find(product => product.id === productId);
        if (foundProduct) {
            return foundProduct;
        }
        console.log(`Producto con ID ${productId} no encontrado.`);
        return null;
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, 2);

        fs.writeFileSync(this.path, data, 'utf8');
    }

    loadFromFile() {
        try {
            
            const fileData = fs.readFileSync(this.path, 'utf8');
           
            this.products = JSON.parse(fileData);
        } catch (error) {
            
            console.error('Error al cargar desde el archivo:', error.message);
        }
    }
}


const filePath = 'productos.json';
const productManager = new ProductManager(filePath);


productManager.loadFromFile();

// Productos
productManager.addProduct("Pelota", "Pelota de Tenis", 1.99, "imagen1.jpg", "P001", 50);
productManager.addProduct("Hueso", "Hueso chico", 5.99, "imagen2.jpg", "P002", 50);
productManager.addProduct("Pro Plan", "Balanceado cachorros 3kgs.", 9.99, "imagen3.jpg", "P003", 50);
productManager.addProduct("Comerdero Metalico", "Comedero metalico 25cms diametro.", 2.99, "imagen4.jpg", "P004", 50);
productManager.addProduct("Comedero plastico", "Comedero plastico forma de gato.", 2, "imagen5.jpg", "P005", 50);

const products = productManager.getProducts();
console.log("Productos:", products);

const productIdToFind = 10;
const foundProduct = productManager.getProductById(productIdToFind);

if (foundProduct) {
    console.log("Producto encontrado:", foundProduct);
}

