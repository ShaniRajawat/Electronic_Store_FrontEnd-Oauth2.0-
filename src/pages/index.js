import Base from "../components/Base";
import {
  ContactForm,
  TrendingProducts,
  infoWithImageSection,
  infoWithImageSection2,
} from "../components/HomePageComponent";


function Index() {
  return (
    <Base
      title="Shop What you need"
      description={
        "Welcome to Trending Store, We provide best items as you required"
      }
      buttonEnabled={true}
      buttonText="Start Shopping"
      buttonType="success"
    >
      <div className="my-4">{TrendingProducts([])}</div>
      <div className="my-5">
        {infoWithImageSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus magnam dicta molestias, at dolore iure deleniti fuga quam aliquid perspiciatis."
        )}
      </div>
      <div className="my-5" style={{margin:"100px 0px"}}>
        {infoWithImageSection2(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus magnam dicta molestias, at dolore iure deleniti fuga quam aliquid perspiciatis."
        )}
      </div>
      <div>{ContactForm()}</div>
    </Base>
  );
}

export default Index;
