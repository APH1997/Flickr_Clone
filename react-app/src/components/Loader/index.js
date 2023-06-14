import GridLoader from "react-spinners/GridLoader";
import './loader.css'

function Loader(){
    const override = {
        marginBottom: "200px"
    }
    return (
        <div className="loader-container">
            <GridLoader
            size={50}
            cssOverride={override}
             />
        </div>
    )
}
export default Loader
