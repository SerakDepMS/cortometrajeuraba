// Configuración del cortometraje
const config = {
  slideDuration: 11000, // 11 segundos por imagen
  transitionDuration: 1500, // 1.5 segundos de transición
  totalSlides: 20,
};

// Elementos DOM
const titleScreen = document.getElementById("title-screen");
const startBtn = document.getElementById("start-btn");
const slideshowContainer = document.getElementById("slideshow-container");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const currentSlideElement = document.getElementById("current-slide");
const totalSlidesElement = document.getElementById("total-slides");
const slideCounter = document.getElementById("slide-counter");
const reflexion = document.getElementById("reflexion");
const reflexionVolverBtn = document.getElementById("reflexion-volver-btn");
const creditosBtn = document.getElementById("creditos-btn");
const fuentesBtn = document.getElementById("fuentes-btn");
const creditos = document.getElementById("creditos");
const fuentes = document.getElementById("fuentes");
const creditosVolverBtn = document.getElementById("creditos-volver-btn");
const fuentesVolverBtn = document.getElementById("fuentes-volver-btn");
const backgroundMusic = document.getElementById("background-music");
const fuentesList = document.querySelector(".fuentes-list");

// Estado del cortometraje
let currentSlide = 0;
let isPlaying = false;
let slideInterval;
let musicAvailable = false;

// Datos del cortometraje
const slidesData = [
  {
    image: "https://pbs.twimg.com/media/E7vlrdLXMAgVhmv.jpg:large",
    concept:
      "La tierra madre, exuberante y generosa, que dio origen a todo lo que vendría.",
    fuente:
      "https://www.facebook.com/GobAntioquia/posts/el-golfo-de-urab%C3%A1-es-una-formaci%C3%B3n-natural-majestuosa-el-mar-se-abre-paso-por-nu/4458437190855024/",
  },
  {
    image:
      "https://www.reuters.com/resizer/v2/https%3A%2F%2Farchive-images.prod.global.a201836.reutersmedia.net%2F2021%2F04%2F14%2FLYNXMPEH3D13Z.JPG?auth=575c0971bd30431393eb4489b5c36ba3b4f834cc6300e5bbb9e79fdb3dd24027&width=1080&quality=80",
    concept:
      "El 'oro verde' que prometía prosperidad y creó un imperio económico.",
    fuente:
      "https://www.reuters.com/article/world/americas/colombia-apunta-a-exportar-120-millones-de-cajas-de-banano-en-2021-idUSKBN2C129M/",
  },
  {
    image:
      "https://caracol.com.co/resizer/v2/A3HQIUHSKFFNNI2BCUJX6I55SY.jpeg?auth=310a4f80306bd3ff9196e401ec0812196961398dc13439061ef10f48d2d525a2&width=768&height=576&quality=70&smart=true",
    concept:
      "El precio del progreso: la transformación forzada del paisaje y el ecosistema.",
    fuente:
      "https://caracol.com.co/2024/05/10/uraba-la-exportacion-de-banano-esta-afectada-mas-de-un-millon-de-matas-se-han-perdido/",
  },
  {
    image: "https://img.lalr.co/cms/2017/05/09201120/bananero1005.jpg?r=16_9",
    concept:
      "La dignidad del trabajo. La humanidad detrás de cada banano que llega al mundo.",
    fuente:
      "https://www.agronegocios.co/agricultura/formacion-dual-busca-generar-empleo-juvenil-para-sector-bananero-en-uraba-2622707",
  },
  {
    image:
      "https://www.elespectador.com/resizer/v2/4VISREG35RDYZFT2LT57I33MXE.jpg?auth=9e446abe81733cd7e393fadda453e7d3d64ba79810e3ac391b7e99a4abebf4a9&width=1110&height=739&smart=true&quality=60",
    concept:
      "El desplazamiento forzado. El instante en que dejas tu vida atrás por la violencia.",
    fuente:
      "https://www.elespectador.com/colombia-20/paz-y-memoria/dia-de-refugiados-victimas-de-desplazamiento-luchan-por-formalizacion-en-antioquia-cacarica/",
  },
  {
    image:
      "https://verdadabierta.com/wp-content/uploads/2017/10/paracosbloquebananero300200.jpg",
    concept:
      "La presencia omnipresente de los actores armados que disputaron el control del territorio.",
    fuente:
      "https://verdadabierta.com/los-castano-los-tangeros-y-el-origen-del-bloque-bananero-en-el-uraba/",
  },
  {
    image:
      "https://wri-irg.org/sites/default/files/public_files/styles/max_1300x1300/public/images/colombia%202.home.jpg?itok=zhWAhKr3",
    concept:
      "El dolor que se convirtió en memoria y en una demanda permanente de justicia.",
    fuente:
      "https://wri-irg.org/es/story/2016/colombia-la-comunidad-de-paz-de-san-jose-de-apartado",
  },
  {
    image:
      "https://unidadbusqueda.gov.co/wp-content/uploads/2024/07/valledupar-cesar-cementerio-ecce-homo-recuperacion-cuerpos-julio-2024_4.jpg",
    concept:
      "La tierra que fue forzada a guardar secretos. La verdad que yace bajo la superficie.",
    fuente:
      "https://unidadbusqueda.gov.co/actualidad/valledupar-cesar-cementerio-ecce-homo-recuperacion-cuerpos-julio-2024/",
  },
  {
    image:
      "https://wwwlasnoticiasenredco.wordpress.com/wp-content/uploads/2019/01/7bccc-50313557_2167590013504852_4707365593290899456_n.jpg",
    concept:
      "El arte como arma de resistencia y reconstrucción de la identidad.",
    fuente:
      "https://wwwlasnoticiasenredco.wordpress.com/2019/02/20/el-mural-mas-grande-de-uraba-esta-en-apartado-30/",
  },
  {
    image:
      "https://girardotainforma.com/wp-content/uploads/2024/08/Mas-de-500-personas-del-Uraba-antioqueno-se-uniran-a.jpg",
    concept:
      "El poder de la organización social. La semilla de la soberanía territorial.",
    fuente:
      "https://girardotainforma.com/2024/08/29/mas-de-500-personas-del-uraba-antioqueno-se-uniran-a-marcha-en-bogota/",
  },
  {
    image:
      "https://estaticos.elcolombiano.com/binrepository/580x365/0c0/580d365/none/11101/XVBG/befunky-collage-8_39148411_20211215190436.jpg",
    concept:
      "La valentía de quienes defienden la tierra, aun sabiendo el riesgo que eso conlleva.",
    fuente:
      "https://www.elcolombiano.com/antioquia/lideres-sociales-asesinados-en-antioquia-en-2021-EB16177399",
  },
  {
    image:
      "https://imagenes2.eltiempo.com/files/image_1200_535/uploads/2019/10/11/5da114dcf26a3.jpeg",
    concept:
      "El territorio y sus habitantes no son los únicos que sufren; la naturaleza también es víctima.",
    fuente:
      "https://www.eltiempo.com/colombia/medellin/contaminacion-en-el-uraba-antioqueno-por-que-hay-manchas-en-el-golfo-de-uraba-422396",
  },
  {
    image:
      "https://www.unidadvictimas.gov.co/wp-content/uploads/2023/12/afrouraba.jpg",
    concept:
      "La autoprotección comunitaria y la defensa de la cultura y el territorio desde la autonomía.",
    fuente:
      "https://www.unidadvictimas.gov.co/la-unidad-para-las-victimas-avanzo-en-su-trabajo-con-las-comunidades-afrodescendientes-en-uraba/",
  },
  {
    image:
      "https://elnuevooriente.com/wp-content/uploads/2023/05/FwbWdDtWABUslCx-768x512.jpg",
    concept:
      "El acto de fe más grande: volver a sembrar en la tierra que una vez fue escenario del horror.",
    fuente:
      "https://elnuevooriente.com/fedepalma-entrega-plantulas-a-pequenos-palmicultores-de-uraba-para-sembrar-paz-y-cultivar-progreso/",
  },
  {
    image:
      "https://colombiamaspositiva.com/wp-content/uploads/2019/03/NEGRITAS-1068x712.jpg",
    concept:
      "La promesa de un futuro diferente. La vida que se abre paso contra todo pronóstico.",
    fuente:
      "https://colombiamaspositiva.com/sin-categoria/el-uraba-antioqueno-disfruto-de-la-feria-de-servicios-antioquia-cercana.html",
  },
  {
    image:
      "https://cloudfront-us-east-1.images.arcpublishing.com/semana/LCWFRSJUJFFRTA23FWCC2ETAEQ.png",
    concept:
      "La economía solidaria y el papel de la mujer como tejedora no solo de hilos, sino de nuevo tejido social.",
    fuente:
      "https://www.semana.com/web/articulo/las-tejedoras-laboriosas-de-uraba/1722/",
  },
  {
    image:
      "https://unidadbusqueda.gov.co/wp-content/uploads/2024/09/uraba-arboletes-encuentro-hermanos-buscadores-septiembre-2024_1.jpg",
    concept:
      "El reencuentro con la tierra no es solo físico, es espiritual y profundamente emotivo.",
    fuente:
      "https://unidadbusqueda.gov.co/actualidad/uraba-arboletes-encuentro-hermanos-buscadores-septiembre-2024/",
  },
  {
    image: "https://www.jep.gov.co/macrocasos/images/cause-4-1.jpg",
    concept:
      "Es difícil, pero necesario, el camino de la verdad, la justicia y la no repetición.",
    fuente: "https://www.jep.gov.co/macrocasos/caso04.html#container",
  },
  {
    image:
      "https://seecolombia.travel/blog/wp-content/uploads/2021/09/guia-de-viaje-a-uraba-lugares-imperdibles-3-1024x575.jpg",
    concept:
      "La belleza indomable que persiste. Urabá como un lugar de contrastes eternos.",
    fuente:
      "https://seecolombia.travel/blog/2021/09/guia-de-viaje-a-uraba-lugares-imperdibles/",
  },
  {
    image:
      "https://wp.es.aleteia.org/wp-content/uploads/sites/7/2018/02/web3-colombia-uraba-women-tourism-facebook-secretarc3ada-de-las-mujeres-de-antioquia.jpg",
    concept:
      "Ellas cargan con la historia, pero no están dispuestas a repetirla. El futuro de Urabá está en esa mirada.",
    fuente:
      "https://es.aleteia.org/2018/02/16/colombia-las-100-mujeres-guardianas-de-las-playas-de-uraba/",
  },
];

// Verificar disponibilidad del audio
function checkAudioAvailability() {
  return new Promise((resolve) => {
    // Intentar cargar el audio
    backgroundMusic.load();

    backgroundMusic.addEventListener("canplaythrough", () => {
      musicAvailable = true;
      resolve(true);
    });

    backgroundMusic.addEventListener("error", () => {
      musicAvailable = false;
      console.log("Audio no disponible. Continuando sin música.");
      resolve(false);
    });

    // Timeout
    setTimeout(() => {
      if (!musicAvailable) {
        console.log("Timeout: Audio no disponible. Continuando sin música.");
        resolve(false);
      }
    }, 3000);
  });
}

// Inicializar cortometraje
function initSlideshow() {
  // Crear elementos de slide
  slidesData.forEach((slideData, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url('${slideData.image}')`;

    const overlay = document.createElement("div");
    overlay.className = "slide-overlay";

    const conceptContainer = document.createElement("div");
    conceptContainer.className = "concept-container";

    const concept = document.createElement("div");
    concept.className = "concept";
    concept.textContent = slideData.concept;
    concept.id = `concept-${index}`;

    conceptContainer.appendChild(concept);
    slide.appendChild(overlay);
    slide.appendChild(conceptContainer);
    slideshowContainer.appendChild(slide);
  });

  // Actualizar contador total
  totalSlidesElement.textContent = slidesData.length;

  // Mostrar primera slide
  showSlide(0);
}

// Inicializar sección de fuentes
function initFuentes() {
  slidesData.forEach((slideData, index) => {
    const fuenteButton = document.createElement("a");
    fuenteButton.className = "fuente-button";
    fuenteButton.href = slideData.fuente;
    fuenteButton.target = "_blank";

    const buttonContent = document.createElement("div");
    buttonContent.className = "button-content";

    const buttonTitle = document.createElement("div");
    buttonTitle.className = "button-title";
    buttonTitle.textContent = `Imagen ${index + 1}`;

    const buttonUrl = document.createElement("div");
    buttonUrl.className = "button-url";
    buttonUrl.textContent = slideData.fuente;

    buttonContent.appendChild(buttonTitle);
    buttonContent.appendChild(buttonUrl);
    fuenteButton.appendChild(buttonContent);
    fuentesList.appendChild(fuenteButton);
  });
}

// Mostrar slide específica
function showSlide(index) {
  // Actualizar índice actual
  currentSlide = index;

  // Ocultar todas las slides
  const slides = document.querySelectorAll(".slide");
  const concepts = document.querySelectorAll(".concept");

  slides.forEach((slide) => slide.classList.remove("active"));
  concepts.forEach((concept) => concept.classList.remove("show"));

  // Mostrar slide actual
  slides[currentSlide].classList.add("active");

  // Mostrar concepto después de un pequeño delay
  setTimeout(() => {
    document.getElementById(`concept-${currentSlide}`).classList.add("show");
  }, 500);

  // Actualizar contador
  currentSlideElement.textContent = currentSlide + 1;

  // Actualizar barra de progreso
  updateProgressBar();
}

// Siguiente slide
function nextSlide() {
  if (currentSlide < slidesData.length - 1) {
    showSlide(currentSlide + 1);
  } else {
    // Mostrar reflexión final
    showReflexion();
  }
}

// Actualizar barra de progreso
function updateProgressBar() {
  const progress = ((currentSlide + 1) / slidesData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// SOLUCIÓN: Función mejorada para reproducir música
async function startSlideshow() {
  isPlaying = true;

  // Limpiar intervalos existentes
  clearInterval(slideInterval);

  slideInterval = setInterval(() => {
    nextSlide();
  }, config.slideDuration);

  // Reproducir música de fondo si está disponible
  if (musicAvailable) {
    try {
      backgroundMusic.volume = 0.4;
      await backgroundMusic.play();
      console.log("Música de fondo reproduciéndose");
    } catch (error) {
      console.log("No se pudo reproducir la música:", error);
      // Continuar sin música si hay error
    }
  }
}

// Mostrar reflexión final
function showReflexion() {
  clearInterval(slideInterval);
  isPlaying = false;

  // Pausar música si está reproduciéndose
  if (musicAvailable) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  // Ocultar slideshow y mostrar reflexión
  slideshowContainer.classList.remove("active");
  progressContainer.classList.remove("active");
  slideCounter.classList.remove("active");

  setTimeout(() => {
    reflexion.classList.add("show");
  }, 1000);
}

// Ocultar reflexión y volver al inicio
function backToStart() {
  reflexion.classList.remove("show");
  creditos.classList.remove("show");
  fuentes.classList.remove("show");

  setTimeout(() => {
    // Ocultar slideshow
    slideshowContainer.classList.remove("active");
    progressContainer.classList.remove("active");
    slideCounter.classList.remove("active");

    // Mostrar pantalla de inicio
    titleScreen.style.display = "flex";

    // Resetear slideshow
    resetSlideshow();
  }, 1000);
}

// Resetear slideshow
function resetSlideshow() {
  currentSlide = 0;
  showSlide(0);
  progressBar.style.width = "0%";

  // Reiniciar audio
  if (musicAvailable) {
    backgroundMusic.currentTime = 0;
  }
}

// Mostrar sección de créditos
function showCreditos() {
  reflexion.classList.remove("show");
  setTimeout(() => {
    creditos.classList.add("show");
  }, 500);
}

// Mostrar sección de fuentes
function showFuentes() {
  reflexion.classList.remove("show");
  setTimeout(() => {
    fuentes.classList.add("show");
  }, 500);
}

// Volver a la reflexión desde créditos o fuentes
function volverAReflexion() {
  creditos.classList.remove("show");
  fuentes.classList.remove("show");
  setTimeout(() => {
    reflexion.classList.add("show");
  }, 500);
}

// Inicializar todo cuando el DOM esté listo
async function initialize() {
  // Primero verificar disponibilidad del audio
  await checkAudioAvailability();

  // Luego inicializar el resto
  initSlideshow();
  initFuentes();

  // Configurar event listeners
  startBtn.addEventListener("click", function () {
    // Ocultar pantalla de inicio
    titleScreen.style.display = "none";

    // Mostrar slideshow
    slideshowContainer.classList.add("active");
    progressContainer.classList.add("active");
    slideCounter.classList.add("active");

    // Iniciar slideshow
    startSlideshow();
  });

  reflexionVolverBtn.addEventListener("click", backToStart);
  creditosBtn.addEventListener("click", showCreditos);
  fuentesBtn.addEventListener("click", showFuentes);
  creditosVolverBtn.addEventListener("click", volverAReflexion);
  fuentesVolverBtn.addEventListener("click", volverAReflexion);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initialize);
