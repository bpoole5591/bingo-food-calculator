import { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import Logo from "./assets/logo.png";

const inputStyles = {
  "& .MuiInputBase-root": {
    height: 36,
    fontSize: "0.875rem",
    boxSizing: "border-box",
  },
  "& .MuiInputBase-input": {
    padding: "8px 12px",
    boxSizing: "border-box",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
    transform: "translate(12px, 8px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -7px) scale(0.75)",
    },
  },
};

function App() {
  const menuItems = [
    // Food
    { name: "Ham Slider", price: 3, role: ["table", "server", "cocktailPlus"] },
    { name: "Nachos", price: 4, role: ["table", "server", "cocktailPlus"] },
    {
      name: "BBQ Sandwich",
      price: 4,
      role: ["table", "server", "cocktailPlus"],
    },
    { name: "Hot Dog", price: 3, role: ["table", "server", "cocktailPlus"] },

    // Snacks
    { name: "Candy Bar", price: 2, role: ["table", "server", "cocktailPlus"] },
    { name: "Chips", price: 1, role: ["table", "server", "cocktailPlus"] },
    { name: "Popcorn", price: 1, role: ["table", "server", "cocktailPlus"] },

    // Drinks
    { name: "Margarita", price: 5, role: ["cocktail", "cocktailPlus"] },
    {
      name: "Specialty Cocktail",
      price: 5,
      role: ["cocktail", "cocktailPlus"],
    },
    { name: "Beer", price: 3, role: ["cocktail", "cocktailPlus"] },
    { name: "Wine", price: 4, role: ["cocktail", "cocktailPlus"] },
    {
      name: "Soda / Water",
      price: 1,
      role: ["server", "cocktail", "cocktailPlus"],
    },
  ];

  const [quantities, setQuantities] = useState(
    menuItems.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {}),
  );

  const [selectedRole, setSelectedRole] = useState("cocktailPlus");

  // Helper to update quantity for a specific item
  const updateQuantity = (itemName, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemName]: Math.max(0, (prev[itemName] || 0) + change),
    }));
  };

  // Filter items based on selected role
  const visibleItems = menuItems.filter((item) =>
    item.role.includes(selectedRole),
  );

  // Calculate total
  const total = visibleItems.reduce((sum, item) => {
    return sum + item.price * (quantities[item.name] || 0);
  }, 0);

  // Reset all to zero
  const reset = () => {
    setQuantities(
      menuItems.reduce((acc, item) => {
        acc[item.name] = 0;
        return acc;
      }, {}),
    );
  };

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: 3,
        borderRadius: 2,
        position: "relative",
      }}
    >
      <img
        src={Logo}
        alt="Bingo Logo"
        style={{
          maxHeight: "60px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <Typography variant="h5" component="h1" align="center">
        Food Calculator
      </Typography>

      <TextField
        select
        fullWidth
        value={selectedRole}
        onChange={handleChange}
        margin="normal"
        label="Select a Role"
        sx={inputStyles}
      >
        <MenuItem value="table">Food Only</MenuItem>
        {/* <MenuItem value="server">Table Server</MenuItem> */}
        <MenuItem value="cocktail">Drinks Only</MenuItem>
        <MenuItem value="cocktailPlus">Full Menu</MenuItem>
      </TextField>

      <List>
        {visibleItems.map((item) => (
          <div key={item.name}>
            <ListItem
              sx={{ py: 0.5 }}
              secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => updateQuantity(item.name, -1)}
                    disabled={quantities[item.name] === 0}
                    color="primary"
                    sx={{ border: "1px solid", borderColor: "primary.main" }}
                  >
                    <Remove />
                  </IconButton>

                  <Typography
                    variant="h6"
                    sx={{ minWidth: 32, textAlign: "center", px: 2 }}
                  >
                    {quantities[item.name] || 0}
                  </Typography>

                  <IconButton
                    onClick={() => updateQuantity(item.name, 1)}
                    color="primary"
                    sx={{ border: "1px solid", borderColor: "primary.main" }}
                  >
                    <Add />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={`${item.price} ${item.price === 1 ? "ticket" : "tickets"} each`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={reset}
          disabled={total === 0}
        >
          Reset Order
        </Button>

        <Typography variant="h5" component="div" gutterBottom>
          Total: {total} {total === 1 ? "ticket" : "tickets"}
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
