import React,{useState,useEffect} from "react";
import { TERipple } from "tw-elements-react";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../components/utils/Loader";
import { useNavigate } from "react-router-dom";
import { login,submit_data,getMissingInvoice,getAllNtn, getUserRole,logout } from "../action/action";
import { ToastContainer, toast } from 'react-toastify';
export default function Login(){
  const {isLoading} =useSelector(state=>state.centralStore)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialFormState = {
  
    email: '',
    password: '',

    
  };

  useEffect(()=>{
    const Logout = async () => {
    if(window.location.pathname==="/login"){
      const out= await dispatch(logout());  
    } 
    }
    Logout();}
  ,[])

  const [formValues, setFormValues] = useState(initialFormState);

  const handleChange = (event) => {
      const { name, value } = event.target;
    
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form submitted:', formValues);

    const a = await dispatch(login(formValues));
const b = a && (await dispatch(getUserRole()));
// if (a){
//   navigate('/dashboard')
// }
// if (b) {
//   navigate('/dashboard');
// }
      toast.error('Oops! Something went wrong.');
  };
  if(isLoading){
    return <Loader/>
  }
  return (
           <>
           <ToastContainer />
        <div className="flex flex-wrap justify-center h-screen items-center text-neutral-800 dark:text-neutral-200">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div>
                {/* <!-- Left column container--> */}
                <div>
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                    <h4 className="mb-2 mt-1 pb-1 text-xl font-semibold">
                        Sindh Revenue Board
                      </h4>
                      <img
                        className="mx-auto w-48 mb-12"
                        src="src\images\srb-logo.png"
                        alt="logo"
                      />
                    
                    </div>

                    <form>
                      <div className="text-center">
                      <p className="mb-4">Please login to your account</p>
                      </div>
                      {/* <!--Username input--> */}
                      <div className="text-center">
                      <input type="text"
                        placeholder="Username"
                        className="mb-4"
                        value={formValues.email}
                        name="email"
                        onChange={handleChange}
                      />
                      </div>

                      {/* <!--Password input--> */}
                      <div className="text-center ">
                      <input
                        type="password"
                        placholder="Password"
                        className="mb-5"
                        value={formValues.password}
                        name="password"
                        onChange={handleChange}
                     />
                     </div>

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #009739, #006a33, #005c2e, #004726)",
                            }}
                            onClick={handleSubmit}
                          >
                            Log in
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Forgot password?</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                {/* <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div> */}
                
              </div>
            </div>
          </div>
          </>
  );
}