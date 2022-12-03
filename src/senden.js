//Imports mit Tree shaking
import {initializeApp} from 'firebase/app'
import { getDatabase, get, child, onValue, ref, update } from'firebase/database';

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

//Alle Variablen

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
const uid = localStorage.getItem("userId");
let anzahlStockdollarSender;
let anzahlStockdollarEmpfänger;
let updatedStockdollarEmpfänger;
let updatedStockdollarSender;
let stockdollarSenden;
let uidEmpfänger;



//Zurück Knopf oben links
document.getElementById("backButton").addEventListener("click", function() {
    window.location = "stockdollar.html";
  })

//Diese Funktion updated den Wert der Stockdollar
  function updateStockdollar(nutzerId, stockdollar) {
    const db = getDatabase();
    update(ref(db, 'users/' + nutzerId ), {
      stockdollar : stockdollar
    })
  };



  

 //Diese Funktion wird abgerufen wenn man Auf senden drückt
  function transferStockdollar(){
      
      //Es wird geguckt dass der Wert über 0 ist
      if (document.getElementById("numberSenden").value > 0){

        //Hier wird nochmal überprüft, dass es keine Kommazahl ist
        if (document.getElementById("numberSenden").value.includes('.')) {
          //Wenn ja, dann kommt diese Meldung
          console.log('comma found') 
          alert("Kommazahlen sind nicht erlaubt")
        }

        else{
          //Wenn nicht dann wird die Zahl die in der Box ist gespeichert
          stockdollarSenden = document.getElementById("numberSenden").value
        }

      }
      else{
        //Und wenn die Zahl unter 0 ist dann kommt diese Meldung
        alert("Man kann keine Negativen Zahlen eingeben")
      }
      

       
      /*
      Wenn man früher seine eigene User id einegeben hat dann hat man selber
      soviele Stockdollar bekommen wie man eingetragen hat.

      Diser Codeblock überprüft ob im Input feld die Eigene User Id steht
      */
      if (document.getElementById("userSenden").value == uid){
        alert("Wollte da jemand einen Bug ausnutzen? ಠ_ಠ Als Strafe verlierst du VIELLEICHT Stockdollar")
      }

      else{
        //Wenn das nicht wahr ist dann wird die User id des Empängers gespeichert 
        uidEmpfänger = document.getElementById("userSenden").value;
      }

      /**
       * Die nächsten zwei get() blöcke lesen die Anzahl der Stockdollar von dem 
       * Nutzer ab und dann von dem Empfänger
       */

      get(child(dbRef, 'users/' + uid + '/stockdollar')).then((snapshot) => {
        if (snapshot.exists()) {
          anzahlStockdollarSender = parseInt(snapshot.val());
        }

      }).then(() => {
        

        
        //Danach wird geguckt ob man weniger oder gleich viele Stockdollar hat wie man eingetragen hat
        if(anzahlStockdollarSender >= stockdollarSenden){
          /*
          Die anzahl der Stockdollar weden mit den Eingegebenen Stockdollarn subtrahiert und das 
          wird in updatedStockdollarSender gespeichert
          */
          updatedStockdollarSender = anzahlStockdollarSender - stockdollarSenden;

          /**
           * Früher gab es einen Bug, wenn man 0 stockdollar hatte wurden 1010 gelesen und deswegen
           * ob der Sender vorher 1 einen Stockdollar hatte und wenn das zutrifft dann darf man erst
           * garnicht senden
           */
          if (anzahlStockdollarSender == 1){
            alert("Man darf nicht seinen letzten Stockdollar verschwenden")
          }
          //Das gleiche mit 0
          else{
            if (updatedStockdollarSender == 0){
              alert("Man darf nicht seinen letzten Stockdollar verschwenden")
            }
            
            else{
              //Hier werden die subtrahierten Stockdollar mit der updateStockdollar Methode geupdated
              updateStockdollar(uid, updatedStockdollarSender)
            }
          }
        }
        

      });

      /*
      Dieser Codeblock ist genau gleich nur, dass hier die Stockdollar des Empfängers 
      gelesen werden und die Stockdollar, dann addiert werden
      */
      get(child(dbRef, 'users/' + uidEmpfänger + '/stockdollar')).then((snapshot) => {

        if (snapshot.exists()) {
          anzahlStockdollarEmpfänger = parseInt(snapshot.val()) 
  
  
        } 
        
        else {
          console.log("No data available");
        }
  
      }).then(() => { 
        console.log("Anzahl Stockdollar Empfänger : "+ anzahlStockdollarEmpfänger )


        
        
        //Hier ist es wenn die Stockdollar der Nutzer gelesen wurden
        updatedStockdollarEmpfänger = anzahlStockdollarEmpfänger + parseInt(stockdollarSenden);
          if (anzahlStockdollarSender == 1){

          }
          else{
            if (updatedStockdollarSender == 0){
            }
            
            else{
              //Hier werden die Stockdollar gesetzt
              console.log("Nachher Empfänger:" + updatedStockdollarEmpfänger)
              updateStockdollar(uidEmpfänger, updatedStockdollarEmpfänger)
            }
          }

       
      });

      }

  //Absenden knopf
  document.getElementById("absendenBtn").addEventListener("click", function() {
    //Wenn der Absenden Knopf gedrückt wird dann wird die transferStockdollar funktion betätigt
    transferStockdollar();
    console.log("Stockdollar wurden Abgesendet")
  })

    //Hier werden die Stockdollar abgelesen
    const stockdollarRealtime = ref(db, 'users/' + uid + '/stockdollar');
    onValue(stockdollarRealtime, (snapshot) => {
      const stockdollarr = snapshot.val();
      console.log(stockdollarr);
      document.getElementById("stockdollarAnzahl").innerHTML = "Du hast "+stockdollarr + " Stockdollar"
    });
