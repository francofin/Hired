import { Container } from "react-bootstrap";
import data from "../../data/user-update.json";
import { AuthContext } from '../../utils/authContext';
import React, {useState, useContext, useEffect} from "react";
import {Image, ProgressBar, Header, ProfileForm, ProfileContext} from "../../components";


const SecondaryInfo = () => {

  
    const [userProfile, setUserProfile] = useContext(ProfileContext);

    const [entityData, setEntityData] = useState(data[2]);

    

    useEffect(() => {

        const isEntity = () => {
            if(userProfile.entity === "Corporation"){
                setEntityData(data[3])
            }
        }

        isEntity();

    }, [userProfile])

    const properties = {
        nav: {
            light: true,
            classes: "shadow",
            color: "white",
          },
          loggedUser: true,
          title: "Update Your Profile",
          listingForm: true,
      }

  return (
    <div style={{paddingTop:'72px'}}>
    <Header headerData={properties} />
    <React.Fragment>
      <ProgressBar progress={40} />
      <section className="py-5">
        <Container>
          <p className="subtitle text-primary">{entityData.subtitle}</p>
          <h1 className="h2 mb-5">
            {entityData.title}
            <span className="text-muted float-end">Step 2</span>
          </h1>
          <ProfileForm
            data={entityData}
            prevStep="/basic-info"
            nextStep="/user-add-3"
          />
        </Container>
      </section>
    </React.Fragment>
    </div>
  )
}

export default SecondaryInfo
