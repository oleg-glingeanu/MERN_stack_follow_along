import {Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';


export default function Project() {
    const { id } = useParams();
    const { loading, error, data} = useQuery(GET_PROJECT, {variables: { id }});

    if (loading) return <Spinner />
    if (error) return <p>Oh no error !</p>


  
  
    return (
        <>
            <p>{data.project.name}</p>
        </>
  )
}
