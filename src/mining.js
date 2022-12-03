//Imports mit Tree shaking
import {initializeApp} from 'firebase/app'
import { getDatabase, ref, onValue, get, child, update } from "firebase/database";

//Firebase Config damit mit Firebase komuniziert wird
const firebaseConfig = {
  apiKey: "AIzaSyDGyqGBGUCFcwvnFVFzjVVpnYDeBu0GTQI",
  authDomain: "stock-net-917a9.firebaseapp.com",
  projectId: "stock-net-917a9",
  storageBucket: "stock-net-917a9.appspot.com",
  messagingSenderId: "1030054905162",
  appId: "1:1030054905162:web:b7b1bec753b87a20b6adb3",
  measurementId: "G-3WJ7W3VG3Z",
  databaseURL: "https://stock-net-917a9-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

//Anzahl der Stockdollar wird Global definiert
let anzahlStockdollar;


//Diese Funktion updated den Wert der Stockdollar
function updateStockdollar(userId,stockdollar) {
  const db = getDatabase();
  update(ref(db, 'users/' + userId ), {
    stockdollar : stockdollar
  })
};

//Der Knopf oben Links mit dem Pfeil
document.getElementById("backButton").addEventListener("click", function() {
    //Man wird zum Hauptmenü weitergeleitet
    window.location = "stockdollar.html";
  })

  //Dateiort der Stockdollar in der Datenbank
  const stockdollar = ref(db, 'users/' + localStorage.getItem("userId") + '/stockdollar');

  /*
  Stockdollar werden Abgelesen und wenn der Wert sich 
  ändert wird es nochmal abgelesen und gespeichert
  */ 
  onValue(stockdollar, (snapshot) => {
    const stockdollar = snapshot.val();
    console.log(stockdollar);

    //Stockdollar Text wird zu Stockdollar geändert
    document.getElementById("stockdollarAnzahl").innerHTML = stockdollar; 
  });

  //Minen Knopf
  document.getElementById("stockdollarMinenBtn").addEventListener("click", function() {
    
    //Stockdollar werden nur einmal Abgelsesen und nicht wie OnValue mehrfach
    get(child(dbRef, 'users/' + localStorage.getItem("userId") + '/stockdollar')).then((snapshot) => {

      //Wenn die Stockdollar eingetragen sind passiert das
      if (snapshot.exists()) {
        anzahlStockdollar = parseInt(snapshot.val());
      } 
      
      //Wenn die Stockdollar nicht exestieren dann passiert das
      else {
        console.log("No data available");
        console.log(snapshot.val())
      }
    }).then(() => {
      //Die Stockdollar die Abgelesen wurden werden mit 1 addiert und dann Zurück an die Datenbank gesendet
      anzahlStockdollar++;
      updateStockdollar(localStorage.getItem("userId"), anzahlStockdollar)
    });

})
