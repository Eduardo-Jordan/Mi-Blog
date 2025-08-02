// Variable para controlar el estado de redirección
let isRedirecting = false;

// Función mejorada para manejar el clic
function handleSocialButtonClick(event) {
    event.preventDefault();
    
    if (isRedirecting) {
        showErrorMessage("Proceso en curso. Espera...", true);
        return;
    }

    const targetUrl = event.currentTarget.getAttribute('href');
    const serviceName = getServiceName(event.currentTarget);
    
    isRedirecting = true;
    startRedirectProcess(targetUrl, serviceName);
}

// Función para obtener el nombre del servicio
function getServiceName(button) {
    const iconClass = button.querySelector('i').className;
    const serviceMap = {
        'whatsapp': 'WhatsApp',
        'facebook': 'Facebook',
        'github': 'GitHub',
        'linkedin': 'LinkedIn',
        'instagram': 'Instagram',
        'envelope': 'Correo'
    };
    
    for (const [key, value] of Object.entries(serviceMap)) {
        if (iconClass.includes(key)) return value;
    }
    return 'la red social';
}

// Proceso principal de redirección
function startRedirectProcess(targetUrl, serviceName) {
    showLoadingMessage(`Redireccionando a ${serviceName}...`);
    
    let secondsLeft = 10;
    const countdownInterval = setInterval(() => {
        secondsLeft--;
        updateLoadingMessage(`Redireccionando a ${serviceName}... (${secondsLeft}s)`);
        
        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            finishRedirectProcess(targetUrl, serviceName);
        }
    }, 1000);
}

// Finalizar proceso
function finishRedirectProcess(targetUrl, serviceName) {
    isRedirecting = false;
    
    if (/tunumero|tusuario|tucuenta|tucorreo/.test(targetUrl)) {
        showErrorMessage(`Error: Enlace de ${serviceName} no configurado`, true);
    } else {
        showSuccessMessage(`Redirección a ${serviceName} completada`, true);
        // window.location.href = targetUrl; // Descomentar para redirección real
    }
}

// Funciones de UI mejoradas para posición derecha
function createMessageBox() {
    const messageBox = document.createElement('div');
    messageBox.id = 'redirect-message';
    messageBox.style.position = 'fixed';
    messageBox.style.top = '20px';
    messageBox.style.right = '20px';
    messageBox.style.padding = '15px 25px';
    messageBox.style.background = 'rgba(0, 0, 0, 0.85)';
    messageBox.style.color = 'white';
    messageBox.style.borderRadius = '8px';
    messageBox.style.zIndex = '10000';
    messageBox.style.display = 'flex';
    messageBox.style.alignItems = 'center';
    messageBox.style.gap = '12px';
    messageBox.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    messageBox.style.maxWidth = '300px';
    messageBox.style.transition = 'all 0.3s ease';
    messageBox.style.transform = 'translateX(120%)';
    messageBox.style.opacity = '0';
    return messageBox;
}

function showMessage(content, bgColor, showClose = true) {
    let messageBox = document.getElementById('redirect-message') || createMessageBox();
    if (!document.contains(messageBox)) {
        document.body.appendChild(messageBox);
    }
    
    messageBox.innerHTML = `
        ${content}
        ${showClose ? '<button class="close-btn" style="margin-left:10px;background:none;border:none;color:white;cursor:pointer;">×</button>' : ''}
    `;
    messageBox.style.background = bgColor;
    messageBox.style.display = 'flex';
    
    // Animación de entrada
    setTimeout(() => {
        messageBox.style.transform = 'translateX(0)';
        messageBox.style.opacity = '1';
    }, 10);
    
    // Configurar botón de cierre
    const closeBtn = messageBox.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideMessage();
        });
    }
    
    return messageBox;
}

function showLoadingMessage(message) {
    showMessage(
        `<i class="fas fa-spinner fa-spin" style="font-size:1.2em;"></i>
         <span style="flex:1;">${message}</span>`,
        'rgba(0, 119, 182, 0.9)',
        false
    );
}

function updateLoadingMessage(message) {
    const messageBox = document.getElementById('redirect-message');
    if (messageBox) {
        const spinner = messageBox.querySelector('.fa-spinner');
        messageBox.innerHTML = `
            ${spinner.outerHTML}
            <span style="flex:1;">${message}</span>
        `;
    }
}

function showSuccessMessage(message, autoHide = true) {
    const msg = showMessage(
        `<i class="fas fa-check-circle" style="font-size:1.2em;"></i>
         <span style="flex:1;">${message}</span>`,
        'rgba(40, 167, 69, 0.9)'
    );
    
    if (autoHide) {
        setTimeout(() => hideMessage(), 5000);
    }
}

function showErrorMessage(message, autoHide = true) {
    const msg = showMessage(
        `<i class="fas fa-exclamation-triangle" style="font-size:1.2em;"></i>
         <span style="flex:1;">${message}</span>`,
        'rgba(233, 84, 32, 0.9)'
    );
    
    if (autoHide) {
        setTimeout(() => hideMessage(), 5000);
    }
}

function hideMessage() {
    const messageBox = document.getElementById('redirect-message');
    if (messageBox) {
        messageBox.style.transform = 'translateX(120%)';
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 300);
    }
}

// Configuración de event listeners
function setupButtonListeners() {
    document.querySelectorAll('.social-btn:not(.ubuntu-btn)').forEach(button => {
        button.addEventListener('click', handleSocialButtonClick);
    });

    document.querySelector('.ubuntu-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        showLoadingMessage("Cargando redes...");
        setTimeout(() => {
            document.getElementById('social-buttons').scrollIntoView({
                behavior: 'smooth'
            });
            showSuccessMessage("Redes sociales cargadas");
        }, 800);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', setupButtonListeners);