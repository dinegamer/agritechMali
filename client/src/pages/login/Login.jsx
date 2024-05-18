import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import lock from '../../../src/images/lock.svg';
import heroLogo from '../../../src/images/logo2.png';
import googleLogo from "../../../src/images/google-logo.png";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import "./login.scss"; // Classe d'animation pour les ballons

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    recaptcha_response: '' // Champ pour la réponse au Recaptcha
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Etat pour contrôler l'affichage du loader

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleRecaptchaChange = (value) => {
    setData({ ...data, recaptcha_response: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activer le loader pendant le chargement

    try {
      console.log(data);
      const url = "http://localhost:5000/login"; // Endpoint correct pour le login
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.token);
      window.location = "/dashboard";
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      }
    } finally {
      setLoading(false); // Désactiver le loader après le chargement
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      // Appel à la route '/google_register' pour initier l'autorisation Google
      window.location = "http://localhost:5000/google_register";
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la connexion avec Google :", error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="mainLogin">
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />

        <div className="ui raised very padded text container segment" id="container">
          <h1
            className="fs-1 text-white"
            style={{
              background: "linear-gradient(to right, #72A06A 0%, #598216 68%)",
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

          <h3 className="card-title text-black">
            <center>Bienvenue chers agriculteurs dans un monde nouveau </center>
          </h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss=""
                aria-label="Close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}
          <br />

          <div className="ui two column grid">
            <div className="row">
              <div className="column">
                <img className="ui medium image" src={lock} alt="lock" />
              </div>
              <div className="column">
                <form action="/login" method="POST" className="ui large form" onSubmit={onSubmit}>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input
                        placeholder="Email *"
                        type="text"
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
                        placeholder="Mot de passe *"
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={handleChange}
                        value={data.password}
                      />
                    </div>
                  </div>
                  <div className="field">
                    {/* Intégration du ReCAPTCHA */}
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      onChange={handleRecaptchaChange}
                    />
                  </div>
                  <br />
                  {loading ? (
                    // Afficher le loader si loading est true
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {/* Utilisation du loader CircularProgress */}
                      <CircularProgress style={{ color: '#72A06A' }} />
                    </div>
                  ) : (
                    // Sinon, afficher le bouton de connexion
                    <button
                      type="submit"
                      className="ui fluid large teal submit button"
                      style={{
                        background: "linear-gradient(to right, #72A06A 0%, #598216 68%)",
                      }}
                    >
                      Se connecter
                    </button>
                  )}
                </form>
                <br />
                <button
                  className="ui fluid large blue submit button"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src={googleLogo}
                    alt="Google Logo"
                    style={{ marginRight: "10px" }}
                  />
                  Connexion avec Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background-balloons">
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
        <div className="balls large"></div>
      </div>
    </div>
  );
};

export default Login;
