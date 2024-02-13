import React, {useState, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "../../resuseable_components/accountBox/common";
import { Marginer } from "../../resuseable_components/marginer";
import { AccountContext } from '../../resuseable_components/accountBox/accountContext';

export function SignupForm(props) {

  const { switchToSignin } = useContext(AccountContext);

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    user_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the 'email' and 'password' variables as needed
    console.log("Email:", formData.email);
    console.log("Password:", formData.password1);
    console.log("Password:", formData.password2);

    // Add your authentication logic or data submission logic here
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="User name name" name="user_name" value={formData.user_name} onChange={handleChange}  />
        <Input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <Input type="password" placeholder="Password" name="password1" value={formData.password1} onChange={handleChange}/>
        <Input type="password" placeholder="Confirm password" name="password2" value={formData.password2} onChange={handleChange}/>
        <select name="acc-type" id="acc-type">
          <option value="Srb Staff">SRB Staff</option>
          <option value="Management">Management</option>
          <option value="IT">IT</option>
        </select>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}