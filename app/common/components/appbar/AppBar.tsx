"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Stack, Tooltip } from "@mui/material";
import { signOut } from "next-auth/react";
import { useNavigate } from "../../hooks/useNavigate";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { data: session } = useSession();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, m: 0 }}>
      <AppBar position="sticky" sx={{ color: "white", bgcolor: "black" }}>
        <Toolbar>
          <Stack>
            <Typography
              onClick={() => navigate("/dashboard")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              Policia del chubut
            </Typography>
          </Stack>
          {auth && (
            <Stack direction="row" flex={1} justifyContent="flex-end">
              <Stack
                flex={1}
                gap={3}
                direction="row"
                justifyContent="flex-end"
                mr={3}
                alignItems="center"
                display={["none", "none", "flex"]}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  href="/dashboard"
                >
                  Home
                </Link>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  href="/ingress"
                >
                  Ordenes de ingreso
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/egress"
                >
                  Ordenes de egreso
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/provider"
                >
                  Proveedores
                </Link>
              </Stack>
              <Tooltip title={session?.user.name}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
                <MenuItem onClick={() => signOut()}>Salir</MenuItem>
              </Menu>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
