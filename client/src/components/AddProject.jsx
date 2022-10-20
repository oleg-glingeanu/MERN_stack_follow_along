import { FaPager } from "react-icons/fa"


export default function AddProject() {
  return (
    <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
        <FaPager className="icon"/>
          <div>Add a new Project</div>
        </div>
      </button>
  )
}
