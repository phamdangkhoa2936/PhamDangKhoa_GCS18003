$(document).on('vclick', '#btn-cordova-beep', cordovaBeep);

function cordovaBeep() {
    navigator.notification.beep(2);


$(document).on('vclick', '#btn-cordova-vibration', cordovaVibration);

function cordovaVibration() {
    navigator.vibrate(3000, 2000, 4000, 5000, 2000, 4000, 5000, 3000, 4000);
    }
}