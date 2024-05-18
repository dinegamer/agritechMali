import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, TextField, Button, Card, CardContent, CardHeader, CardMedia, Box } from '@mui/material';
import './index.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { green, red } from '@mui/material/colors';

function Detection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(""); // État pour stocker l'image uploadée

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Mettre à jour l'état avec le fichier image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image); // Ajouter l'image à FormData

    try {
      const response = await axios.post('http://127.0.0.1:5000/predictDeasease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Définir le type de contenu en multipart/form-data
        }
      });
      
      console.log('Prediction:', response.data.result);
      setResult(response.data.result);
    } catch (error) {
      console.error('Axios Request Error:', error);
      console.log('FormData:', formData);
    }
  };
  const correspondance = {
    'Pepper__bell___Bacterial_spot': "Votre poivron est infecté par la tache bactérienne. Nous vous recommandons de prendre des mesures immédiates pour traiter cette maladie et éviter sa propagation.",
    'Pepper__bell___healthy': "Votre feuille de poivron est en bonne santé. Cependant, pour préserver sa santé, nous vous recommandons de maintenir une surveillance régulière et de prendre des mesures préventives pour éviter les maladies.",
    'Potato___Early_blight': "Votre pomme de terre est infectée par le mildiou précoce. Nous vous recommandons de retirer les parties infectées de la plante et d'appliquer un traitement fongicide approprié.",
    'Tomato_Bacterial_spot': "Votre tomate est infectée par la tache bactérienne. Nous vous recommandons d'éliminer les plantes infectées, d'éviter l'arrosage excessif et d'appliquer un traitement fongicide.",
    'Tomato_Early_blight': "Votre tomate est infectée par le mildiou précoce. Nous vous recommandons d'éviter l'arrosage excessif, de retirer les parties infectées et d'appliquer un traitement fongicide.",
    'Tomato_Late_blight': "Votre tomate est infectée par le mildiou tardif. Nous vous recommandons de retirer les parties infectées, d'éviter l'arrosage par aspersion et d'appliquer un traitement fongicide.",
    'Tomato_Leaf_Mold': "Votre tomate est infectée par la moisissure des feuilles. Nous vous recommandons de réduire l'humidité, d'éviter l'arrosage par aspersion et d'appliquer un traitement fongicide.",
    'Tomato_Septoria_leaf_spot': "Votre tomate est infectée par la tache septoria des feuilles. Nous vous recommandons d'éliminer les feuilles infectées, d'appliquer un traitement fongicide et de maintenir une bonne circulation de l'air.",
    'Tomato__Target_Spot': "Votre tomate est infectée par la tache ciblée. Nous vous recommandons d'éviter l'arrosage excessif, de retirer les feuilles infectées et d'appliquer un traitement fongicide.",
    'Tomato__Tomato_YellowLeaf__Curl_Virus': "Votre tomate est infectée par le virus de la feuille jaune de la tomate. Malheureusement, il n'y a pas de traitement spécifique pour cette maladie. Nous vous recommandons de retirer les plantes infectées et de les éliminer pour éviter la propagation du virus.",
    'Tomato__Tomato_mosaic_virus': "Votre tomate est infectée par le virus de la mosaïque de la tomate. Malheureusement, il n'y a pas de traitement spécifique pour cette maladie. Nous vous recommandons de retirer les plantes infectées et de les éliminer pour éviter la propagation du virus.",
    'Tomato_healthy': "Votre tomate est en bonne santé. Cependant, pour prévenir les maladies, nous vous recommandons de maintenir une bonne hygiène au jardin, d'arroser les plantes au niveau du sol et de surveiller régulièrement les signes de maladies."
}
const audioURLs = {
  "sante": "https://res.cloudinary.com/intec-sup/video/upload/v1716023405/Rue_234_15_spqdme.m4a",
  "malade": "https://res.cloudinary.com/intec-sup/video/upload/v1716023405/Rue_234_16_otjete.m4a",

};
const audioToPlay = result.includes('healthy') ? audioURLs["sante"] : audioURLs["malade"];


return (
  <div className="background-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
  <div className="wave"></div>
  <Container maxWidth="md" className="mainContainer" sx={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '30px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', marginTop: '60px', backdropFilter: 'blur(10px)' }}>
        <Typography variant="h3" align="center" className="title" sx={{ color: '#004d40', fontWeight: 'bold', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Système de Reconnaissance de Maladies des Plantes</Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '20px', boxShadow: '0px 10px 20px rgba(0, 128, 0, 0.5)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 12px 24px rgba(0, 128, 0, 0.7)' }, backgroundColor: '#e8f5e9' }}>
              <CardHeader title="Bienvenue" titleTypographyProps={{ align: 'center', color: 'black', fontWeight: 'bold' }} />
              <CardContent>
                <Typography variant="body1" sx={{ color: 'black', textAlign: 'justify' }}>
                  Notre mission est d'aider à identifier efficacement les maladies des plantes. Téléversez une image d'une plante, et notre système l'analysera pour détecter d'éventuels signes de maladies. Ensemble, protégeons nos cultures et assurons une récolte plus saine !
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '20px', boxShadow: '0px 10px 20px rgba(0, 128, 0, 0.5)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 12px 24px rgba(0, 128, 0, 0.7)' }, backgroundColor: '#e8f5e9' }}>
              <CardHeader title="Comment ça marche" titleTypographyProps={{ align: 'center', color: 'black', fontWeight: 'bold' }} />
              <CardContent>
                <Typography variant="body1" component="ol" sx={{ paddingLeft: '16px', color: 'black', textAlign: 'justify' }}>
                  <li>Descendez juste en bas sur <strong>Choisir un fichier</strong> et téléversez une image d'une plante suspectée d'être malade.</li>
                  <li>Notre système traitera l'image à l'aide d'algorithmes avancés pour identifier les maladies potentielles.</li>
                  <li>Consultez les résultats et les recommandations pour d'autres actions.</li>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '20px', boxShadow: '0px 10px 20px rgba(0, 128, 0, 0.5)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 12px 24px rgba(0, 128, 0, 0.7)' }, backgroundColor: '#e8f5e9' }}>
              <CardHeader title="Pourquoi nous choisir" titleTypographyProps={{ align: 'center', color: 'black', fontWeight: 'bold' }} />
              <CardContent>
                <Typography variant="body1" component="ul" sx={{ paddingLeft: '16px', color: 'black', textAlign: 'justify' }}>
                  <li><strong>Précision :</strong> Notre système utilise des techniques de pointe en matière d'apprentissage automatique pour une détection précise des maladies.</li>
                  <li><strong>Convivialité :</strong> Interface simple et intuitive pour une expérience utilisateur transparente.</li>
                  <li><strong>Rapidité et Efficacité :</strong> Obtenez des résultats en quelques secondes, ce qui permet une prise de décision rapide.</li>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ backgroundColor: '#e8f5e9', borderRadius: '15px', padding: '20px', marginTop: '30px', boxShadow: '0px 10px 20px rgba(0, 128, 0, 0.3)' }}>
          <form onSubmit={handleSubmit} className="form">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="uploadInput" style={{ display: 'block', margin: '0 auto', padding: '10px', border: '2px dashed #004d40', borderRadius: '10px', backgroundColor: '#ffffff', color: '#004d40', fontSize: '16px', textAlign: 'center' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" sx={{ backgroundColor: 'rgba(0, 128, 0, 0.7)', width: '100%', fontWeight: 'bold', '&:hover': { backgroundColor: 'rgba(0, 128, 0, 0.9)' } }}>Téléverser l'image</Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        <Box mt={4} textAlign="center">
          {result && result.includes('healthy') ? (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#e8f5e9', borderRadius: '10px', padding: '20px' }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: green[500], marginRight: 2 }} />
              <Box>
                <Typography variant="h5" sx={{ color: green[500] }}>Votre plante est en bonne santé ! 🌱</Typography>
                <Typography variant="body1" sx={{ color: green[500], marginTop: 1 }}>{correspondance[result]}</Typography>
              </Box>
            </Box>
          ) : result ? (
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#ffebee', borderRadius: '10px', padding: '20px' }}>
              <ErrorIcon sx={{ fontSize: 48, color: red[500], marginBottom: 2 }} />
              <Typography variant="h5" sx={{ color: red[500] }}>Votre plante est malade ! 🍁</Typography>
              <Typography variant="body1" sx={{ color: red[500], marginTop: 1 }}>{correspondance[result]}</Typography>
            </Box>
          ) : null}
        </Box>

        {result && audioToPlay && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <audio controls>
              <source src={audioToPlay} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        )}
      </Container>
</div>
);
};

export default Detection



  //   {/* Animation de ballons */}
  //   <div className="background-balloons">
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  //   <div className="ball large"></div>
  // </div>
    