function read_display_Quote() {
  db.collection("quotes").doc("Tuesday")
    .onSnapshot(TuesdayDoc => {
      console.log("current document data: " + TuesdayDoc.data());
      document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote;    
  })
}

function insertName() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in
    if (user) {
      // Do something for the current logged-in user here
      console.log(user.uid);

      // Go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);

      // Get the document for current user
      currentUser.get()
      .then(userDoc => {
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerText = user_Name;
      })
    }
  })
}

// Creates test hikes
function writeHikes() {
  var hikesRef = db.collection("hikes");

  hikesRef.add({
    code: "PM01",
    name: "Bert Flinn Park Trail",
    city: "Port Moody",
    province: "BC",
    level: "easy",
    length: "2.6km",
    details: "Bert Flinn Park in Port Moody has a number of scenic hiking trails that pass through lush forests and make for a short, easy walk. The route passes several streams and raised boardwalks and is a popular area for locals and dog walkers."
  });

  hikesRef.add({
    code: "PM02",
    name: "Shoreline Trail",
    city: "Port Moody",
    province: "BC",
    level: "easy",
    length: "6.0km",
    details: "Located along the shores of Burrard Inlet, Rocky Point Park in Port Moody is one of the most scenic parks in the lower mainland. The Shoreline Trail is an easy walking route that wraps around the eastern most section of Burrard Inlet, starting from the pier at Rocky Point Park and ending at Old Orchard Park."
  });

  hikesRef.add({
    code: "AM01",
    name: "Bunzten Lake Trail",
    city: "Anmore",
    province: "BC",
    level: "easy",
    length: "10.0km",
    details: "The Buntzen Lake area is a popular recreation park that is maintained by BC Hydro that has a network of hiking trails to explore. The trail that loops around the lake is one of the most popular in the park as it passes through scenic forests, offers several views of the lake, crosses a suspension bridge, and passes the quieter beach at the north end."
  });
}

function displayCards(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = i;
      snap.forEach(doc => {
        var title = doc.data().name;
        var details = doc.data().details;
        var imageName = doc.data().code;
        let newcard = cardTemplate.content.cloneNode(true);

        // update title and text and image
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        newcard.querySelector('.card-image').src = "./images/" + collection + "/" + imageName + ".jpg";

        document.getElementById(collection + "-go-here").appendChild(newcard);
        i++;
      })
    })
}

insertName();
read_display_Quote();
displayCards("hikes");