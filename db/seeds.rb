# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puzzle = PicturePuzzle.find_or_initialize_by(title: "The Smurfs")

puzzle.assign_attributes(
  image_src: "/picture-puzzle-images/the-smurfs.jpg",
  task_description: "Find Papa Smurf, Smurfette and Brainy Smurf.",
  resolution_width: 1000,
  resolution_height: 674,
  targets: [
    { name: "Smurfette", boundingBox: { xMin: 90, xMax: 140, yMin: 360, yMax: 440 } },
    { name: "Papa Smurf", boundingBox: { xMin: 410, xMax: 475, yMin: 420, yMax: 507 } },
    { name: "Brainy Smurf", boundingBox: { xMin: 277, xMax: 343, yMin: 525, yMax: 655 } }
  ]
)

puzzle.save!

puzzle2 = PicturePuzzle.find_or_initialize_by(title: "Finding Nemo")

puzzle2.assign_attributes(
  image_src: "/picture-puzzle-images/finding-nemo.jpg",
  task_description: "Find Marlin, Dory and Crush.",
  resolution_width: 1280,
  resolution_height: 720,
  targets: [
    { name: "Marlin", boundingBox: { xMin: 579, xMax: 632, yMin: 526, yMax: 589 } },
    { name: "Crush", boundingBox: { xMin: 102, xMax: 280, yMin: 0, yMax: 122 } },
    { name: "Dory", boundingBox: { xMin: 633, xMax: 718, yMin: 490, yMax: 589 } }
  ]
)

puzzle2.save!

puzzle3 = PicturePuzzle.find_or_initialize_by(title: "Peter Pan")

puzzle3.assign_attributes(
  image_src: "/picture-puzzle-images/peter-pan.jpg",
  task_description: "Can you identify all side characters from the Peter Pan movie?",
  resolution_width: 736,
  resolution_height: 736,
  targets: [
    { name: "Wendy Darling", boundingBox: { xMin: 144, xMax: 473, yMin: 50, yMax: 204 } },
    { name: "Dr. John Darling", boundingBox: { xMin: 22, xMax: 279, yMin: 214, yMax: 369 } },
    { name: "Michael Darling", boundingBox: { xMin: 104, xMax: 229, yMin: 437, yMax: 532 } },
    { name: "Tinker Bell", boundingBox: { xMin: 542, xMax: 644, yMin: 556, yMax: 696 } }
  ]
)

puzzle3.save!
