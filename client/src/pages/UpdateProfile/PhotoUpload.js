import React from "react";
import { Container } from "react-bootstrap";
import data from "../../data/user-add.json"
import {Image, ProgressBar, Header, ProfileForm, FormContext, ListingForm} from "../../components";


const PhotoUpload = () => {

  const properties = {
    nav: {
      light: true,
      classes: "shadow",
      color: "white",
    },
    loggedUser: true,
    title: "Add your listing",
    listingForm: true,
  }

  return (
    <div style={{paddingTop:'72px'}}>
    <Header headerData={properties} />
    <React.Fragment>
      <ProgressBar progress={80} />
      <section className="py-5">
        <Container>
          <p className="subtitle text-primary">{data[4].subtitle}</p>
          <h1 className="h2 mb-5">
            {data[4].title}
            <span className="text-muted float-end">Step 4</span>
          </h1>
          <ListingForm
            data={data[4]}
            prevStep="/education-details"
            finish="/complete-profile"
          />
        </Container>
      </section>
    </React.Fragment>
    </div>
  )
}

export default PhotoUpload
