import {useParams} from "react-router";
import {Marginer} from "../../../components/marginer";
import FileList from "./fileList";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const FileListPage = () => {
    const {catalog} = useParams()
    let catalogName = capitalizeFirstLetter(catalog).replace('-', ' ') + ' documents';
    return (
        <>
            <div className="media align-items-center py-3">
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold display-4">{catalogName}</h4>
                </div>
            </div>
            <Marginer direction="vertical" margin={35}/>
            <FileList className="pe-4 me-5 mt-5" whatCatalog={catalog}/>
        </>
    );
}

export default FileListPage;