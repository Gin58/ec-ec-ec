import React, { useMemo } from "react";
import { getProductsInCart } from "../reducks/users/selectors";
import { makeStyles } from "@material-ui/styles";
import { CartListItem } from "../components/Products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { PrimaryButton, TextDetail } from "../components/UIkit";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      width: 512,
    },
  },
  orderBox: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0, 0, 0, 0.2)",
    height: 256,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 288,
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productInCart]);

  const shippingFee = subtotal >= 10000 ? 0 : 500;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productInCart.length > 0 &&
              productInCart.map((product) => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={"商品合計"} value={subtotal.toLocaleString()} />
          <TextDetail label={"消費税"} value={"￥" + tax} />
          <TextDetail
            label={"送料"}
            value={"￥" + shippingFee.toLocaleString()}
          />
          <Divider />
          <TextDetail
            label={"合計（税込）"}
            value={"￥" + total.toLocaleString()}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;