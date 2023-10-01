import classes from "./LeftPanel.module.css";
import { Link, useLocation } from "react-router-dom";
// write code so that it shows what is active page by changing color of that page
const LeftPanel = () => {
  const location = useLocation();
  return (
    <div className={classes.container}>
      <Link
        className={
          location.pathname === "/admin/order"
            ? `${classes.active} ${classes.anchor}`
            : classes.anchor
        }
        to={"order"}
      >
        Order
      </Link>

      <Link
        className={
          location.pathname === "/admin/manageproducts"
            ? `${classes.active} ${classes.anchor}`
            : classes.anchor
        }
        to={"manageproducts"}
      >
        Manage Products
      </Link>

      <Link
        className={
          location.pathname === "/admin/addproducts"
            ? `${classes.active} ${classes.anchor}`
            : classes.anchor
        }
        to={"addproducts"}
      >
        Add Products
      </Link>

      <Link
        className={
          location.pathname === "/admin/managecategory"
            ? `${classes.active} ${classes.anchor}`
            : classes.anchor
        }
        to={"managecategory"}
      >
        Manage Category
      </Link>
    </div>
  );
};

export default LeftPanel;
