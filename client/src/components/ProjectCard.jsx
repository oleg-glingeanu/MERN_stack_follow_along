export default function ProjectCard(props) {
    return (
        <div className="col-md-4">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <h5 className="card-title"> {props.project.name} </h5>
                        <h6 className="card-title"> {props.project.description} </h6>
                        <a href={`projects/${props.project.id}`} className="btn btn-outline-primary">View Project</a>
                    </div>
                    <h6 className="mt-3">Status: {props.project.status}</h6>
                </div>
            </div>
        </div>
    )
}