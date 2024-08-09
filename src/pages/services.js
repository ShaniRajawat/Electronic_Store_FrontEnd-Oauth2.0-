import Base from "../components/Base";

function Services(){
    return (
        <Base
        title="Services we Provide"
        description="In this page we will discuss about the services that we provide."
        buttonEnabled={true}
        buttonLink="/"
        buttonType="success"
        buttonText="Home"
        >
            <div>
                This is Services Page
            </div>
        </Base>
    )
}

export default Services;