// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "bootstrap-assets/lib",
    "paths": {
      "app": "../js",
      "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
    }
});

// Load the main app module to start the app
requirejs(["js/main"]);