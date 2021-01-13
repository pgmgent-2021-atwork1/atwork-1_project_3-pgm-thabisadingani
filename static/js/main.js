(() => {
	const app = {
		initialize() {
      console.log('1. Application started');
      this.cacheElements();
      this.registerHTMLForListeners();
      this.fetchAtelier();
      this.fetchPress();
      this.fetchArt();
      this.buildUI(); 
		},
		cacheElements() {
      console.log('2. cache all existing DOM elements');
      this.$artAndExhibitionsPosts = document.querySelector('ul.artAndExhibitions__posts');
      this.$atelierStudio__posts = document.querySelector('ul.atelierStudio__posts');
      this.$atelierPagePosts = document.querySelector('ul.atelier__page--posts');
      this.$related__list__items = document.querySelector('ul.related__list--items');
      this.$getPostPressRelease  = document.querySelector('ul.getPostPressRelease ');
      this.$getPostInThePress = document.querySelector('ul.getPostInThePress');
      this.$artAndExhibitionsPostsExtra = document.querySelector('ul.artAndExhibitions__posts--extra');
      this.$display__categories = document.querySelector('.display--categories');
      this.categoryListItems = document.querySelectorAll('category__list--items a ');
		},
		buildUI() {
      console.log('3. Build the user interface')
        
		},
		registerHTMLForListeners() { 
    },
    async fetchArt() {
      const art = new ArtApi(); 
      const arts = await art.getArtData(); //this gets art data back from API for UI.
       console.log(arts);
      this.updateArt(arts);
      this.getCartegoriesQuaryParameter(arts);   
    },
    async fetchPress() {
      const press = new PressApi(); 
      const presses = await press.getPressData(); //this gets press data back from API for UI.
      this.updatePress(presses)   
    },
    async fetchAtelier() {
      const aterlier = new AtelierApi(); 
      const aterliers = await aterlier.getAtelierData(); //this get atelier data back from API for UI.
      //  console.log(aterliers);
      this.updateAterlier(aterliers);
      this.updateAterlierPage(aterliers)   
    },
    getCartegoriesQuaryParameter(categories){
      
     
      const viewCategories = categories.map((category) =>{
        
          console.log(category.find(this.getParameter()))
      })

      
    },
    getParameter(tag){
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const urlCategory = params.get('category');
      for (const iterator of tag) {
        return tag.tags === urlCategory;
      }
    },
    updateArt(exhibitions) {
      const filterExhibitions = exhibitions.filter(exhibition => exhibition.highlight === true); 
      if(this.$artAndExhibitionsPosts){
        this.$artAndExhibitionsPosts.innerHTML = this.buildAUIForPressAtelier(filterExhibitions);
        
      }
      if(this.$artAndExhibitionsPostsExtra){
       this.$artAndExhibitionsPostsExtra.innerHTML = this.buildAUIForPressAtelier(filterExhibitions);
      } 
    },
    updatePress(presses){
      console.log(presses);
      const getFilterMapRelease = presses.filter(press => press.type === "release")
      const getFilterMapPress = presses.filter(press => press.type === "article");  

      this.$getPostPressRelease.innerHTML = this.buildAUIForPressAtelier(getFilterMapRelease);
      this.$getPostInThePress.innerHTML = this.buildAUIForPressAtelier(getFilterMapPress);    
    },
    updateAterlierPage(aterliers){
      const filterExhibitions = aterliers.filter(aterlier=> aterlier); 
      if(this.$atelierPagePosts.innerHTML){
        this.$atelierPagePosts.innerHTML = this.buildAUIForPressAtelier(filterExhibitions); 
      }
    },
    updateAterlier(aterliers){
      const atelierList = aterliers.slice(0, 3).map((aterlier) => {    
         return `
         <li class="${this.$atelierStudio__posts ? 'inner__post' : 'post__control--inner'}">
           <div>
             <a href="${this.$atelierStudio__posts ? 'atelier-studio/visiting-mons-again/index.html' : 'index.html'}">
               <img src="${this.$atelierStudio__posts ? './' : '../../'}static/img/${aterlier.cover}"/>
             </a>
             <h3 class="post__subTitle font_smaller">${aterlier.subtitle}</h3>	
             <h2 class="post__title font_smaller">${aterlier.title}</h2>
             <p class="post__discription font_smaller">${aterlier.description}</p>
             <a class="post__link font_smaller" href="${this.$atelierStudio__posts ? 'atelier-studio/visiting-mons-again/index.html' :'index.html'}">Learn more</a>
           </div>
         </li> `;  
     }).join("");
     if (this.$atelierStudio__posts) {
      this.$atelierStudio__posts.innerHTML = atelierList;
     }
     if(this.$related__list__items){
      this.$related__list__items.innerHTML = atelierList;
     }
    },
    buildAUIForPressAtelier(presses){
      const mapExhibitions = presses.map((press) => {
        return `
        <li class="${this.$atelierPagePosts ?'post__control--inner inner__post' : 'inner__post'}">
          <div>
            <a href="${this.$artAndExhibitionsPosts ? 'art-and-exhibitions/in-dialogue-with-calatrava/index.html' : this.$getPostPressRelease ? 'my-secret-garden-valencia/index.html': this.$artAndExhibitionsPostsExtra ? 'index.html' : 'visiting-mons-again/index.html'}">
              <img src="${this.$artAndExhibitionsPosts ? './' : this.$artAndExhibitionsPostsExtra ? '../../': '../'}static/img/${press.cover}"/>
            </a>
            <h3 class="post__subTitle font_smaller">${press.subtitle}</h3>	
            <h2 class="post__title font_smaller">${press.title}</h2>
            <p class="post__discription font_smaller">${press.description}</p>
            <a class="post__link font_smaller" href="${this.$artAndExhibitionsPosts ? 'art-and-exhibitions/in-dialogue-with-calatrava/index.html' : this.$getPostPressRelease ? 'my-secret-garden-valencia/index.html' : this.$artAndExhibitionsPostsExtra ? 'index.html' : 'visiting-mons-again/index.html'}">Learn more</a>
          </div>
        </li> `;   
      }).join("");
      return mapExhibitions;
    },

	};
	app.initialize();
})();