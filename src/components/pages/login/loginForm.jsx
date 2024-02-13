import React, { useState, useContext } from "react";
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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  // State variables for storing input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    console.log("Password:", formData.password);

    // Add your authentication logic or data submission logic here
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>

        <Input type="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" />
        <Input type="password" placeholder="Password" value={formData.password} onChange={handleChange} name="password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
