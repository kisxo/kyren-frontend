import Layout from "../components/Layout/Layout";
import "./Support.css";

const Support = () => {

  return (
    <Layout>
        <form className="support-form">
        <h3 className="text-light mb-4">Please message us if you face any problem! </h3>
        <div className="mb-3">
            <label for="name" className="">Full Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="phone" className="">Mobile Number: ( Whatsapp Preferred)</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-4">
            <label for="Message" className="">Message</label>
            <textarea type="text" className="form-control" id="message"></textarea>
        </div>
        {/* <div className="mb-3 form-check">
            <input type="checkbox" className="" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div> */}
        <button type="submit" className="btn submit">Submit</button>
        </form>
    </Layout>
  );
};

export default Support;
