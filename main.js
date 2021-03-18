
const firebaseConfig = {
    apiKey: "AIzaSyA3wpHU0HKuf59w-qbJRZsi9KU4KT4Ff2M",
    authDomain: "loginregister-eeaa6.firebaseapp.com",
    projectId: "loginregister-eeaa6",
    storageBucket: "loginregister-eeaa6.appspot.com",
    messagingSenderId: "1081817804531",
    appId: "1:1081817804531:web:2ddb1b60bd504566f95186"
};
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
  function login(e){
    e.preventDefault()
    let email = $('.loginEmailInput').val()
    let passwd = $('.loginPasswdInput').val()

        firebase.auth().signInWithEmailAndPassword(email, passwd)
        .then((userCredential) => {
          var user = userCredential.user;
          redirectUser(user)
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        }); 
    }

  function redirectUser(user){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.href = "index.html"
        } else {
            
        }
      });
  }
    
  
  
  //Registering the user and passing it to firebase
  function register(e){
    //Preventing the browser from refreshing
    e.preventDefault()
    let email = $('.registerEmailInput').val()
    let password = $('.registerPasswdInput').val()

    console.log(password)


    if(email != '' && password != ''){
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            window.alert("You have succesfully registered.")
            window.location.href="index.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        }); 

    }else {
        window.alert("Please complete the form and use more than 5 characters for password")
    }
  }

  function signOut(e){
      e.preventDefault()
      firebase.auth().signOut().then(() => {
          window.location.href="login.html"
      }).catch((error) => {
        window.alert('An error accured: ' + error)
      });
  }

  function passwordReset(e){
      e.preventDefault()
      let emailField = $('.forgotEmailInput').val()
      
      if(emailField != ''){
        var auth = firebase.auth();
        
        auth.sendPasswordResetEmail(emailField).then(function() {
          window.alert('Email Sent. Please check your Inbox')
        }).catch(function(error) {
            window.alert("Please Enter A Valid Email.")
        });
      }else {
          window.alert('Please Enter Your Email')
      }
  }

function getData(){
    // Getting the data from phones.json
    fetch('phones.json')
    //Converting the data to json format using .json()
    .then( (response) => {
        return response.json()
    })
    //Passing the data to the appendData function
    .then( (data) => {
        appendData(data)
    })
    //If anything goes wrong throw new error on the console.
    .catch(err => {
        throw new Error('Something went wrong ' + err)
    })
}

getData()


function appendData(data){

    //Getting the row which we are going to append the cards
    let classRow = $(".row")

    for(let i = 0; i < data.length; i++){
        //Getting the needed data and storing it in variables
        let phoneName = data[i].phoneName
        let description = data[i].description
        let moreInfo = data[i].moreInfo
        let img = data[i].img

        let card = `<div class="col-lg-6 mb-4"> 
        <div class="card"> 
            <img class="card-img-top img-fluid images" src="${img}" alt=""> 

            <div class="card-body"> 
                <h5 class="card-title">${phoneName}</h5> 
                <p class="card-text"> 
                   ${description}
                </p> 

                <a href="${moreInfo}" class="btn btn-outline-primary btn-sm"> 
                    Click Here for details
                </a> 
            </div> 
        </div> 
    </div> `
    classRow.append(card)
    }
}