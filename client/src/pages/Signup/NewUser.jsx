import React, { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha'
import lock from "../../../src/images/lock.svg";
import heroLogo from "../../../src/images/logo2.png";
import googleLogo from "../../../src/images/google-logo.png";
import "./signup.scss";

const NewUser = () => {
  const recaptcha = useRef()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [captchaValue, setCaptchaValue] = useState("6Lc0xtUpAAAAAL_NNfsrFyEyMVaK-L8Jyn0uwL0r");

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!captchaValue) {
        setErrors("Veuillez vérifier le reCAPTCHA !");
      } else {
        const verifyUrl = "http://localhost:5000/verify";
        const verifyResponse = await axios.post(
          verifyUrl,
          `captchaValue=${captchaValue}`,
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }
      );
  
        if (verifyResponse.data) {
          const registerUrl = "http://localhost:5000/register";
          const registerResponse = await axios.post(registerUrl, data);
  
          if (registerResponse.data) {
            window.location = "/dashboard";
            setSuccess("Compte créé avec succès");
          } else {
            setErrors("Erreur lors de l'enregistrement de l'utilisateur");
          }
        } else {
          setErrors("La validation reCAPTCHA a échoué !");
        }
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      setErrors("Une erreur s'est produite lors de la soumission du formulaire");
    }
  };

  const recaptchaCallback = (response) => {
    setCaptchaValue(response);
  };

  return (
    <div className="Signup">
      <div className="mainSignUp">
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <div className="ui raised very padded text container segment" id="container">
          <h1
            className="fs-1 text-white"
            style={{
              background: "linear-gradient(to right, #611e80 0%, #de2a89 68%)",
            }}
          >
            <center className="d-inline-block align-top navbar-brand">
              <img
                src={heroLogo}
                width="90"
                height="90"
                alt="logo"
                style={{ margin: "10px" }}
              />
              Agri-Ai
            </center>
          </h1>
          <br />
          <h3 className="card-title fs-1 text-black">
            <center>Inscrire un nouvel utilisateur</center>
          </h3>
          {errors ? (
            <div className="alert alert-danger" role="alert">
              {errors}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss=""
                aria-label="Close"
                onClick={() => setErrors("")}
              ></button>
            </div>
          ) : (
            <div className="alert alert-success" role="alert">
              <strong>{success}</strong>
            </div>
          )}
          <br />
          <div className="ui two column grid">
            <div className="row">
              <div className="column">
                <img className="ui medium image" src={lock} alt="lock" />
              </div>
              <div className="column">
                <form action="/register" method="POST" className="ui large form" onSubmit={onSubmit}>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input
                        placeholder="Prénom"
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        onChange={handleChange}
                        value={data.firstName}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input
                        placeholder="Nom"
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        onChange={handleChange}
                        value={data.lastName}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left icon input">
                      <i className="mail icon"></i>
                      <input
                        placeholder="Adresse mail"
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={data.email}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input
                        placeholder="Mot de passe"
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={handleChange}
                        value={data.password}
                      />
                    </div>
                  </div>

                  {/* Champ pour stocker la réponse reCAPTCHA */}
                  <div className="button-container">
                    <div className="g-recaptcha" data-sitekey="6Lc0xtUpAAAAAL_NNfsrFyEyMVaK-L8Jyn0uwL0r" data-callback={recaptchaCallback}></div>
                    <button type="submit" className="ui fluid large teal submit button">Créer le compte</button>
                  </div>

                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    onChange={recaptchaCallback}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
