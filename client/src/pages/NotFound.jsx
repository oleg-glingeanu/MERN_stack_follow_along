import {FaBookDead} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <FaBookDead className="text-danger" size="5em"></FaBookDead>
        <h1>404</h1>
        <p>You clicked on a wierd link fool</p>
        <Link to='/' className='btn btn-primary'> Go back idiot
        </Link>
    </div>
  )
}
