(() => {
	const app = {
		initialize() {
      this.cacheElements();
      this.registerHTMLForListeners();
      this.fetchAtelier();
      this.fetchPress();
      this.fetchArt();
      this.buildUI(); 
		},
		cacheElements() {
      this.$artAndExhibitionsPosts = document.querySelector('ul.artAndExhibitions__posts');
      this.$atelierStudio__posts = document.querySelector('ul.atelierStudio__posts');
      this.$atelierPagePosts = document.querySelector('ul.atelier__page--posts');
      this.$related__list__items = document.querySelector('ul.related__list--items');
      this.$getPostPressRelease  = document.querySelector('ul.getPostPressRelease');
      this.$getPostInThePress = document.querySelector('ul.getPostInThePress');
      this.$artAndExhibitionsPostsExtra = document.querySelector('ul.artAndExhibitions__posts--extra');
      this.$displayArts = document.querySelector('.displayArts');
      this.$categoryListItems = document.querySelectorAll('.category__list--items a ');
      this.$backToTheTop = document.querySelector('.button--to__top');
      this.$toggleActiveCategory = document.querySelectorAll('filter__categorie--items li')
      // this.$filterYearsItems = document.querySelectorAll('.filter__years--items > li > a')
		},
		buildUI() {
        
		},
		registerHTMLForListeners() { 
    //   if(this.$toggleActiveCategory){
    //   this.$toggleActiveCategory.addEventListener('click', () => {
    //     this.toggleActiveMode();
    //   });
    // }
      this.$backToTheTop.addEventListener('click', () => {
        this.getBackToTheTop();
      });
      window.addEventListener('scroll', () => {
        this.getPageScroll();
      });
    },
    async fetchArt() {
      const art = new ArtApi(); 
      const arts = await art.getArtData(); //this gets art data back from API for UI.
      this.updateArt(arts);
      this.getArtistExhibition(arts);
    },
    async fetchPress() {
      const press = new PressApi(); 
      const presses = await press.getPressData(); //this gets press data back from API for UI.
      this.updatePress(presses) 
    },
    async fetchAtelier() {    
        const aterlier = new AtelierApi(); 
        const aterliers = await aterlier.getAtelierData(); //this get atelier data back from API for UI.
        this.updateAterlier(aterliers);
        this.updateAterlierPage(aterliers)    
    },
    getArtistExhibition(data){
       const filterYears = filterYearsItems.map((year) =>{
        const filterArts  = data.filter((art)=>{
          return art.year.indexOf(year) > -1; 
        })
       
        const artsList = this.buildUIForArtsList(filterArts)
         return`
            <div class="artListExhibition">
              <h2 class="margin--exhibition" id="${year}">${year}</h2>
              <ul>
                 ${artsList}
              </ul>
            </div>
          `
       }).join('');
       if(this.$displayArts){
       this.$displayArts.innerHTML = filterYears;
      }
     },
    buildUIForArtsList(filterArts){
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const category = params.get('category');

      let tempStr= '';
      if(category) {


        filterArts = filterArts.filter((art) => {
          const  tags = art.tags.map(tag => tag.toLowerCase());
           return tags.indexOf(category.toLowerCase()) > -1;
        });
      }
      tempStr += filterArts.map( (art) => {
        return `
          <li class="art__exhibitions">
            <div class="art__exhibitions--text">
              <h2 class="post__title font_smaller"><a href = "art-and-exhibitions/in-dialogue-with-calatrava/index.html">${art.title}</a></h2>
              <h3 class="padding--top--bottom">${art.subtitle}</h3>
              <h3 class="padding--top--bottom colour--grey">${art.tags ? art.tags  : ' '} <span>-</span> ${art.location ? art.location  : ' '}</h3>
            </div>
            <ul class="art__exhibitions--gallery">
               ${this.getArtistGallery(art.images)}
            </ul>
          </li>`
      }).join('');
      return tempStr;
    },
    getArtistGallery(images){
       let imagesArt = images.map((img) => {
        return `
        <li><a href = "art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img src="static/img/${img}" loading="lazy" alt=" art exhibition images "></a></li>
      `
       }).join('');
      return imagesArt
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
      const getFilterMapRelease = presses.filter(press => press.type === "release")
      const getFilterMapPress = presses.filter(press => press.type === "article");  

      this.$getPostPressRelease.innerHTML = this.buildAUIForPressAtelier(getFilterMapRelease);
      this.$getPostInThePress.innerHTML = this.buildAUIForPressAtelier(getFilterMapPress);    
    },
    updateAterlierPage(aterliers){
      // const filterExhibitions = aterliers.filter(aterlier => aterlier); 

      if(this.$atelierPagePosts){
        this.$atelierPagePosts.innerHTML = this.buildAUIForPressAtelier(aterliers); 
      }
    },
    updateAterlier(aterliers){
      const atelierList = aterliers.slice(0, 3).map((aterlier) => {    
         return `
         <li class="${this.$atelierStudio__posts ? 'inner__post' : 'post__control--inner'}">
           <div>
             <a href="atelier-studio/visiting-mons-again/index.html">
               <img src="static/img/${aterlier.cover}" loading="lazy"/>
             </a>
             <h3 class="post__subTitle font_smaller">${aterlier.subtitle}</h3>	
             <h2 class="post__title font_smaller">${aterlier.title}</h2>
             <p class="post__discription font_smaller">${aterlier.description}</p>
             <a class="post__link font_smaller" href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
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
            <a href="${this.$artAndExhibitionsPosts ? 'art-and-exhibitions/in-dialogue-with-calatrava/index.html' : this.$getPostPressRelease ? 'press/my-secret-garden-valencia/index.html': this.$artAndExhibitionsPostsExtra ? 'art-and-exhibitions/in-dialogue-with-calatrava/index.html' : 'atelier-studio/visiting-mons-again/index.html'}">
              <img src="static/img/${press.cover}" loading="lazy"/>
            </a>
            <h3 class="post__subTitle font_smaller">${press.subtitle}</h3>	
            <h2 class="post__title font_smaller">${press.title}</h2>
            <p class="post__discription font_smaller">${press.description}</p>
            <a class="post__link font_smaller" href="${this.$artAndExhibitionsPosts ? 'art-and-exhibitions/in-dialogue-with-calatrava/index.html' : this.$getPostPressRelease ? 'press/my-secret-garden-valencia/index.html' : this.$artAndExhibitionsPostsExtra ? 'art-and-exhibitions/in-dialogue-with-calatrava/index.html' : 'atelier-studio/visiting-mons-again/index.html'}">Learn more</a>
          </div>
        </li> `;   
      }).join("");
      return mapExhibitions;
    },
    toggleActiveMode(){
        if(this.$nav__linksSide.classList.contains('active--now')){
          this.$nav__linksSide.classList.remove('active--now');
        }else{
          this.$nav__linksSide.classList.add('active--now');} 
     },
    getPageScroll(){
        if (window.pageYOffset > 400){ //show the back to top arrow
          this.$backToTheTop.classList.add('btnAppears'); 
        }else{ //hide it the bback to the top arrow
          this.$backToTheTop.classList.remove('btnAppears'); 
        }
      },
    getBackToTheTop(){
        window.scrollTo(0, 0);
    },
	};
	app.initialize();
})();