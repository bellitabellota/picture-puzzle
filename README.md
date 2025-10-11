Update Oktober 2024: This project was revisited migrating it to TypeScript to get hands-on practice with TypeScript.

## Picture Puzzle App
This project is my realization of the [TOP's Photo Tagging App](https://zippy-velma-picture-puzzle-678a8073.koyeb.app/).

For deployment [Koyeb](https://www.koyeb.com/) was used and the PostgreSQL database is run via [Neon](https://neon.com/).
___
<strong>Try the app yourself: [--> Visit deployed app](https://zippy-velma-picture-puzzle-678a8073.koyeb.app/)</strong>
___

## Features
  -	A full-stack app integrating React with Rails via esbuild.
  -	3 different picture puzzles to solve.
  -	A frontend timer displaying the required time.
  -	Backend timer and backend validation of guess/game state to prevent players from hacking the game.
  -	Upon successful completion, players can enter their name to appear in the ranking.
  -	Tests for components and API controllers with Vitest and Rspec.

## Screenshots
•	Homepage:  
![Homepage](https://github.com/user-attachments/assets/a9e05ff3-ec94-4dd5-896a-62efa280c39b)

•	Picture Puzzle - The Smurfs:  
![Screenshot from 2025-06-16 15-09-25](https://github.com/user-attachments/assets/dbfe832d-a03a-4c82-92a8-39e4ede67921)

•	Picture Puzzle successfully completed - The Smurfs: 
![Screenshot from 2025-06-16 15-05-53](https://github.com/user-attachments/assets/0de1ff55-662f-45ef-8090-7fb60ccd61c5)

•	Results Page - The Smurfs:  
![Screenshot from 2025-06-16 15-10-23](https://github.com/user-attachments/assets/db9c8def-e4f9-4ff6-a36b-8ba7bd300f90)


## Running the app locally
1. Clone the project and `cd` into the project folder
2. Run `bundle install`
3. Run `yarn install`
4. Setup and seed the database
    - `rails db:create`
    - `rails db:migrate`
    - `rails db:seed`
5. Start the developement environement with `./bin/dev`.

  ### Runing the test suites
  For RSpec tests: `bundle exec rspec`
  For Vitest tests: `yarn test`
  
  ### Running TypeScript manually
  `yarn tsc`

## Image Sources:
The Smurfs:
https://www.puzzle-offensive.de/?cmd=showArticle&aid=2034580&language=

Finding Nemo:
https://webneel.com/wallpaper/i/1-finding-nemo-movie-wallpaper/1303/o

Peter Pan:
https://ar.pinterest.com/pin/23855073021952627/

Check Mark:
https://pngtree.com/freepng/3d-green-check-mark-icon-in-round-isolated-transparent-background-tick_8926830.html

Dices:
https://www.flaticon.com/free-icons/dice

