/* eslint-disable no-mixed-operators */
// import { theme } from "react-contexify"

const currentUrl = window.location.href
const currentPath = window.location.pathname
const currentDomain = new URL(currentUrl).origin
const ssoUrl = "https://auth-dev.insaba.co.id/"
// const ssoUrl = "https://auth.insaba.co.id/"
// const ssoUrl = "http://127.0.0.1:5001/"

let dataDomain
let defaultFormValues = {}
let globalDefaultDataAttr = {}
let defaultTheme = "naxos"
let activeTheme = "naxos"
let activeThemeFolder = "naxos"
let activeThemeFullName = "naxos"
let activeLatLng = ""

let default_color_themes = {
  naxos: ["#007aff", "#007aff"],
  appsland: ["#6E49D9", "#01DBB0", "#ED9443"]
}
function renderMenu(theme, mainMenu) {
  let newMenuElement = ``
  let menuTextLength = 0
  let newMenuElementFooter = ``
  if (theme === "naxos") {
    mainMenu.forEach((menu) => {
      const hasChildren = Array.isArray(menu.data) && menu.data.length > 0

      if (menu?.title) {
        menuTextLength += menu.title.length
      }

      newMenuElement += `
    <li class="nav-item ${hasChildren ? "dropdown" : ""}">
      <a class="nav-link js-scroll-trigger ${
        menu?.link === "#top-page" ? "active" : ""
      }"
         href="${menu?.link}"
         target="${menu?.link?.startsWith("http") ? "_blank" : "_self"}">
        <span>${menu?.title}</span>
      </a>`

      if (hasChildren) {
        newMenuElement += `<ul class="submenu">`

        menu.data.forEach((child) => {
          newMenuElement += `
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger"
             href="${child?.link}"
             target="${child?.link?.startsWith("http") ? "_blank" : "_self"}">
            <span>${child?.title}</span>
          </a>
        </li>`
        })

        newMenuElement += `</ul>`
      }

      newMenuElement += `</li>`
    })
  } else if (theme?.includes("appsland")) {
    mainMenu.forEach((menu) => {
      const hasChildren = Array.isArray(menu.data) && menu.data.length > 0

      if (menu?.title) {
        menuTextLength += menu.title.length
      }

      let link = menu?.link
      if (menu?.link === "#top-page") {
        link = "#home"
      }
      newMenuElement += `
      <li class="${
        link === "#top-page" ? "active" : ""
      }"><a class="nav-item" href="${link}" target="${
        link?.startsWith("http") ? "_blank" : "_self"
      }">${menu?.title}</a></li>
    `

      newMenuElementFooter += ` <li><a class="nav-item" target="${
        menu?.link?.startsWith("http") ? "_blank" : "_self"
      }" href="${link}">${menu?.title}</a></li>`

      // if (hasChildren) {
      //   newMenuElement += `<ul class="submenu">`

      //   menu.data.forEach((child) => {
      //     newMenuElement += `
      //   <li class="nav-item">
      //     <a class="nav-link js-scroll-trigger"
      //        href="${child?.link}"
      //        target="${child?.link?.startsWith("http") ? "_blank" : "_self"}">
      //       <span>${child?.title}</span>
      //     </a>
      //   </li>`
      //   })

      //   newMenuElement += `</ul>`
      // }

      newMenuElement += `</li>`
    })
  }
  return { newMenuElement, menuTextLength, newMenuElementFooter }
}

function renderIcon(
  iconStr,
  classz = "me-1",
  size = null,
  stylex = "",
  skin = null
) {
  let styleFix = stylex

  if (size && !styleFix.includes("font-size")) {
    if (iconStr.includes("material")) {
      let newSize = parseInt(size) + 6
      styleFix += `font-size: ${newSize}px`
    } else if (iconStr.includes("fontAwesome")) {
      let newSize = parseInt(size)
      styleFix += `font-size: ${newSize}px`
    } else if (iconStr.includes("lordicon")) {
      let newSize = parseInt(size) + 2
      styleFix += `font-size: ${newSize}px`
    } else {
      let newSize = parseInt(size) + 3
      styleFix += `font-size: ${newSize}px`
    }
  }

  let iconStrType = "feather"
  let iconStrFix = iconStr
  let isSolid = false

  const lordiconProps = {
    trigger: "loop",
    stroke: "regular",
    state: "hover-pinch",
    delay: "2000"
  }

  const parts = iconStr.split(":")
  if (parts.length > 1) {
    iconStrType = parts[0]
    iconStrFix = parts[1]
    isSolid = parts.length > 2 && iconStrType !== "lordicon"

    if (parts.length > 2) {
      const propStr = parts[2]
      propStr.split(",").forEach((prop) => {
        const [key, value] = prop.split("=")
        if (key && value) {
          if (key === "colors" && value.includes("-")) {
            const colorParts = value.match(/var\(--[^)]+\)|[^-]+/g) || []
            let primary = colorParts[0] ?? "#625f6e"
            let secondary = colorParts[1] ?? "#83878C"
            if (secondary.includes("var(--primary-color)")) {
              secondary = getComputedStyle(document.documentElement)
                .getPropertyValue("--primary-color")
                .trim()
            }
            lordiconProps[key] = `primary:${primary},secondary:${secondary}`
          } else if (key === "colors" && value === "system") {
            classz += " lordicon-color-system"
            if (skin === "dark") {
              lordiconProps[key] = `primary:#FFFFFF,secondary:#FFFFFF`
            } else {
              lordiconProps[key] = `primary:#625f6e,secondary:#625f6e`
            }
          } else {
            lordiconProps[key] = value
          }
        }
      })
    }
  }

  let el

  if (iconStrType.includes("material")) {
    // el = document.createElement("span")
    // el.textContent = iconStrFix
    // el.className = `${
    //   isSolid ? "material-icons" : "material-icons-outlined"
    // } ${classz} align-middle`
    // Object.assign(el.style, styleFix)
    return `<span style="${styleFix}" class="material-icons ${classz}">${iconStrFix}</span>`
  } else if (iconStrType === "fontAwesome") {
    // el = document.createElement("i")
    // el.className = `fa fa-${iconStrFix} ${classz} align-middle`
    // Object.assign(el.style, styleFix)
    // console.log(iconStrFix)
    let classFirst = `${iconStrFix} ${classz}`
    if (
      !["fas ", "fab ", "far "].some((prefix) => iconStrFix.startsWith(prefix))
    ) {
      classFirst = `fas fa-${iconStrFix} ${classz}`
    }
    return `<i style="${styleFix}" class="${classFirst}"></i>`
  } else if (iconStrType === "lordicon") {
    const className = `align-middle ${classz?.replace("me-1", "me-75")}`
    const width = `${(size ?? 24) + 8}px`
    const height = `${(size ?? 24) + 8}px`
    return `
      <lord-icon
      class="${className}"
        src="https://cdn.lordicon.com/${iconStrFix}.json"
        trigger="${lordiconProps.trigger}"
        stroke="${lordiconProps.stroke}"
        state="${lordiconProps.state}"
        delay="${lordiconProps.delay}"
        colors="${lordiconProps.colors}"
        style="width:${width};height:${height}"
      ></lord-icon>`
  } else {
    // fallback feather icon atau default bulatan
    // el = document.createElement("i")
    // el.className = `feather-icon ${iconStrFix} ${classz} align-middle`
    // Object.assign(el.style, styleFix)
    // console.log(iconStrFix)
    let classFirst = `${iconStrFix} ${classz}`
    if (
      !["fas ", "fab ", "far "].some((prefix) => iconStrFix.startsWith(prefix))
    ) {
      classFirst = `fas fa-${iconStrFix} ${classz}`
    }
    return `<i style="${styleFix}" class="${classFirst}"></i>`
    // return `<div class="icon ${item?.icon ?? ""}"></div>`
  }

  return el
}

function reInitiatePlugins(theme = "naxos") {
  if (theme === "naxos") {
    // const carousels = document.querySelectorAll(".owl-carousel")
    // carousels.forEach((el) => {
    //   const $el = $(el)
    //   if ($el.hasClass("owl-loaded")) {
    //     $el.trigger("destroy.owl.carousel")
    //     $el.find(".owl-stage-outer").children().unwrap()
    //     $el.removeClass("owl-loaded owl-hidden")
    //   }
    //   $el.owlCarousel({
    //     // items: 3,
    //     loop: true
    //     // margin: 10,
    //     // nav: true
    //   })
    // })
    // // ==== SLICK SLIDER ====
    // if ($(".testimonial-slider").length > 0) {
    //   $(".testimonial-slider").slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     fade: true,
    //     asNavFor: ".testimonial-nav"
    //   })
    //   $(".testimonial-nav").slick({
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     asNavFor: ".testimonial-slider",
    //     arrows: false,
    //     centerMode: true,
    //     focusOnSelect: true,
    //     variableWidth: false,
    //     responsive: [
    //       {
    //         breakpoint: 991,
    //         settings: {
    //           slidesToShow: 3,
    //           arrows: false
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 1,
    //           arrows: false
    //         }
    //       }
    //     ]
    //   })
    // }
    // //Screenshots
    // if ($(".screenshot-slider").length > 0) {
    //   var $screenshot = $(".screenshot-slider")
    //   $screenshot.owlCarousel({
    //     responsive: {
    //       0: {
    //         items: 1
    //       },
    //       768: {
    //         items: 2
    //       },
    //       960: {
    //         items: 4
    //       }
    //     },
    //     responsiveClass: true,
    //     autoplay: true,
    //     autoplaySpeed: 1000,
    //     loop: true,
    //     margin: 30,
    //     dotsEach: 2,
    //     rtl: NaxosOptions.rtl
    //   })
    //   if ($screenshot.hasClass("zoom-screenshot")) {
    //     $screenshot.magnificPopup({
    //       delegate: "a",
    //       type: "image",
    //       closeOnContentClick: false,
    //       closeBtnInside: false,
    //       mainClass: "mfp-with-zoom",
    //       image: { verticalFit: true },
    //       gallery: { enabled: true },
    //       zoom: {
    //         enabled: true,
    //         duration: 300, // Don't forget to change the duration also in CSS
    //         opener: function (element) {
    //           return element.find("img")
    //         }
    //       }
    //     })
    //   }
    // }
  }
}

function hexToRgb(hex) {
  // Hilangkan tanda '#' jika ada
  hex = hex.replace("#", "")

  // Ubah nilai warna dari format hex menjadi format RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Kembalikan nilai warna dalam format RGB
  return `rgb(${r}, ${g}, ${b})`
}

function hexToRgbVal(hex) {
  // Hilangkan tanda '#' jika ada
  hex = hex.replace("#", "")

  // Ubah nilai warna dari format hex menjadi format RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Kembalikan nilai warna dalam format RGB
  return `${r}, ${g}, ${b}`
}

function replacePrimaryColor(primaryColorBe, secondaryColorBe = null) {
  // console.log("replace root style begin...")
  // console.log(secondaryColorBe)
  const rootSelect = document.documentElement
  const elementSelect = rootSelect.style
  elementSelect.setProperty("--bs-primary-rgb", `${primaryColorBe}`)
  elementSelect.setProperty("--primary-color", `${primaryColorBe}`)
  if (secondaryColorBe) {
    elementSelect.setProperty("--secondary-color", `${secondaryColorBe}`)
  }
  // console.log("replace root style end...")

  // console.log("replace head style begin...")

  const rgbColor = hexToRgb(primaryColorBe)
  const rgbColorVal = hexToRgbVal(primaryColorBe)
  const rgbColorValSecondary = secondaryColorBe
    ? hexToRgbVal(secondaryColorBe)
    : null

  const styleElement = document.createElement("style")
  styleElement.textContent = `
  :root { 
    --primary-color: ${primaryColorBe} !important;
    --bs-primary-rgb: ${rgbColorVal} !important;
    --primary-color-lightest: rgba(${rgbColorVal}, 0.03) !important;
    --primary-color-lighter: rgba(${rgbColorVal}, 0.1) !important;
    --primary-color-light: rgba(${rgbColorVal}, 0.5) !important;
    --primary-color-semi-light: rgba(${rgbColorVal}, 0.8) !important;
    --secondary-color: ${secondaryColorBe} !important;
  }
`
  // const titleElement = document.querySelector("title")
  // document.head.insertBefore(styleElement, titleElement)
  document.head.appendChild(styleElement)

  // console.log("replace head style end...")
}

const getDefaultAttributes = (domainClaims) => {
  const app_setting = {
    ...{
      layout: domainClaims?.unit?.unit_app_attributes?.layout ?? {}
    },
    ...(domainClaims?.app?.setting ?? {})
  }

  const appLogoFix =
    domainClaims?.unit?.unit_app_attributes?.appLogoLoginBig ??
    domainClaims?.unit?.unit_app_attributes?.appLogoLogin ??
    domainClaims?.app?.logo?.appLogoLoginBig ??
    domainClaims?.app?.logo?.appLogoLogin ??
    domainClaims?.app?.logo?.appLogo

  const mainImageFix =
    domainClaims?.unit?.unit_app_attributes?.login_img_dark ??
    domainClaims?.app?.logo?.login_img_dark ??
    domainClaims?.unit?.unit_app_attributes?.login_img ??
    domainClaims?.app?.logo?.login_img ??
    `${currentDomain}/static/media/login-v2.2198399d.svg`

  //   console.log(mainImageFix)
  const bgImgFix =
    domainClaims?.unit?.unit_app_attributes?.background_img ??
    domainClaims?.app?.logo?.background_img ??
    `${currentDomain}/website/${activeThemeFolder}/images/banner/single-image.jpg`

  const mainBgVideoFix =
    domainClaims?.unit?.unit_app_attributes?.background_video ??
    domainClaims?.app?.logo?.background_video ??
    domainClaims?.app?.setting?.background_video

  const hasColorAttr =
    app_setting?.layout?.primaryColor ||
    domainClaims?.unit?.unit_app_attributes?.background_video_overlay ||
    domainClaims?.app?.setting?.background_video_overlay

  if (hasColorAttr) {
  }

  const defaultAttr = {
    gridTheme: defaultTheme,
    data: {
      mainMenu: [
        { title: "Fitur", link: "#features" },
        { title: "Testimonial", link: "#testimonials" }
      ],
      dynamicSection: [
        {
          fieldName: "home",
          fieldLabel: "",
          fieldDesc: "",
          type: "banner",
          data: [
            {
              title: `${
                domainClaims?.app?.name
              }</br><div style="font-size: 45px;" class="wow fadeInUp" data-wow-offset="10" data-wow-duration="1s" data-wow-delay="0s">${
                domainClaims?.app?.info?.description ??
                "Pengelolaan Data Terintegrasi dan Online"
              }</div>`,
              subtitle:
                "Selamat Datang di Aplikasi Kami! Temukan Kemudahan Pengelolaan Data yang Terintegrasi dan Selalu Terhubung Online, serta berbagai fitur lainnya.",
              image: mainImageFix,
              background_image: bgImgFix,
              background_video: mainBgVideoFix,
              overlay_color1: hasColorAttr
                ? app_setting?.layout?.primaryColor ?? "#1878e4"
                : null,
              overlay_color2: hasColorAttr
                ? domainClaims?.unit?.unit_app_attributes
                    ?.background_video_overlay ??
                  app_setting?.background_video_overlay ??
                  "#004899"
                : null
            }
          ]
          //   html: `
          //   <div class="col-12 col-lg res-margin">
          //     <!-- Banner text -->
          //     <div class="banner-text ">
          //     <h1 class="wow fadeInUp mb-0 mt-lg-5" data-wow-offset="10" data-wow-duration="1s" data-wow-delay="0s" >${
          //       domainClaims?.app?.name
          //     }</h1> <h1 style="font-size: 55px;" class="wow fadeInUp" data-wow-offset="10" data-wow-duration="1s" data-wow-delay="0s" >${
          //     domainClaims?.app?.info?.description ??
          //     "Pengelolaan Data Terintegrasi dan Online"
          //   }</h1> <p style="font-size:24px;" class="wow fadeInUp" data-wow-offset="10" data-wow-duration="1s" data-wow-delay="0.3s" >${"Selamat Datang di Aplikasi Kami! Temukan Kemudahan Pengelolaan Data yang Terintegrasi dan Selalu Terhubung Online, serta berbagai fitur lainnya."}</p>
          //     </div>
          //   </div>

          //   ${
          //     !mainImageFix
          //       ? ""
          //       : `<div class="col-12 col-lg-6">
          //   <div
          //     class="banner-image wow fadeInUp"
          //     data-wow-offset="10"
          //     data-wow-duration="1s"
          //     data-wow-delay="0.3s"
          //   >
          //     <img
          //       class="bounce-effect"
          //       src="${mainImageFix}"
          //       alt="${domainClaims?.app.name}"
          //     />
          //   </div>
          // </div>`
          //   }`
        },
        {
          fieldName: "clients",
          fieldLabel: "",
          fieldDesc: "",
          type: "clients",
          data: [
            {
              title: domainClaims?.unit?.name,
              image: domainClaims?.unit?.attributes?.logo,
              link: "#"
            },
            appLogoFix
              ? {
                  title: domainClaims?.app?.name,
                  image: appLogoFix,
                  link: "#"
                }
              : {
                  title: "Saba Framework",
                  image:
                    "https://res.cloudinary.com/insaba/image/upload/v1700625287/saba_framework/logo_saba_framework_gqw72y.png",
                  link: "https://sabaframework.web.app/public"
                },
            {
              title: "Saba Framework",
              image:
                "https://res.cloudinary.com/insaba/image/upload/v1700625287/saba_framework/logo_saba_framework_gqw72y.png",
              link: "https://sabaframework.web.app/public"
            }
          ]
        },
        {
          fieldName: "features",
          fieldLabel: "Fitur Luar Biasa",
          fieldDesc: `Eksplorasi Keunggulan yang Membuat ${domainClaims?.app?.name} Berbeda. Temukan Fitur-fitur Inovatif yang Menjadikan ${domainClaims?.app?.name} Kami Pilihan Utama untuk Aplikasi Pengelolaan data anda.`,
          type: "features",
          isHidden: false,
          data: [
            {
              title: "Mudah Digunakan",
              subtitle:
                "Desain UI & UX disesuaikan berdasarkan survei pengguna dan referensi, memastikan kemudahan penggunaan.",
              icon: "lordicon:xlayapaf"
            },
            {
              title: "Responsif",
              subtitle:
                "Tetap optimal di berbagai perangkat, beradaptasi dengan ukuran layar yang berbeda.",
              icon: "lordicon:iuqyhlid"
            },
            {
              title: "Penyimpanan Cloud",
              subtitle:
                "Kolaborasi dan kontrol data yang mudah, tanpa perlu biaya tambahan untuk server fisik.",
              icon: "lordicon:sifiooif"
            },
            {
              title: "Perlindungan Privasi",
              subtitle:
                "Melindungi data dari akses tidak sah, perubahan, dan pengungkapan tanpa izin.",
              icon: "lordicon:yaxbmvvh"
            },
            {
              title: "Keamanan Terjamin",
              subtitle:
                "Penggunaan teknologi TSL dan ORM untuk menjaga kerahasiaan data dan mencegah SQL Injection.",
              icon: "lordicon:drdlomqk"
            },
            {
              title: "Kinerja Tinggi",
              subtitle:
                "Aplikasi Halaman Tunggal (SPA) dan Manajemen State untuk mempercepat kinerja aplikasi.",
              icon: "fontAwesome:tachometer-alt"
            },
            {
              title: "Pengembangan Mudah",
              subtitle:
                "Integrasi dan komunikasi data antar aplikasi menggunakan teknologi REST API.",
              icon: "lordicon:ienbfpxp"
            },

            {
              title: "Artikel & Berita",
              subtitle:
                "Buat berita, artikel, dan pengumuman dinamis untuk pengguna terdaftar atau publik.",
              icon: "far fa-newspaper"
            },
            {
              title: "Fitur Chat",
              subtitle:
                "Temukan dan mulai obrolan dengan petugas yang sedang bekerja.",
              icon: "lordicon:fmdwwfgs"
            },
            // {
            //   title: "Migrasi Data",
            //   subtitle: `Pindahkan data lama Anda ke ${domainClaims?.app?.name} tanpa perlu entri ulang.`,
            //   icon: "fas fa-exchange-alt"
            // },
            {
              title: "Pusat Bantuan",
              subtitle: `Dapatkan dukungan dari tim support dan helpdesk ${domainClaims?.app?.name}.`,
              icon: "lordicon:abhwievu"
            }
          ]
        },
        {
          fieldName: "parallax-video",
          fieldLabel: "",
          fieldDesc: "",
          type: "parallax-video",
          isHidden: true
        },
        {
          fieldName: "overview",
          fieldLabel: "",
          fieldDesc: "",
          type: "overview",
          isHidden: true
        },
        {
          fieldName: "services",
          fieldLabel: "",
          fieldDesc: "",
          type: "services",
          isHidden: true
        },
        {
          fieldName: "team",
          fieldLabel: "",
          fieldDesc: "",
          type: "team",
          isHidden: true
        },
        {
          fieldName: "blog_latest",
          fieldLabel: "",
          fieldDesc: "",
          type: "blog_latest",
          isHidden: true
        },
        {
          fieldName: "contact",
          fieldLabel: "",
          fieldDesc: "",
          type: "contact",
          isHidden: true
        },
        {
          fieldName: "floating_wa",
          fieldLabel: "",
          fieldDesc: "",
          type: "floating_wa",
          isHidden: true
        },
        {
          fieldName: "testimonials",
          fieldLabel: "Pendapat Klien",
          fieldDesc:
            "Pengalaman Luar Biasa dari Pelanggan Kami: Ulasan dan Testimoni Otentik yang Menceritakan Kisah Sukses Bersama Layanan Kami.",
          type: "testimonials",
          data: [
            {
              title: "Maria Dewi",
              subtitle: "Manajer Operasional",
              content: `Aplikasi ${domainClaims?.app?.name} telah membawa revolusi dalam pengelolaan kegiatan kami. Sangat mudah digunakan dan membantu meningkatkan efisiensi. Terima kasih ${domainClaims?.app?.name}!`,
              image: `https://ui-avatars.com/api?size=128&background=0D8ABC&color=fff&name=Maria%20Dewi`
            },
            {
              title: "Ahmad Rizal",
              subtitle: "Pengembang Web",
              content: `Saya sangat terkesan dengan kecepatan dan ketepatan fitur-fitur ${domainClaims?.app?.name}. Membuat pekerjaan saya sebagai pengembang web menjadi lebih lancar dan terorganisir.`,
              image: `https://ui-avatars.com/api/?size=128&background=962370&color=fff&name=Ahmad%20Rizal`
            },
            {
              title: "Rina Fitriani",
              subtitle: "Manajer Proyek",
              content: `${domainClaims?.app?.name} membantu saya mengelola proyek-proyek dengan lebih baik. Sistem notifikasi dan integrasi online-nya sangat memudahkan pemantauan dari jauh.`,
              image: `https://ui-avatars.com/api/?size=128&background=e8a935&color=fff&name=Rina%20Fitriani`
              //   image: `${currentDomain}/website/${defaultTheme}/images/testimonials/client-3.jpg`
            },
            {
              title: "Siti Rahayu",
              subtitle: "Pebisnis",
              content: `Sebagai pemilik bisnis kecil, ${domainClaims?.app?.name} membantu saya menjalankan operasional dengan lebih efisien. Saya dapat fokus pada pertumbuhan bisnis tanpa khawatir tentang pengelolaan data.`,
              image: `https://ui-avatars.com/api/?size=128&background=bc3c3c&color=fff&name=Siti%20Rahayu`
              //   image: `${currentDomain}/website/${defaultTheme}/images/testimonials/client-4.jpg`
            },
            {
              title: "Nita Wulandari",
              subtitle: "Marketing Executive",
              content: `Pengalaman menggunakan ${domainClaims?.app?.name} sungguh luar biasa. Fitur-fiturnya yang intuitif membuat penggunaan sehari-hari menjadi lebih menyenangkan.`,
              image: `https://ui-avatars.com/api/?size=128&background=00cfe8&color=fff&name=Nita%20Wulandari`
            },
            {
              title: "Kevin Sudrajatun",
              subtitle: "Marketing Executive",
              content: `Pengalaman menggunakan ${domainClaims?.app?.name} sungguh luar biasa. Fitur-fiturnya yang intuitif membuat penggunaan sehari-hari menjadi lebih menyenangkan.`,
              image: `https://ui-avatars.com/api/?size=128&background=7367f0&color=fff&name=Kevin%20Sudrajatun`
            }
          ]
        },
        {
          fieldName: "screenshots",
          type: "slider_img",
          fieldLabel: "App Screenshots",
          fieldDesc:
            "Jelajahi Keajaiban Karya Tim Kami dalam Memperkenalkan dan Mempromosikan Komunitas Framework. Dalam Galeri Ini, Kami Menyajikan Potret-Potret Visual yang Mencerminkan Dedikasi, Kreativitas, dan Kualitas yang Menjadi Ciri Khas dari Setiap Langkah Pengembangan dan Pemasaran Kami.",
          isHidden: true
        },
        {
          fieldName: "support",
          type: "faq",
          fieldLabel: "Pertanyaan yang Sering Diajukan (FAQ)",
          fieldDesc:
            "Temukan Jawaban yang Tepat tentang Komunitas Framework dari Tim Kami. Kami menyusun daftar pertanyaan yang sering diajukan untuk memberikan panduan lengkap kepada pengguna, membantu mereka memahami konsep, fitur, dan manfaat yang ditawarkan oleh framework kami.",
          isHidden: true
        },
        {
          fieldName: "footer",
          fieldLabel: "",
          fieldDesc: "",
          type: "footer"
        }
      ]
    }
  }
  globalDefaultDataAttr = { ...defaultAttr }
  return defaultAttr
}

// document.addEventListener("DOMContentLoaded", function () {
// showLoader()
// updateUrlWithoutReload("/public")
// fetchData()
// })

function loadScript(src, callback) {
  const script = document.createElement("script")
  script.src = src
  script.onload = callback
  script.onerror = () => console.error(`Failed to load ${src}`)
  document.body.appendChild(script)
}

async function sabaInit() {
  showLoader()
  updateUrlWithoutReload("/public")

  await fetchData() // tunggu sampai selesai

  // Setelah fetchData selesai, baru load main.js
  activeTheme = localStorage.getItem("default_theme_public")
  activeThemeSuffix = localStorage.getItem("default_theme_public_suffix")
  activeThemeFolder = localStorage.getItem("default_theme_public_folder")
  if (activeTheme === "naxos") {
    loadScript(`website/${activeThemeFolder}/assets/js/main.js`, () => {
      console.log("main.js loaded and executed.")
    })
  } else if (activeTheme.includes("appsland")) {
    loadScript(
      `website/${activeThemeFolder}/assets/js/jquery.bundle.js`,
      () => {
        console.log("jquery.bundle.js loaded and executed.")
        loadScript(`website/${activeThemeFolder}/assets/js/script.js`, () => {
          console.log("script.js loaded and executed.")
        })
      }
    )
  }
}

// Jalankan saat DOM siap (jika kamu masih pakai defer di HTML)
// document.addEventListener("DOMContentLoaded", )

document.addEventListener("DOMContentLoaded", async () => {
  await sabaInit()

  const form = document.getElementById("contact-form")
  const submitBtn = document.getElementById("contact-submit")
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault() // Hindari reload form

      const formData = new FormData(form)

      const payload = {}
      formData.forEach((value, key) => {
        payload[key] = value
      })

      // Disable tombol dan ubah teks saat loading
      submitBtn.disabled = true
      submitBtn.textContent = "Mengirim..."

      try {
        const response = await fetch(`${ssoUrl}api/app/landing_page_contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Pesan Terkirim!",
            text: "Terima kasih, kami akan segera menghubungi Anda."
          })
          form.reset()
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Mengirim",
            text: "Silakan coba lagi nanti."
          })
        }
      } catch (error) {
        console.error("Error:", error)
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Periksa koneksi Anda atau hubungi admin."
        })
      } finally {
        // Aktifkan kembali tombol setelah selesai
        submitBtn.disabled = false
        submitBtn.textContent = "Kirim Pesan"

        const contact_message = document.getElementById("contact_message")
        if (contact_message) {
          contact_message.value = defaultFormValues?.contact_message
        }

        const contact_appname = document.getElementById("contact_appname")
        if (contact_appname) {
          contact_appname.value = defaultFormValues?.contact_appname
        }

        const contact_subject = document.getElementById("contact_subject")
        if (contact_subject) {
          contact_subject.value = defaultFormValues?.contact_subject
        }

        const contact_message_category = document.getElementById(
          "contact_message_category"
        )
        if (contact_message_category) {
          contact_message_category.value =
            defaultFormValues?.contact_message_category
        }
      }
    })
  }
})

// window.onload = function () {
//   showLoader()
//   updateUrlWithoutReload("/public")
//   fetchData()
// }

function showLoader() {
  let loaderOverlay = document.getElementById("saba_loader-overlay")

  if (!loaderOverlay) {
    // Buat ulang elemen sesuai struktur HTML yang kamu kasih
    loaderOverlay = document.createElement("div")
    loaderOverlay.id = "saba_loader-overlay"

    const loader = document.createElement("div")
    loader.id = "saba_loader"

    loaderOverlay.appendChild(loader)
    document.body.appendChild(loaderOverlay)
  }

  loaderOverlay.style.display = "flex"
}

function hideLoader() {
  // Hide the loader overlay
  const loaderOverlay = document.getElementById("saba_loader-overlay")
  loaderOverlay.style.display = "none"
}

const defaultMenuTitle = (fieldName) => {
  if (fieldName === "home") return "Home"
  else if (fieldName === "clients") return "Home"
}

// async function fetchDataOld() {
//   const postData = {
//     // key1: "value1",
//     // key2: "value2"
//   }

//   // const domainClaimStorage = JSON.parse(localStorage.getItem("domainClaim"))

//   await fetch(`${ssoUrl}domain_claims`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       public: "1"
//     },
//     body: JSON.stringify(postData)
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data?.message === "Domain not found!") {
//         return (window.location.href = currentDomain)
//       }
//       const defaultAttributes = getDefaultAttributes(data.data)
//       const publicAttributes = data?.data?.landing_page_attr
//       const theme = publicAttributes?.gridTheme ?? defaultTheme
//       activeTheme = theme
//       dataDomain = data?.data
//       // console.log(data.data)
//       const app_setting = {
//         ...{
//           layout: data.data?.unit?.unit_app_attributes?.layout ?? {}
//         },
//         ...(data?.data?.app?.setting ?? {})
//       }

//       // console.log(app_setting)
//       const primaryColor =
//         app_setting?.layout?.primaryColor ??
//         app_setting?.primaryColor ??
//         "#007aff"
//       const secondaryColor =
//         app_setting?.layout?.secondaryColor ?? app_setting?.secondaryColor
//       if (primaryColor) {
//         replacePrimaryColor(primaryColor, secondaryColor)

//         if (secondaryColor) {
//           const style = document.createElement("style")
//           style.type = "text/css"
//           style.textContent = `
//             .banner::before {
//               background: linear-gradient(
//                 -47deg,
//                 var(--secondary-color) 0%,
//                 var(--primary-color) 100%
//               ) !important;
//             }
//           `
//           document.head.appendChild(style)
//         }
//       }

//       // SECTION TYPE HIDE ALL FIRST
//       const sectionsType = document.querySelectorAll(`[saba-section-type]`)

//       sectionsType.forEach((element) => {
//         element.style.display = "none"
//       })

//       //// RENDER MENU
//       const mainMenuFromSection = () => {
//         let menu = publicAttributes?.data?.dynamicSection?.find(
//           (section) => section.type === "header"
//         )?.data
//         if (menu?.length > 0) {
//           return menu
//         } else {
//           return null
//         }
//       }
//       const mainMenu = [
//         { title: "Home", link: "#top-page" },
//         ...(mainMenuFromSection() ??
//           publicAttributes?.data?.mainMenu ??
//           defaultAttributes.data.mainMenu)
//       ]

//       //   console.log(publicAttributes?.data?.mainMenu)
//       let newMenuElement = ``
//       let menuTextLength = 0

//       mainMenu.forEach((menu) => {
//         const hasChildren = Array.isArray(menu.data) && menu.data.length > 0

//         if (menu?.title) {
//           menuTextLength += menu.title.length
//         }

//         newMenuElement += `
//     <li class="nav-item ${hasChildren ? "dropdown" : ""}">
//       <a class="nav-link js-scroll-trigger ${
//         menu?.link === "#top-page" ? "active" : ""
//       }"
//          href="${menu?.link}"
//          target="${menu?.link?.startsWith("http") ? "_blank" : "_self"}">
//         <span>${menu?.title}</span>
//       </a>`

//         if (hasChildren) {
//           newMenuElement += `<ul class="submenu">`

//           menu.data.forEach((child) => {
//             newMenuElement += `
//         <li class="nav-item">
//           <a class="nav-link js-scroll-trigger"
//              href="${child?.link}"
//              target="${child?.link?.startsWith("http") ? "_blank" : "_self"}">
//             <span>${child?.title}</span>
//           </a>
//         </li>`
//           })

//           newMenuElement += `</ul>`
//         }

//         newMenuElement += `</li>`
//       })

//       const menuElement = document.querySelector(".saba_main_menu")

//       if (menuElement) {
//         if (menuTextLength > 80) {
//           menuElement.classList.add("saba_main_menu_long")
//         }
//         menuElement.innerHTML = newMenuElement
//       }

//       //// RENDER BANNER
//       let bannerDataDefault = defaultAttributes.data.dynamicSection.find(
//         (item) => item?.type === "banner"
//       )
//       //   let bannerDataUser =
//       //     publicAttributes.data.dynamicSection.find(
//       //       (item) => item?.type === "banner"
//       //     ) ?? {}
//       //   let mixBannerDataAll = { ...bannerDataDefault, ...bannerDataUser }
//       //   let mixBannerData = {
//       //     ...bannerDataDefault?.data[0],
//       //     ...bannerDataUser?.data[0]
//       //   }
//       //   let mixAll = { ...mixBannerDataAll, ...{ data: mixBannerData } }
//       // let dynamicSection = publicAttributes?.data?.dynamicSection
//       //   ? publicAttributes?.data?.dynamicSection
//       //   : defaultAttributes.data.dynamicSection
//       // let dynamicSection = [
//       //   publicAttributes?.data?.dynamicSection ?? [],
//       //   ...defaultAttributes.data.dynamicSection
//       // ]
//       let dynamicSection = []
//       // console.log(publicAttributes)
//       if (publicAttributes?.data?.dynamicSection) {
//         defaultAttributes.data.dynamicSection.map((sections) => {
//           let section = sections
//           // console.log(
//           //   publicAttributes?.data?.dynamicSection?.find(
//           //     (sectionUser) => sectionUser?.type === section?.type
//           //   )
//           // )
//           let newPublicSection =
//             publicAttributes?.data?.dynamicSection?.find(
//               (sectionUser) => sectionUser?.type === section?.type
//             ) ?? {}
//           if (newPublicSection) {
//             section["isHidden"] = newPublicSection?.isHidden ?? false
//           }
//           dynamicSection.push({
//             ...section,
//             ...publicAttributes?.data?.dynamicSection?.find(
//               (sectionUser) => sectionUser?.type === section?.type
//             )
//           })
//         })
//       } else {
//         dynamicSection = defaultAttributes.data.dynamicSection
//       }

//       if (!dynamicSection.find((item) => item?.type === "banner")) {
//         dynamicSection.unshift(bannerDataDefault)
//       }

//       // console.log("Dynamic Section", dynamicSection)
//       //   dynamicSection.find((item) => item?.type === "banner").data =
//       //     mixBannerData
//       //   console.log(dynamicSection)
//       //   let dynamicSectionBanner = dynamicSection.find(
//       //     (item) => item?.type === "banner"
//       //   )?.data[0]
//       //   if (!dynamicSectionBanner) {
//       //     dynamicSection.unshift(mixBannerData[0])
//       //   } else {
//       //     dynamicSectionBanner = mixBannerData[0]
//       //   }

//       //   console.log(dynamicSection)
//       //// RENDER SECTIONS
//       const attributeName = "saba-section-type"
//       const parentElement = document.body
//       // console.log(
//       //   dynamicSection?.map((item) => !item?.isHidden && item.fieldName)
//       // )
//       // create array sections order based on response
//       if (publicAttributes?.data?.dynamicSection) {
//         let sections_order = publicAttributes?.data?.dynamicSection?.map(
//           (section) => {
//             let secName = section.type
//             // console.log(secName)
//             if (!section.isHidden) {
//               return secName
//             }
//           }
//         )

//         // console.log(sections_order)
//         const sectionsMap = {}
//         sectionsType.forEach((element) => {
//           let sectionTypeName = element.getAttribute("saba-section-type")
//           // console.log(sectionTypeName)
//           // if (sectionTypeName === "banner") {
//           //   sectionTypeName = "header"
//           // }
//           // element.style.display = "inherit"

//           // console.log(sectionTypeName)
//           sectionsMap[sectionTypeName] = element
//           if (
//             !defaultAttributes.data.dynamicSection
//               ?.filter((item) => !item?.isHidden)
//               ?.map((sextion) => sextion.type)
//               .includes(sectionTypeName)
//           ) {
//             element.remove()
//           }
//         })

//         // console.log(sectionsMap)
//         // Buat array baru yang menyusun elemen sesuai dengan urutan sections_order
//         const orderedSections = sections_order.map(
//           (sectionType) => sectionsMap[sectionType]
//         )

//         // console.log(orderedSections)

//         let parentElementSection = document.getElementById(
//           "remove_section_start"
//         )

//         orderedSections.forEach((element) => {
//           if (element instanceof Node) {
//             // parentElementSection.appendChild(element)
//             parentElementSection.insertAdjacentElement("afterend", element)
//           }
//         })
//       }

//       // console.log(dynamicSection)

//       dynamicSection.forEach((attr) => {
//         if (!attr?.isHidden) {
//           const attributeValue = attr?.type
//           // console.log(attributeValue, `[${attributeName}="${attributeValue}"]`)
//           const element = document.querySelector(
//             `[${attributeName}="${attributeValue}"]`
//           )
//           if (element) {
//             element.style.display = "inherit"

//             // APPEND CONTENT TO CHILD
//             const childElementTitle = element.querySelector(
//               ".saba_section_title"
//             )
//             if (childElementTitle && attr?.fieldLabel) {
//               childElementTitle.innerHTML = attr.fieldLabel
//               const childElementDesc =
//                 element.querySelector(".saba_section_desc")
//               if (childElementDesc && attr?.fieldDesc) {
//                 childElementDesc.innerHTML = attr.fieldDesc
//               }
//             } else {
//               const childElementTitleCont = element.querySelector(
//                 ".saba_section_container"
//               )
//               if (childElementTitleCont) {
//                 childElementTitleCont.style.display = "none"
//               }
//             }

//             if (attributeValue === "parallax-video" && attr?.videoLink) {
//               const parallaxVideoEl = element.querySelector(
//                 ".saba_section_video"
//               )
//               if (parallaxVideoEl) {
//                 parallaxVideoEl.href = attr.videoLink
//               }
//             }

//             const childElement = element.querySelector(".saba_html_content")
//             if (childElement) {
//               let sampleData = defaultAttributes?.data?.dynamicSection.find(
//                 (item) => item?.type === attributeValue
//               )?.data

//               //   console.log(attributeName, sampleData)
//               let dataAttr = attr?.data ?? sampleData

//               // console.log(attr)

//               // $(".owl-carousel").trigger("destroy.owl.carousel")
//               if (attr?.html) {
//                 childElement.innerHTML = attr.html
//               } else if (!attr?.html && dataAttr) {
//                 childElement.innerHTML = renderHtml(
//                   attributeValue,
//                   theme,
//                   dataAttr,
//                   attr
//                 )
//               }

//               // $(".owl-carousel").trigger("refresh.owl.carousel")
//             }

//             let copyFooter = null
//             if (!["header", "banner"].includes(attributeValue)) {
//               if (attributeValue === "footer") {
//                 copyFooter = element
//                 parentElement.removeChild(element)
//               } else {
//                 let copyElement = element
//                 parentElement.removeChild(element)
//                 parentElement.appendChild(copyElement)
//               }
//             }
//             if (copyFooter) {
//               parentElement.appendChild(copyFooter)
//             }
//           }
//         }
//       })

//       sectionsType.forEach((element) => {
//         let sectionTypeName = element.getAttribute("saba-section-type")
//         // console.log(sectionTypeName)
//         // if (sectionTypeName === "banner") {
//         //   sectionTypeName = "header"
//         // }
//         // element.style.display = "inherit"
//         let currentItem = publicAttributes.data.dynamicSection?.find(
//           (item) => !item?.isHidden && item.type === sectionTypeName
//         )
//         // ?.map((sextion) => sextion.type === sectionTypeName)
//         // console.log(currentItem)
//         if (
//           [
//             "parallax-video",
//             "overview",
//             "team",
//             "faq",
//             "table-price",
//             "services",
//             "articles-latest",
//             "slider_img",
//             "blog_latest"
//           ].includes(sectionTypeName) &&
//           (!currentItem?.data || currentItem?.fieldLabel === "")
//         ) {
//           element.style.display = "none"
//           element.remove()
//         }
//       })
//       //   console.log(data)
//       updateMainElements(data, defaultAttributes)

//       // sectionsType.forEach((element) => {
//       //   let sectionTypeName = element.getAttribute("saba-section-type")
//       //   if (
//       //     sectionTypeName === "parallax-video" &&
//       //     !sections_order.includes("parallax-video")
//       //   ) {
//       //     element.style.display = "none"
//       //   }
//       // })
//       // COLORS
//       //   if (
//       //     app_setting?.layout?.primaryColor ||
//       //     data.data?.unit?.unit_app_attributes?.background_video_overlay ||
//       //     data.data?.app?.setting?.background_video_overlay
//       //   ) {
//       //     addNewClassToHead([
//       //       app_setting?.layout?.primaryColor ?? "#004899",
//       //       data.data?.unit?.unit_app_attributes?.background_video_overlay ??
//       //         data.data?.app?.setting?.background_video_overlay ??
//       //         "#7B51CF"
//       //     ])
//       //   }

//       // console.log(app_setting?.layout?.primaryColor)
//       if (primaryColor) {
//         // setTimeout(() => {
//         replaceColorCode("#004899", primaryColor)
//         // }, 1000)
//       }
//     })
//     .then((response) => {
//       setTimeout(() => {
//         hideLoader()

//         const carousels = document.querySelectorAll(".owl-carousel")

//         carousels.forEach((el) => {
//           const $el = $(el)

//           if ($el.hasClass("owl-loaded")) {
//             $el.trigger("destroy.owl.carousel")
//             $el.find(".owl-stage-outer").children().unwrap()
//             $el.removeClass("owl-loaded owl-hidden")
//           }

//           $el.owlCarousel({
//             // items: 3,
//             loop: true
//             // margin: 10,
//             // nav: true
//           })
//         })

//         // ==== SLICK SLIDER ====
//         if ($(".testimonial-slider").length > 0) {
//           $(".testimonial-slider").slick({
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             arrows: false,
//             fade: true,
//             asNavFor: ".testimonial-nav"
//           })

//           $(".testimonial-nav").slick({
//             slidesToShow: 5,
//             slidesToScroll: 1,
//             asNavFor: ".testimonial-slider",
//             arrows: false,
//             centerMode: true,
//             focusOnSelect: true,
//             variableWidth: false,
//             responsive: [
//               {
//                 breakpoint: 991,
//                 settings: {
//                   slidesToShow: 3,
//                   arrows: false
//                 }
//               },
//               {
//                 breakpoint: 480,
//                 settings: {
//                   slidesToShow: 1,
//                   arrows: false
//                 }
//               }
//             ]
//           })
//         }
//       }, 100)
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error)
//     })
// }

async function fetchData() {
  const domainClaimStorage = JSON.parse(localStorage.getItem("domainClaim"))
  const fetchOrLoadDomain = async () => {
    if (domainClaimStorage) {
      // Simulasikan Promise agar tetap bisa pakai .then()
      return Promise.resolve({
        data: domainClaimStorage,
        message: "Unit Claim Sent!"
      })
    }

    const postData = {
      // key1: "value1"
    }

    const response = await fetch(`${ssoUrl}domain_claims`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        public: "1"
      },
      body: JSON.stringify(postData)
    })
    return await response.json()
  }

  fetchOrLoadDomain()
    .then((data) => {
      if (data?.message === "Domain not found!") {
        return (window.location.href = currentDomain)
      }

      // Simpan ke localStorage kalau belum ada
      if (!domainClaimStorage) {
        localStorage.setItem("domainClaim", JSON.stringify(data.data))
      }

      const defaultAttributes = getDefaultAttributes(data.data)
      const publicAttributes = data?.data?.landing_page_attr
      const theme = publicAttributes?.gridTheme ?? defaultTheme
      activeTheme = theme

      dataDomain = data?.data
      // console.log(data.data)
      const app_setting = {
        ...{
          layout: data.data?.unit?.unit_app_attributes?.layout ?? {}
        },
        ...(data?.data?.app?.setting ?? {})
      }

      // console.log(activeTheme)
      const primaryColor =
        app_setting?.layout?.primaryColor ??
        app_setting?.primaryColor ??
        default_color_themes?.[activeTheme]?.[0] ??
        "#007aff"
      const secondaryColor =
        app_setting?.layout?.secondaryColor ??
        app_setting?.secondaryColor ??
        default_color_themes?.[activeTheme]?.[1] ??
        "#007aff"
      if (primaryColor) {
        replacePrimaryColor(primaryColor, secondaryColor)

        if (secondaryColor) {
          const style = document.createElement("style")
          style.type = "text/css"
          if (activeTheme === "naxos") {
            style.textContent = `
            .banner::before {
              background: linear-gradient(
                -47deg,
                var(--secondary-color) 0%,
                var(--primary-color) 100%
              ) !important;
            }
          `
          }
          document.head.appendChild(style)
        }
      }

      // SECTION TYPE HIDE ALL FIRST
      const sectionsType = document.querySelectorAll(`[saba-section-type]`)

      sectionsType.forEach((element) => {
        element.style.display = "none"
      })

      //// RENDER MENU
      const mainMenuFromSection = () => {
        let menu = publicAttributes?.data?.dynamicSection?.find(
          (section) => section.type === "header"
        )?.data
        if (menu?.length > 0) {
          return menu
        } else {
          return null
        }
      }
      const mainMenu = [
        { title: "Home", link: "#top-page" },
        ...(mainMenuFromSection() ??
          publicAttributes?.data?.mainMenu ??
          defaultAttributes.data.mainMenu)
      ]

      //   console.log(publicAttributes?.data?.mainMenu)
      // let newMenuElement = ``
      // let menuTextLength = 0

      let { newMenuElement, menuTextLength, newMenuElementFooter } = renderMenu(
        theme,
        mainMenu
      )

      //   mainMenu.forEach((menu) => {
      //     const hasChildren = Array.isArray(menu.data) && menu.data.length > 0

      //     if (menu?.title) {
      //       menuTextLength += menu.title.length
      //     }

      //     newMenuElement += `
      // <li class="nav-item ${hasChildren ? "dropdown" : ""}">
      //   <a class="nav-link js-scroll-trigger ${
      //     menu?.link === "#top-page" ? "active" : ""
      //   }"
      //      href="${menu?.link}"
      //      target="${menu?.link?.startsWith("http") ? "_blank" : "_self"}">
      //     <span>${menu?.title}</span>
      //   </a>`

      //     if (hasChildren) {
      //       newMenuElement += `<ul class="submenu">`

      //       menu.data.forEach((child) => {
      //         newMenuElement += `
      //     <li class="nav-item">
      //       <a class="nav-link js-scroll-trigger"
      //          href="${child?.link}"
      //          target="${child?.link?.startsWith("http") ? "_blank" : "_self"}">
      //         <span>${child?.title}</span>
      //       </a>
      //     </li>`
      //       })

      //       newMenuElement += `</ul>`
      //     }

      //     newMenuElement += `</li>`
      //   })

      const menuElement = document.querySelector(".saba_main_menu")
      if (menuElement) {
        if (menuTextLength > 80) {
          menuElement.classList.add("saba_main_menu_long")
        }
        menuElement.innerHTML = newMenuElement
      }

      const footerMenuElement = document.querySelector(".saba_footer_menu")
      if (footerMenuElement) {
        if (menuTextLength > 80) {
          footerMenuElement.classList.add("saba_main_menu_long")
        }
        footerMenuElement.innerHTML = newMenuElementFooter
      }

      //// RENDER BANNER
      let bannerDataDefault = defaultAttributes.data.dynamicSection.find(
        (item) => item?.type === "banner"
      )
      //   let bannerDataUser =
      //     publicAttributes.data.dynamicSection.find(
      //       (item) => item?.type === "banner"
      //     ) ?? {}
      //   let mixBannerDataAll = { ...bannerDataDefault, ...bannerDataUser }
      //   let mixBannerData = {
      //     ...bannerDataDefault?.data[0],
      //     ...bannerDataUser?.data[0]
      //   }
      //   let mixAll = { ...mixBannerDataAll, ...{ data: mixBannerData } }
      // let dynamicSection = publicAttributes?.data?.dynamicSection
      //   ? publicAttributes?.data?.dynamicSection
      //   : defaultAttributes.data.dynamicSection
      // let dynamicSection = [
      //   publicAttributes?.data?.dynamicSection ?? [],
      //   ...defaultAttributes.data.dynamicSection
      // ]
      let dynamicSection = []
      // console.log(publicAttributes)
      if (publicAttributes?.data?.dynamicSection) {
        defaultAttributes.data.dynamicSection.map((sections) => {
          let section = sections
          // console.log(
          //   publicAttributes?.data?.dynamicSection?.find(
          //     (sectionUser) => sectionUser?.type === section?.type
          //   )
          // )
          let newPublicSection =
            publicAttributes?.data?.dynamicSection?.find(
              (sectionUser) => sectionUser?.type === section?.type
            ) ?? {}
          if (newPublicSection) {
            section["isHidden"] = newPublicSection?.isHidden ?? false
          }
          dynamicSection.push({
            ...section,
            ...publicAttributes?.data?.dynamicSection?.find(
              (sectionUser) => sectionUser?.type === section?.type
            )
          })
        })
      } else {
        dynamicSection = defaultAttributes.data.dynamicSection
      }

      if (!dynamicSection.find((item) => item?.type === "banner")) {
        dynamicSection.unshift(bannerDataDefault)
      }

      // console.log("Dynamic Section", dynamicSection)
      //   dynamicSection.find((item) => item?.type === "banner").data =
      //     mixBannerData
      //   console.log(dynamicSection)
      //   let dynamicSectionBanner = dynamicSection.find(
      //     (item) => item?.type === "banner"
      //   )?.data[0]
      //   if (!dynamicSectionBanner) {
      //     dynamicSection.unshift(mixBannerData[0])
      //   } else {
      //     dynamicSectionBanner = mixBannerData[0]
      //   }

      //   console.log(dynamicSection)
      //// RENDER SECTIONS
      const attributeName = "saba-section-type"
      const parentElement = document.body
      // console.log(
      //   dynamicSection?.map((item) => !item?.isHidden && item.fieldName)
      // )
      // create array sections order based on response
      if (publicAttributes?.data?.dynamicSection) {
        let sections_order = publicAttributes?.data?.dynamicSection?.map(
          (section) => {
            let secName = section.type
            // console.log(secName)
            if (!section.isHidden) {
              return secName
            }
          }
        )

        // console.log(sections_order)
        const sectionsMap = {}
        sectionsType.forEach((element) => {
          let sectionTypeName = element.getAttribute("saba-section-type")
          // console.log(sectionTypeName)
          // if (sectionTypeName === "banner") {
          //   sectionTypeName = "header"
          // }
          // element.style.display = "inherit"

          // console.log(sectionTypeName)
          sectionsMap[sectionTypeName] = element
          if (
            !defaultAttributes.data.dynamicSection
              ?.filter((item) => !item?.isHidden)
              ?.map((sextion) => sextion.type)
              .includes(sectionTypeName)
          ) {
            element.remove()
          }
        })

        // console.log(sectionsMap)
        // Buat array baru yang menyusun elemen sesuai dengan urutan sections_order
        const orderedSections = activeTheme?.includes("appsland")
          ? sections_order.map(
              (sectionType) =>
                sectionsMap[sectionType] && sectionType !== "banner"
            )
          : sections_order.map((sectionType) => sectionsMap[sectionType])

        // console.log(orderedSections)

        let parentElementSection = document.getElementById(
          "remove_section_start"
        )

        if (parentElementSection) {
          orderedSections.forEach((element) => {
            // console.log(element)
            if (element instanceof Node) {
              // parentElementSection.appendChild(element)
              parentElementSection.insertAdjacentElement("afterend", element)
            }
          })
        }
      }

      // console.log(dynamicSection)

      dynamicSection.forEach((attr) => {
        if (!attr?.isHidden) {
          const attributeValue = attr?.type
          // console.log(attributeValue, `[${attributeName}="${attributeValue}"]`)
          const element = document.querySelector(
            `[${attributeName}="${attributeValue}"]`
          )
          if (element) {
            element.style.display = "inherit"

            // APPEND CONTENT TO CHILD
            const childElementTitle = element.querySelector(
              ".saba_section_title"
            )
            if (childElementTitle && attr?.fieldLabel) {
              if (activeTheme?.includes("appsland")) {
                let title_split = attr.fieldLabel.split(" ")
                const middleIndex = Math.ceil(title_split.length / 2)

                let left_text = title_split.slice(0, middleIndex).join(" ")
                let right_text = title_split.slice(middleIndex).join(" ")
                childElementTitle.innerHTML = `${left_text} <span>${right_text}</span>`
              } else {
                childElementTitle.innerHTML = attr.fieldLabel
              }
              const childElementDesc =
                element.querySelector(".saba_section_desc")
              if (childElementDesc && attr?.fieldDesc) {
                childElementDesc.innerHTML = attr.fieldDesc
              }
            } else {
              const childElementTitleCont = element.querySelector(
                ".saba_section_container"
              )
              if (childElementTitleCont) {
                childElementTitleCont.style.display = "none"
              }
            }
            // console.log(attr?.videoLink)

            if (attributeValue === "parallax-video" && attr?.videoLink) {
              const parallaxVideoEl = element.querySelector(
                ".saba_section_video"
              )
              if (parallaxVideoEl) {
                if (theme?.includes("appsland")) {
                  let watchUrl = attr.videoLink

                  if (attr.videoLink.includes("/embed/")) {
                    const afterEmbed = attr.videoLink.split("/embed/")[1]
                    const videoId = afterEmbed.split(/[?#]/)[0] // Ambil sebelum ? atau #
                    watchUrl = `https://www.youtube.com/watch?v=${videoId}`
                  }
                  parallaxVideoEl.href = watchUrl
                } else {
                  parallaxVideoEl.href = attr.videoLink
                }
              }
            }

            const childElement = element.querySelector(".saba_html_content")
            if (childElement) {
              let sampleData = defaultAttributes?.data?.dynamicSection.find(
                (item) => item?.type === attributeValue
              )?.data

              //   console.log(attributeName, sampleData)
              let dataAttr = attr?.data ?? sampleData

              // console.log(attr)
              if (attr?.html) {
                childElement.innerHTML = attr.html
              } else if (!attr?.html && dataAttr) {
                childElement.innerHTML = renderHtml(
                  attributeValue,
                  theme,
                  dataAttr,
                  attr
                )
              }
            }

            let copyFooter = null

            if (!["header", "banner"].includes(attributeValue)) {
              if (element && element.parentNode === parentElement) {
                if (attributeValue === "footer") {
                  copyFooter = element
                  parentElement.removeChild(element)
                } else {
                  let copyElement = element
                  parentElement.removeChild(element)
                  parentElement.appendChild(copyElement)
                }
              } else {
                // Optional: log jika element bukan anak parent
                console.warn(
                  `Element '${attributeValue}' tidak ditemukan atau bukan child dari parentElement`
                )
              }
            }

            if (copyFooter) {
              parentElement.appendChild(copyFooter)
            }
          }
        }
      })

      sectionsType.forEach((element) => {
        let sectionTypeName = element.getAttribute("saba-section-type")
        // console.log(sectionTypeName)
        // if (sectionTypeName === "banner") {
        //   sectionTypeName = "header"
        // }
        // element.style.display = "inherit"
        let currentItem = publicAttributes.data.dynamicSection?.find(
          (item) => !item?.isHidden && item.type === sectionTypeName
        )
        // ?.map((sextion) => sextion.type === sectionTypeName)
        // console.log(currentItem)
        if (
          [
            "team",
            "faq",
            "table-price",
            "services",
            "articles-latest",
            "slider_img",
            "blog_latest"
          ].includes(sectionTypeName) &&
          (!currentItem?.data || currentItem?.fieldLabel === "")
        ) {
          element.style.display = "none"
          element.remove()
        }
      })
      //   console.log(data)
      updateMainElements(data, defaultAttributes)

      // sectionsType.forEach((element) => {
      //   let sectionTypeName = element.getAttribute("saba-section-type")
      //   if (
      //     sectionTypeName === "parallax-video" &&
      //     !sections_order.includes("parallax-video")
      //   ) {
      //     element.style.display = "none"
      //   }
      // })
      // COLORS
      //   if (
      //     app_setting?.layout?.primaryColor ||
      //     data.data?.unit?.unit_app_attributes?.background_video_overlay ||
      //     data.data?.app?.setting?.background_video_overlay
      //   ) {
      //     addNewClassToHead([
      //       app_setting?.layout?.primaryColor ?? "#004899",
      //       data.data?.unit?.unit_app_attributes?.background_video_overlay ??
      //         data.data?.app?.setting?.background_video_overlay ??
      //         "#7B51CF"
      //     ])
      //   }

      // console.log(app_setting?.layout?.primaryColor)
      if (primaryColor) {
        // setTimeout(() => {
        replaceColorCode("#004899", primaryColor, secondaryColor, activeTheme)
        // }, 1000)
      }
    })
    .then((response) => {
      setTimeout(() => {
        hideLoader()
        reInitiatePlugins(activeTheme)
      }, 100)
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
}

function updateMainElements(storeDomainClaims, defaultAttributes) {
  const domainClaims = storeDomainClaims?.data
  // console.log(domainClaims)
  const unit_app_attributes = storeDomainClaims?.data?.unit?.unit_app_attributes
  const unit_app_attributes_setting = unit_app_attributes?.setting

  //DOC
  let docTitle =
    domainClaims?.app.name +
    (domainClaims?.app?.info?.description || domainClaims?.unit?.name
      ? ` - ${domainClaims?.app?.info?.description ?? domainClaims?.unit?.name}`
      : "")
  document.title = docTitle

  // APP NAME
  const appNameFix = domainClaims?.app?.name
  const appNameElements = document.querySelectorAll(".saba_appName")
  appNameElements.forEach((element) => {
    element.textContent = appNameFix
  })

  // APP DESCRIPTION
  const appDescElements = document.querySelectorAll(".saba_appDesc")
  if (appDescElements) {
    appDescElements.forEach((element) => {
      element.textContent =
        domainClaims?.app?.info?.description ??
        "Pengelolaan Data Terintegrasi dan Online"
    })
  }

  // UNIT NAME
  const unitNameElements = document.querySelectorAll(".saba_unitName")
  const unitNameFix = domainClaims?.unit?.name
  unitNameElements.forEach((element) => {
    element.textContent = unitNameFix
  })

  // LOGO
  const logoResp = domainClaims?.app?.logo

  const appLogoFix =
    domainClaims?.unit?.unit_app_attributes?.appLogoLoginBig ??
    domainClaims?.unit?.unit_app_attributes?.appLogoLogin ??
    domainClaims?.app?.logo?.appLogoLoginBig ??
    domainClaims?.app?.logo?.appLogoLogin ??
    domainClaims?.app?.logo?.appLogo

  const appLogoBigExist =
    domainClaims?.unit?.unit_app_attributes?.appLogoLoginBig ??
    domainClaims?.unit?.unit_app_attributes?.appLogoLogin ??
    domainClaims?.app?.logo?.appLogoLoginBig ??
    domainClaims?.app?.logo?.appLogoLogin

  //LOGO APP
  if (appLogoFix) {
    const logoElements = document.querySelectorAll(".saba_appLogo")
    logoElements.forEach((element) => {
      element.src = appLogoFix
      element.alt = unitNameFix ?? appNameFix ?? "Unit Logo"
    })
    if (!appLogoBigExist) {
      const logoElements = document.querySelectorAll(".saba_appLogoText")
      logoElements.forEach((element) => {
        element.style.display = "initial"
        element.innerHTML = appNameFix
      })
    }
  } else {
    const logoElements = document.querySelectorAll(".saba_appLogo")
    logoElements.forEach((element) => {
      element.src = logoResp?.appLogo
      element.alt = unitNameFix ?? appNameFix ?? "Unit Logo"
    })
  }

  //LOGO UNIT
  const unitLogoFix = domainClaims?.unit?.attributes?.logo
  if (unitLogoFix) {
    const logoElements = document.querySelectorAll(".saba_unitLogo")
    logoElements.forEach((element) => {
      element.style.display = "initial"
      element.src = unitLogoFix
      element.alt = unitNameFix ?? "Unit Logo"
    })
  }

  // FAVICON
  updateFavicon(
    domainClaims?.unit?.unit_app_attributes?.favicon ??
      logoResp?.favicon ??
      domainClaims?.app?.logo?.appLogo
  )

  // IMAGES
  //   const mainImageFix =
  //     domainClaims?.unit?.unit_app_attributes?.login_img_dark ??
  //     domainClaims?.app?.logo?.login_img_dark ??
  //     domainClaims?.unit?.unit_app_attributes?.login_img ??
  //     domainClaims?.app?.logo?.login_img

  // BANNER
  //   const mainImagesElements = document.querySelectorAll(".saba_main_image")
  //   if (mainImagesElements) {
  //     mainImagesElements.forEach((element) => {
  //       if (mainImageFix) {
  //         element.src = mainImageFix ?? ""
  //         element.alt = domainClaims?.app.name
  //       } else {
  //         element.style.display = "none"
  //         const mainImagesElementsContainer = document.querySelectorAll(
  //           ".saba_main_image_container"
  //         )
  //         if (mainImagesElementsContainer) {
  //           mainImagesElementsContainer.forEach((elementCont) => {
  //             elementCont.style.display = "none"
  //           })
  //         }
  //       }
  //     })
  //   }

  // IMG-BG
  // const bgImgFix =
  //   domainClaims?.unit?.unit_app_attributes?.background_img ??
  //   domainClaims?.app?.logo?.background_img ??
  //   defaultAttributes.background_image
  // if (bgImgFix) {
  //   const bgImagesElements = document.querySelectorAll(
  //     ".backstretch > div > img"
  //   )
  //   // console.log(bgImagesElements)
  //   if (bgImagesElements) {
  //     bgImagesElements.forEach((element) => {
  //       element.src = bgImgFix
  //       element.alt = domainClaims?.app.name
  //     })
  //   }
  // }

  // VIDEO-BG
  //   const mainBgVideoFix =
  //     domainClaims?.unit?.unit_app_attributes?.background_video ??
  //     domainClaims?.app?.logo?.background_video ??
  //     domainClaims?.app?.setting?.background_video

  //   if (mainBgVideoFix) {
  //     const mainBgVideoElements = document.querySelectorAll(
  //       ".saba_video_background"
  //     )
  //     mainBgVideoElements.forEach((element) => {
  //       element.src = setBackgroundVideo(mainBgVideoFix)
  //       element.style.display = ""
  //     })
  //   }
}

// function addNewClassToHead(colors) {
//   //   console.log(colors)
//   //   let additionalStyles = `.saba_color_gradient::before {background: linear-gradient(-47deg, ${colors[0]} 0%, #7B51CF 100%) !important}`

//   let additionalStyles = `.saba_color_gradient::before {background: linear-gradient(-47deg, ${darkenAndSaturateColor(
//     colors[0],
//     0.5,
//     1.3
//   )} 0%, ${setAlphaFromRGB(colors[1])} 100%) !important}`

//   //   const headerElement = document.querySelector("head")
//   //   headerElement.classList.add("saba_color_gradient")
//   //   Object.assign(headerElement.style, additionalStyles)

//   const head = document.head || document.getElementsByTagName("head")[0]
//   const styleElement = document.createElement("style")

//   // Set the styles for the new style element
//   styleElement.type = "text/css"
//   styleElement.appendChild(document.createTextNode(additionalStyles))

//   // Append the style element to the head
//   head.appendChild(styleElement)
// }

function updateFavicon(faviconUrl) {
  // Create a new link element
  const newFaviconLink = document.createElement("link")
  newFaviconLink.rel = "icon"
  newFaviconLink.type = "image/x-icon"
  newFaviconLink.href = faviconUrl

  // Remove existing favicon link elements
  const existingFaviconLinks =
    document.head.querySelectorAll('link[rel="icon"]')
  existingFaviconLinks.forEach((link) => link.remove())

  // Append the new favicon link to the head of the document
  document.head.appendChild(newFaviconLink)
}

function updateUrlWithoutReload(newPath) {
  history.pushState(null, null, currentDomain + newPath)
}

function replaceColorCode(oldColor, newColor, secondaryCol, theme) {
  let newStyles = ""
  let newStyles2 = ""
  let newStyles3 = ""
  if (theme === "naxos") {
    newStyles = `
  a, h1 > a:hover, h2 > a:hover, h3 > a:hover, h4 > a:hover, h5 > a:hover, h6 > a:hover, .custom-btn, .play-btn:hover > i, .button-store .custom-btn:hover i, .button-store .custom-btn:hover p, .button-store .custom-btn:hover p span, .feature-box .box-icon .icon, .feature-box:hover .box-text > h4, .service-single:hover .icon, .service-single.service-style-2 .icon, .service-single.service-style-2:hover .icon, .service-single.service-style-2:hover h5, .overview-box:hover .icon, .overview-list .fa-li, .pricing-item .pricing-head .price, .pricing-item .pricing-head .price .dollar-sign, .fixed-menu .nav-menu li a.active, .nav-menu li.dropdown .submenu li a.active-submenu, .op-mobile-menu .nav-menu li a:hover, .page-header .page-header-content .breadcrumb li a:hover, .testimonial-carousel .carousel-text .single-box i, #accordion .accordion-header a:not(.collapsed), #accordion .accordion-header a:hover, .blog-home .blog-col:hover .blog-text h4 > a, .price-table .icon, .price-table:hover .plan-type, .contact-info .icon, .contact-form-result > h4, footer a:hover, .footer-social a:hover > i, .blog-post .image-slider .arrows .arrow:hover, .post-counters li > a:hover, .share-btn:hover > p, .share-btn li:hover > a, .nav-links a:hover, .sidebar .search-form button:hover, .sidebar .search-form button:focus, .sidebar ul.menu li a:hover, .sidebar ul.menu li a:focus, .sidebar ul.links li a:hover, .sidebar ul.links li a:focus, .author-social a:hover, .icon.colored i {
      color: ${newColor};
    }
  `
    newStyles2 = `.btn, .to-top:hover, .play-btn, .service-single:hover, .service-single .icon, .overview-box .icon, .overview-box:hover, .fixed-menu .nav-menu li a.active span:after, .nav-menu li.dropdown .submenu li a:hover, .nav-menu li.dropdown .submenu li a.active-submenu, .search-wrapper .search-close-btn:hover:before, .search-wrapper .search-close-btn:hover:after, .clients-slider .owl-dots .active span, .screenshot-slider .owl-dots .active span, .blog-home .blog-col:hover .blog-category, .page-title .blog-category > a:hover, .pagination li a.active, .pagination li a:hover, .pagination li:last-child a, .pagination li:first-child a, .sidebar ul.menu li span, .recent-post-image:before, .author-social a:hover, .member-info:after, .progress .progress-bar, .progress-heading .progress-value > span, .tags .tag:hover, blockquote {
    background-color: ${newColor};
  }
  `

    newStyles3 = `.custom-btn, .price-table.plan-popular, .service-single.service-style-2:hover, .testimonial-carousel .carousel-images .slick-center img, .clients-slider .owl-dots .owl-dot span, .screenshot-slider .owl-dots .owl-dot span, .progress-heading .progress-value > span:before {
    border-color: ${newColor};
}`
  } else if (theme?.includes("appsland")) {
    newStyles = `.gradiant-background, .bg-gradiant.mfp-bg, .box-icon, .team-member .team-photo:after {
    background-image: -o-linear-gradient(157deg, ${newColor} 0%, ${secondaryCol} 100%);
    background-image: linear-gradient(293deg, ${newColor} 0%, ${secondaryCol} 100%);
} 
    .active .steps h4, .heading span, .box-icon .fa, .box-icon .ti, .video-play, .video-play:hover, .video-play:focus, .owl-theme .owl-nav [class*=owl-], .single-features .ti, .single-features .fa, .contact-form h3, .contact-info h6 .fa, .footer-navigation li a:hover, .social-list li a:hover, .owl-theme .owl-nav [class*="owl-"]:hover, .footer-links li a:hover {
    color: ${newColor};
}
    .owl-theme .owl-dots .owl-dot span:after, .affix .navbar-default .navbar-toggle, .affix .navbar-default .navbar-toggle, .navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {
    border-color: ${newColor};
}

    .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span, .affix .navbar-default .navbar-toggle, .affix .navbar-default .navbar-toggle, .navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {
    background: ${newColor};
}
    `
  }

  const head = document.head || document.getElementsByTagName("head")[0]
  const newStyleElement = document.createElement("style")
  newStyleElement.type = "text/css"
  newStyleElement.appendChild(document.createTextNode(newStyles))
  newStyleElement.appendChild(document.createTextNode(newStyles2))
  newStyleElement.appendChild(document.createTextNode(newStyles3))
  head.appendChild(newStyleElement)
}

const renderHtml = (type, theme, data, attr) => {
  // console.log(theme)
  if (type === "banner") {
    return renderHtml_banner(theme, data, attr)
  } else if (type === "clients") {
    return renderHtml_client(theme, data)
  } else if (type === "testimonials") {
    return renderHtml_testimonial(theme, data)
  } else if (type === "team") {
    return renderHtml_team(theme, data)
  } else if (type === "slider_img") {
    return renderHtml_slider_img(theme, data)
  } else if (type === "faq") {
    return renderHtml_faq(theme, data)
  } else if (type === "features") {
    return renderHtml_features(theme, data, attr?.mainImage, attr)
  } else if (type === "services") {
    return renderHtml_services(theme, data, attr?.mainImage)
  } else if (type === "overview") {
    return renderHtml_overview(theme, data, attr?.mainImage)
  } else if (type === "blog_latest") {
    // console.log(data)
    return renderHtml_blog_latest(theme, data, attr?.mainImage)
  } else if (type === "contact") {
    return renderHtml_contact(theme, data, attr?.mainImage)
  } else if (type === "floating_wa") {
    return renderHtml_floating_wa(theme, data, attr)
  }
}

const renderHtml_overview_data = (theme, data, style_type) => {
  let result = ``
  if (theme === "naxos") {
    if (style_type === 2) {
      result += `<!-- Items -->
            <div class="overview-item">`
      data.forEach((item, index) => {
        let icon = `<div class="icon ${item?.icon ?? ""}"></div>`
        if (icon?.includes(":")) {
          icon = renderIcon(item?.icon, "icon", 20)
        }
        result += `
                <!-- Item ${index} -->
                <div class="overview-box d-flex flex-wrap">
                    <!-- Icon -->
                    ${item?.icon ? icon : ""}
        
                    <!-- Content -->
                    <div class="content">
                    <h6 class="font-weight-bold mb-2 mt-0">${
                      item?.title ?? ""
                    }</h6>
                    <p>${item?.subtitle ?? ""}</p>
                    </div>
                </div>
                `
      })
      result += `</div>`
    } else {
      result += `<!-- List -->
            <ul class="overview-list">`
      data.forEach((item, index) => {
        result += `
            <!-- Item ${index} -->
            <li>
                <p class="mb-0 fw-bold"><i class="fa-li fas fa-check"></i> ${
                  item?.title ?? ""
                }</p>
                <p class=""><i class="fa-li"></i> ${item?.subtitle ?? ""}</p>
            </li>
            `
      })
      result += `</ul>`
    }
  } else if (theme?.includes("appsland")) {
    if (style_type === 2) {
      data.forEach((item, index) => {
        let icon = `<em style="margin:2px;width: 47px;line-height: 47px;" class="${
          item?.icon ?? "ti-check"
        }"></em>`
        if (icon?.includes(":")) {
          icon = renderIcon(
            item?.icon,
            "ti",
            20,
            "margin:2px;width: 47px;line-height: 47px;"
          )
        }
        result += `<div class="col-md-12 col-sm-12 saba-overview-style-default">
                     <div style="display:flex;margin-bottom: 23px;" class="feature-box">
                        <div style="margin-right: 14px;height: 51px;width: 53px;" class="box-icon box-icon-small">
                          ${icon}
                        </div>
                        <div style="text-align:start;width: 100%;">
                          <h4 style="margin-top: 0;">${item?.title ?? ""}</h4>
                          <p>${item?.subtitle ?? ""}</p>
                        </div>
                      </div>
                    </div>
                `
      })
    } else {
      data.forEach((item, index) => {
        let icon = `<em style="margin:2px;width: 47px;line-height: 47px;" class="${
          item?.icon ?? "ti-check"
        }"></em>`
        if (icon?.includes(":")) {
          icon = renderIcon(
            item?.icon,
            "ti",
            20,
            "margin:2px;width: 47px;line-height: 47px;"
          )
        }
        result += `<div class="col-md-12 col-sm-12 saba-overview-style-default">
                     <div style="display:flex;margin-bottom: 23px;" class="feature-box">
                        <div style="margin-right: 14px;height: 51px;width: 53px;" class="box-icon box-icon-small">
                           ${icon}
                        </div>
                        <div style="text-align:start;width: 100%;">
                          <h4 style="margin-top: 0;">${item?.title ?? ""}</h4>
                          <p>${item?.subtitle ?? ""}</p>
                        </div>
                      </div>
                    </div>
                `
      })
    }
  }
  return result
}

const renderHtml_overview_btn = (buttons, theme) => {
  let result = ""
  buttons.forEach((btn, indexBtn) => {
    let icon = btn?.icon ?? ""
    if (icon?.includes(":")) {
      icon = renderIcon(btn?.icon, "icon", 35)
    } else {
      icon = `<i class="icon ${btn.icon}"></i>`
    }
    if (theme === "naxos") {
      result += `<!-- Button -->
                <p class="text-center text-lg-start">
                    <a ${
                      btn?.link?.includes("#") ? "" : ' target="blank_"'
                    } href="${btn?.link ?? "#"}" class="btn"> ${icon} ${
        btn?.title
      }</a>
                </p>
                  `
    } else if (theme?.includes("appsland")) {
      result += `<a ${
        btn?.link?.includes("#") ? "" : ' target="blank_"'
      } href="${
        btn?.link ?? "#"
      }" class="button wow fadeInUp button-border" data-wow-duration=".5s" data-wow-delay=".6s" style="margin-right:5px; visibility: visible; animation-duration: 0.5s; animation-delay: 0.6s; animation-name: fadeInUp;">${icon} ${
        btn?.title
      }</a>`
    }
  })
  return result
}

const renderHtml_overview = (theme, data) => {
  let result = []
  if (theme === "naxos") {
    data.forEach((item, index) => {
      result.push(`   <div class="row">
                        <!-- Content -->
                        <div class="col-12 col-lg ${
                          item?.style_type === 2
                            ? item?.image
                              ? "offset-lg-1 order-lg-last"
                              : "order-lg-last"
                            : ""
                        } res-margin">
                            <!-- Section title -->
                            <div class="section-title text-center text-lg-start">
                            <h3>${item?.title ?? ""}</h3>
                            <p>${item?.subtitle ?? ""}</p>
                            </div>
                            
                            ${
                              item?.data
                                ? renderHtml_overview_data(
                                    theme,
                                    item?.data,
                                    item?.style_type
                                  )
                                : ""
                            }
                        </div>

                        ${
                          item?.buttons
                            ? renderHtml_overview_btn(item?.buttons)
                            : ""
                        }
                      
                        ${
                          item?.image
                            ? `  
                        <!-- Image -->
                        <div class="col-12 col-lg-5 ${
                          item?.style_type === 2
                            ? "order-lg-first"
                            : "offset-lg-1"
                        } text-sm-center">
                            <img src="${item?.image ?? ""}" alt="" />
                        </div>`
                            : ""
                        }
                    </div>`)
    })
  } else if (theme.includes("appsland")) {
    // console.log(data)
    data.forEach((item, index) => {
      let title_split = (item?.title).split(" ")
      const middleIndex = Math.ceil(title_split.length / 2)
      let left_text = title_split.slice(0, middleIndex).join(" ")
      let right_text = title_split.slice(middleIndex).join(" ")
      let titleEl = `${left_text} <span>${right_text}</span>`

      result.push(`<div class="section-head text-center">
                    <div class="row">
                      <div class="col-md-12 text-left">
                        <h2 class="heading">${titleEl}</h2>
                        <p class="">${item?.subtitle ?? ""}</p>
                      </div>
                    </div>
                  </div>
        <div class="row text-center">
        ${item?.image ? `<div class="col-12 col-md-8">` : ""}
        ${
          item?.data
            ? renderHtml_overview_data(theme, item?.data, item?.style_type)
            : ""
        }
        </div> 
                  ${
                    item?.buttons
                      ? `<div style="display:flex;margin-top: 10px;margin-bottom: 10px;">${renderHtml_overview_btn(
                          item?.buttons,
                          theme
                        )}</div>`
                      : ""
                  }

         ${
           item?.image
             ? `<div class="col-12 col-md-4"><img src="${
                 item?.image ?? ""
               }" alt="" /></div>`
             : ""
         }
         
        ${item?.image ? `</div>` : ""}

                 `)
    })
  }
  let separator = ""
  return result.join(separator)
}

const renderHtml_blog_latest = (theme, data) => {
  // console.log(data)
  let result = []
  data.forEach((item, index) => {
    const title = item?.title ?? ""
    const subtitle = item?.subtitle ?? ""
    const link = item?.link ?? "#"
    const image =
      item?.image ?? "https://via.placeholder.com/300x200.png?text=No+Image"
    const badgeText = item?.badgeText
      ? `<span class="blog-category">${item?.badgeText}</span>`
      : ""
    const target =
      link?.includes("http") || link?.includes("https") ? "blank" : "_self"

    if (theme === "naxos") {
      result.push(`
                <!-- Item ${index} -->
                 <div class="col-12 col-lg-3 res-margin">
                  <div class="blog-col">
                    <div>
                      <a target="${target}" href="${link}">
                        <div class="blog-img" style="height: 200px;background: url(${image}) #f5f1f1 center no-repeat;background-size: 90%;border-radius: 6px;">
                        </div>
                      </a>
                      ${badgeText}
                    </div>

                    <div class="blog-wrapper">
                      <div class="blog-text">
                        <h4>
                          <a target="_blank" href="${link}"
                            >${title}</a
                          >
                        </h4>

                        <p>
                          ${subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                `)
    } else if (theme?.includes("appsland")) {
      result.push(`<div style="margin-bottom: 18px;" class="col-sm-4">
                  <div class="feature-col">
                   <a target="${target}" href="${link}"><div class="bicon" style="margin-bottom: 16px; height: 200px;background: url(${image}) #f5f1f1 center no-repeat;background-size: 90%;border-radius: 6px;">
                        </div></a>
                    
                    <h3 style="margin-bottom: 5px;"><a style="color: #666666;" target="${target}" href="${link}">${title}</a></h3>
                    <p><a style="color: #666666;" target="${target}" href="${link}">${subtitle}</a></p>
                  </div>
                </div>`)
    }
  })
  let separator = ""
  return result.join(separator)
}

const renderHtml_contact = (theme, data) => {
  let result = []
  let separator = ""
  if (theme === "naxos") {
    result.push(`
      <h5>
        <span class="icon icon-basic-geolocalize-05"></span>
        Alamat
      </h5>
      <p id="contact-address">
       ${data?.address ?? ""}
      </p>

      <h5>
        <span class="icon icon-basic-smartphone"></span>
        Nomor Telepon
      </h5>
      <p id="contact-phoneNum">
        <a href="tel:${data?.phoneNum ?? ""}">${data?.phoneNum ?? ""}</a>
      </p>

      <h5>
        <span class="icon icon-basic-mail"></span>
        Email
      </h5>
      <p>
        <a id="contact-email" href="mailto:${data?.email ?? ""}">
          ${data?.email ?? ""}</a>
      </p>

      <h5>
        <span class="icon icon-basic-clock"></span>
        Jam Kerja
      </h5>
      <p id="contact-workingHour">${data?.workingHour ?? ""}</p>
    `)
  } else if (theme?.includes("appsland")) {
    result.push(`
        <div class="contact-info white-bg ">
              <div class="row">
                <div class="col-sm-12">
                  <h6 id="contact-email"><em class="fa fa-envelope"></em> <a id="contact-email" href="mailto:${
                    data?.email ?? ""
                  }">
          ${data?.email ?? ""}</a></h6>
                </div>
                <div class="col-sm-12">
                  <h6 id="contact-phoneNum"><em class="fa fa-phone"></em> <a href="tel:${
                    data?.phoneNum ?? ""
                  }">${data?.phoneNum ?? ""}</a></h6>
                </div>
                <div class="col-sm-12">
                  <h6 id="contact-workingHour"><em class="fa fa-clock"></em> ${
                    data?.workingHour ?? ""
                  }</h6>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <h6 id="contact-address">
                    <em class="fa fa-map-marker"></em> ${data?.address ?? ""}
                  </h6>
                </div>
              </div>
            </div>
            <div style="height: 417px;background:#ebebeb;" id="map" latlng="${
              data?.latlng ?? ""
            }" class="google-map"></div>
      `)
  }

  const appName = dataDomain?.app?.name ?? ""
  const contact_appname = document.getElementById("contact_appname")
  if (contact_appname) {
    contact_appname.value = appName
    defaultFormValues["contact_appname"] = appName
  }

  if (data?.isRequestDemoApp) {
    const contact_subject = document.getElementById("contact_subject")
    if (contact_subject) {
      const value = `Permintaan Demo ${appName}`
      contact_subject.value = value
      defaultFormValues["contact_subject"] = value
    }

    const contact_message = document.getElementById("contact_message")
    if (contact_message) {
      const value = `Dengan hormat, Saya bermaksud untuk mengajukan permohonan demo aplikasi ${appName} agar dapat memahami fitur dan fungsionalitasnya secara lebih mendalam. Atas perhatian dan kesempatannya, saya ucapkan terima kasih.`
      contact_message.value = value
      defaultFormValues["contact_message"] = value
    }

    const contact_message_category = document.getElementById(
      "contact_message_category"
    )
    let value = ""
    if (contact_message_category) {
      value = `Permintaan Demo Aplikasi`
    } else {
      value = `Pesan Biasa`
    }
    contact_message_category.value = value
    defaultFormValues["contact_message_category"] = value
  }

  activeLatLng = data?.latlng ?? ""
  localStorage.setItem("activeLatLng", activeLatLng)

  return result.join(separator)
}

const renderHtml_floating_wa = (theme, data, attr) => {
  const appName = dataDomain?.app?.name ?? ""
  let result = []
  let separator = ""
  let text =
    attr?.fieldLabel && attr?.fieldLabel !== ""
      ? `<span>${attr?.fieldLabel}</span>`
      : ""
  let btn_class = text && text !== "" ? "" : "btn-only"
  // Fungsi normalisasi nomor telepon
  const normalizePhoneNumber = (rawNumber) => {
    if (!rawNumber) return ""
    // Hapus semua karakter selain angka
    let cleaned = rawNumber.replace(/[^\d]/g, "")
    // Jika dimulai dengan "0", ganti jadi "62"
    if (cleaned.startsWith("0")) {
      cleaned = `62${cleaned.substring(1)}`
    }
    return cleaned
  }

  // Fungsi replace template seperti {appName}
  const replaceTemplateVars = (text, vars) => {
    if (!text) return ""
    return text.replace(/{(\w+)}/g, (_, key) => vars[key] ?? "")
  }

  // if (theme === "naxos") {
  let phoneNum = normalizePhoneNumber(data?.phoneNum ?? "6281313964776")
  let rawTemplate =
    data?.messageTemplate ??
    `Halo, Saya ingin konsultasi mengenai aplikasi ${appName}.`
  let parsedMessage = replaceTemplateVars(rawTemplate, { appName })
  let encodedMessage = encodeURIComponent(parsedMessage)
  result.push(`<a class="${btn_class}" href="https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodedMessage}" target="_blank">
    ${renderIcon("lordicon:edecmgef:colors=#ffffff-#ebe6ef", "", 15)}
   ${text}
  </a>`)
  // }
  return result.join(separator)
}

const renderHtml_services = (theme, data) => {
  let result = ``
  if (theme === "naxos") {
    data.forEach((item, index) => {
      let delay = index === 0 ? 0 : index / 3
      result += ` <div class="col-12 col-lg-4 res-margin wow fadeInUp"
                        data-wow-offset="10"
                        data-wow-duration="1s"
                        data-wow-delay="${delay}">
                        <div class="service-single">
                            <div class="icon ${item?.icon ?? ""}"></div>
                            <h5>${item?.title ?? ""}</h5>
                            <p>${item?.subtitle ?? ""}</p>
                        </div>
                    </div>`
    })
  } else if (theme.includes("appsland")) {
    let childContent1 = ""
    let childContent2 = ""
    let hasImageItem = false
    data.forEach((item, index) => {
      let icon = item?.icon ?? ""
      if (icon?.includes(":")) {
        icon = renderIcon(item?.icon, "", 35, "margin-right:8px")
      } else {
        icon = `<div style="margin-right: 8px;" class="${
          item?.icon ?? ""
        }"></div>`
      }

      let active = index === 0 ? "active" : ""
      let active2 = index === 0 ? "in active" : ""
      childContent1 += ` <li class="${active}" data-toggle="tab" data-target="#tab${
        index + 1
      }">
                <div class="steps">
                  <h4>${icon} ${item?.title ?? ""}</h4>
                  <p>${item?.subtitle ?? ""}</p>
                </div>
              </li>`

      let image =
        item?.image ??
        `${currentDomain}/website/${activeTheme}/images/software-screen-a.jpg`
      hasImageItem = item?.image
      childContent2 += `<div class="tab-pane fade ${active2}" id="tab${
        index + 1
      }"><img src="${image}" alt="step-screen" /></div>`
    })

    let class2 = hasImageItem
      ? "col-md-5 col-sm-8 col-sm-offset-2 col-md-offset-0"
      : "col-md-12 col-sm-12 col-sm-offset-0 col-md-offset-0"

    result += `<div class="${class2}"><ul class="nav nav-tabs">${childContent1}</ul></div>`

    if (hasImageItem) {
      result += `<div class="col-md-7 col-sm-12 col-md-offset-0 text-center">
            <div style="padding: 20px;" class="tab-content">${childContent2}</div></div>`
    }
  }

  return result
}

const renderHtml_banner_btn = (buttons, theme) => {
  let result = ""
  buttons.forEach((btn, indexBtn) => {
    // console.log(btn?.icon)
    // console.log(renderIcon(btn?.icon))
    // let icon = btn?.icon ? renderIcon(btn?.icon, "me-2", 40) : ""
    if (theme === "naxos") {
      let icon = `<i style="margin-right:16px;" class="${btn?.icon ?? ""}"></i>`
      if (icon?.includes(":")) {
        icon = renderIcon(btn?.icon, "", 30, "margin-right:16px;")
      }
      result += `<a
                   ${btn?.link?.includes("#") ? "" : ' target="blank_"'}
                    href="${btn?.link ?? "#"}"
                    class="custom-btn d-inline-flex align-items-center m-2 m-sm-0 me-sm-3"
                    >
                      ${icon}
                    <p>${btn?.subtitle}<span>${btn?.title}</span></p>
                </a>`
    } else if (theme?.includes("appsland")) {
      let icon = `<i style="margin-right:4px;" class="${btn?.icon ?? ""}"></i>`
      if (icon?.includes(":")) {
        icon = renderIcon(btn?.icon, "", 16, "margin-right:4px;")
      }

      const isEven = indexBtn % 2 === 1
      const additionalClass = isEven ? " button-border button-transparent" : ""

      result += `<li>
                    <a href="${btn?.link ?? "#"}"
                     class="button wow fadeInUp${additionalClass}"
                      data-wow-duration=".5s"
                      data-wow-delay=".6s"
                      >${icon} ${btn?.title}</a
                    >
                  </li>`
    }
  })
  return result
}

const renderHtml_banner_bg = (bgImgFix) => {
  // console.log(bgImgFix)
  setTimeout(() => {
    const bgImagesElements = document.querySelectorAll(
      ".backstretch > div > img"
    )
    bgImagesElements.forEach((element) => {
      element.src = bgImgFix
      //   element.alt = domainClaims?.app.name
    })
    // console.log(bgImagesElements)
  }, 2000)

  // if (bgImagesElements) {
  //   bgImagesElements.forEach((element) => {
  //     element.src = bgImgFix
  //     //   element.alt = domainClaims?.app.name
  //   })
  // }
}

const renderHtml_banner_bg_overlay = (colors) => {
  // console.log(colors)
  let additionalStyles = `.saba_color_gradient::before {background: linear-gradient(-47deg, ${darkenAndSaturateColor(
    colors[0],
    0.3,
    1
  )} 0%, ${setAlphaFromRGB(colors[0])} 100%) !important}`
  const head = document.head || document.getElementsByTagName("head")[0]
  const styleElement = document.createElement("style")
  styleElement.type = "text/css"
  styleElement.appendChild(document.createTextNode(additionalStyles))
  head.appendChild(styleElement)
}

const renderHtml_banner = (theme, data, attr) => {
  let bannerDataDefault = globalDefaultDataAttr.data.dynamicSection.find(
    (item) => item?.type === "banner"
  ).data[0]
  let result = ``
  data.forEach((item, index) => {
    if (theme === "naxos") {
      if (index === 0) {
        const image = item?.image ?? bannerDataDefault?.image
        let imageEl = false

        if (image) {
          if (image?.endsWith(".lottie")) {
            imageEl = ` <dotlottie-player  class="bounce-effect" src="${
              item?.image ?? bannerDataDefault?.image
            }" background="transparent" speed="1" style="width: 400px; height: 400px" direction="1" playMode="forward" loop autoplay></dotlottie-player>`
          } else {
            imageEl = `<img class="bounce-effect" src="${
              item?.image ?? bannerDataDefault?.image
            }"/>`
          }
        }

        result += `
            ${
              item?.background_video || bannerDataDefault.background_video
                ? `<iframe
                        class="d-none d-lg-block saba_video_background"
                        src="${setBackgroundVideo(
                          item?.background_video ??
                            bannerDataDefault.background_video
                        )}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>`
                : ""
            }
            
            
            <!-- Container -->
            <div class="container mt-lg-5">
                <div class="row align-items-center ">

                    <!-- Content -->
                    <div class="col-12 col-lg res-margin">
                        <!-- Banner text -->
                        <div class="banner-text ">
                            <h1
                                class="wow fadeInUp"
                                data-wow-offset="10"
                                data-wow-duration="1s"
                                data-wow-delay="0s"
                            >
                                ${item?.title ?? bannerDataDefault.title}
                            </h1>

                            <p
                                ${
                                  item?.subtitle === bannerDataDefault.subtitle
                                    ? 'style="font-size:24px;"'
                                    : ""
                                }
                                class="wow fadeInUp"
                                data-wow-offset="10"
                                data-wow-duration="1s"
                                data-wow-delay="0.3s"
                            >
                            ${item?.subtitle ?? bannerDataDefault.subtitle}
                            </p>

                            <div
                                class="button-store wow fadeInUp"
                                data-wow-offset="10"
                                data-wow-duration="1s"
                                data-wow-delay="0.6s"
                            >
                                ${
                                  item?.buttons
                                    ? renderHtml_banner_btn(item.buttons, theme)
                                    : ""
                                }
                            </div>
                        </div>
                    </div>

                    <!-- Image -->
                    <div class="col-12 col-lg-6">
                        <div class="banner-image wow fadeInUp"
                            data-wow-offset="10"
                            data-wow-duration="1s"
                            data-wow-delay="0.3s"
                        >
                        ${imageEl}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Wave effect -->
            <div class="wave-effect wave-anim">
                <div class="waves-shape shape-one">
                    <div class="wave wave-one"></div>
                </div>

                <div class="waves-shape shape-two">
                    <div class="wave wave-two"></div>
                </div>

                <div class="waves-shape shape-three">
                    <div class="wave wave-three"></div>
                </div>
            </div>`

        renderHtml_banner_bg(
          item.background_image ?? bannerDataDefault.background_image
        )

        if (item?.overlay_color1 || item?.overlay_color2) {
          renderHtml_banner_bg_overlay([
            item?.overlay_color1,
            item?.overlay_color2
          ])
        }
      }
    } else if (theme.includes("appsland")) {
      const title = item?.title ?? bannerDataDefault.title
      const isHtmlString = /<\/?[a-z][\s\S]*>/i.test(title)

      let titleText

      if (isHtmlString) {
        const div = document.createElement("div")
        div.innerHTML = title
        titleText = Array.from(div.childNodes)
          .map((node) => node.textContent.trim())
          .filter((text) => text.length > 0)
          .join(",")
      } else {
        titleText = title
      }

      // Pisahkan menjadi beberapa segmen (pakai pemisah yang sesuai)
      const segments = titleText
        .split(/[,.;|\/\-]+/)
        .map((s) => s.trim())
        .filter(Boolean)

      const staticText = segments[0] || ""
      const animatedSegments = segments.slice()

      let bTags = ""

      if (animatedSegments.length > 0) {
        bTags = `<b class="is-visible">${animatedSegments[0]}</b>\n`
        bTags += animatedSegments
          .slice(1)
          .map((seg) => `<b>${seg}</b>`)
          .join("\n")
      }

      const image = item?.image ?? bannerDataDefault?.image
      let imageEl = false

      if (image) {
        if (image?.endsWith(".lottie")) {
          imageEl = ` <dotlottie-player  class="bounce-effect" src="${
            item?.image ?? bannerDataDefault?.image
          }" background="transparent" speed="1" style="width: 100%;height: 665px; margin-top: -128px;" direction="1" playMode="forward" loop autoplay></dotlottie-player>`
        } else {
          imageEl = `<img class="bounce-effect" src="${
            item?.image ?? bannerDataDefault?.image
          }"/>`
        }
      }

      if (index === 0) {
        if (theme === "appsland_gradient") {
          result += `
          <div class="row text-center">
            <div style="z-index: 10;" class="col-md-12">
              <div class="header-texts">
                <h1
                  class="cd-headline clip is-full-width wow fadeInUp"
                  data-wow-duration=".5s"
                >
                 <!-- <span>${staticText}</span> -->
               <span class="cd-words-wrapper">
                   ${bTags.trim()}
                  </span>
                </h1>
                <p style="max-width: 60%;margin: auto;"
                  class="lead wow fadeInUp"
                  data-wow-duration=".5s"
                  data-wow-delay=".3s"
                >${item?.subtitle ?? bannerDataDefault.subtitle}</p>
                
                <ul class="buttons">
                ${
                  item?.buttons
                    ? renderHtml_banner_btn(item.buttons, theme)
                    : ""
                }
                </ul>
              </div>
            </div>
            <!-- .col -->
          </div>
          <!-- .row -->
          <div class="row text-center">
            <div style="z-index: 9;" class="col-md-10 col-md-offset-1">
                ${imageEl}
            </div>
          </div>
       `
        } else {
          result += `
          <div class="row text-center">
            <div style="z-index: 10;" class="col-md-12">
              <div class="header-texts">
                <h1
                  class="cd-headline clip is-full-width wow fadeInUp"
                  data-wow-duration=".5s"
                >
                 <!-- <span>${staticText}</span> -->
               <span class="cd-words-wrapper">
                   ${bTags.trim()}
                  </span>
                </h1>
                <p style="max-width: 60%;margin: auto;"
                  class="lead wow fadeInUp"
                  data-wow-duration=".5s"
                  data-wow-delay=".3s"
                >${item?.subtitle ?? bannerDataDefault.subtitle}</p>
                
                <ul class="buttons">
                ${
                  item?.buttons
                    ? renderHtml_banner_btn(item.buttons, theme)
                    : ""
                }
                </ul>
              </div>
            </div>
            <!-- .col -->
          </div>
          <!-- .row -->
          <div class="row text-center">
            <div style="z-index: 9;" class="col-md-10 col-md-offset-1">
                ${imageEl}
            </div>
          </div>
       `
        }
      }
    }
  })
  return result
}

const renderHtml_features = (theme, data, mainImage, attr) => {
  let result = ``
  let column1 = []
  let column2 = []
  // console.log(theme)
  if (theme === "naxos") {
    data.forEach((item, index) => {
      let icon = item?.icon ?? ""
      if (icon?.includes(":")) {
        icon = renderIcon(item?.icon, "icon", 35)
      } else {
        icon = `<div class="icon ${item?.icon ?? ""}"></div>`
      }

      let featureBoxEl = `
                        <li>
                            <div class="feature-box d-flex">

                            <div style="text-align: center;" class="box-icon">
                                ${icon ?? ""}
                            </div>

                            <div style="min-height: 120px;" class="box-text align-self-center align-self-md-start">
                                <h4>${item?.title}</h4>
                                <p>${item?.subtitle}</p>
                            </div>
                            </div>
                        </li>`
      if (index % 2 === 0) {
        column1.push(featureBoxEl)
      } else {
        column2.push(featureBoxEl)
      }
    })
    let mainImageEl = `<div class="col-12 col-lg-4 d-none d-lg-block">
                        <div class="features-thumb text-center">
                        <img src="${
                          mainImage ??
                          `${currentDomain}/website/${activeThemeFolder}/` +
                            `images/features/awesome-features.png`
                        }" alt="" />
                        </div>
                    </div>`
    let resultLeft = `<div class="col-12 col-md-6 col-lg-${
      mainImage ? "4" : "6"
    }">
                          <ul class="features-item">${column1?.join("")}
                          </ul>
                        </div>`
    let resultRight = `<div class="col-12 col-md-6 col-lg-${
      mainImage ? "4" : "6"
    }">
                            <ul class="features-item">${column2?.join("")}
                            </ul>
                        </div>`

    result = resultLeft + (mainImage ? mainImageEl : "") + resultRight
  } else if (theme?.startsWith("appsland")) {
    // console.log(attr)
    let title_split = (attr?.title ?? attr?.fieldLabel).split(" ")
    const middleIndex = Math.ceil(title_split.length / 2)
    let left_text = title_split.slice(0, middleIndex).join(" ")
    let right_text = title_split.slice(middleIndex).join(" ")
    let titleEl = `${left_text} <span>${right_text}</span>`
    let classToggle = mainImage ? "col-md-7 pull-right" : "col-md-12"
    result += `<div class="${classToggle}">
              <div class="section-head heading-light mobile-center tab-center">
                <div class="row">
                  <div class="col-md-12">
                    <h2 class="heading heading-light saba_section_title">${titleEl}</h2>
                    <p class="saba_section_desc">${
                      attr?.subtitle ?? attr?.fieldDesc ?? ""
                    }</p>
                  </div>
                </div>
              </div>
              <!-- .section-head -->
              <div class="row ">`
    data.forEach((item, index) => {
      let icon = item?.icon ?? ""
      if (icon?.includes(":")) {
        icon = renderIcon(item?.icon, "ti", 45)
      } else {
        icon = `<em class="ti ${item?.icon}"></em>`
      }

      result += `<div class="col-sm-6">
                            <div class="single-features">
                              ${icon}
                              <h4>${item?.title}</h4>
                              <p style="max-height: 75px;">${item?.subtitle}</p>
                            </div>
                          </div>`
    })
    result += ` </div></div>`
    let images =
      mainImage ??
      `${currentDomain}/website/${activeThemeFolder}/images/software-screen-b.jpg`
    let classBefore = mainImage ? `` : ""
    if (mainImage) {
      result += `<div class="col-md-5 pt-100 text-center saba_banner">
              <div
                class="wow fadeInLeft"
                data-wow-duration=".5s"
              >
                <img src="${images}" alt="software-screen" />
              </div>
            </div>`
    }
  }
  return result
}

const renderHtml_client = (theme, data) => {
  let result = ``
  if (theme === "naxos") {
    data.forEach((item, index) => {
      result += `<div class="client">
                    <a ${
                      item?.link && item?.link !== "#" ? 'target="blank_"' : ""
                    } href="${item?.link ?? "#"}"
                    ><img style=" max-width: 100% !important;width: auto !important;max-height: 75px;filter: grayscale(100%) brightness(50%);" src="${
                      item?.image ??
                      `${currentDomain}/website/${activeThemeFolder}/images/clients/company-${
                        index + 1
                      }.png`
                    }" alt="${item?.title ?? `Company ${index + 1}`}"
                    /></a>
                </div>`
    })
  } else if (theme?.includes("appsland")) {
    let dataToRender = [...data]
    if (data.length < 5) {
      const times = Math.ceil(5 / data.length)
      dataToRender = Array(times).fill(data).flat().slice(0, 5)
    }

    // Hitung middleIndex dari panjang dataToRender
    const middleIndex = Math.floor(dataToRender.length / 2)

    // Render carousel
    result += `<div class="image-carousel has-carousel slide-screen owl-carousel owl-theme" data-items="5" data-center="true" data-loop="true" data-auto="true" data-dots="false" data-navs="false" data-controls="false" data-startposition="${middleIndex}">`

    dataToRender.forEach((item, index) => {
      result += `<div style="margin:auto;" class="item"><a style="display:flex;justify-content:center;" ${
        item?.link && item?.link !== "#" ? 'target="blank_"' : ""
      } href="${item?.link ?? "#"}"
      ><img src="${
        item?.image ??
        `${currentDomain}/website/${activeThemeFolder}/images/clients/company-${
          index + 1
        }.png`
      }" style="height: 100px;width: auto;" alt="${
        item?.title ?? `Company ${index + 1}`
      }" /></a></div>`
    })

    result += `</div>`
  }
  return result
}

const renderHtml_testimonial = (theme, data) => {
  let result = ``

  if (theme === "naxos") {
    let startEl = `<div class="block-text row">
    <div
      class="carousel-text testimonial-slider col-12 col-lg-8 offset-lg-2 "
    >`

    let resultHeader = ``
    let separator = `</div></div>
    <div class="block-media row"><div
    class="carousel-images testimonial-nav col-12 col-lg-8 offset-lg-2"
  >`
    let resultContent = ``
    let endEl = `</div></div>`
    data.forEach((item, index) => {
      resultHeader += ` <div>
                            <div class="single-box">
                            <p>
                                <i class="fas fa-quote-left"></i> ${item?.content} <i class="fas fa-quote-right"></i>
                            </p>
                            </div>
                        </div>`
      resultContent += `<div>
                            <img
                            src="${
                              item?.image ??
                              `${currentDomain}/website/${activeThemeFolder}/images/testimonials/client-${
                                index + 1
                              }.png`
                            }"
                            style="width:100%"
                            alt="${item?.title ?? ""}"
                            class="img-fluid rounded-circle"
                            />
                            <div class="client-info">
                            <h3>${item?.title ?? ""}</h3>
                            <span>${item?.subtitle ?? ""}</span>
                            </div>
                        </div>`
    })
    result = startEl + resultHeader + separator + resultContent + endEl
  } else if (theme?.includes("appsland")) {
    data.forEach((item, index) => {
      let avatar =
        item?.image ??
        `${currentDomain}/website/${activeThemeFolder}/images/testimonials/client-${
          index + 1
        }.png`
      result += `<div class="item text-center">
                  <div class="quotes">
                    <img
                      src="${currentDomain}/website/${activeThemeFolder}/images/quote-icon.png"
                      class="quote-icon"
                      alt="quote-icon"
                    />
                    <blockquote>
                      ${item?.content ?? ""}.
                    </blockquote>
                    <h6>${item?.title ?? ""}</h6>
                    <div class="client-image">
                      <img src="${avatar}" alt="${item?.title ?? ""}" />
                    </div>
                  </div>
                </div>`
    })
  }

  return result
}

const renderHtml_team = (theme, data) => {
  let result = ``
  if (theme === "naxos") {
    data.forEach((item, index) => {
      result += `   <div class="col-12 col-md-6 col-lg-3 mb-5">
                        <div class="team-member res-margin">
                            <div class="team-image">
                                <img style="min-height: 308px;" src="${
                                  item?.image ??
                                  `${currentDomain}/website/${activeThemeFolder}/images/team/member-${
                                    index + 1
                                  }.jpg`
                                }" alt="${
        item?.title ?? `Team Member ${index + 1}`
      }" />
                                <div class="team-social">
                                    <div class="team-social-inner">
                                        <a href="javascript:void(0)"><i class="fab fa-instagram"></i></a>
                                        <a href="javascript:void(0)"><i class="fab fa-twitter"></i></a>
                                        <a href="javascript:void(0)"><i class="fab fa-facebook-f"></i></a>
                                        <a href="javascript:void(0)"><i class="fab fa-linkedin-in"></i></a>
                                        <a href="javascript:void(0)"><i class="fab fa-dribbble"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="team-details">
                                <h5 class="title"><a href="#">${
                                  item?.title
                                }</a></h5>
                                <span class="position">${item?.subtitle}</span>
                            </div>
                        </div>
                    </div>`
    })
  } else if (theme?.includes("appsland")) {
    data.forEach((item, index) => {
      let avatar =
        item?.image ??
        `${currentDomain}/website/${activeThemeFolder}/images/team/member-${
          index + 1
        }.jpg`
      result += `<div class="col-md-3 col-sm-6">
            <div style="min-height: 365px" class="team-member">
              <div class="team-photo">
                <img src="${avatar}" alt="team" />
                <a href="javascript:void(0)" class="expand-trigger content-popup"
                  ></a>
              </div>
              <div class="team-info">
                <h4 class="name">${item?.title}</h4>
                <p class="sub-title">${item?.subtitle}</p>
              </div>
            </div>
          </div>`
    })
  }
  return result
}

const renderHtml_slider_img = (theme, data) => {
  let result = ``
  if (theme === "naxos") {
    data.forEach((item, index) => {
      result += `<div class="item">
                    <a href="${
                      item?.image ?? `/screenshots/screenshot-${index + 1}.jpg`
                    }">
                        <img src="${
                          item?.image ??
                          `${currentDomain}/website/${activeThemeFolder}/screenshots/screenshot-${
                            index + 1
                          }.jpg`
                        }" alt="${item?.title ?? `Screenshoot ${index + 1}`}" />
                    </a>
                </div>`
    })
  } else if (theme?.includes("appsland")) {
    data.forEach((item, index) => {
      result += `<div class="item">
                  <img
                    src="${
                      item?.image ??
                      `${currentDomain}/website/${activeThemeFolder}/screenshots/screenshot-${
                        index + 1
                      }.jpg`
                    }" alt="${item?.title ?? `Screenshoot ${index + 1}`}"
                  />
                </div>`
    })
  }
  return result
}

const renderHtml_faq = (theme, data) => {
  let result = ``
  if (theme === "naxos") {
    data.forEach((item, index) => {
      result += `<div class="accordion-item">
                        <div class="accordion-header" id="heading-${index + 1}">
                        <h5>
                            <a
                            class="accordion-button ${
                              index > 0 ? "collapsed" : ""
                            }"
                            href="#collapse-${index + 1}"
                            role="button"
                            aria-expanded="${index === 0 ? "true" : "false"}"
                            data-bs-toggle="collapse"
                            aria-controls="collapse-${index + 1}"
                            >
                            ${item?.title}
                            </a>
                        </h5>
                        </div>

                        <div
                        id="collapse-${index + 1}"
                        class="accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }"
                        aria-labelledby="heading-${index + 1}"
                        data-bs-parent="#accordion"
                        >
                        <div class="accordion-body">
                            <p>
                            ${item?.subtitle}
                            </p>
                        </div>
                        </div>
                    </div>`
    })
  } else if (theme?.includes("appsland")) {
    data.forEach((item, index) => {
      result += ` <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="accordion-i${
                    index + 1
                  }">
                    <h6 class="panel-title">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#another"
                        href="#accordion-pane-i${index + 1}"
                        aria-expanded="false"
                      >
                         ${item?.title}
                        <span class="plus-minus"><span></span></span>
                      </a>
                    </h6>
                  </div>
                  <div
                    id="accordion-pane-i${index + 1}"
                    class="panel-collapse collapse ${index === 0 ? "in" : ""}"
                    role="tabpanel"
                    aria-labelledby="accordion-i${index + 1}"
                  >
                    <div class="panel-body">
                      <p>${item?.subtitle}</p>
                    </div>
                  </div>
                </div>`
    })
  }
  return result
}

///// HELPERS
const setBackgroundVideo = (url) => {
  let result = url
  if (url.indexOf("/embed/") === -1) {
    const videoId = getVideoIdFromUrl(url)

    if (videoId) {
      result = `https://www.youtube.com/embed/${videoId}`
    }
    result = `${result}?autoplay=1&loop=1&rel=0&showinfo=0&iv_load_policy=3&controls=0&enablejsapi=1&mute=1&autohide=1&playlist=${videoId}`
  }
  return result
}

function getVideoIdFromUrl(url) {
  const videoIdRegex = /[?&]v=([^&]+)/
  const match = url.match(videoIdRegex)
  return match ? match[1] : null
}

function removeAlphaFromRGBA(rgbaString) {
  const match = rgbaString?.match(
    /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/
  )

  if (match) {
    const red = parseInt(match[1])
    const green = parseInt(match[2])
    const blue = parseInt(match[3])

    return `rgb(${red}, ${green}, ${blue})`
  }

  return rgbaString
}

function setAlphaFromRGB(rgbaString) {
  // console.log(rgbaString)
  if (!rgbaString) {
    // Handle jika rgbaString tidak ada
    return rgbaString
  }

  if (rgbaString.indexOf("rgba") === -1 && rgbaString.indexOf("#") === -1) {
    const rgbMatch = rgbaString.match(
      /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
    )
    if (rgbMatch) {
      const red = parseInt(rgbMatch[1])
      const green = parseInt(rgbMatch[2])
      const blue = parseInt(rgbMatch[3])
      return `rgba(${red}, ${green}, ${blue}, 0.9)`
    }
  } else if (rgbaString.indexOf("#") === 0) {
    // Handle format warna heksadesimal
    const hexColor = rgbaString.replace("#", "")
    const red = parseInt(hexColor.substring(0, 2), 16)
    const green = parseInt(hexColor.substring(2, 4), 16)
    const blue = parseInt(hexColor.substring(4, 6), 16)
    return `rgba(${red}, ${green}, ${blue}, 0.9)`
  }

  // Handle jika format input tidak sesuai
  // console.log(rgbaString)
  return rgbaString
}

function darkenAndSaturateColor(
  hexColor,
  darkenFactor = 0.8,
  saturateFactor = 1.2
) {
  if (!hexColor || hexColor.indexOf("#") !== 0) {
    // Handle if hexColor is not provided or not in the correct format
    return hexColor
  }

  // Handle hexadecimal color format
  const strippedHex = hexColor.substring(1) // Remove the #
  const red = parseInt(strippedHex.substring(0, 2), 16)
  const green = parseInt(strippedHex.substring(2, 4), 16)
  const blue = parseInt(strippedHex.substring(4, 6), 16)

  // console.log(red, green, blue)
  // Convert to HSL color space
  const hslColor = rgbToHsl(red, green, blue)

  // Darken the color
  hslColor[2] *= darkenFactor

  // Saturate the color
  hslColor[1] *= saturateFactor

  // Convert back to RGB color space
  const rgbColor = hslToRgb(hslColor[0], hslColor[1], hslColor[2])

  // Convert back to hex and return the result
  return `#${rgbColor[0].toString(16).padStart(2, "0")}${rgbColor[1]
    .toString(16)
    .padStart(2, "0")}${rgbColor[2].toString(16).padStart(2, "0")}`
}

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h, s, l]
}

// Function to convert HSL to RGB
function hslToRgb(h, s, l) {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
