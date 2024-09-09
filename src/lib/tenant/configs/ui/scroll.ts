import { TenantUI } from "@/lib/tenant/tenantUI";
import scrollHero from "@/assets/tenant/scroll_hero.svg";
import scrollLogo from "@/assets/tenant/scroll_logo.svg";
import delegateImage from "@/assets/tenant/scroll_delegate.svg";
import successImage from "@/assets/tenant/scroll_success.svg";
import pendingImage from "@/assets/tenant/scroll_pending.svg";
import failedImage from "@/assets/tenant/scroll_failed.svg";
import infoPageCard01 from "@/assets/tenant/scroll_info_1.png";
import infoPageCard02 from "@/assets/tenant/scroll_info_2.png";
import infoPageCard03 from "@/assets/tenant/scroll_info_3.png";
import infoPageCard04 from "@/assets/tenant/scroll_info_4.png";
import infoPageHero from "@/assets/tenant/scroll_info_hero.png";

export const scrollTenantUIConfig = new TenantUI({
  title: "Scroll Agora",
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
    primary: "25 6 2",
    secondary: "117 106 103",
    tertiary: "209 205 204",
    neutral: "255 255 255",
    wash: "250 242 232",
    line: "241 217 185",
    positive: "0 153 43",
    negative: "197 47 0",
    brandPrimary: "255 105 74",
    brandSecondary: "255 248 243",
    font: "TransSansPremium",
  },

  governanceIssues: [
    {
      icon: "wrenchScrewdriverIcon",
      title: "Builders",
      key: "builders",
    },
    {
      icon: "community",
      title: "Community",
      key: "community",
    },
    {
      icon: "globeAlt",
      title: "Decentralization",
      key: "decentralization",
    },
    {
      icon: "presentationChartLine",
      title: "Ecosystem Growth",
      key: "ecosystemGrowth",
    },
    {
      icon: "scale",
      title: "Governance",
      key: "governance",
    },
    {
      icon: "codeBracketSquare",
      title: "Protocol",
      key: "protocol",
    },
    {
      icon: "beaker",
      title: "Research & Development",
      key: "researchDevelopment",
    },
    {
      icon: "shieldCheck",
      title: "Security",
      key: "security",
    },
  ],

  pages: [
    {
      route: "/",
      title: "Welcome to the home of Scroll voters",
      description:
        "Scroll delegates are the stewards of Scroll DAO. They are volunteers and members of the Scroll community who have been elected to represent other token holders and make governance decisions on their behalf.",
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
        "Scroll is a Layer 2 blockchain designed for social applications. Scroll facilitates the creation of more engaging and meaningful web3 experiences by enabling onchain dapps to integrate social features. The Scroll ecosystem, its technology, and associated protocols are governed by Scroll DAO, which is composed of SCROLL token stakers and delegates.",
      meta: {
        title: "Info of Agora",
        description: "Welcome to the Scroll DAO",
        imageTitle: "",
        imageDescription: "",
      },
    },
    {
      route: "info",
      title: "Welcome to the Community",
      description:
        "Agora is the home of Scroll DAO  governance, where Scroll stakers delegate, vote, and make decisions to steward the future of the Scroll ecosystem.",
      meta: {
        title: "Scroll Agora",
        description: "Home of Scroll governance",
        imageTitle: "Scroll Agora",
        imageDescription: "Home of Scroll governance",
      },
      links: [
        {
          name: "Community Discord",
          title: "Community Discord",
          url: "https://discord.com/invite/buildoncyber",
          image: infoPageCard01,
        },
        {
          name: "Governance Forums",
          title: "Governance Forums",
          url: "https://forum.cyber.co",
          image: infoPageCard02,
        },
        {
          name: "Protocol Docs",
          title: "Protocol Docs",
          url: "https://docs.cyber.co/build-on-cyber/contract-deployment",
          image: infoPageCard03,
        },
        {
          name: "Protocol Vision",
          title: "Protocol Vision",
          url: "https://docs.cyber.co",
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
      enabled: false,
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
