import React from "react"
import { Container } from "react-bootstrap"
import data from "../../data/user-update.json";
import {Image, ProgressBar, Header, ProfileForm, FormContext, ListingForm} from "../../components";



const TertiaryInfo = () => {

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
      <ProgressBar progress={60} />
      <section className="py-5">
        <Container>
          <p className="subtitle text-primary">{data[4].subtitle}</p>
          <h1 className="h2 mb-5">
            {data[4].title}
            <span className="text-muted float-end">Step 3</span>
          </h1>
          <ListingForm
            data={data[4]}
            prevStep="/personal-details"
            nextStep="/upload-photos"
          />
        </Container>
      </section>
    </React.Fragment>
    </div>
  )
}

export default TertiaryInfo
