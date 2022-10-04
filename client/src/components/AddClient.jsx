import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { CREATE_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"

export default function AddClient() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const onSubmit = (e) =>{
    e.preventDefault();
    if(name === '' || email === '' || phone === ''){
      return alert('Please fill in all fields')
    }

    addClient(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  }


  const [addClient] = useMutation(CREATE_CLIENT , {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });


  return (
    <>
      <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon"/>
          <div>Add a new client</div>
        </div>
      </button>


      <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="addClientModalLabel">Add Client</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type='text' className='form-control' id='name' value={name} onChange={ (e) => {
                    setName(e.target.value)
                  }}></input>
                  <label className="form-label">Email</label>
                  <input type='text' className='form-control' id='name' value={email} onChange={ (e) => {
                    setEmail(e.target.value)
                  }}></input>
                  <label className="form-label">Phone</label>
                  <input type='text' className='form-control' id='name' value={phone} onChange={ (e) => {
                    setPhone(e.target.value)
                  }}></input>
                </div>
                <div className="modal-footer">
              <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Create New Client</button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
