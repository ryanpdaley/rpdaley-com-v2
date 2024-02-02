import Footer from './Footer';
import Header from './Header';

const Page = ({ children }) => (
  <div>
    <Header />
    <div className="pt-36 pb-14 w-11/12 md:w-9/12 mx-auto ">{children}</div>
    <Footer />
  </div>
);

export default Page;
