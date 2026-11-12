import { useNavigate } from "react-router-dom";
function PageHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="pageHeader">
      <button className="backButton" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <h2>{title}</h2>
    </div>
  );
}

export default PageHeader;
