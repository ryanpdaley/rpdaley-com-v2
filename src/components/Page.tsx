import Footer from "./Footer";
import Header from "./Header";

const Page = ({ children }) => (
  <div>
    <Header />
    <div className='pt-36 w-9/12 mx-auto'>{children}</div>
    <Footer />
  </div>
);

export default Page;
