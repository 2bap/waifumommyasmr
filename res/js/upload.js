// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDbMWRjxWPmJVizLCfLUmXrruzuAXf5xE",
    authDomain: "mahdomain.firebaseapp.com",
    databaseURL: "https://mahdomain-default-rtdb.firebaseio.com",
    projectId: "mahdomain",
    storageBucket: "mahdomain.appspot.com",
    messagingSenderId: "808055251455",
    appId: "1:808055251455:web:549ce822e1bbab0e4dc7ca"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the storage service
  const storage = firebase.storage().ref();
  
  function uploadFile(file) {
    const uploadTask = storage.child(`images/${file.name}`).put(file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Monitor progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  }
  
  // Use this function to handle the file input change event
  document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  });
  