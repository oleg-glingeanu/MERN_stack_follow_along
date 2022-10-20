import Clients from '../components/Clients'
import Projects from '../components/Projects'
import AddClient from '../components/AddClient'
import AddProject from '../components/AddProject'


export default function Home() {
  return (
    <>
        <div   div className='d-flex gap-3 mb-4'>
          <AddProject/>
        </div>
        <Projects />
        <div   div className='d-flex gap-3 mb-4'>
          <AddClient/>
        </div>
        <Clients />

    </>
  )
}
