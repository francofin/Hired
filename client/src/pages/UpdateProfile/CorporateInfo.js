import React from "react"
import { Container } from "react-bootstrap"
import data from "../../data/user-update.json";
import {Image, ProgressBar, Header, ProfileForm, FormContext, ListingForm} from "../../components";



const CorporateInfo = () => {

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
          <p className="subtitle text-primary">{data[3].subtitle}</p>
          <h1 className="h2 mb-5">
            {data[3].title}
            <span className="text-muted float-end">Step 3</span>
          </h1>
          <ListingForm
            data={data[3]}
            prevStep="/user-add-2"
            nextStep="/user-add-4"
          />
        </Container>
      </section>
    </React.Fragment>
    </div>
  )
}

export default CorporateInfo
