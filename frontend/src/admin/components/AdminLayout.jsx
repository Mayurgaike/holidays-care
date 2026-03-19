// admin/components/AdminLayout.jsx
import { Box } from "@mui/material";

const AdminLayout = ({ children }) => {
  return <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>{children}</Box>;
};

export default AdminLayout;
