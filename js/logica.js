const url = `/js/productos.json`;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const comprasCarrito = document.getElementById('compras-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cantidadCarrito = document.getElementById('cantidad-carrito');

const renderizarCarrito = () => {
    comprasCarrito.innerHTML = '';
    for (const producto of carrito) {

        const { img, nombre, precio, cantidad, id } = producto;
        comprasCarrito.innerHTML += `
            <div class="cards-menu-compras">
                <div class="menu-info">
                    <img src='${img}'/>
                    <p>${nombre}</p>
                </div>
                <p>$${precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <button class="remover-producto" id="${id}">Eliminar</button>
            </div> 
        `;   
    }

    const removerProducto = document.querySelectorAll('.remover-producto');
    removerProducto.forEach(boton =>{
        boton.addEventListener('click', ()=>{
            const productoId = parseInt(boton.id);
            const productoIndex = carrito.findIndex(producto => producto.id === productoId);
            if(productoIndex !== -1){
                carrito.splice(productoIndex, 1);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-start',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  Toast.fire({
                    icon: 'success',
                    title: 'Producto eliminado 🛒'
                  })  
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
            }
        })
    })
            
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCarrito.innerText = `$${total}`;
    
    cantidadCarrito.innerText = carrito.length;
    carrito.length > 0 ? cantidadCarrito.style.backgroundColor = '#fff': cantidadCarrito.style.backgroundColor = 'transparent';
};


const agregarProducto = (producto) => {
    const productoCarrito = carrito.find(item => item.nombre === producto.nombre);
     productoCarrito ? productoCarrito.cantidad += 1 : carrito.push({ ...producto, cantidad: 1 });
    

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
};

const productos = async ()=>{
    const respuesta =  await fetch(url);
    const data =  await respuesta.json();
    const celulares = data[0];

    const cardsCelular = document.getElementById('cards-celular');
    for(const celular of celulares){
        const {id, nombre, precio, img} = celular;
        cardsCelular.innerHTML +=`
            <div class="cards-body">
                <img src='${img}'/>

                <div class="cards-info">
                    <h3>${nombre}</h3>
                    <p>$${precio}</p>
                    <button id='${id}'>Comprar</button>
                </div>
            </div>
        `          
    }
    celulares.forEach(celular =>{
        const btn = document.getElementById(`${celular.id}`);
        btn.addEventListener('click', ()=>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Producto en tu carrito 🛒'
              })   
            agregarProducto(celular)
        })
    })

    const respueta1 = await fetch(url);
    const data1 = await respueta1.json();
    const tvs = data1[1];

    const cardsTv = document.getElementById('cards-tv');
    for(const tv of tvs){
        const {id, nombre, precio, img} = tv;
        cardsTv.innerHTML +=`
        <div class="cards-body cards-body-tv">
            <img src='${img}'/>

            <div class="cards-info">
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <button id='${id}'>Comprar</button>
            </div>
        </div>
        `
    }
    tvs.forEach(tv =>{
        const btn = document.getElementById(`${tv.id}`);
        btn.addEventListener('click', ()=>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Producto en tu carrito 🛒'
              })  
            agregarProducto(tv)
        })
    })


    const respueta2 = await fetch(url);
    const data2 = await respueta2.json();
    const notebooks = data2[2];

    const cardsNotebook = document.getElementById('cards-notebook');
    for(const notebook of notebooks){
        const {id, nombre, precio, img} = notebook;
        cardsNotebook.innerHTML +=`
        <div class="cards-body cards-body-notebook">
            <img src='${img}'/>

            <div class="cards-info">
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <button id='${id}'>Comprar</button>
            </div>
        </div>
        `
    }

    notebooks.forEach(notebook =>{
        const btn = document.getElementById(`${notebook.id}`);
        btn.addEventListener('click', ()=>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Producto en tu carrito 🛒'
              })  
            agregarProducto(notebook)
        })
    })
    renderizarCarrito();
}



productos();
const compraFinalizada = () => {
    carrito = [];
    comprasCarrito.innerHTML= '';
    totalCarrito.innerHTML='';
    cantidadCarrito.innerHTML='';
    cantidadCarrito.style.backgroundColor = 'transparent';
    localStorage.removeItem('carrito'); 

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Muchas gracias por su compra llegara en 72hs',
        showConfirmButton: false,
        timer: 1500
    });
    
};

const finalizarCompra = document.getElementById('finalizar-compra');
finalizarCompra.addEventListener('click', compraFinalizada);

const menuCarrito = document.getElementById('menu-carrito');
const abrirMenu = ()=>{
    menuCarrito.style.width= '50%'
}
const openMenuCompras = document.getElementById('open-menu-compras');
openMenuCompras.addEventListener('click', abrirMenu);


const cerrarMenu = ()=>{
    menuCarrito.style.width='0'
}
const closeMenuCompras = document.getElementById('close-menu-compras');
closeMenuCompras.addEventListener('click', cerrarMenu);


const cambiarColor = ()=>{
    const scrollY = window.scrollY;
    const header = document.getElementById('header');

    if(scrollY > 150){
        header.style.backgroundColor = '#000'
        header.style.height = '90px'
    }else{
        header.style.backgroundColor = 'transparent'
        header.style.height = '70px'
    }
}
window.addEventListener('scroll', cambiarColor);

