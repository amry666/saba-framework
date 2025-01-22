const currentUrl = window.location.href
const currentPath = window.location.pathname
const currentDomain = new URL(currentUrl).origin
const ssoUrl = "https://auth-dev.insaba.co.id/"
// const ssoUrl = "https://auth.insaba.co.id/"
// const ssoUrl = "http://127.0.0.1:5001/"

let globalDefaultDataAttr = {}
const defaultTheme = "naxos"

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
    `${currentDomain}/website/${defaultTheme}/images/banner/single-image.jpg`

  const mainBgVideoFix =
    domainClaims?.unit?.unit_app_attributes?.background_video ??
    domainClaims?.app?.logo?.background_video ??
    domainClaims?.app?.setting?.background_video

  const hasColorAttr =
    app_setting?.layout?.primaryColor ||
    domainClaims?.unit?.unit_app_attributes?.background_video_overlay ||
    domainClaims?.app?.setting?.background_video_overlay

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
              icon: "far fa-smile"
            },
            {
              title: "Responsif",
              subtitle:
                "Tetap optimal di berbagai perangkat, beradaptasi dengan ukuran layar yang berbeda.",
              icon: "fas fa-mobile-alt"
            },
            {
              title: "Penyimpanan Cloud",
              subtitle:
                "Kolaborasi dan kontrol data yang mudah, tanpa perlu biaya tambahan untuk server fisik.",
              icon: "fas fa-cloud-upload-alt"
            },
            {
              title: "Perlindungan Privasi",
              subtitle:
                "Melindungi data dari akses tidak sah, perubahan, dan pengungkapan tanpa izin.",
              icon: "fas fa-shield-alt"
            },
            {
              title: "Keamanan Terjamin",
              subtitle:
                "Penggunaan teknologi TSL dan ORM untuk menjaga kerahasiaan data dan mencegah SQL Injection.",
              icon: "fas fa-lock"
            },
            {
              title: "Kinerja Tinggi",
              subtitle:
                "Aplikasi Halaman Tunggal (SPA) dan Manajemen State untuk mempercepat kinerja aplikasi.",
              icon: "fas fa-tachometer-alt"
            },
            {
              title: "Pengembangan Mudah",
              subtitle:
                "Integrasi dan komunikasi data antar aplikasi menggunakan teknologi REST API.",
              icon: "fas fa-code"
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
              icon: "fas fa-comments"
            },
            // {
            //   title: "Migrasi Data",
            //   subtitle: `Pindahkan data lama Anda ke ${domainClaims?.app?.name} tanpa perlu entri ulang.`,
            //   icon: "fas fa-exchange-alt"
            // },
            {
              title: "Pusat Bantuan",
              subtitle: `Dapatkan dukungan dari tim support dan helpdesk ${domainClaims?.app?.name}.`,
              icon: "fas fa-life-ring"
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

document.addEventListener("DOMContentLoaded", function () {
  showLoader()
  updateUrlWithoutReload("/public")
  fetchData()
})

// window.onload = function () {
//   showLoader()
//   updateUrlWithoutReload("/public")
//   fetchData()
// }

function showLoader() {
  // Show the loader overlay
  const loaderOverlay = document.getElementById("saba_loader-overlay")
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

async function fetchData() {
  const postData = {
    // key1: "value1",
    // key2: "value2"
  }

  await fetch(`${ssoUrl}domain_claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      public: "1"
    },
    body: JSON.stringify(postData)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.message === "Domain not found!") {
        return (window.location.href = currentDomain)
      }
      const defaultAttributes = getDefaultAttributes(data.data)
      const publicAttributes = data?.data?.landing_page_attr
      const theme = publicAttributes?.gridTheme ?? defaultTheme

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
      let newMenuElement = ``
      mainMenu.forEach((menu) => {
        ///SET MAIN MENU SYNC WITH SECTION
        newMenuElement += ` <li class="nav-item">
                                <a class="nav-link js-scroll-trigger ${
                                  menu?.link === "#top-page" ? "active" : ""
                                }" target="${
          menu?.link?.includes("http://") || menu?.link?.includes("https://")
            ? "_blank"
            : "_self"
        }" href="${menu?.link}">
                                <span>${menu?.title}</span>
                                </a>
                                </li>`
      })
      const menuElement = document.querySelector(".saba_main_menu")
      menuElement.innerHTML = newMenuElement

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
            if (!section.isHidden) {
              return secName
            }
          }
        )
        // console.log(sectionsType)
        const sectionsMap = {}
        sectionsType.forEach((element) => {
          let sectionTypeName = element.getAttribute("saba-section-type")
          // console.log(sectionTypeName)
          // if (sectionTypeName === "banner") {
          //   sectionTypeName = "header"
          // }
          // element.style.display = "inherit"
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
        const orderedSections = sections_order.map(
          (sectionType) => sectionsMap[sectionType]
        )

        // console.log(orderedSections)

        let parentElementSection = document.getElementById(
          "remove_section_start"
        )

        orderedSections.forEach((element) => {
          if (element instanceof Node) {
            // parentElementSection.appendChild(element)
            parentElementSection.insertAdjacentElement("afterend", element)
          }
        })
      }

      // console.log(dynamicSection)

      dynamicSection.forEach((attr) => {
        if (!attr?.isHidden) {
          const attributeValue = attr?.type
          //    console.log(attributeValue, `[${attributeName}="${attributeValue}"]`)
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
              childElementTitle.innerHTML = attr.fieldLabel
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

            if (attributeValue === "parallax-video" && attr?.videoLink) {
              const parallaxVideoEl = element.querySelector(
                ".saba_section_video"
              )
              if (parallaxVideoEl) {
                parallaxVideoEl.href = attr.videoLink
              }
            }

            const childElement = element.querySelector(".saba_html_content")
            if (childElement) {
              let sampleData = defaultAttributes?.data?.dynamicSection.find(
                (item) => item?.type === attributeValue
              )?.data

              //   console.log(attributeName, sampleData)
              let dataAttr = attr?.data ?? sampleData
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
              if (attributeValue === "footer") {
                copyFooter = element
                parentElement.removeChild(element)
              } else {
                let copyElement = element
                parentElement.removeChild(element)
                parentElement.appendChild(copyElement)
              }
            }
            if (copyFooter) {
              parentElement.appendChild(copyFooter)
            }
          }
        }
      })

      //   console.log(data)
      updateMainElements(data, defaultAttributes)
      const app_setting = {
        ...{
          layout: data.data?.unit?.unit_app_attributes?.layout ?? {}
        },
        ...(data?.data?.app?.setting ?? {})
      }

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
      if (app_setting?.layout?.primaryColor) {
        // setTimeout(() => {
        replaceColorCode("#004899", app_setting?.layout?.primaryColor)
        // }, 1000)
      }
    })
    .then((response) => {
      setTimeout(() => {
        hideLoader()
      }, 500)
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
}

function updateMainElements(storeDomainClaims, defaultAttributes) {
  const domainClaims = storeDomainClaims?.data
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

function replaceColorCode(oldColor, newColor) {
  const newStyles = `
  a, h1 > a:hover, h2 > a:hover, h3 > a:hover, h4 > a:hover, h5 > a:hover, h6 > a:hover, .custom-btn, .play-btn:hover > i, .button-store .custom-btn:hover i, .button-store .custom-btn:hover p, .button-store .custom-btn:hover p span, .feature-box .box-icon .icon, .feature-box:hover .box-text > h4, .service-single:hover .icon, .service-single.service-style-2 .icon, .service-single.service-style-2:hover .icon, .service-single.service-style-2:hover h5, .overview-box:hover .icon, .overview-list .fa-li, .pricing-item .pricing-head .price, .pricing-item .pricing-head .price .dollar-sign, .fixed-menu .nav-menu li a.active, .nav-menu li.dropdown .submenu li a.active-submenu, .op-mobile-menu .nav-menu li a:hover, .page-header .page-header-content .breadcrumb li a:hover, .testimonial-carousel .carousel-text .single-box i, #accordion .accordion-header a:not(.collapsed), #accordion .accordion-header a:hover, .blog-home .blog-col:hover .blog-text h4 > a, .price-table .icon, .price-table:hover .plan-type, .contact-info .icon, .contact-form-result > h4, footer a:hover, .footer-social a:hover > i, .blog-post .image-slider .arrows .arrow:hover, .post-counters li > a:hover, .share-btn:hover > p, .share-btn li:hover > a, .nav-links a:hover, .sidebar .search-form button:hover, .sidebar .search-form button:focus, .sidebar ul.menu li a:hover, .sidebar ul.menu li a:focus, .sidebar ul.links li a:hover, .sidebar ul.links li a:focus, .author-social a:hover, .icon.colored i {
      color: ${newColor};
    }
  `

  const head = document.head || document.getElementsByTagName("head")[0]
  const newStyleElement = document.createElement("style")
  newStyleElement.type = "text/css"
  newStyleElement.appendChild(document.createTextNode(newStyles))
  head.appendChild(newStyleElement)

  // const styleElement = document.getElementById("saba_css_color")

  // if (styleElement && styleElement.sheet) {
  //   const styleSheet = styleElement.sheet
  //   const rules = styleSheet.rules || styleSheet.cssRules

  //   for (let i = 0; i < rules.length; i++) {
  //     const rule = rules[i]

  //     if (rule.style) {
  //       console.log(rule.style)
  //       rule.style.cssText = rule.style.cssText.replace(
  //         new RegExp(oldColor, "g"),
  //         newColor
  //       )

  //       rule.style.backgroundColor = rule.style.backgroundColor.replace(
  //         new RegExp(oldColor, "g"),
  //         newColor
  //       )
  //     }
  //   }
  // }
}

const renderHtml = (type, theme, data, attr) => {
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
    return renderHtml_features(theme, data, attr?.mainImage)
  } else if (type === "services") {
    return renderHtml_services(theme, data, attr?.mainImage)
  } else if (type === "overview") {
    return renderHtml_overview(theme, data, attr?.mainImage)
  }
}

const renderHtml_overview_data = (theme, data, style_type) => {
  let result = ``
  if (theme === "naxos") {
    if (style_type === 2) {
      result += `<!-- Items -->
            <div class="overview-item">`
      data.forEach((item, index) => {
        result += `
                <!-- Item ${index} -->
                <div class="overview-box d-flex flex-wrap">
                    <!-- Icon -->
                    <div class="icon ${item?.icon ?? ""}"></div>
        
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
  }
  return result
}

const renderHtml_overview_btn = (buttons) => {
  let result = ""
  buttons.forEach((btn, indexBtn) => {
    result += `<!-- Button -->
                <p class="text-center text-lg-start">
                    <a ${
                      btn?.link?.includes("#") ? "" : ' target="blank_"'
                    } href="${btn?.link ?? "#"}" class="btn"> ${
      btn?.icon ? `<i class="icon ${btn.icon}"></i>` : ""
    } ${btn?.title}</a>
                </p>
                  `
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
  }
  let separator = '<div class="empty-100"></div>'
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
  }
  return result
}

const renderHtml_banner_btn = (buttons) => {
  let result = ""
  buttons.forEach((btn, indexBtn) => {
    result += `<a
                   ${btn?.link?.includes("#") ? "" : ' target="blank_"'}
                    href="${btn?.link ?? "#"}"
                    class="custom-btn d-inline-flex align-items-center m-2 m-sm-0 me-sm-3"
                    >
                    ${btn?.icon ? `<i class="${btn.icon}"></i>` : ""}
                    <p>${btn?.subtitle}<span>${btn?.title}</span></p>
                </a>`
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
                                    ? renderHtml_banner_btn(item.buttons)
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
                            <img
                                class="bounce-effect"
                                src="${item?.image ?? bannerDataDefault?.image}"
                              
                            />
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
    }
  })
  return result
}

const renderHtml_features = (theme, data, mainImage) => {
  let result = ``
  let column1 = []
  let column2 = []
  if (theme === "naxos") {
    data.forEach((item, index) => {
      let featureBoxEl = `
                        <li>
                            <div class="feature-box d-flex">

                            <div style="text-align: center;" class="box-icon">
                                <div class="icon ${item?.icon ?? ""}"></div>
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
                          `${currentDomain}/website/${defaultTheme}/` +
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
                      `${currentDomain}/website/${defaultTheme}/images/clients/company-${
                        index + 1
                      }.png`
                    }" alt="${item?.title ?? `Company ${index + 1}`}"
                    /></a>
                </div>`
    })
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
                              `${currentDomain}/website/${defaultTheme}/images/testimonials/client-${
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
                                  `${currentDomain}/website/${defaultTheme}/images/team/member-${
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
                          `${currentDomain}/website/${defaultTheme}/screenshots/screenshot-${
                            index + 1
                          }.jpg`
                        }" alt="${item?.title ?? `Screenshoot ${index + 1}`}" />
                    </a>
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
