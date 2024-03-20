import{a as b,S as w,i as n}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const v="42476870-3a5632db826cc102513b658b4",E="https://pixabay.com",I="/api/";async function u(r,e){const s=`?key=${v}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${e}`,l=`${E}${I}${s}`;try{const t=await b.get(l);if(t.status!==200)throw new Error(t.status);if(t.data.hits&&t.data.hits.length>0)return t.data;throw new Error("No images found")}catch(t){throw new Error(`Failed to fetch images from Pixabay API: ${t.message}`)}}const M=new w(".img-container a",{overlay:!0,overlayOpacity:.9,animationSpeed:1e3,scrollZoomFactor:.1,navText:["←","→"],captionsData:"alt",captionDelay:250});function g(r,e){if(!e||e.length===0)n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"center",transitionIn:"fadeInLeft"});else{const s=P(e);r.infoEl.insertAdjacentHTML("beforeend",s),M.refresh()}}function P(r){return r.map(e=>`<div class="image-box">
          <div class="general-frame">

            <div class="image-container">
              <a href="${e.largeImageURL}" data-lightbox="gallery">
              <img src="${e.webformatURL}" alt="${e.tags}" class="my-image">
              </a>
            </div>
             
            <div class="image-body">
                <ul class="ul-item">
                 <li class="image-li">Likes <span style="font-weight: normal;">${e.likes}</span></li>
                 <li class="image-li">Views <span style="font-weight: normal;">${e.views}</span></li>
                 <li class="image-li">Comments <span style="font-weight: normal;">${e.comments}</span></li>
                 <li class="image-li">Downloads <span style="font-weight: normal;">${e.downloads}</span></li>
                </ul>
              </div>
          </div>
    </div>`).join("")}const o={formEl:document.querySelector(".search-form"),infoEl:document.querySelector(".img-container"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".js-btn-load")};let c,i,m;o.formEl.addEventListener("submit",S);o.btnLoadMore.addEventListener("click",q);function h(){o.loader.classList.remove("is-hidden")}function d(){o.loader.classList.add("is-hidden")}function $(){o.btnLoadMore.classList.remove("is-hidden")}function y(){o.btnLoadMore.classList.add("is-hidden")}function p(){o.btnLoadMore.classList.add("is-hidden"),o.infoEl.innerHTML=""}async function S(r){if(r.preventDefault(),c=r.target.elements.query.value.trim(),i=1,h(),c===""){n.error({message:"Please enter a search query",position:"center",transitionIn:"fadeInLeft"}),d(),y();return}r.currentTarget.elements.query.value="";try{const e=await u(c,i);o.infoEl.innerHTML="",e.hits&&e.hits.length>0?(g(o,e.hits),d(),m=Math.ceil(e.totalHits/15)):n.error({message:"No images found for the given query",position:"center",transitionIn:"fadeInLeft"})}catch(e){console.error(e),d(),p(),n.error({message:"Failed to fetch images. Please try again later.",position:"center",transitionIn:"fadeInLeft"})}finally{r.target.reset(),L()}}async function q(){i+=1,h();try{const r=await u(c,i);g(o,r.hits),d(),L()}catch(r){console.error(r),p(),n.error({message:"Failed to fetch more images. Please try again later.",position:"center",transitionIn:"fadeInLeft"})}finally{i>=m&&n.info({message:"End of image collection",position:"center",transitionIn:"fadeInLeft"});const r=o.infoEl.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:6*r,behavior:"smooth"})}}function L(){i>=m?y():$()}
//# sourceMappingURL=commonHelpers.js.map
