# Sudoku

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




ngulaire - Sudoku

Créez une application angular qui peut valider si un puzzle Sudoku donné est valide ou non. L'application doit permettre aux utilisateurs de saisir un puzzle Sudoku, puis de vérifier si le puzzle respecte les règles du Sudoku, qui sont les suivantes :

    Chaque ligne doit contenir les chiffres de 1 à 9, sans répétition.

    Chaque colonne doit contenir les chiffres de 1 à 9, sans répétition.

    Chacune des neuf sous-grilles 3x3 doit contenir les chiffres de 1 à 9, sans répétition.

Exigences:

    Créez un composant angulaire pour saisir le puzzle Sudoku.

    Implémentez une fonction de validation qui vérifie l'exactitude du puzzle Sudoku selon les règles mentionnées ci-dessus.

    Afficher le résultat de la validation à l'utilisateur, en indiquant si le puzzle est valide ou non.

    Assurez une interface conviviale qui affiche clairement toutes les erreurs de validation si le puzzle n’est pas valide.

    L'application doit gérer les cas extrêmes avec élégance et efficacité, tels que les cellules vides ou les entrées non valides.

    Rédiger des tests unitaires et des tests de bout en bout pour garantir la fiabilité et la maintenabilité de l'application

Améliorations facultatives :

    Implémentez une fonctionnalité pour générer des puzzles Sudoku aléatoires que les utilisateurs doivent résoudre.

    Ajoutez une minuterie pour suivre le temps nécessaire pour résoudre un puzzle Sudoku.

    Autorisez les utilisateurs à marquer les cellules comme « corrigées » pour éviter toute modification accidentelle.

Directives de soumission : partagez le code source de votre application Angular, ainsi que toutes les instructions nécessaires sur la façon d'exécuter et de tester l'application. Assurez-vous d'inclure des commentaires clairs et une documentation pour votre code.

Critère d'évaluation:

Votre solution sera évaluée en fonction de l'exactitude de la validation du Sudoku, de la qualité de l'application Angular et de sa conformité aux exigences et aux améliorations facultatives.

Date limite : 2023.11.18




ng test --include=**/home.component.spec.ts