import {Button, Form, Modal, ProgressBar} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Folder, FolderPlus, StarFill} from "react-bootstrap-icons"
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import config from "../../../services/config";
import {errorToast, infoToast, warningToast} from "../../../components/toast/makeToast";
import {Marginer} from "../../../components/marginer";
import {formatBytes} from "../../../services/filesService";
import {ifTokenCannotBeTrusted} from "../../../services/authenticationService";

const Documents = () => {

    const [catalog, setCatalog] = useState('favourite');
    const [show, setShow] = useState(false);
    const [, setIsPending] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const availableSpace = useState(104857600);
    const [usedSpace, setUsedSpace] = useState(0);
    const [percentage, setPercentage] = useState(usedSpace / availableSpace * 100);
    useHistory();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (e) => setCatalog(e.target.value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleButtonAvailability = () => {
        const button = document.querySelector('button')
        button.disabled = usedSpace < availableSpace;
    }

    useEffect(() => {
        getUsedSpace();
        setPercentage(usedSpace / availableSpace * 100)
        handleButtonAvailability();
    }, [availableSpace, handleButtonAvailability, usedSpace])

    const getUsedSpace = () => {
        fetch(`${config.API_URL}/api/file/used`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("could not fetch the data for that resource");
                }
                return response.text();
            })
            .then(data => {
                ifTokenCannotBeTrusted(data);
                setUsedSpace(Number(data));
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // On file select (from the popup)
    const handleChange = event => {
        // Update the state
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (e) => {

        if (selectedFile) {
            e.preventDefault();
            // Create an object of formData
            let formData = new FormData();
            formData.append(
                "myFile",
                selectedFile,
                selectedFile.name
            );
            setIsPending(true);
            formData = new FormData();
            formData.append("file", selectedFile);

            fetch(`${config.API_URL}/api/file?catalog=${catalog}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            })
                .then((response) => {
                    setIsPending(false);
                    if (response.ok) {
                        handleClose();
                        return response;
                    } else {
                        return response
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        infoToast('File was uploaded')
                    } else {
                        errorToast('File was not uploaded')
                    }
                })
        } else {
            warningToast('Please select file')
        }

    }

    return (
        <>
            <div className="media align-items-center py-3">
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold display-2">Your documents</h4>
                        <button onClick={handleShow} className="btn btn-primary rounded-pill fs-4 float-end me-5"> Add files +</button>
                </div>
            </div>

            <div className="bg-light me-3">
                <div className="container" style={{marginLeft: "0"}}>
                    <div className="col-12 col-lg-6">
                        <div className="mb-1 mt-3">
                            <span className="display-6 fw-bold mb-2">{formatBytes(usedSpace)} </span> of <span
                            className="display-6">{100} MB</span>
                            <p className="fs-5 ms-2">Your available space for files</p>
                        </div>
                        <ProgressBar now={percentage} animated style={{height: "5px"}}/>
                        <Marginer direction="vertical" margin={20}/>
                    </div>
                </div>
            </div>

            <ul className="list-group list-group-flush me-4 fs-3 ms-3">
                <li className="list-group-item mt-3"><StarFill className="text-primary mb-4 me-3"/>
                    <Directory href="/user/documents/list/favourite">Favourite</Directory>
                </li>
                <li className="list-group-item mt-3"><Folder className="text-primary mb-4 me-3"/>
                    <Directory href="/user/documents/list/work">Work</Directory>
                </li>
                <li className="list-group-item mt-3"><Folder className="text-primary mb-4 me-3"/>
                    <Directory href="/user/documents/list/bank">Bank documents</Directory>
                </li>
                <li className="list-group-item mt-3"><Folder className="text-primary mb-4 me-3"/>
                    <Directory href="/user/documents/list/tax">Tax forms</Directory>
                </li>
                <li className="list-group-item mt-3"><FolderPlus className="text-primary mb-4 me-3"/>
                    <Directory href="/user/documents/list/credit">Credit documents</Directory>
                </li>
            </ul>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Select catalog name
                    <Form.Select aria-label="Default select example" onChange={handleSelect}>
                        <option value="favourite">Favourite</option>
                        <option value="work">Work</option>
                        <option value="bank">Bank documents</option>
                        <option value="tax">Tax forms</option>
                        <option value="credit">Credit documents</option>
                    </Form.Select>
                    <br/>
                    <Form.Group id="formFile" className="mb-3">
                        <Form.Label>Choose file to upload</Form.Label>
                        <Form.Control id="formFile" type="file" onChange={handleChange}/>
                        <Form.Text id="passwordHelpBlock" muted>
                            Max file size: 5 MB
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

const Directory = styled.a`
  position: relative;
  display: inline-block;
  overflow: hidden;
  background: linear-gradient(to right, #0d6efd, #0d6efd 50%, black 50%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  background-position: 100%;
  transition: background-position 275ms ease;
  text-decoration: none; // text decorations are clipped in WebKit browsers
  &:hover {
    background-position: 0 100%;
  }
`

export default Documents;