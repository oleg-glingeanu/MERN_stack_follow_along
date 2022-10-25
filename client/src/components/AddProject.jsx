import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_PROJECT} from "../mutations/projectMutation"
import { GET_CLIENTS } from "../queries/clientQueries"
import { GET_PROJECTS } from "../queries/projectQueries"


export default function AddProject() {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('new')
  const [clientId, setClientId] = useState('')


  const [addProject] = useMutation(CREATE_PROJECT , {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const {loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) =>{
    e.preventDefault();
    if(name === '' || description === '' || status === '' || clientId === ''){
      return alert('Please fill in all fields')
    }

    addProject(name, description, status, clientId);
    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  }

  if (loading) return null;
  if (error) return "Sorry there was an error with getting theclients"

  return (
    <>
    {!loading && !error && (
      <>
      <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addProjectModal">
        <div className="d-flex align-items-center">
          <FaList className="icon"/>
          <div>Add a new Project</div>
        </div>
      </button>


      <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="addProjectModalLabel">Add Project</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type='text' className='form-control' id='name' value={name} onChange={ (e) => {
                    setName(e.target.value)
                  }}></input>
                  <label className="form-label">Description</label>
                  <textarea type='text' className='form-control' id='name' value={description} onChange={ (e) => {
                    setDescription(e.target.value)
                  }}></textarea>
                  <label className="form-label">Status</label>
                  <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <label className="form-label">Client ID</label>
                  <select className="form-select" id="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                    <option value="">Select Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Create New project</button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    </>
  )
}