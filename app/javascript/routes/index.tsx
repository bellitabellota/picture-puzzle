import PicturePuzzles from "../components/PicturePuzzles";
import PicturePuzzle from "../components/PicturePuzzle"
import PuzzleResults from "../components/PuzzleResults";
const routes = [{
  path: "/",
  element: <PicturePuzzles />
}, {
  path: "/:id",
  element: <PicturePuzzle />
}, {
  path: "/:id/results",
  element: <PuzzleResults />
}]

export default routes;