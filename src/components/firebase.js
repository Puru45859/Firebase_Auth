import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import swal from "sweetalert";

const config = {
  apiKey: "AIzaSyD4bwbunYd0Ij3_0tCZuyaoSHHRgGb3dzs",
  authDomain: "login-register-e326d.firebaseapp.com",
  projectId: "login-register-e326d",
  storageBucket: "login-register-e326d.appspot.com",
  messagingSenderId: "1062569307032",
  appId: "1:1062569307032:web:5053e8d6c1b429ebbc59ed",
  measurementId: "G-6YTB8L0GJG",
};
// Initialize Firebase
//   app.initializeApp(config);
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
    swal("User registered successfully !");
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return swal("Not authorized");
    }

    return this.db.doc(`users_quotes/${this.auth.currentUser.uid}`).set({
      quote,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserQuote() {
    const quote = await this.db
      .doc(`users_quotes/${this.auth.currentUser.uid}`)
      .get();
    return quote.get("quote");
  }
}

export default new Firebase();
