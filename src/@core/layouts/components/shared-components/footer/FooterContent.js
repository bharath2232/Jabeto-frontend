// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "src/hooks/useAuth";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const auth = useAuth();
  console.log("auth.user", window.localStorage.getItem("accessToken"));
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component="span" sx={{ color: "error.main" }}>
          ❤️
        </Box>
        {` in Sartrouville `}
      </Typography>
      {hidden ? null : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            "& :not(:last-child)": { mr: 4 },
          }}
        >
          <LinkStyled
            target="_blank"
            href="https://themeforest.net/licenses/standard"
          >
            License
          </LinkStyled>
          <LinkStyled
            target="_blank"
            href="https://1.envato.market/pixinvent_portfolio"
          >
            More Themes
          </LinkStyled>
          <LinkStyled
            target="_blank"
            href="https://demos.pixinvent.com/materialize-nextjs-admin-template/documentation"
          >
            Documentation
          </LinkStyled>
          <LinkStyled target="_blank" href="https://pixinvent.ticksy.com/">
            Support
          </LinkStyled>
        </Box>
      )}
      token : {window.localStorage.getItem("accessToken")}
    </Box>
  );
};

export default FooterContent;
