import swal from 'sweetalert';
import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import data from "../data/user-add.json";
import { useMutation } from '@apollo/client';
import {USER_JOBS} from '../utils/queries';
import {CREATE_JOB} from '../utils/mutations';
import { ProfileContext } from './profileContext';
import {ProgressBar, Image} from "../../components";
import { Container, Button } from "react-bootstrap";


const CompleteJobUpload = () => {

//   const [userJob, setUserJob, resetUserJob] = useContext(JobContext);
  const [loading, setLoading] = useState(false)

  const properties = {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      loggedUser: true,
      title: "Submit Profile",
      listingForm: true,
  };


  const [createJob] = useMutation(CREATE_JOB, {
    //update cache and handle error as well. 
    update: (cache, {data: {createJob}}) => {
      //read from the cache
      console.log(data);
      const {userJobs} = cache.readQuery({
        query: USER_JOBS
      })
      //write query to cache
      cache.writeQuery({
        query: USER_JOBS,
        data: {
          userJobs: [createJob, ...userJobs]
        }
      })
    },
    onError: (err) => console.log(err.graphQLError[0].message)

  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    createJob({variables: {input:userJob }});
    setUserJob

  }
  

  // const [updateUser] = useMutation(UPDATE_USER, {
  //     update: ({data}) => {
  //       console.log('Update Mutation Called', data);
  //       swal({
  //         title: `Success, Your Profile has been updated`,
  //         icon: "success",
  //       });
  //     }  
  // })


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true)
  //   updateUser({
  //     variables:{
  //       input: userProfile
  //     }
  //   })
  //  setLoading(false)
  // }
  

  console.log(formInputs)
  return (
    <React.Fragment>
      <ProgressBar progress={100} />
      <section className="py-5">
        <Container className="text-center">
          <p className="subtitle text-primary">{data[5].subtitle}</p>
          <h1 className="h2 mb-5">{data[5].title}</h1>
          <p className="mb-5">
            <Image
              src="/content/img/illustration/undraw_celebration_0jvk.svg"
              width={400}
              height={279}
              layout="intrinsic"
              alt=""
              className="img-fluid"
              sizes="(max-width: 576px) 100vw, 530px"
            />
          </p>
          <p className="mb-5 text-muted">{data[5].content}</p>
          <p className="mb-5">
            <Link href={data[5].buttons[0].link} passHref>
              <Button className="me-2 mb-2">{data[5].buttons[0].title}</Button>
            </Link>
            <Link href={data[5].buttons[1].link} passHref>
              <Button variant="outline-muted" className="mb-2">
                {data[5].buttons[1].title}
              </Button>
            </Link>
          </p>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CompleteJobUpload;
