// ===== MENÚ MÓVIL =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== FILTROS DE PRODUCTOS =====
const botonesFiltro = document.querySelectorAll('.filtro-btn');
const tarjetasProducto = document.querySelectorAll('.producto-card');

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitar clase activa de todos
        botonesFiltro.forEach(btn => btn.classList.remove('active'));
        // Agregar clase activa al seleccionado
        boton.classList.add('active');

        const filtro = boton.getAttribute('data-filter');

        tarjetasProducto.forEach(tarjeta => {
            const categorias = tarjeta.getAttribute('data-category').split(' ');
            if (filtro === 'todos' || categorias.includes(filtro)) {
                tarjeta.style.display = 'block';
                tarjeta.style.opacity = '0';
                setTimeout(() => {
                    tarjeta.style.opacity = '1';
                    tarjeta.style.transition = 'opacity 0.4s ease';
                }, 50);
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

// ===== MODAL PARA VER IMAGEN GRANDE =====
const modal = document.getElementById('imagenModal');
const imagenGrande = document.getElementById('imagenGrande');
const cerrarModal = document.getElementById('cerrarModal');
const botonesVer = document.querySelectorAll('.ver-btn');
const imagenesProducto = document.querySelectorAll('.producto-img img');

// Abrir modal con botón "Ver"
botonesVer.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        imagenGrande.src = imagenesProducto[index].src;
        imagenGrande.alt = imagenesProducto[index].alt;
        document.body.style.overflow = 'hidden';
    });
});

// También abrir al hacer clic en la imagen
imagenesProducto.forEach((img, index) => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        imagenGrande.src = img.src;
        imagenGrande.alt = img.alt;
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal con X
cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ===== ANIMACIÓN AL SCROLL =====
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

tarjetasProducto.forEach(tarjeta => {
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)';
    tarjeta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observador.observe(tarjeta);
});
