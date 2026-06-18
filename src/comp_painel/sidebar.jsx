import React, { useEffect, useState } from "react";
import {
  Box,
  Link,
  Typography,
  Avatar,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  ShoppingBag,
  LocalShipping,
  People,
  AppRegistration,
  Checkroom,
  Category,
  BrandingWatermark,
  WorkspacePremium, 
  Inventory,
  AddShoppingCart,
  RemoveShoppingCart,
  Assessment,
  Tune,
  AttachMoney,
  Today,
  BarChart,
  Payments,
  AccountBalance,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [username, setUsername] = useState("Usuário");
  const [userCargo, setUserCargo] = useState("Colaborador");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = 240;
  const collapsedWidth = 70;

  useEffect(() => {
    const loadUserData = () => {
      const usuarioLogadoStr = localStorage.getItem("usuarioLogado");
      if (usuarioLogadoStr) {
        try {
          const usuarioLogado = JSON.parse(usuarioLogadoStr);
          setUsername(usuarioLogado.nome || "Usuário");
          setUserCargo(usuarioLogado.cargo || "Colaborador");
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        }
      }
    };

    loadUserData();

    const interval = setInterval(() => {
      const usuarioLogadoStr = localStorage.getItem("usuarioLogado");
      if (usuarioLogadoStr) {
        try {
          const usuarioLogado = JSON.parse(usuarioLogadoStr);
          if (usuarioLogado.nome !== username || usuarioLogado.cargo !== userCargo) {
            setUsername(usuarioLogado.nome || "Usuário");
            setUserCargo(usuarioLogado.cargo || "Colaborador");
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [username, userCargo]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "/";
    handleMenuClose();
  };

  const navItems = [
    { label: "Vendas", href: "/", icon: <ShoppingBag /> },
    { label: "Fornecedores", href: "/fornecedores", icon: <LocalShipping /> },
    { label: "Clientes", href: "/clientes", icon: <People /> },
    {
      label: "Cadastros",
      icon: <AppRegistration />,
      children: [
        { label: "Produtos", href: "/produtos", icon: <Checkroom /> },
        { label: "Categorias", href: "/categorias", icon: <Category /> },
        { label: "Marcas", href: "/marcas", icon: <BrandingWatermark /> },
        { label: "Funcionários", href: "/funcionarios", icon: <Badge /> },
      ],
    },
    {
      label: "Estoque",
      icon: <Inventory />,
      children: [
        { label: "Entrada de Mercadoria", href: "/entrada", icon: <AddShoppingCart /> },
        { label: "Saída de Mercadoria", href: "/saida", icon: <RemoveShoppingCart /> },
        { label: "Contagem de Estoque", href: "/contagem", icon: <Assessment /> },
        { label: "Ajuste de Estoque", href: "/ajuste", icon: <Tune /> },
      ],
    },
    {
      label: "Financeiro",
      icon: <AttachMoney />,
      children: [
        { label: "Vendas do Dia", href: "/vendas-dia", icon: <Today /> },
        { label: "Relatório de Vendas", href: "/relatorio-vendas", icon: <BarChart /> },
        { label: "Comissões", href: "/comissoes", icon: <Payments /> },
        { label: "Fluxo de Caixa", href: "/fluxo-caixa", icon: <AccountBalance /> },
      ],
    },
  ];

  const SidebarContent = ({ isMobileDrawer = false }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: theme.palette.mode === "dark" ? "#4c4c4c" : "#4c4c4c",
        color: theme.palette.mode === "dark" ? "#CBD5E1" : "#E2E8F0",
      }}
    >
      {!isMobileDrawer && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            pb: 1,
          }}
        >
          <IconButton
            onClick={toggleCollapse}
            size="small"
            sx={{
              color: theme.palette.mode === "dark" ? "#CBD5E1" : "#E2E8F0",
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "#1E293B" : "#334155",
              },
            }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
      )}

      <List sx={{ flexGrow: 1, p: 1 }}>
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openSubmenus[item.label];
          const isActive = item.href ? isActiveLink(item.href) : false;

          return (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (hasChildren) {
                      toggleSubmenu(item.label);
                    } else if (item.href) {
                      navigate(item.href);
                      if (isMobile) {
                        setMobileOpen(false);
                      }
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: isActive
                      ? theme.palette.mode === "dark" ? "white" : "white"
                      : "transparent",
                    "&:hover": {
                      bgcolor: isActive
                        ? theme.palette.mode === "dark" ? "white" : "white"
                        : theme.palette.mode === "dark" ? "white" : "white",
                        color: isActive
                        ? theme.palette.mode === "dark" ? "white" : "white"
                        : theme.palette.mode === "dark" ? "black" : "black",
                    },
                    justifyContent: collapsed && !isMobileDrawer ? "center" : "flex-start",
                    minHeight: 48,
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed && !isMobileDrawer ? 0 : 2,
                      color: isActive
                        ? "white"
                        : theme.palette.mode === "dark" ? "#60A5FA" : "#3B82F6",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  
                  {(!collapsed || isMobileDrawer) && (
                    <>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: isActive ? "medium" : "normal",
                          color: isActive ? "white" : "inherit",
                        }}
                      />
                      {hasChildren && (
                        <Box sx={{ ml: 1 }}>
                          {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                      )}
                    </>
                  )}
                </ListItemButton>
              </ListItem>

              {hasChildren && (isOpen || isMobileDrawer) && (
                <Collapse in={isOpen || isMobileDrawer} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => {
                      const isChildActive = isActiveLink(child.href);
                      return (
                        <ListItem key={child.label} disablePadding>
                          <ListItemButton
                            onClick={() => {
                              navigate(child.href);
                              if (isMobile) {
                                setMobileOpen(false);
                              }
                            }}
                            sx={{
                              borderRadius: 2,
                              mb: 0.5,
                              pl: collapsed && !isMobileDrawer ? 2 : 4,
                              bgcolor: isChildActive
                                ? theme.palette.mode === "dark" ? "#2563EB" : "#3B82F6"
                                : "transparent",
                              "&:hover": {
                                bgcolor: isChildActive
                                  ? theme.palette.mode === "dark" ? "#2563EB" : "#3B82F6"
                                  : theme.palette.mode === "dark" ? "#1E293B" : "#334155",
                              },
                              justifyContent: "flex-start",
                              minHeight: 40,
                              py: 1,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 2,
                                color: isChildActive
                                  ? "white"
                                  : theme.palette.mode === "dark" ? "#60A5FA" : "#3B82F6",
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            {(!collapsed || isMobileDrawer) && (
                              <ListItemText
                                primary={child.label}
                                primaryTypographyProps={{
                                  fontSize: "0.875rem",
                                  fontWeight: isChildActive ? "medium" : "normal",
                                  color: isChildActive ? "white" : "inherit",
                                }}
                              />
                            )}
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      {!collapsed && !isMobileDrawer && (
        <Box sx={{ p: 2, mt: "auto" }}>
          <Divider sx={{ borderColor: theme.palette.mode === "dark" ? "#4e4e4e" : "#4e4e4e", mb: 2 }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "gray.500", display: "block" }}>
              Strix_Solutions
            </Typography>
            <Typography variant="caption" sx={{ color: "gray.500" }}>
              © {new Date().getFullYear()} v2.1.0
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: theme.palette.mode === "dark" ? "#4c4c4c" : "#4c4c4c",
          borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#4c4c4c" : "#4c4c4c"}`,
          height: "70px",
        }}
      >
        <Toolbar sx={{ height: "100%", justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Stack direction="row" alignItems="center" spacing={2}>
              
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.56)",
                  display: { xs: "none", lg: "block" },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", lg: "block" },
                  background: "white",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Sistema Ecommerce
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: "medium", color: "white" }}>
                {username || "Carregando..."}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                {userCargo || "Usuário"}
              </Typography>
            </Box>
            
            <IconButton
              onClick={handleMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.mode === "dark" ? "#60A5FA" : "#3B82F6",
                  border: `2px solid ${theme.palette.mode === "dark" ? "#1E293B" : "#334155"}`,
                }}
              >
                {username ? username.charAt(0).toUpperCase() : "U"}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: theme.palette.mode === "dark" ? "#0F172A" : "#1E293B",
                  color: theme.palette.mode === "dark" ? "#CBD5E1" : "#E2E8F0",
                  minWidth: "200px",
                  mt: 1,
                  border: `1px solid ${theme.palette.mode === "dark" ? "#1E293B" : "#334155"}`,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1, borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#1E293B" : "#334155"}` }}>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {username}
                </Typography>
                <Typography variant="caption" sx={{ color: "gray.400" }}>
                  {userCargo}
                </Typography>
              </Box>
              <MenuItem
                onClick={() => {
                  navigate("/perfil");
                  handleMenuClose();
                }}
                sx={{
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#1E293B" : "#334155",
                  },
                }}
              >
                Meu Perfil
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#1E293B" : "#334155",
                  },
                }}
              >
                Sair
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
            top: "70px",
            height: "calc(100vh - 70px)",
          },
        }}
      >
        <SidebarContent isMobileDrawer={true} />
      </Drawer>
      
      {/* DRAWER DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            border: "none",
            borderRight: `1px solid ${theme.palette.mode === "dark" ? "#1E293B" : "#334155"}`,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            overflowY: "auto",
            top: "70px",
            height: "calc(100vh - 70px)",
            position: "fixed",
            left: 0,
          },
        }}
        open
      >
        <SidebarContent isMobileDrawer={false} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: "calc(70px + 24px)",
          paddingLeft: { 
            xs: 3, 
            md: collapsed ? `${collapsedWidth + -50}px` : `${drawerWidth + -200}px`
          },
          width: "100%",
          minHeight: "100vh",
          boxSizing: "border-box",
          transition: theme.transitions.create("padding-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;