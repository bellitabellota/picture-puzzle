import { useParams, Link } from "react-router-dom";
import usePuzzleResults from "./custom_hooks/usePuzzleResults";

function PuzzleResults() {
  const params = useParams();
  
  if (!params.id) {
    throw new Error("Expected route param :id to exist");
  }

  const {puzzleResults, puzzleTitle, error, isLoading} = usePuzzleResults(params.id);

  if(isLoading) return <p>Puzzle Results are loading ...</p>
  if(error) return <p>{error.message}</p>;

  const resultElements = puzzleResults.map((result, index) => {
    const minutes = Math.floor(result.secondsToCompletion/ 60);
    const remainingSeconds = result.secondsToCompletion % 60;

    return(
      <div key={result.id}>
        <p className="rank">{index + 1}</p>
        <p className="name">{result.name}</p>
        <p className="duration">{`${minutes} m ${remainingSeconds} s `}</p>
      </div>
    )
  })

  return (
    <main className="main-picture-puzzle-results">

    <Link to="/" >&lt; Back to Home</Link>
    <h1>{puzzleTitle} - Results</h1>

    <div className="results-container">
      <div className="label-container">
        <p className="rank-label">Rank</p>
        <p className="name-label">Name</p>
        <p className="duration-label">Duration</p>
      </div>
      { resultElements }
    </div>
  </main>
  )
}

export default PuzzleResults;