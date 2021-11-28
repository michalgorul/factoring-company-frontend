import {Folder} from "react-bootstrap-icons"
import styled from "styled-components";


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

const Reports = () => {
    return ( 
        <>
        <div className="media align-items-center py-3">
        <div className="media-body ml-4">
          <h4 className="font-weight-bold display-2 mb-4">Reports</h4>
        </div>
      </div>

			<ul className="list-group list-group-flush me-4 fs-3 ms-3">
				<li className="list-group-item mt-3"><Folder className="text-primary mb-4 me-3" />
					<Directory href="/user/reports/customers">Customer reports</Directory>
				</li>
				<li className="list-group-item mt-3"><Folder className="text-primary mb-4 me-3" />
					<Directory href="/user/reports/expense">Expense reports</Directory>
				</li>
				<li className="list-group-item mt-3"><Folder className="text-primary mb-4 me-3" />
					<Directory href="/user/reports/charts">Charts</Directory>
				</li>
			</ul>
      </>
     );
}
 
export default Reports;