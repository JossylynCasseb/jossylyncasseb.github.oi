// Função para obter coordenadas GPS
function getLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('locationOutput').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // Armazenar no Local Storage
            localStorage.setItem('lastLocation', JSON.stringify({ latitude, longitude }));
        }, function(error) {
            console.error('Erro ao obter localização:', error);
            document.getElementById('locationOutput').textContent = 'Erro ao obter localização.';
        });
    } else {
        document.getElementById('locationOutput').textContent = 'Geolocalização não é suportada pelo seu navegador.';
    }
}

// Função para iniciar o acelerômetro
function startAccelerometer() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function(event) {
            const acceleration = event.accelerationIncludingGravity;
            const accX = acceleration.x.toFixed(2);
            const accY = acceleration.y.toFixed(2);
            const accZ = acceleration.z.toFixed(2);

            document.getElementById('accelerometerOutput').textContent = `Aceleração (x, y, z): ${accX}, ${accY}, ${accZ} m/s²`;
        });
    } else {
        document.getElementById('accelerometerOutput').textContent = 'Acelerômetro não é suportado pelo seu navegador.';
    }
}

// Registrar eventos nos botões
document.getElementById('getLocation').addEventListener('click', getLocation);
document.getElementById('startAccelerometer').addEventListener('click', startAccelerometer);

// Verificar se há localização armazenada no Local Storage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const lastLocation = JSON.parse(localStorage.getItem('lastLocation'));
    if (lastLocation) {
        document.getElementById('locationOutput').textContent = `Última Localização Armazenada: Latitude: ${lastLocation.latitude}, Longitude: ${lastLocation.longitude}`;
    }
});

// Notificação simples
function showNotification() {
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
            new Notification('Notificação do PWA', {
                body: 'Este é um exemplo de notificação em um PWA.'
            });
        }
    });
}

// Exemplo de uso de notificação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    showNotification();
});
