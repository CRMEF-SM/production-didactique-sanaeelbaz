<?php 
 //Nous allons démarrer la session avant toute chose
   session_start() ;
  if(isset($_POST['boutton-valider'])){ // Si on clique sur le boutton , alors :
    //Nous allons verifiér les informations du formulaire
    if(isset($_POST['email']) && isset($_POST['mdp'])) { //On verifie ici si l'utilisateur a rentré des informations
      //Nous allons mettres l'email et le mot de passe dans des variables
      $email = $_POST['email'] ;
      $mdp = $_POST['mdp'] ;
      $erreur = "" ;
       //Nous allons verifier si les informations entrée sont correctes
       //Connexion a la base de données
       $nom_serveur = "localhost";
       $utilisateur = "root";
       $mot_de_passe ="";
       $nom_base_données ="form" ;
       $con = mysqli_connect($nom_serveur , $utilisateur ,$mot_de_passe , $nom_base_données);
       //requete pour selectionner  l'utilisateur qui a pour email et mot de passe les identifiants qui ont été entrées
        $req = mysqli_query($con , "SELECT * FROM utilisateurs WHERE email = '$email' AND mdp ='$mdp' ") ;
        $num_ligne = mysqli_num_rows($req) ;//Compter le nombre de ligne ayant rapport a la requette SQL
        if($num_ligne > 0){
            header("Location:myQuiz.php") ;//Si le nombre de ligne est > 0 , on sera redirigé vers la page myQuiz
            // Nous allons créer une variable de type session qui vas contenir l'email de l'utilisateur
            $_SESSION['email'] = $email ;
        }else {//si non
            $erreur = "Adresse Mail ou Mots de passe incorrectes !";
        }
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <link rel="stylesheet" type="text/css" href="css/styleE.css">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <script defer src="./js/connexion.js"></script>

</head>
<body>

    <div style="background-image: url(./image/1.png);" class="main">
        <div class="navbar">
            <div class="icon">
                <h2 class="logo">MyQuiz</h2>
            </div>

            <div class="menu">
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">CONTACT</a></li>
                </ul>
            </div>

            <div class="search">
                <input class="srch" type="search" name="" placeholder="Type To text">
                <a href="#"> <button class="btn">Search</button></a>
            </div>

        </div> 
        <div class="content">
            <h1>Plateforme <br><span>de </span> <br>Quiz</h1>
            <p class="par">Cette plateforme est destinée aux <br>apprenants et aux enseignants d'informatique
                <br> pour le niveau du Tronc Commun. </p>

                <button class="cn"><a href="#">Amusez-vous</a></button>

                <div class="form">
                <form action="" method="POST">
                    <h2>Login Here</h2>
                    <?php 
                    if(isset($erreur)){// si la variable $erreur existe , on affiche le contenu ;
                    echo "<p class= 'Erreur'>".$erreur."</p>"  ;
                    }
                    ?>
                    <form action="" method="POST">
                    <input type="text" name="email" placeholder="Enter Email Here">
                    <input type="password" name="mdp" placeholder="Enter Password Here">
                    <button type="submit" class="btnn" value="Login" name="boutton-valider"> Login </button>
                    <br>
                    <br>
                    
                  
                    <div class="icons">
                        <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-google"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-skype"></ion-icon></a>
                    </div>

                </div>
                </form>
                    </div>
                </div>
        </div>
    </div>
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
</body>

<footer>
<div class="text-center">2021-2022 &copy; Développée par les enseignantes-stagaires du CRMEF-SM : OUMAIMA AL MOBARAKI, HALIMA BOUHACH & SANAE EL BAZ.
</div>
</footer>

</html>



                 </style>
                 
               </footer>
             
                 <!-- Optional JavaScript -->
                 <!-- jQuery first, then Popper.js, then Bootstrap JS -->
                 <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
                 <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
                 <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
               </body>
             </html>
             
    </body>
</html> 