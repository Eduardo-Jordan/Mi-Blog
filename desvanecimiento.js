/**
 * DESVANECIMIENTO DEL TÍTULO
 * --------------------------
 * Este script controla la desaparición automática del título "Mi Portafolio"
 * después de 20 segundos (20,000ms) con un efecto de desvanecimiento suave.
 * 
 * Funcionalidad:
 * 1. Espera 20 segundos
 * 2. Aplica desvanecimiento (1.5 segundos)
 * 3. Elimina el elemento del DOM
 */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('portfolio-header');
    
    if (header) {
        setTimeout(() => {
            header.style.opacity = '0';
            
            // Eliminar después de completar la animación
            setTimeout(() => {
                header.remove();
            }, 1500);
        }, 20000); // 20 segundos = 20,000ms
    }
});