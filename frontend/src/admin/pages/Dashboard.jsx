import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { toursAPI, heroAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

import TourForm from "../components/TourForm";
import HeroForm from "../components/HeroForm";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  const [tab, setTab] = useState(0);
  const [tours, setTours] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [edit, setEdit] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    type: null, // "tour" | "hero"
  });

  const [snackbar, setSnackbar] = useState({ open: false, msg: "" });

  const fetchData = async () => {
    const t = await toursAPI.getAll();
    const h = await heroAPI.getAll();
    setTours(t.data);
    setHeroes(h.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  return (
    <Container>
      <Typography variant="h4" my={3}>
        Admin Dashboard
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Tours" />
        <Tab label="Hero" />
      </Tabs>

      {tab === 0 && (
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={() => {
              setEdit(null);
              setType("tour");
              setOpen(true);
            }}
          >
            Add Tour
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tours.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>{t.title}</TableCell>
                  <TableCell>{t.price}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setEdit(t);
                        setType("tour");
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() =>
                        setDeleteDialog({ open: true, id: t._id, type: "tour" })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {tab === 1 && (
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={() => {
              setEdit(null);
              setType("hero");
              setOpen(true);
            }}
          >
            Add Hero
          </Button>

          {heroes.map((h) => (
            <Paper key={h._id} sx={{ p: 2, my: 2 }}>
              <img
                src={`${import.meta.env.VITE_API_URL}${h.imageUrl}`}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />

              <Typography>{h.title}</Typography>

              <Box>
                <IconButton
                  onClick={() => {
                    setEdit(h);
                    setType("hero");
                    setOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    setDeleteDialog({ open: true, id: h._id, type: "hero" })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{type === "tour" ? "Tour" : "Hero"}</DialogTitle>
        <DialogContent>
          {type === "tour" && (
            <TourForm
              initialData={
                edit
                  ? {
                      ...edit,
                      highlights: (edit.highlights || []).join(","),
                      images: [],
                    }
                  : {
                      title: "",
                      description: "",
                      price: "",
                      duration: "",
                      category: "domestic",
                      destination: "",
                      highlights: [],
                      itinerary: [],
                      featured: false,
                      popular: false,
                      images: [],
                    }
              }
              onSubmit={async (form) => {
                const fd = new FormData();

                fd.append("title", form.title);
                fd.append("description", form.description);
                fd.append("price", form.price);
                fd.append("duration", form.duration);
                fd.append("category", form.category);
                fd.append("destination", form.destination);
                fd.append("featured", form.featured ?? false);
                fd.append("popular", form.popular ?? false);

                fd.append("highlights", JSON.stringify(form.highlights));
                fd.append("itinerary", JSON.stringify(form.itinerary));

                if (Array.isArray(form.images)) {
                  form.images.forEach((file) => {
                    if (file instanceof File) {
                      fd.append("images", file);
                    }
                  });
                }

                for (let pair of fd.entries()) {
                  console.log(pair[0], pair[1]);
                }

                if (edit) await toursAPI.update(edit._id, fd);
                else await toursAPI.create(fd);

                fetchData();
                setOpen(false);
                setEdit(null);
              }}
            />
          )}

          {type === "hero" && (
            <HeroForm
              initialData={
                edit ? edit : { title: "", subtitle: "", image: null }
              }
              onSubmit={async (form) => {
                const fd = new FormData();
                fd.append("title", form.title);
                fd.append("subtitle", form.subtitle);
                if (form.image) fd.append("image", form.image);

                if (edit) await heroAPI.update(edit._id, fd);
                else await heroAPI.create(fd);

                fetchData();
                setOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null, type: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {deleteDialog.type}?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog({ open: false, id: null, type: null })
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            onClick={async () => {
              if (deleteDialog.type === "tour") {
                await toursAPI.delete(deleteDialog.id);
              } else {
                await heroAPI.delete(deleteDialog.id);
              }

              fetchData();
              setDeleteDialog({ open: false, id: null, type: null });
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open}>
        <Alert>{snackbar.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
