import Table from 'react-bootstrap/Table'
import {Spinner} from 'react-bootstrap';
import useFetchWithToken from '../../../services/useFetchWithToken';
import config from '../../../services/config';
import {Download, Trash} from 'react-bootstrap-icons';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {errorToast, infoToast} from '../../../components/toast/makeToast';
import {formatBytes} from '../../../services/filesService';
import {useHistory} from "react-router-dom";

const FileList = ({whatCatalog}) => {
    const {data: documents, error, isPending} = useFetchWithToken(`${config.API_URL}/api/file`)
    const [isPendingN, setIsPendingN] = useState(false);
    const history = useHistory()

    useEffect(() => {
        if (documents) {
            documents.forEach(document => {
                document.size = formatBytes(document.size);
            })
        }

    }, [documents]);

    const handleShowDocument = (document) => {
        // setIsPendingN(true);
        try {

            axios
                .get(config.API_URL + `/api/file/${document.id}`, {
                    responseType: "blob",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], {type: document.contentType});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    setIsPendingN(false);
                    //Open the URL on new Window
                    const pdfWindow = window.open();
                    pdfWindow.location.href = fileURL;
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            return {error};
        }
    }

    const handleDownload = (fileToDownload) => {
        axios
            .get(config.API_URL + `/api/file/${fileToDownload.id}`, {
                responseType: "blob",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const file = new Blob([response.data], {type: fileToDownload.contentType});
                const fileURL = URL.createObjectURL(file);
                let a = document.createElement('a');
                a.href = fileURL;
                a.download = fileToDownload.name;
                a.click();
            });
    }

    const handleDeleteRequest = (documentToDelete) => {
        fetch(`${config.API_URL}/api/file/${documentToDelete.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    history.push('/user/documents');
                    return response;
                } else {
                    return response;
                }
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('File was deleted');
                } else {
                    errorToast('File was not deleted');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <Table striped borderless hover>
                <caption>List of {whatCatalog} documents</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th className="align-middle text-center">Size</th>
                    <th className="align-middle text-center">Download</th>
                    <th className="align-middle text-center">Delete</th>
                </tr>
                </thead>
                <tbody>
                {error && <>
                    <div className="alert alert-warning fs-3" role="alert">{error} </div>
                    <button className="text-decoration-none ms-3 fs-3" onClick={() => {
                        window.location.href = "/something"
                    }}> Click to refresh
                    </button>
                </>}
                {isPending && isPendingN &&
                <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
                {documents && documents
                    .filter(document => document.catalog === whatCatalog)
                    .map(document => (
                        <tr key={document.id} className="clickable">
                            <td className="align-middle">
                                <button type="button" value={document} className="btn btn-link text-decoration-none"
                                        onClick={() => handleShowDocument(document)}>
                                    {document.name}
                                </button>
                            </td>
                            <td className="align-middle text-center">{document.size}</td>
                            <td className="align-middle text-center">
                                <button type="button" value={document} className="btn btn-link text-decoration-none"
                                        onClick={() => handleDownload(document)}>
                                    <Download/>
                                </button>
                            </td>
                            <td className="align-middle text-center">
                                <button type="button" value={document} className="btn btn-link text-decoration-none"
                                        onClick={() => handleDeleteRequest(document)}>
                                    <Trash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default FileList;