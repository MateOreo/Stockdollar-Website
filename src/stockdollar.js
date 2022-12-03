//Imports mit Tree shaking
import {initializeApp} from 'firebase/app'
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, get} from "firebase/database";

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
  const auth = getAuth(app);

  //Abmelden Knopf
  document.getElementById("abmeldenBtn").addEventListener("click", function() {
    console.log("Logged Out")

    //SignOut() löscht den Storage eintrag des Nutzers
    signOut(auth).then(() => {

      //Wenn das Erfolgreich war dann wird man an den Login weitergeleitet
      window.location = "index.html";
    }).catch((error) => {
      console.log("Nutzer konnte nicht abgemeldet werden")
    });
  })

  //Stockdollar Senden Knopf
  document.getElementById("stockdollarSendenBtn").addEventListener("click", function() {
    console.log("Stockdollar senden")

    //Wenn man das drückt dann wird man an das Senden Menü weitergeleitet
    window.location = "senden.html";
  })
  
  //Stockdollar Minen Knopf
  document.getElementById("stockdollarMiningBtn").addEventListener("click", function() {
    console.log("Stockdollar senden")

    //Wenn man das drückt dann wird man an das Minen weitergeleitet
    window.location = "mining.html";
  })

  //Hier wird die User id von LocalStorage abgerufen
  const uid = localStorage.getItem("userId");
  
  
  //Datenbank Link
  const db = getDatabase();

  //Der Ort an dem es abgelesen wird
  const name = ref(db, 'users/' + uid + '/username');

  /*
  Dieser Codeblock liest den Nutzernamen in Echtzeit ab.
  Wenn sich der Name ändert wird man das sehen, weil es ist OnValue
  */ 
  onValue(name, (snapshot) => {
    console.log(snapshot.ref.parent)

    //Snapshot.val() gibt den Namen aus und  das wird in data gespeichert
    const data = snapshot.val();
    console.log(data);

    //Hier wird der Text zum namen geändert
    document.getElementById("welcome").innerHTML = "Willkommen " + data; 
  });

  
  //Der Dateiort der Stockdollar in der Datenbank
  const stockdollar = ref(db, 'users/' + uid + '/stockdollar');
  onValue(stockdollar, (snapshot) => {

    //Stockdollar Variable
    const stockdollar = snapshot.val();
    console.log(stockdollar);

    //Text wird zu Anzahl der Stockdollar geändert
    document.getElementById("stockdollarAnzahl").innerHTML = stockdollar; 
  });

  //Text wird zur Uid geändert die In LocalStorage war
  document.getElementById("uidText").innerHTML = "User ID : " + uid;


  