import React, { useState, useEffect } from "react";
import { searchItems, addItem, updateItem, deleteItem } from "./estoque";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Alert,
  Snackbar,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Tooltip } from '@mui/material';

const EstoqueRoupas = () => {
  const theme = useTheme();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    categoria: "",
    tamanho: "",
    cor: "",
    quantidade: "",
    preco: "",
    fornecedor: "",
    descricao: "",
  });
  const [refresh, setRefresh] = useState(false);


useEffect(() => {
  loadItems();
}, [refresh]);

const loadItems = async () => {
  try {
    const data = await searchItems();
     console.log(" Estoque API.JSON:", data); //

    // 🔥 Garante que todos os itens tenham nome e fornecedor
    const sanitizedData = data.map(item => ({
      ...item,
      nome: item?.nome || 'Sem nome',
      fornecedor: item?.fornecedor || 'Sem fornecedor',
      categoria: item?.categoria || 'Sem categoria',
      status: item?.status || 'ativo',
    }));
    
    setItems(sanitizedData);
  } catch (error) {
    console.error("Erro ao carregar itens:", error);
    setSnackbar({ open: true,
        message: "Erro ao carregar itens",
        severity: "error"
      });
    }
  };

  const categories = ["todos", ...new Set(items.map(item => item.categoria))];
  const statusOptions = ["todos", "ativo", "baixo", "critico"];

  // Filtrar itens
 const filteredItems = items.filter(item => {
  // Se o item for undefined/null, já descarta
  if (!item) return false;
  
  // Garante que nome e fornecedor sejam strings
  const nome = (item.nome || '').toLowerCase();
  const fornecedor = (item.fornecedor || '').toLowerCase();
  const search = (searchTerm || '').toLowerCase();
  
  const matchesSearch = nome.includes(search) || fornecedor.includes(search);
  const matchesCategory = filterCategory === "todos" || (item.categoria || '') === filterCategory;
  const matchesStatus = filterStatus === "todos" || (item.status || '') === filterStatus;
  
  return matchesSearch && matchesCategory && matchesStatus;
});

  // Estatísticas
  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);
  const totalValue = items.reduce((sum, item) => sum + (item.quantidade * item.preco), 0);
  const lowStockItems = items.filter(item => item.quantidade < 15).length;
  const categoriesCount = new Set(items.map(item => item.categoria)).size;

  // Funções CRUD
  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      nome: "",
      categoria: "",
      tamanho: "",
      cor: "",
      quantidade: "",
      preco: "",
      fornecedor: "",
      descricao: "",
    });
    setOpenModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      nome: item.nome,
      categoria: item.categoria,
      tamanho: item.tamanho,
      cor: item.cor,
      quantidade: item.quantidade.toString(),
      preco: item.preco.toString(),
      fornecedor: item.fornecedor,
      descricao: item.descricao || "",
    });
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(items.filter(item => item.id !== itemToDelete.id));
      setSnackbar({
        open: true,
        message: `${itemToDelete.nome} foi removido do estoque.`,
        severity: "success"
      });
      setItemToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleSubmit = async () => {
  
  // Validação de input
  if (!formData.nome || !formData.categoria) {
    setSnackbar({
      open: true,
      message: "Preencha todos os campos obrigatórios!",
      severity: "error"
    });
    return;
  }

  const payload = {
    nome: formData.nome?.trim() || '',
    categoria: formData.categoria?.trim() || '',
    tamanho: formData.tamanho?.trim() || '',
    cor: formData.cor?.trim() || '',
    quantidade: parseInt(formData.quantidade) || 0,
    preco: parseFloat(formData.preco) || 0,
    fornecedor: formData.fornecedor?.trim() || '',
    descricao: formData.descricao?.trim() || '',
  };

  console.log("Payload final:", payload);

  try {
    if (editingItem) {
      const updatedItem = await updateItem(editingItem.id, payload);
      console.log("updateItem sucessfull:", updatedItem);
      
      setItems(items.map(item => 
        item.id === editingItem.id ? updatedItem : item
      ));
      
      setSnackbar({
        open: true,
        message: `${formData.nome} foi atualizado com sucesso.`,
        severity: "success"
      });
      setEditingItem(null);
      setRefresh(prev => !prev);
    } else {
      const newItem = await addItem(payload);
      console.log("✅ Novo item criado:", newItem);
      
      setItems([...items, newItem]);
      
      setSnackbar({
        open: true,
        message: `${formData.nome} foi adicionado ao estoque.`,
        severity: "success"
      });
    }
    setRefresh(prev => !prev);
    setOpenModal(false);
    resetForm();
  } catch (error) {
    console.error("❌ Erro detalhado:", error);
    setSnackbar({
      open: true,
      message: `Erro ao salvar: ${error.message}`,
      severity: "error"
    });
  }
};

  const resetForm = () => {
      setFormData({
        id: "",
        nome: "",
        categoria: "",
        tamanho: "",
        cor: "",
        quantidade: "",
        preco: "",
        fornecedor: "",
        descricao: "",
    });
  };
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
        setSnackbar({
          open: true,
          message: "Item excluído com sucesso.",
          severity: "success"
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Erro ao excluir: ${error.message}`,
          severity: "error"
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    const colors = {
      ativo: "success",
      baixo: "warning",
      critico: "error"
    };
    return colors[status] || "default";
  };

  // Função para obter o texto do status
  const getStatusText = (status) => {
    const texts = {
      ativo: "Em estoque",
      baixo: "Estoque baixo",
      critico: "Crítico"
    };
    return texts[status] || status;
  };

  return (
      <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Gestão de Estoque
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Controle completo de roupas em estoque
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingItem(null);
              resetForm();
              setOpenModal(true);
            }}
            size="large"
          >
            Cadastrar Novo Item 
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total de Itens
                </Typography>
                <Typography variant="h4">{totalItems}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Peças em estoque
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Valor Total
                </Typography>
                <Typography variant="h4" color="success.main">
                  R$ {totalValue ? totalValue.toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Valor do estoque
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Estoque Baixo
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {lowStockItems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Itens com &lt; 15 unidades
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Categorias
                </Typography>
                <Typography variant="h4">{categoriesCount}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Tipos de roupas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Buscar"
                  placeholder="Buscar por nome ou fornecedor..."
                  value={searchTerm}
                  onChange={(e)=>{
                    const value = e.target.value;
                    setSearchTerm(value); 
                   searchItems();
                  }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    label="Categoria"
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat} value={cat}>
                        {cat === "todos" ? "Todas categorias" : cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Status"
                  >
                    {statusOptions.map(status => (
                      <MenuItem key={status} value={status}>
                        {status === "todos" ? "Todos status" : getStatusText(status)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("todos");
                    setFilterStatus("todos");
                  }}
                >
                  Limpar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>


        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>Produto</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Tamanho</TableCell>
                <TableCell>Cor</TableCell>
                <TableCell align="right">Qtd.</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      Nenhum item encontrado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tente ajustar os filtros ou adicionar um novo item
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: `${getStatusColor(item.status)}.main`
                          }}
                        />
                        <Typography fontWeight="medium">{item.nome}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.categoria} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{item.tamanho}</TableCell>
                    <TableCell>{item.cor}</TableCell>
                    <TableCell align="right">{item.quantidade}</TableCell>
                    <TableCell align="right">
                      <Typography color="success.main" fontWeight="semibold">
                         R$ {item.preco ? item.preco.toFixed(2) : '0.00'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(item.status)} 
                        size="small" 
                        color={getStatusColor(item.status)} 
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title = "Editar item" arrow slotProps={{
                          tooltip:{sx: {backgroundColor: '#ffffff',color: '#000000',fontFamily: 'Verdana, Arial, Helvetica, sans-serif',fontSize: '0.8rem',}}
                        }}
                          >
                            <IconButton
                               size="small"
                                  color="primary"
                                    onClick={() => handleEditItem(item)}
                              >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title = "Excluir item" arrow slotProps={{
                          tooltip:{sx: {backgroundColor: '#ffffff',color: '#000000',fontFamily: 'Verdana, Arial, Helvetica, sans-serif',fontSize: '0.8rem',}}
                        }}
                          >
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteItem(item)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>


        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingItem ? "Editar Item" : "Cadastrar Novo Item"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Nome do Produto"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Ex: Camisa Polo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    label="Categoria"
                  >
                    <MenuItem value="Camisas">Camisas</MenuItem>
                    <MenuItem value="Calças">Calças</MenuItem>
                    <MenuItem value="Vestidos">Vestidos</MenuItem>
                    <MenuItem value="Jaquetas">Jaquetas</MenuItem>
                    <MenuItem value="Calçados">Calçados</MenuItem>
                    <MenuItem value="Acessórios">Acessórios</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Tamanho</InputLabel>
                  <Select
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleInputChange}
                    label="Tamanho"
                  >
                    <MenuItem value="PP">PP</MenuItem>
                    <MenuItem value="P">P</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="G">G</MenuItem>
                    <MenuItem value="GG">GG</MenuItem>
                    <MenuItem value="34">34</MenuItem>
                    <MenuItem value="36">36</MenuItem>
                    <MenuItem value="38">38</MenuItem>
                    <MenuItem value="40">40</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Cor"
                  name="cor"
                  value={formData.cor}
                  onChange={handleInputChange}
                  placeholder="Ex: Azul"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Quantidade"
                  name="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  placeholder="0"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Preço (R$)"
                  name="preco"
                  type="number"
                  value={formData.preco}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Fornecedor"
                  name="fornecedor"
                  value={formData.fornecedor}
                  onChange={handleInputChange}
                  placeholder="Nome do fornecedor"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descrição (opcional)"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Breve descrição"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editingItem ? "Atualizar" : "Cadastrar Item"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Excluir Item</DialogTitle>
          <DialogContent>
            {itemToDelete && (
              <Typography align="center" color="text.secondary">
                Tem certeza que deseja excluir <strong>{itemToDelete.nome}</strong>?<br /><br />
                Esta ação <strong></strong>não poderá ser desfeita.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogActions>
        </Dialog>


        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box> 
  );
};

export default EstoqueRoupas;