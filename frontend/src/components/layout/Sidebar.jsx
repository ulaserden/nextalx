import {
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ComputerIcon from "@mui/icons-material/Computer";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
    {
        text: "Dashboard",
        path: "/",
        icon: <DashboardIcon />
    },
    {
        text: "Employees",
        path: "/employees",
        icon: <PeopleIcon />
    },
    {
        text: "Departments",
        path: "/departments",
        icon: <ApartmentIcon />
    },
    {
        text: "Assets",
        path: "/assets",
        icon: <ComputerIcon />
    },
    {
        text: "Categories",
        path: "/categories",
        icon: <CategoryIcon />
    },
    {
        text: "Assignments",
        path: "/assignments",
        icon: <AssignmentIcon />
    }
];

function Sidebar() {

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >
            <Toolbar>
                <Typography
                    variant="h5"
                    fontWeight="700"
                    color="primary"
                >
                    NEXTALX
                </Typography>
            </Toolbar>

            <Divider />

            <List>
                {
                    menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                        >
                            <ListItemButton
                                component={Link}
                                to={item.path}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default Sidebar;