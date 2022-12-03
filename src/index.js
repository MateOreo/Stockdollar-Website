//Imports mit Tree Shaking
import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

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
  const provider = new GoogleAuthProvider();
  
  //Diese Funktion sendet den Nutzer  an die Datenbank
  function writeUserData(userId, name, email, stockdollar) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      stockdollar : stockdollar
    }).then(() => { 
      window.location = "stockdollar.html";
      console.log(name)
    });
  };
  
  //Login Knopf
  document.getElementById("loginBtn").addEventListener("click", function() {
    console.log("Logged Oin")
    const auth = getAuth();

    
    
    /*
    signInWithRedirect erstellt einen User bei dem 
    Authentication Tab und macht einen Storage 
    Eintrag des Nutzers 
    
    Wenn er schon exestiert dann wird er angemeldet.
    */
    signInWithRedirect(auth, provider);
  });



  const auth = getAuth();



  /*
  OnAuthStateChanged wird abgerufen wenn sich ein Nutzer angemeldet hat
  oder schon vorher Angemeldet war. Es überprüft also nur ob ein Storage 
  Eintrag des Nutzers erstellt wurde oder gelöscht wurde und dieser Eintrag 
  wird nicht gelöscht wenn man die Seite verlässt.
  */
  
  onAuthStateChanged(auth, (user) => {

    //Hier wird geguckt ob der Eintrag exestiert
    if (user) {
      //Diese drei Werte werden gespeichert
      const name = user.displayName;
      const userId = user.uid;
      const email = user.email;
      
      /*
      Hier wird mit LocalStorage die Uid gespeichert, dass später der Name
      und die Anzahl der Stockdollar abgelesen wird ohne, dass sich der Auth State ändert
      */
      localStorage.setItem("userId",userId);

      const db = getDatabase();

      //Speicherort des neu erstellten Nutzer
      const data = ref(db, 'users/' + userId + '/username');

      /*
      Hier wird geguckt ob es schon einen Nutzer mit der Uid gibt,
      damit es nicht Zwei Einträge gibt.
      */
      onValue(data, (snapshot) => {
        const data = snapshot.val();
        if (!data){
         console.log("Data is null")
         writeUserData(userId, name, email, 1)
        }

        //Hauptmenü
        window.location = "stockdollar.html"
      });
      
      
      
      
    } 
    //Wenn der Eintrag nicht exestiert passiert das
    else {
      
      console.log("Not Logged in")
    }
  });

  
  