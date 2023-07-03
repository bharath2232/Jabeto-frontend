const navigation = () => [
  {
    title: "Home",
    path: "/home",
    icon: "mdi:home-outline",
  },
  {
    title: "Properties",
    path: "/Properties",
    icon: "mdi:email-outline",
  },
  {
    path: "/acl",
    action: "read",
    subject: "acl-page",
    title: "Access Control",
    icon: "mdi:shield-outline",
  },
];

export default navigation;
