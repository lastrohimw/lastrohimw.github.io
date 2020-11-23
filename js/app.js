const registerServiceWorker = () => {
	return navigator.serviceWorker.register('/service-worker.js')
	.then(registration => {
		console.log('sw berhasil');
		return registration;
	})
	.catch(error => {
		console.error(`Pendaftaran gagal : ${error}`);
	});
}

const requestPermission = () => {
	Notification.requestPermission()
	.then(result => {
		console.log(result);
		if(result === "denied") {
			console.log("tidak diijinkan");
			return;
		} else if(result == 'default') {
			console.log("Menutup kontak dialog");
			return;
		}
		console.log("Diizinkann");
	})
}

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}




if(!("serviceWorker" in navigator)) {
	console.log("Tidak mendukung service worker");
} else {
	registerServiceWorker();
}

if("Notification" in window) {
	requestPermission();
} else {
	console.log("Tidak mendukung notifikasi");
}

navigator.serviceWorker.ready
.then(() => {
    if(('PushManager' in window)) {
        navigator.serviceWorker.getRegistration()
        .then(registration => {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BNNcozcf6xAS90Qho9lJmKPytY3rhxHVkq2f77IGH9LJFrQfFEPdbFv5VjwvC-EIvtyN3r9-jTXA_662q3pnkiY")
            }).then(subscribe => {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function(e) {
                console.error('Tidak dapat melakukan subscribe ', e.message);
            });
        });
    }
})