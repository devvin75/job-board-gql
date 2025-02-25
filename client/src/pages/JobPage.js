import {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
// import { jobs } from '../lib/fake-data';
import {getJob} from '../lib/graphql/queries';

function JobPage() {
  /**Based on the highlighted code const { jobId } = useParams();, 
   * this line is using React Router's useParams hook to extract 
   * the "jobId parameter" from the current URL path.
   * The jobId would contain whatever value is present in the URL parameter. 
   * For example:
   *  If the URL is /jobs/123, then jobId would contain "123"
   *  If the URL is /jobs/abc-xyz, then jobId would contain "abc-xyz"
   * 
   * This is commonly used in React applications to get dynamic values 
   * from the URL route parameters.  */
  const { jobId } = useParams();
  
  // set the state for job id
  const [job,setJob] = useState();

  // 
  useEffect(() => {
    /**When using .then(setJob), you're passing the setJob function directly 
     * as a callback to handle the resolved value from getJob(jobId).
     *
     * This is a shorthand syntax that's equivalent to writing: 
     * useEffect(() => {
        getJob(jobId).then((value) => setJob(value));
       }, [jobId]);
      
       Here's what's happening step by step:
       1.)getJob(jobId) returns a Promise
       2.)When that Promise resolves, it produces some value (likely a job object)
       3.)The .then() method automatically passes that resolved value as an argument 
          to whatever function you provide
       4.)Since setJob is a function that accepts one parameter, 
          it works perfectly as the callback
      
      NOTE:
        This is possible because functions in JavaScript are "first-class citizens," 
        meaning they can be passed as arguments to other functions.
        
        The then method will automatically invoke setJob with the resolved value from the Promise.

     * */
    getJob(jobId).then(setJob);
  }, [jobId]);

  console.log('[JobPage] job:', job);
  
  if(!job){
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="title is-2">
        {job.title}
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(job.date, 'long')}
        </div>
        <p className="block">
          {job.description}
        </p>
        {/* DISPLAY THE LIST OF JOBS AVAILABLE */}
        <h2 className='title is-5'> Jobs at {job.company.name}</h2>
      </div>
    </div>
  );
}

export default JobPage;
