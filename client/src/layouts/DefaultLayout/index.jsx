import Header from "../../components/Header";

function DefaultLayout({ children }) {
  return (
    <>
      <div className="">
        <Header />
        {children}
      </div>
    </>
  );
}

export default DefaultLayout;
