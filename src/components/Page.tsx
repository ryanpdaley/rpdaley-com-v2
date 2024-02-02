import Footer from './Footer';
import Header from './Header';

const Page = ({ children, darkMode, setDarkMode }) => (
  <div>
    <Header darkMode={darkMode} />
    <div className="pt-36 pb-14 w-11/12 md:w-9/12 mx-auto ">{children}</div>
    <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
  </div>
);

export default Page;
