//Importamos React para poder usar JSX
import React from "react";
//Importamos la imagen del logo desde la carpeta assets
import logoFactoria from '../assets/logo-factoria-b.svg';

// Creamos un componente funcional llamado Footer
const Footer = () => {
// Definimos un objeto con estilos en línea
const styles = {
  footer: {
    backgroundColor: '#1d4c52', //Color de fondo
    color: '#fff',   //Color de texto en blanco
    textAlign: 'center', //Texto centrado 
    padding: '16px', //Espacio interno 
    marginTop: '32px', //Margen superior
    borderTop: '3px solid #ffdd57' //linea decorativa arriba del footer
  },
  logo: {
      height: '40px', //Altura del logo
      marginTop: '12px', //Margen superior
    },
    link: {
      color: '#ffdd57', //Color del enlace
      textDecoration: 'underline', //Subrayado
      cursor: 'pointer', //Convierte la flecha del cursor en mano
    },
  text: {
    margin: 0, //Quitamos el margen por defecto
    fontSize: '14px' //Tamaño de texto
  }
};
//Devolvemos el JSX del componente
return (
      <footer style={styles.footer}> {/*Contenedor principal del footer */}
      <>
      {/*Logo de factoria*/}
      <img 
    src={logoFactoria} 
    alt="Logo Factoria F5"
    style={styles.logo}
  />
    {/*Texto del proyecto*/}
     <p style={styles.text}>
          Proyecto creado por grupo P4 Femcoders Factoria F5
        </p>
    {/*Segunda linea de texto con enlace de ejemplo */}
     <p style={styles.text}>
          © 2025 Nectara |{" "}
          <span 
            style={styles.link} 
            onClick={() => alert("Aquí iría el enlace a LinkedIn o info del grupo")}
          >
            + info
          </span>
        </p>
      </>
  </footer>
  );
};
       
//Exportamos el componente para poder usarlo en otros archivos
export default Footer;