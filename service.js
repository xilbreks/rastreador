var lRastreando = false;
var nWatchID = null;

var btnIniciar = document.getElementById('btn-init')
var btnDetener = document.getElementById('btn-stop')

var objDatabase = firebase.database();

function iniciarRastreo() {
  if ("geolocation" in navigator) {
    lRastreando = true;
    btnIniciar.disabled = true;
    btnDetener.disabled = false;

    nWatchID = navigator.geolocation.watchPosition((position)=>{
      console.log(position.coords)
      objDatabase.ref('ways/').push({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    })
  } else {
    alert('No tienes Geolocalizacion');
    return;
  }
}

function detenerRastreo() {
  if (!lRastreando) {
    alert('No se esta rastreando')
  } else {
    navigator.geolocation.clearWatch(nWatchID)

    lRastreando = false;
    btnIniciar.disabled = false;
    btnDetener.disabled = true;
  }
}