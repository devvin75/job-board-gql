import {useState,useEffect} from 'react';
import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
import {getJobs} from '../lib/graphql/queries';


// getJobs().then((jobs) => console.log('jobs: ', jobs))
function HomePage() {
  const [jobs, setJobs] = useState([]);        

  useEffect(() => {
    // getJobs().then((jobs) => setJobs(jobs));
    getJobs().then(setJobs);
  }, []);
  
  // console.log('[HomePage] jobs: ', jobs)
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;


/**The getJobs() function is called inside the useEffect hook for several important reasons:
 * 1.)Asynchronous Data Fetching: 
 *    The getJobs() function is an asynchronous operation that fetches job data from a GraphQL API. 
 *    -->>By placing it inside useEffect, we ensure that the data fetching occurs after the component has mounted.
 * 
 * 2.)Side Effect Management: 
 *    useEffect is designed to handle side effects in functional components. 
 *    >>Fetching data from an API is considered a side effect because it involves interaction with external resources.
 * 
 * 3.)Preventing Infinite Loops: 
 *    If getJobs() were called directly in the component body, it would trigger a re-render each time it updates 
 *    the state, which would then cause the function to be called again, resulting in an infinite loop. 
 *    useEffect helps prevent this by controlling when the effect runs.
 * 
 * 4.)Performance Optimization: 
 *    The empty dependency array [] as the second argument to useEffect ensures that 
 *    the effect only runs once when the component mounts, rather than on every render.
 * 
 * 5.)Separation of Concerns: 
 *    This approach separates the data fetching logic from the rendering logic, 
 *    making the component easier to understand and maintain.
 * 
 * 6.)Handling Component Lifecycle: 
 *    useEffect is React's way of handling component lifecycle events in functional components. 
 *    It's similar to componentDidMount in class components, which is typically where you would perform
 *    initial data fetching.
 * 
 * UseEffect no async keyword
 * 1.) useEffect callback cannot be async:
       The callback function passed to useEffect cannot be directly marked as async.
       This is because React expects the "cleanup function" (if any) to be returned synchronously from the effect.

   2.)Promise handling:
      In this case, we're using the .then() method to handle the promise returned by getJobs(). 
      This approach doesn't require the use of async/await syntax.   
 * 
 */