// src/data/DatosProductos.js
const datosProductos = [
    // Vinos Dulces
    {
      id: 'vino-encanto-botella-750ml',
      name: 'Vino Encanto del Valle Botella',
      description: 'Presentación: Caja x 12 unds',
      presentation: 'Botella: 750 ml',
      price: 30000, // Precio Detal, lo usaremos para agregar al carrito
      priceBox: 336000, // Precio Caja
      image: '/img/Vino Botella.jpg',
      category: 'vinos',
      comingSoon: false,
    },
    {
      id: 'vino-encanto-mini-150ml',
      name: 'Vino Encanto del Valle Mini',
      description: 'Presentación: Caja x 24 unds',
      presentation: 'Botella: 150 ml',
      price: 10000, // Precio Detal
      priceBox: 204000, // Precio Caja
      image: '/img/Vino Mini.jpg',
      category: 'vinos',
      comingSoon: false,
    },
  
    // Cremas de Whisky
    {
      id: 'crema-whisky-1',
      name: 'Crema de Whisky Producto 1',
      description: 'Próximamente',
      presentation: '',
      price: null,
      image: '/img/Proximamente.png',
      category: 'cremas-whisky',
      comingSoon: true,
    },
    {
      id: 'crema-whisky-2',
      name: 'Crema de Whisky Producto 2',
      description: 'Próximamente',
      presentation: '',
      price: null,
      image: '/img/Proximamente.png',
      category: 'cremas-whisky',
      comingSoon: true,
    },
    {
      id: 'crema-whisky-3',
      name: 'Crema de Whisky Producto 3',
      description: 'Próximamente',
      presentation: '',
      price: null,
      image: '/img/Proximamente.png',
      category: 'cremas-whisky',
      comingSoon: true,
    },
  
    // Mistelas
    {
      id: 'mistela-lulo-500ml',
      name: 'Mistela de Lulo',
      description: '',
      presentation: 'Botella: 500 ml',
      price: 32000,
      image: '/img/Mistela Lulo.jpg',
      category: 'mistelas',
      comingSoon: false,
    },
    {
      id: 'mistela-maracuya-500ml',
      name: 'Mistela de Maracuyá',
      description: '',
      presentation: 'Botella: 500 ml',
      price: 30000,
      image: '/img/Mistela Maracuyá.jpg',
      category: 'mistelas',
      comingSoon: false,
    },
  
    // Zumo
    {
      id: 'zumo-uva-integral-250ml',
      name: 'Zumo Integral de Uva',
      description: 'Presentación: Caja x 24 unds',
      presentation: 'Botella: 250 ml',
      price: 10000, // Precio Detal
      priceBox: 179990, // Precio Caja
      image: '/img/Zumo De Uva.jpg',
      category: 'zumo',
      comingSoon: false,
    },
  
    // Accesorios
    {
      id: 'accesorio-1',
      name: 'Accesorio Producto 1',
      description: 'Próximamente',
      presentation: '',
      price: null,
      image: '/img/Proximamente.png',
      category: 'accesorios',
      comingSoon: true,
    },
    {
      id: 'accesorio-2',
      name: 'Accesorio Producto 2',
      description: 'Próximamente',
      presentation: '',
      price: null,
      image: '/img/Proximamente.png',
      category: 'accesorios',
      comingSoon: true,
    },
    {
      id: 'accesorio-3',
      name: 'Accesorio Producto 3',
      description: 'Próximamente',
      presentation: '',
      price: null,
      image: '/img/Proximamente.png',
      category: 'accesorios',
      comingSoon: true,
    },
  ];
  
  export default datosProductos;