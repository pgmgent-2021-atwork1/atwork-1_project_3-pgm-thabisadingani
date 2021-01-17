//fetch atelier
function AtelierApi () {
  this.ATELIER_API = 'data/atelier.json';
  this.getAtelierData = async () => {
    try{
      const response = await fetch(this.ATELIER_API);
      const jsonData = await response.json();
      return jsonData;
      } catch(error) {
      console.error(error);
    }
  }
}

//fetch press
function PressApi (){
  this.PRESS_API = 'data/press.json';
  this.getPressData = async () => {
    try{
      const response = await fetch(this.PRESS_API);
      const jsonData = await response.json();
      return jsonData;
      } catch(error) {
      console.error(error);
    }
  }
}

//fetch art data
function ArtApi (){
  this.ART_API = 'https://www.pgm.gent/data/arnequinze/art.json';
  this.getArtData = async () =>{
    try{
      const response = await fetch( this.ART_API);
      const jsonData = await response.json();
      return jsonData;
      } catch(error) {
      console.error(error);
    }
  }
}
