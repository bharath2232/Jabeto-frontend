const navigation = () => {
  return [
    {
      title: "Home",
      path: "/home",
      icon: "mdi:home-outline",
    },
    {
      title: "Properties",
      path: "/properties",
      icon: "material-symbols:apartment-rounded",
    },
    {
      path: "/acl",
      action: "read",
      subject: "acl-page",
      title: "Access Control",
      icon: "mdi:shield-outline",
    },
  ];
};

export default navigation;
