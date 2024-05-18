import React, { useState } from 'react';
import "./index.scss"
import axios from 'axios';
import { Container, Typography, Grid, TextField, Button, Card, CardContent, CardMedia, Box } from '@mui/material';

function CropRecommendation() {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosporus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
  });

  const [result, setResult] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = Number(value); // Use Number() for conversion
    setFormData(prevState => ({
      ...prevState,
      [name]: isNaN(newValue) ? value : newValue, // Handle non-numeric input gracefully
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      setResult(response.data);
      recommendSustainablePractices(response.data);


      console.log('Prediction:', response);
    } catch (error) {
      console.error('Axios Request Error:', error);
      console.log('FormData:', formData);
    }
  };

    const audioURLs = {
      "Le riz": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_riz_xf7bo6.ogg",
      "Le maïs": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_ma%C3%AFs_mhr8kj.ogg",
      "Le jute": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_jute_pv6hcv.ogg",
      "Le coton": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/Le_coton_vfswws.ogg",
      "La noix de coco": "https://res.cloudinary.com/intec-sup/video/upload/v1715387659/La_noix_de_coco_iiemwh.ogg",
      "La papaye": "https://res.cloudinary.com/intec-sup/video/upload/v1715387659/La_papaye_pnoyoy.ogg",
      "L'orange": "https://res.cloudinary.com/intec-sup/video/upload/v1715387662/L_orange_sufljt.ogg",
      "La pomme": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/La_pomme_pcrxjl.ogg",
      "Le cantaloup": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/Le_cantaloup_xuzmkk.ogg",
      "La pastèque": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/La_past%C3%A8que_fcpetb.ogg",
      "Le raisin": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_raisin_zeqkal.ogg",
      "La mangue": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/La_mangue_hafnrs.ogg",
      "La banane": "https://res.cloudinary.com/intec-sup/video/upload/v1715387659/La_banane_znqny0.ogg",
      "La grenade": "https://res.cloudinary.com/intec-sup/video/upload/v1715387659/La_grenade_yqsvm1.ogg",
      "La lentille": "https://res.cloudinary.com/intec-sup/video/upload/v1715387659/La_lentille_jw7soo.ogg",
      "Le gram noir": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/Le_gram_noir_x8hime.ogg",
      "Le haricot mungo": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/Le_haricot_mungo_fvjctm.ogg",
      "Les haricots moth": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_haricot_nne4gc.ogg",
      "Le pois d'Angole": "https://res.cloudinary.com/intec-sup/video/upload/v1715387662/Le_pois_d_Angole_g5tmt6.ogg",
      "Le haricot rouge": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_haricot_rouge_vma2fs.ogg",
      "Le pois chiche": "https://res.cloudinary.com/intec-sup/video/upload/v1715387661/Le_pois_chiche_q49kcy.ogg",
      "Le café": "https://res.cloudinary.com/intec-sup/video/upload/v1715387660/Le_caf%C3%A9_nsuwan.ogg"
    };
    

  const cultureImages = {
    "Le riz": "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le maïs": "https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le jute": "https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le coton": "https://media.istockphoto.com/id/1452266868/photo/cotton-plant.jpg?s=1024x1024&w=is&k=20&c=ALS2olTZa4zrzr3dfBw1-Cz4mU8eWQ-Fe0abZlBSHo0=",
    "La noix de coco": "https://images.pexels.com/photos/1652002/pexels-photo-1652002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "La papaye": "https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "L'orange": "https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "La pomme": "https://images.pexels.com/photos/10000847/pexels-photo-10000847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le cantaloup": "https://images.pexels.com/photos/2920403/pexels-photo-2920403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "La pastèque": "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le raisin": "https://media.istockphoto.com/id/803721418/photo/grape-dark-grape-grapes-with-leaves-isolated-with-clipping-path-full-depth-of-field.jpg?s=1024x1024&w=is&k=20&c=VIdk7rmc7uNl2zyoR6NaV30NPBp4c1JZcxqFQpCLzJ0=",
    "La mangue": "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "La banane": "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "La grenade": "https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "La lentille": "https://images.pexels.com/photos/7412064/pexels-photo-7412064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le gram noir": "https://previews.123rf.com/images/s4sanchita/s4sanchita1212/s4sanchita121200403/16845435-fermer-tas-de-graines-enti%C3%A8res-gramme-noir.jpg",
    "Le haricot mungo": "https://media.istockphoto.com/id/1061909094/photo/mung-beans-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=_5HNAnzfCAXCXHOktnSJHkLFoe5eiYxPYlpdm95z9qY=",
    "Les haricots moth": "https://media.istockphoto.com/id/466255398/photo/moth-beans-background.jpg?s=1024x1024&w=is&k=20&c=Hdy7VFH0g5Lh2ScN6Ji1etmOmHjGfQ3o7CiDrkttwMM=",
    "Le pois d'Angole": "https://images.pexels.com/photos/17975576/pexels-photo-17975576/free-photo-of-legumes-agriculture-empiler-cultures.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Le haricot rouge": "https://media.istockphoto.com/id/643439552/photo/food-background-raw-brown-kidney-beans.jpg?s=1024x1024&w=is&k=20&c=alvqIOQgNl-TfQgtJOEDwOyaYvRO0mgmL6_fvYR7-eE=",
    "Le pois chiche": "https://forksandfoliage.com/wp-content/uploads/2023/02/how-to-cook-chickpeas-13.jpg",
    "Le café": "https://images.pexels.com/photos/7125781/pexels-photo-7125781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  };
  const similarRegionCrops = {
    "Le riz": ["Le maïs", "Le blé", "Le sorgho", "Le millet", "Le coton", "Le jute", "Le pois d'Angole"],
    "Le maïs": ["Le riz", "Le blé", "Le sorgho", "Le millet", "Le coton", "Le jute", "Le pois d'Angole"],
    "Le jute": ["Le coton", "Le maïs", "Le haricot rouge", "La banane", "La pastèque", "La mangue", "La papaye"],
    "Le coton": ["Le jute", "Le maïs", "Le haricot rouge", "La banane", "La pastèque", "La mangue", "La papaye"],
    "La noix de coco": ["Le café", "La papaye", "La banane", "L'orange", "La pomme", "Le cantaloup", "La pastèque"],
    "La papaye": ["La noix de coco", "La mangue", "La pastèque", "Le cantaloup", "La banane", "L'orange", "La pomme"],
    "L'orange": ["Le café", "La noix de coco", "La papaye", "La banane", "Le cantaloup", "La pastèque", "Le raisin"],
    "La pomme": ["La noix de coco", "La papaye", "L'orange", "La banane", "Le cantaloup", "La pastèque", "Le raisin"],
    "Le cantaloup": ["La pastèque", "La papaye", "La mangue", "La banane", "La grenade", "La lentille", "Le pois chiche"],
    "La pastèque": ["La papaye", "Le cantaloup", "La mangue", "La banane", "La grenade", "La lentille", "Le pois chiche"],
    "Le raisin": ["L'orange", "La pomme", "La banane", "La pastèque", "Le cantaloup", "La mangue", "La noix de coco"],
    "La mangue": ["La papaye", "La pastèque", "Le cantaloup", "La banane", "La grenade", "La lentille", "Le pois chiche"],
    "La banane": ["La papaye", "La pastèque", "Le cantaloup", "La mangue", "La grenade", "La lentille", "Le pois chiche"],
    "La grenade": ["Le cantaloup", "La pastèque", "La papaye", "La banane", "La mangue", "La noix de coco", "La pomme"],
    "La lentille": ["Le pois chiche", "Le pois d'Angole", "Le haricot mungo", "Les haricots moth", "Le haricot rouge", "Le gram noir", "Le maïs"],
    "Le gram noir": ["La lentille", "Le pois chiche", "Le pois d'Angole", "Le haricot mungo", "Les haricots moth", "Le haricot rouge", "Le maïs"],
    "Le haricot mungo": ["Le pois chiche", "Le pois d'Angole", "Le gram noir", "Les haricots moth", "Le haricot rouge", "La lentille", "Le maïs"],
    "Les haricots moth": ["Le pois chiche", "Le pois d'Angole", "Le gram noir", "Le haricot mungo", "Le haricot rouge", "La lentille", "Le maïs"],
    "Le pois d'Angole": ["Le pois chiche", "Le gram noir", "Le haricot mungo", "Les haricots moth", "Le haricot rouge", "La lentille", "Le maïs"],
    "Le haricot rouge": ["Le pois chiche", "Le pois d'Angole", "Le gram noir", "Le haricot mungo", "Les haricots moth", "La lentille", "Le maïs"],
    "Le pois chiche": ["Le pois d'Angole", "Le gram noir", "Le haricot mungo", "Les haricots moth", "Le haricot rouge", "La lentille", "Le maïs"],
    "Le café": ["La noix de coco", "Le cacao", "Le palmier à huile", "Le fruit de la passion", "Le coton", "Le manioc", "La pomme de terre"]
};



  const cultureName = result.replace(" est la meilleure culture à cultiver ici", "").trim();
  const recommendedCultureImage = cultureImages[cultureName];

  
  const audioName = result.replace(" est la meilleure culture à cultiver ici", "").trim();
  const audioURL = audioURLs[audioName];
  function recommendSimilarCrops(cultureName) {
    // Récupérer les cultures similaires pour la culture donnée
    const similarCrops = similarRegionCrops[cultureName];

    return similarCrops;
}
const practices = {
  "Le riz": [
    "Utiliser des variétés résistantes aux inondations",
    "Adopter des techniques de SRI (Système de Riziculture Intensive)",
    "Gérer efficacement les ressources en eau"
  ],
  "Le maïs": [
    "Pratiquer la rotation des cultures pour améliorer la fertilité du sol",
    "Utiliser des semences améliorées résistantes aux sécheresses",
    "Appliquer des techniques de labour minimum"
  ],
  "Le jute": [
    "Pratiquer la rotation des cultures pour éviter les maladies",
    "Utiliser des variétés résistantes aux ravageurs",
    "Adopter des techniques de paillage pour conserver l'humidité du sol"
  ],
  "Le coton": [
    "Utiliser des variétés résistantes aux ravageurs",
    "Adopter une gestion intégrée des ravageurs (IPM)",
    "Optimiser l'utilisation de l'eau par l'irrigation goutte à goutte"
  ],
  "La noix de coco": [
    "Gérer les ressources en eau efficacement",
    "Utiliser des techniques de compostage pour améliorer la fertilité du sol",
    "Pratiquer la rotation des cultures pour prévenir les maladies"
  ],
  "La papaye": [
    "Utiliser des variétés résistantes aux maladies",
    "Adopter des techniques de paillage pour conserver l'humidité du sol",
    "Gérer les ravageurs avec des méthodes biologiques"
  ],
  "L'orange": [
    "Utiliser des pratiques de taille pour améliorer la productivité",
    "Gérer les ravageurs avec des méthodes biologiques",
    "Optimiser l'irrigation pour conserver l'eau"
  ],
  "La pomme": [
    "Utiliser des variétés résistantes aux maladies",
    "Adopter des techniques de taille pour améliorer la production de fruits",
    "Gérer les ravageurs avec des méthodes biologiques"
  ],
  "Le cantaloup": [
    "Utiliser des variétés résistantes aux maladies",
    "Adopter des techniques de paillage pour conserver l'humidité du sol",
    "Pratiquer la rotation des cultures pour améliorer la fertilité du sol"
  ],
  "La pastèque": [
    "Utiliser des variétés résistantes aux maladies",
    "Adopter des techniques de paillage pour conserver l'humidité du sol",
    "Pratiquer la rotation des cultures pour améliorer la fertilité du sol"
  ],
  "Le raisin": [
    "Adopter des techniques de taille pour favoriser la production de fruits",
    "Gérer les ravageurs avec des méthodes biologiques",
    "Utiliser des techniques de paillage pour conserver l'humidité du sol"
  ],
  "La mangue": [
    "Adopter des techniques de taille pour favoriser la fructification",
    "Gérer les ravageurs avec des méthodes biologiques",
    "Utiliser des techniques de paillage pour conserver l'humidité"
  ],
  "La banane": [
    "Utiliser des techniques de paillage pour conserver l'humidité du sol",
    "Adopter des pratiques de taille pour améliorer la productivité",
    "Gérer les ravageurs avec des méthodes biologiques"
  ],
  "La grenade": [
    "Utiliser des variétés résistantes aux maladies",
    "Adopter des techniques de taille pour améliorer la qualité des fruits",
    "Gérer les ressources en eau efficacement"
  ],
  "La lentille": [
    "Pratiquer la rotation des cultures pour enrichir le sol en azote",
    "Utiliser des semences certifiées pour éviter les maladies",
    "Gérer les résidus de culture pour améliorer la fertilité du sol"
  ],
  "Le gram noir": [
    "Utiliser des variétés résistantes aux maladies",
    "Pratiquer la rotation des cultures pour améliorer la fertilité du sol",
    "Adopter des techniques de labour minimum"
  ],
  "Le haricot mungo": [
    "Pratiquer la rotation des cultures pour enrichir le sol en azote",
    "Utiliser des variétés résistantes aux maladies",
    "Gérer les résidus de culture pour améliorer la fertilité du sol"
  ],
  "Les haricots moth": [
    "Pratiquer la rotation des cultures pour enrichir le sol en azote",
    "Utiliser des variétés résistantes aux maladies",
    "Gérer les résidus de culture pour améliorer la fertilité du sol"
  ],
  "Le pois d'Angole": [
    "Utiliser des variétés résistantes aux maladies",
    "Pratiquer la rotation des cultures pour améliorer la fertilité du sol",
    "Adopter des techniques de labour minimum"
  ],
  "Le haricot rouge": [
    "Pratiquer la rotation des cultures pour enrichir le sol en azote",
    "Utiliser des variétés résistantes aux maladies",
    "Gérer les résidus de culture pour améliorer la fertilité du sol"
  ],
  "Le pois chiche": [
    "Adopter une rotation des cultures pour prévenir les maladies",
    "Utiliser des variétés résistantes aux maladies",
    "Gérer efficacement les résidus de culture"
  ],
  "Le café": [
    "Utiliser des variétés résistantes aux maladies",
    "Adopter des techniques d'agroforesterie pour améliorer la biodiversité",
    "Gérer les ravageurs avec des méthodes biologiques"
  ]
  };
  
const recommendSustainablePractices = (cultureName) => {
  // Logique pour recommander des pratiques agricoles durables en fonction de la culture
 
  
const sustainableCrops = practices[cultureName];

return sustainableCrops;
};



const recommendedCrops = recommendSimilarCrops(cultureName);
const sustainable  = recommendSustainablePractices(cultureName);
const [showAllCrops, setShowAllCrops] = useState(false);

    const handleSeeMoreClick = () => {
        setShowAllCrops(true);
    };



//A REVOIR EN UTILISANT DES CALCULS SCIENTIFIQUES ADEQUATS
const fertilizerRecommendations = {
  "Le riz": "100 kg/ha d'azote, 50 kg/ha de phosphore, 50 kg/ha de potassium",
  "Le maïs": "120 kg/ha d'azote, 60 kg/ha de phosphore, 60 kg/ha de potassium",
  "Le jute": "80 kg/ha d'azote, 40 kg/ha de phosphore, 40 kg/ha de potassium",
  "Le coton": "150 kg/ha d'azote, 60 kg/ha de phosphore, 60 kg/ha de potassium",
  "La noix de coco": "50 kg/ha d'azote, 50 kg/ha de phosphore, 150 kg/ha de potassium",
  "La papaye": "100 kg/ha d'azote, 50 kg/ha de phosphore, 100 kg/ha de potassium",
  "L'orange": "100 kg/ha d'azote, 60 kg/ha de phosphore, 120 kg/ha de potassium",
  "La pomme": "80 kg/ha d'azote, 60 kg/ha de phosphore, 80 kg/ha de potassium",
  "Le cantaloup": "80 kg/ha d'azote, 40 kg/ha de phosphore, 80 kg/ha de potassium",
  "La pastèque": "100 kg/ha d'azote, 40 kg/ha de phosphore, 80 kg/ha de potassium",
  "Le raisin": "60 kg/ha d'azote, 40 kg/ha de phosphore, 80 kg/ha de potassium",
  "La mangue": "100 kg/ha d'azote, 60 kg/ha de phosphore, 80 kg/ha de potassium",
  "La banane": "200 kg/ha d'azote, 60 kg/ha de phosphore, 300 kg/ha de potassium",
  "La grenade": "100 kg/ha d'azote, 50 kg/ha de phosphore, 150 kg/ha de potassium",
  "La lentille": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Le gram noir": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Le haricot mungo": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Les haricots moth": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Le pois d'Angole": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Le haricot rouge": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Le pois chiche": "20 kg/ha d'azote, 40 kg/ha de phosphore, 20 kg/ha de potassium",
  "Le café": "120 kg/ha d'azote, 60 kg/ha de phosphore, 120 kg/ha de potassium"
};

function getFertilizerRecommendation(crop) {
  return fertilizerRecommendations[crop] || "Aucune recommandation disponible pour cette culture";
}


return (
  <Container maxWidth="md" sx={{ marginTop: 3 }} className="mainContainer">
    <Typography variant="h3" align="center" sx={{ color: 'gray', fontFamily: 'Nunito, sans-serif', margin: 0 }}>Système de Recommandation de Cultures D'Agritech<span role="img" aria-label="plant">🌱</span></Typography>
    <form onSubmit={handleSubmit}>
      <Container sx={{ background: '#fffbfe', fontWeight: 'bold', borderRadius: '15px', paddingBottom: '10px', marginTop: '20px', boxShadow: '0px 4px 8px rgba(128, 0, 128, 0.5)', padding: '20px', }} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField label="Azote" id="Nitrogen" name="Nitrogen" type="number" value={formData.Nitrogen} onChange={handleChange} placeholder="Entrez l'Azote" fullWidth required />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Phosphore" id="Phosporus" name="Phosporus" type="number" value={formData.Phosporus} onChange={handleChange} placeholder="Entrez le Phosphore" fullWidth required />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Potassium" id="Potassium" name="Potassium" type="number" value={formData.Potassium} onChange={handleChange} placeholder="Entrez le Potassium" fullWidth required />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Température" id="Temperature" name="Temperature" type="number" value={formData.Temperature} onChange={handleChange} placeholder="Entrez la Température en °C" fullWidth required />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Humidité" id="Humidity" name="Humidity" type="number" value={formData.Humidity} onChange={handleChange} placeholder="Entrez l'Humidité en %" fullWidth required />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="pH" id="pH" name="pH" type="number" value={formData.pH} onChange={handleChange} placeholder="Entrez la valeur du pH" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Précipitations de pluie" id="Rainfall" name="Rainfall" type="number" value={formData.Rainfall} onChange={handleChange} placeholder="Entrez les Précipitations de pluie en mm" fullWidth required />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ marginTop: '20px' }}>Voir la recommandation</Button>
      </Container>
    </form>
    {result && (
<Card
sx={{
  width: '39rem',
  margin: 'auto',
  marginTop: '20px',
  boxShadow: '0px 4px 8px rgba(128, 0, 128, 0.5)',
  borderRadius: '15px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  animation: `0.5s ease`, // Ajoutez une animation d'entrée
}}
>
<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
<CardMedia
  component="img"
  image={recommendedCultureImage}
  alt={cultureName}
  sx={{
    width: '120px',
    height: '120px',
    marginRight: '20px',
    borderRadius: '50%', // Arrondir l'image
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Ajouter une légère ombre
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Ajouter une transition pour l'animation
    animation: 'fade-in 0.5s ease', // Ajouter une animation d'entrée
    '&:hover': {
      transform: 'scale(1.05)', // Zoom au survol
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Augmenter l'ombre au survol
    },
  }}
/>


<div>
<Typography variant="h4" fontWeight="bold" sx={{ marginBottom: '5px', color: '#4CAF50' }}>Culture Recommandée :</Typography>
  <Typography variant="h5" color="#444">{cultureName}</Typography>
</div>
</div>
<CardContent sx={{
  flex: 1,
  overflow: 'hidden',
  color: '#666',
  fontFamily: 'Nunito, sans-serif',
}}>
  <Typography variant="body1" component="div">
    <span style={{ fontWeight: 'bold' }}>Félicitations !</span> Selon les données analysées, nous vous recommandons de cultiver {cultureName} dans votre région. Cette culture est parfaitement adaptée aux conditions de votre sol et de votre climat. Vous pouvez consulter nos conseils de culture pour obtenir des rendements optimaux.
  </Typography>
          <Typography variant="body1" component="div">
          <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Pratiques agricoles durables recommandées :</span>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {sustainable.map((practice, index) => (
        <li key={index} style={{ marginBottom: '8px', marginLeft: '16px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#4CAF50' }}>&#10003;</span>
          {practice}
        </li>
      ))}
    </ul>
  </Typography>
  <Typography variant="body1" component="div">
    <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Quantité d'engrais recommandée :</span> {getFertilizerRecommendation(cultureName)}
  </Typography>
  <Typography variant="body1" component="div">
    <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Autres Cultures Similaires Recommandées pour ce sol :</span>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {showAllCrops ? (
        recommendedCrops.map((crop, index) => (
          <li key={index} style={{ marginBottom: '8px', marginLeft: '16px' }}>{crop}</li>
        ))
      ) : (
        recommendedCrops.slice(0, 2).map((crop, index) => (
          <li key={index} style={{ marginBottom: '8px', marginLeft: '16px' }}>{crop}</li>
        ))
      )}
    </ul>
    {!showAllCrops && recommendedCrops.length > 2 && (
      <Box textAlign="center">
        <Button onClick={handleSeeMoreClick} variant="outlined" color="primary">
          Voir plus
        </Button>
      </Box>
    )}
    {audioURL && (
      <Box textAlign="center">
        <audio controls style={{ width: '100%' }}>
          <source src={audioURL} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </Box>
          )}
           </Typography>
        </CardContent>
      </Card>
    )}
    {/* Ajoutez le code des ballons ici */}
    <div className="background-balloons">
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
        <div className="ball large"></div>
      </div>
  </Container>
);
}

export default CropRecommendation;