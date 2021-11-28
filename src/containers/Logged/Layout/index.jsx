import Sidebar from "../Sidebar/sidebar";

const Layout = (props) => {
    return (
        <div>
            <div className="d-flex justify-content-start">
                <div>
                    <Sidebar/>
                </div>
                <div className="ms-3 mt-2 flex-grow-1">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;