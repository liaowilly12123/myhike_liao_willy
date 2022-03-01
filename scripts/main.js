function read_display_Quote() {
  db.collection("quotes").doc("Tuesday")
    .onSnapshot(TuesdayDoc => {
      console.log("current document data: " + TuesdayDoc.data());
      document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote;    
  })
}

read_display_Quote();