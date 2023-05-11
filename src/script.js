import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove, onValue, push, get, child } from "firebase/database";
import QRCode from 'qrcode';

const firebaseConfig = {
  databaseURL: "https://webgl-ed2ec-default-rtdb.europe-west1.firebasedatabase.app/",
};

const isMobile = /Android|iPhone/i.test(navigator.userAgent)
let currentSession = null
let baseUrl = "172.28.59.104:5173"
// let baseUrl = "brume.surge.sh"

//firebase config
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const sessions = ref(database, 'sessions/');

//event on sessions modified
onValue(sessions, (snapshot) => {
  const data = snapshot.val();
  
  //delete old sessions
  Object.keys(data).map((key) => {
    let item = data[key]
    if (item.creationDate < Date.now() - 90000){
      remove(ref(database, 'sessions/' + key))
    }
  })
  // console.log('Data modified', Object.values(data))
  
  //display msgs on mobile
  // mobile.displayList(data)
  if (isMobile){
    import('./mobile').then(mobile => mobile.displayList(data))
  }
});

function createSession(){
  currentSession = push(ref(database, 'sessions/'), {
    creationDate: Date.now()
  }).key;
  push(ref(database, `sessions/${currentSession}/messages/`), {
    msg : "bonjour",
    foreign: true,
    time: Date.now()
  })
  
  //DEBUG display session
  let p = document.createElement('p')
  p.textContent = currentSession.slice(17)
  document.getElementById('container').appendChild(p)
  displayQrCode(currentSession)
}

function displayQrCode(key){
  var canvas = document.getElementById('qrcode')
  QRCode.toCanvas(canvas, `http://${baseUrl}/?${key}`, function (error){
  if (error) console.error(error)
})
}

//callback on desktop to transmit events to backend
function handleDesktopEvent(event){
  console.log('event', event)
  if (event === "green zone"){
    push(ref(database, `sessions/${currentSession}/messages/`), {
      msg : "green zone message",
      foreign: true,
      time: Date.now()
    })
  }
  if (event?.title === "random"){
    push(ref(database, `sessions/${event.id}/messages/`), {
      msg : "Coucou je spam des truc random",
      foreign: false,
      time: Date.now()
    })
  }
}

if (isMobile){
  import('./mobile').then(mobile => mobile.createMobileInterface(window.location.search, handleDesktopEvent))
}else{
  import('./Experience/Experience').then(desktop => desktop.createExperience(document.querySelector('canvas.webgl'), handleDesktopEvent))
  createSession()
}


