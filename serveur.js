const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware
app.use(cors({origin: '*', // Add other allowed origins here
optionsSuccessStatus: 200})); // Allow all origins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'mysql-anouar.alwaysdata.net',
  user: 'anouar',
  password: 'ssg1407',
  database: 'anouar_andro_travelpal'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database');
    return;
  }
  console.log('Connected to the database');
});

//-----------------------------------------------pour client----------------------------------

//**************************************************Ajouter client*******************************
app.post('/API/client/ajout_client', (req, res) => {
  const {
    NOM_C, PRENOM_C, EMAIL_C, ADRESSE_C, NUM_PASSPORT, NUM_CREDIT, USERNAME,PASSWORD
  } = req.body;

  // Validation
  if (!NOM_C || !PRENOM_C || !EMAIL_C || !ADRESSE_C || !NUM_PASSPORT || !NUM_CREDIT || !USERNAME || !PASSWORD) {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    return;
  }
 
  const sql = 'INSERT INTO client (NOM_C, PRENOM_C, EMAIL_C, ADRESSE_C, NUM_PASSPORT, NUM_CREDIT, USERNAME, PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [NOM_C, PRENOM_C, EMAIL_C, ADRESSE_C, NUM_PASSPORT, NUM_CREDIT, USERNAME, PASSWORD];

  connection.query(sql, values, (error) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error: Failed to add client" });
      return;
    }
    res.json({ message: "Success: Client added" });
  });
});


// ***************************Afficher client*****************
app.get('/API/client', (req, res) => {
    const sql = 'SELECT * FROM client';
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Error fetching clients' });
        return;
      }
      res.json(results);
    });
  });
  
  // *******************************Update client*******************************
  app.put('/API/client/:IDC', (req, res) => {
    const IDC = req.params.id;
    const {
      NOM_C, PRENOM_C, EMAIL_C, ADRESSE_C, NUM_PASSPORT, NUM_CREDIT, USERNAME, PASSWORD
    } = req.body;
  
    const sql = 'UPDATE client SET NOM_C=?, PRENOM_C=?, EMAIL_C=?, ADRESSE_C=?, NUM_PASSPORT=?, NUM_CREDIT=?, USERNAME =?PASSWORD=? WHERE id=?';
    const values = [NOM_C, PRENOM_C, EMAIL_C, ADRESSE_C, NUM_PASSPORT, NUM_CREDIT, USERNAME, PASSWORD, clientId];
  
    connection.query(sql, values, (error) => {
      if (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Error updating client' });
        return;
      }
      res.json({ message: 'Client updated successfully' });
    });
  });
  
  // *********************************Supprimer client*****************************************
  app.delete('/API/client/:IDC', (req, res) => {
    const IDC = req.params.IDC;
  
    const sql = 'DELETE * FROM client WHERE IDC=?';
    connection.query(sql, [IDC], (error) => {
      if (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Error deleting client' });
        return;
      }
      res.json({ message: 'Client deleted successfully' });
    });
  });
//-----------------------------------------------fin-pour client----------------------------------


//-----------------------------------------------pour destination----------------------------------

  //**************************************************Ajouter destination*******************************
  app.post('/API/destination/ajout_destination', (req, res) => {
    const {
      NOM_DES, VILLE_DES, DISPO, FRAIS_VOYAGE
    } = req.body;
  
    // Validation
    if (!NOM_DES || !VILLE_DES || !DISPO || !FRAIS_VOYAGE) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
      return;
    }
  
   
    const sql = 'INSERT INTO destination (NOM_DES, VILLE_DES, DISPO, FRAIS_VOYAGE) VALUES (?, ?, ?, ?)';
    const values = [NOM_DES, VILLE_DES, DISPO, FRAIS_VOYAGE];
  
    connection.query(sql, values, (error) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error: Failed to add destination" });
        return;
      }
      res.json({ message: "Success: destination added" });
    });
  });
  
  // ***************************Afficher destination*****************
  app.get('/API/destination', (req, res) => {
      const sql = 'SELECT * FROM destination';
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Error fetching Destinations:', error);
          res.status(500).json({ message: 'Error fetching Destination' });
          return;
        }
        res.json(results);
      });
    });

// ***************************Afficher une destination*****************
  app.get('/API/destination/:IDDES', (req, res) => {
    const IDDES = req.params.id;
    const sql = 'SELECT * FROM destination WHERE IDDES=?';
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching Destinations:', error);
        res.status(500).json({ message: 'Error fetching Destination' });
        return;
      }
      res.json(results);
    });
  });
    
    // *******************************Update destination*******************************
    app.put('/API/destination/:IDDES', (req, res) => {
      const IDDES = req.params.IDDES;
      const {
        NOM_DES, VILLE_DES, DISPO, FRAIS_VOYAGE, IMG_D
      } = req.body;
    
      const sql = 'UPDATE destination SET NOM_DES=?, VILLE_DES=?, DISPO=?, FRAIS_VOYAGE=?, IMG_D=? WHERE IDDES=?';
      const values = [NOM_DES, VILLE_DES, DISPO, FRAIS_VOYAGE, IMG_D, IDDES];
    
      connection.query(sql, values, (error) => {
        if (error) {
          console.error('Error updating destination:', error);
          res.status(500).json({ message: 'Error updating destination' });
          return;
        }
        res.json({ message: 'Destination updated successfully' });
      });
    });
    
    // *********************************Supprimer destination*****************************************
    app.delete('/API/destination/:IDDES', (req, res) => {
      const IDDES = req.params.IDDES;
    
      const sql = 'DELETE FROM destination WHERE IDDES=?';
      connection.query(sql, [IDDES], (error) => {
        if (error) {
          console.error('Error deleting Destination:', error);
          res.status(500).json({ message: 'Error deleting destination' });
          return;
        }
        res.json({ message: 'Destination deleted successfully' });
      });
    });

//-----------------------------------------------fin-pour destination----------------------------------


//-----------------------------------------------pour hotel----------------------------------

  //**************************************************Ajouter hotel*******************************
  app.post('/API/hotel/ajout_hotel', (req, res) => {
    const {
      IDDES, NOM_HOTEL, TARIF, ETOILE,IMG_H
    } = req.body;
  
    // Validation
    if (!IDDES || !NOM_HOTEL || !TARIF || !ETOILE || !IMG_H) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
      return;
    }
  
    const sql = 'INSERT INTO hotel (IDDES, NOM_HOTEL, TARIF, ETOILE, IMG_H) VALUES (?, ?, ?, ?, ?)';
    const values = [IDDES, NOM_HOTEL, TARIF, ETOILE, IMG_H];
  
    connection.query(sql, values, (error) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error: Failed to add hotel" });
        return;
      }
      res.json({ message: "Success: hotel added" });
    });
  });
  
  // ***************************Afficher hotel*****************
  app.get('/API/hotel', (req, res) => {
      const sql = 'SELECT * FROM hotel';
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Error fetching Hôtels:', error);
          res.status(500).json({ message: 'Error fetching Hotel' });
          return;
        }
        res.json(results);
      });
    });
    
    // *******************************Update hotel*******************************
    app.put('/API/hotel/:IDHOTEL', (req, res) => {
      const IDHOTEL = req.params.IDHOTEL;
      const {
        IDDES, NOM_HOTEL, TARIF, ETOILE, IMG_H
      } = req.body;
    
      const sql = 'UPDATE hotel SET IDDES=?, NOM_HOTEL=?, TARIF=?, ETOILE=?, IMG_H=? WHERE IDHOTEL=?';
      const values = [IDDES, NOM_HOTEL, TARIF, ETOILE, IMG_H, IDHOTEL];
    
      connection.query(sql, values, (error) => {
        if (error) {
          console.error('Error updating Hôtel:', error);
          res.status(500).json({ message: 'Error updating hotel' });
          return;
        }
        res.json({ message: 'Hôtel updated successfully' });
      });
    });
    
    // *********************************Supprimer hotel*****************************************
    app.delete('/API/hotel/:IDHOTEL', (req, res) => {
      const IDHOTEL = req.params.IDHOTEL;
    
      const sql = 'DELETE * FROM hotel WHERE IDHOTEL=?';
      connection.query(sql, [IDHOTEL], (error) => {
        if (error) {
          console.error('Error deleting HOTEL:', error);
          res.status(500).json({ message: 'Error deleting HOTEL' });
          return;
        }
        res.json({ message: 'Hotel deleted successfully' });
      });
    });

//-----------------------------------------------fin-pour hotels----------------------------------

//-----------------------------------------------pour compagnie----------------------------------

  //**************************************************Ajouter compagnie*******************************
  app.post('/API/compagnie/ajout_compagnie', (req, res) => {
    const {
      NOM_COM
    } = req.body;
  
    // Validation
    if (!NOM_COM) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
      return;
    }
  
    const sql = 'INSERT INTO compagnie (NOM_COM) VALUES (?)';
    const values = [NOM_COM];
  
    connection.query(sql, values, (error) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error: Failed to add compagnie" });
        return;
      }
      res.json({ message: "Success: Compagnie added" });
    });
  });
  
  // ***************************Afficher compagnie*****************
  app.get('/API/compagnie', (req, res) => {
      const sql = 'SELECT * FROM compagnie';
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Error fetching Compagnies:', error);
          res.status(500).json({ message: 'Error fetching Compagnie' });
          return;
        }
        res.json(results);
      });
    });
    
    // *******************************Update compagnie*******************************
    app.put('/API/compagnie/:IDCOM', (req, res) => {
      const IDCOM = req.params.IDCOM;
      const {
        NOM_COM
      } = req.body;
    
      const sql = 'UPDATE compagnie SET  NOM_COM=? WHERE IDCOM=?';
      const values = [NOM_COM];
    
      connection.query(sql, values, (error) => {
        if (error) {
          console.error('Error updating Compagnie:', error);
          res.status(500).json({ message: 'Error updating Compagnie' });
          return;
        }
        res.json({ message: 'Compagnie updated successfully' });
      });
    });
    
    // *********************************Supprimer compagnie*****************************************
    app.delete('/API/compagnie/:IDCOM', (req, res) => {
      const IDCOM = req.params.IDCOM;
    
      const sql = 'DELETE FROM compagnie WHERE IDCOM=?';
      connection.query(sql, [IDCOM], (error) => {
        if (error) {
          console.error('Error deleting Compagnie:', error);
          res.status(500).json({ message: 'Error deleting Compagnie' });
          return;
        }
        res.json({ message: 'Compagnie deleted successfully' });
      });
    });

//-----------------------------------------------fin-pour Compagnie----------------------------------


//-----------------------------------------------pour bus----------------------------------

  //**************************************************Ajouter bus*******************************
  app.post('/API/bus/ajout_bus', (req, res) => {
    const {
        IDDES, IDCOM, DATE_VOYAGE, HEURE
    } = req.body;
  
    // Validation
    if (!IDDES || !IDCOM || !DATE_VOYAGE || !HEURE) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
      return;
    }
  
    const sql = 'INSERT INTO bus (IDDES, IDCOM, DATE_VOYAGE, HEURE) VALUES (?, ?, ?, ?)';
    const values = [IDDES, IDCOM, DATE_VOYAGE, HEURE];
  
    connection.query(sql, values, (error) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error: Failed to add Bus" });
        return;
      }
      res.json({ message: "Success: BUs added" });
    });
  });
  
  
  // ***************************Afficher bus*****************
  app.get('/API/bus', (req, res) => {
      const sql = 'SELECT * FROM bus';
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Error fetching Bus:', error);
          res.status(500).json({ message: 'Error fetching Bus' });
          return;
        }
        res.json(results);
      });
    });
    
    // *******************************Update bus*******************************
    app.put('/API/bus/:IDBUS', (req, res) => {
      const IDBUS = req.params.IDBUS;
      const {
        IDDES, IDCOM, DATE_VOYAGE, HEURE
      } = req.body;
    
      const sql = 'UPDATE compagnie SET  IDDES=?, IDCOM=?, DATE_VOYAGE=?, HEURE=? WHERE IDBUS=?';
      const values = [IDDES, IDCOM, DATE_VOYAGE, HEURE];
    
      connection.query(sql, values, (error) => {
        if (error) {
          console.error('Error updating Bus:', error);
          res.status(500).json({ message: 'Error updating Bus' });
          return;
        }
        res.json({ message: 'Bus updated successfully' });
      });
    });
    
    // *********************************Supprimer bus*****************************************
    app.delete('/API/bus/:IDBUS', (req, res) => {
      const IDBUS = req.params.IDBUS;
    
      const sql = 'DELETE FROM bus WHERE IDBUS=?';
      connection.query(sql, [IDBUS], (error) => {
        if (error) {
          console.error('Error deleting Bus:', error);
          res.status(500).json({ message: 'Error deleting Bus' });
          return;
        }
        res.json({ message: 'Bus deleted successfully' });
      });
    });

//-----------------------------------------------fin-pour bus----------------------------------

//-----------------------------------------------pour reservarion-dest----------------------------------

  //**************************************************Ajouter reser*******************************
  app.post('/API/reservation/ajout_reservation', (req, res) => {
    const {
        IDDES, IDC, IDHOTEL, IDBUS
    } = req.body;
  
    // Validation
    if (!IDDES ||!IDC || !IDHOTEL || !IDBUS) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
      return;
    }
  
    const sql = 'INSERT INTO reservation (IDDES, IDC, IDHOTEL, IDBUS) VALUES (?, ?, ?, ?)';
    const values = [IDDES, IDC, IDHOTEL, IDBUS];
  
    connection.query(sql, values, (error) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error: Echec lors de l'ajout de la réservation" });
        return;
      }
      res.json({ message: "Success: Réservation prise en compte" });
    });
  });
  
  
  // ***************************Afficher bus*****************
  app.get('/API/reservation', (req, res) => {
      const sql = 'SELECT * FROM reservation';
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Error: Aucune réservation trouvée !!!', error);
          res.status(500).json({ message: 'Error fetching Bus' });
          return;
        }
        res.json(results);
      });
    });
    
    // *******************************Update bus*******************************
    app.put('/API/reservation/:IDRESER', (req, res) => {
      const IDRESER = req.params.IDRESER;
      const {
        IDDES, IDCOM, ID_HOTEL, ID_BUS
      } = req.body;
    
      const sql = 'UPDATE reservation SET  IDDES=?, IDCOM=?, ID_HOTEL=?, ID_BUS=? WHERE IDRESER=?';
      const values = [IDDES, IDCOM, ID_HOTEL, ID_BUS];
    
      connection.query(sql, values, (error) => {
        if (error) {
          console.error('Error updating Bus:', error);
          res.status(500).json({ message: 'Error updating Bus' });
          return;
        }
        res.json({ message: 'Bus updated successfully' });
      });
    });
    
    // *********************************Supprimer bus*****************************************
    app.delete('/API/reservation/:IDRESER', (req, res) => {
      const IDRESER = req.params.IDRESER;
    
      const sql = 'DELETE FROM reservation WHERE IDRESER=?';
      connection.query(sql, [IDRESER], (error) => {
        if (error) {
          console.error('Error deleting Reservation:', error);
          res.status(500).json({ message: 'Error deleting reservation' });
          return;
        }
        res.json({ message: 'Reservation deleted successfully' });
      });
    });

//-----------------------------------------------fin-pour reservation----------------------------------
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
