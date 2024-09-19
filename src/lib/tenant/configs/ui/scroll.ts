import { TenantUI } from "@/lib/tenant/tenantUI";
import scrollHero from "@/assets/tenant/scroll_hero.svg";
import scrollLogo from "@/assets/tenant/scroll_logo.svg";
import delegateImage from "@/assets/tenant/scroll_delegate.svg";
import successImage from "@/assets/tenant/scroll_success.svg";
import pendingImage from "@/assets/tenant/scroll_pending.svg";
import failedImage from "@/assets/tenant/scroll_failed.svg";
import infoPageCard02 from "@/assets/tenant/scroll_info_2.png";
import infoPageCard03 from "@/assets/tenant/scroll_info_3.png";
import infoPageCard04 from "@/assets/tenant/scroll_info_4.png";
import infoPageHero from "@/assets/tenant/scroll_hero.jpg";
import appleTouchIcon from "@/assets/tenant/scroll_favicon/apple-touch-icon.png";
import favicon32x32 from "@/assets/tenant/scroll_favicon/favicon-32x32.png";
import favicon16x16 from "@/assets/tenant/scroll_favicon/favicon-16x16.png";
import shortcutIcon from "@/assets/tenant/scroll_favicon/favicon.ico";

export const scrollTenantUIConfig = new TenantUI({
  title: "Scroll governance",
  logo: scrollLogo,

  googleAnalytics: "G-SV1E7HY7YZ",

  assets: {
    success: successImage,
    pending: pendingImage,
    failed: failedImage,
    delegate: delegateImage,
  },

  organization: {
    title: "Scroll DAO",
  },

  delegates: {
    allowed: [],
    advanced: [],
    retired: [],
  },

  customization: {
    primary: "16 16 16",
    secondary: "91 91 91",
    tertiary: "164 164 164",
    neutral: "255 255 255",
    wash: "255 255 255",
    line: "220 220 220",
    positive: "15 142 126",
    negative: "255 104 75",
    brandPrimary: "255 104 75",
    brandSecondary: "255 248 243",
  },

  favicon: {
    "apple-touch-icon": appleTouchIcon.src,
    icon32x32: favicon32x32.src,
    icon16x16: favicon16x16.src,
    "shortcut-icon": shortcutIcon.src,
  },

  links: [
    {
      name: "agora",
      title: "Powered by Agora",
      url: "https://agora.xyz",
    },
  ],

  governanceIssues: [
    {
      icon: "hammerEmoji",
      title: "Builders",
      key: "builders",
    },
    {
      icon: "peopleEmoji",
      title: "Community",
      key: "community",
    },
    {
      icon: "worldEmoji",
      title: "Decentralization",
      key: "decentralization",
    },
    {
      icon: "sproutEmoji",
      title: "Sustainability",
      key: "sustainability",
    },
    {
      icon: "lockEmoji",
      title: "Privacy",
      key: "privacy",
    },
    {
      icon: "scaleEmoji",
      title: "Governance",
      key: "governance",
    },
    {
      icon: "testTubeEmoji",
      title: "Experimentation",
      key: "experimentation",
    },
    {
      icon: "shieldEmoji",
      title: "Security",
      key: "security",
    },
  ],

  hideAgoraBranding: true,

  pages: [
    {
      route: "/",
      title: "Welcome to scroll governance",
      description:
        "Delegates represent the Scroll ecosystem, guiding governance decisions on behalf of SCR token holders to ensure the platform evolves in line with community priorities.",
      hero: scrollHero,
      meta: {
        title: "Welcome to Scroll governance",
        description: "Home of token governance",
        imageTitle: "Welcome to Scroll governance",
        imageDescription: "Home of token governance",
      },
    },
    {
      route: "proposals",
      title: "Welcome to Scroll governance",
      description:
        "Scroll delegates are the stewards of Scroll DAO. They are volunteers and members of the Scroll community who have been elected to represent other token holders and make governance decisions on their behalf.",
      hero: scrollHero,
      meta: {
        title: "Voter on Agora",
        description: "Delegate your voting power to a trusted representative",
        imageTitle: "IN IMAGE",
        imageDescription: "IN IMAGE DESCRIPTION",
      },
    },
    {
      route: "delegates",
      title: "Agora is home to Scroll delegates",
      description:
        "Scroll delegates are the stewards of Scroll DAO. They are volunteers and members of the Scroll community who have been elected to represent other token holders and make governance decisions on their behalf.",
      hero: scrollHero,
      meta: {
        title: "Voter on Agora",
        description: "Delegate your voting power to a trusted representative",
        imageTitle: "Voter on Agora",
        imageDescription:
          "Delegate your voting power to a trusted representative",
      },
    },
    {
      route: "info/about",
      title: "About Scroll",
      hero: infoPageHero,
      description:
        "Scroll is the leading zero-knowledge rollup. As the homepage of the multichain world, Scroll leverages fast finality and interoperability to create a more accessible, scalable, and secure ecosystem for everyone. Our mission is to provide an easy-to-use, developer-friendly environment that embraces the inevitable multichain future. Scroll empowers builders to ascend beyond today’s limitations with a scalable, secure platform to serve billions of users and drive real-world impact.",
      meta: {
        title: "Info of Agora",
        description: "Welcome to the Scroll DAO",
        imageTitle: "",
        imageDescription: "",
      },
    },
    {
      route: "info",
      title: "Welcome to Scroll Governance",
      description:
        "Delegates represent the Scroll ecosystem, guiding governance decisions on behalf of SCR token holders to ensure the platform evolves in line with community priorities.",
      meta: {
        title: "Scroll Agora",
        description: "Home of Scroll governance",
        imageTitle: "Scroll Agora",
        imageDescription: "Home of Scroll governance",
      },
      links: [
        {
          name: "Governance Forums",
          title: "Governance Forums",
          url: "https://gov.scroll.io/forum",
          image: infoPageCard02,
        },
        {
          name: "Governance Docs",
          title: "Governance Docs",
          url: "https://gov.scroll.io/docs",
          image: infoPageCard03,
        },
        {
          name: "Protocol Vision",
          title: "Protocol Vision",
          url: "",
          image: infoPageCard04,
        },
      ],
    },
  ],

  toggles: [
    {
      name: "delegates",
      enabled: true,
    },
    {
      name: "delegates/endorsed-filter",
      enabled: false,
    },
    {
      name: "delegates/edit",
      enabled: true,
    },
    {
      name: "delegates/delegate",
      enabled: true,
    },
    {
      name: "delegates/code-of-conduct",
      enabled: false,
    },
    {
      name: "info",
      enabled: true,
    },
  ],
});
