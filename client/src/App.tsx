
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Running from "@/pages/running";
import Lifestyle from "@/pages/lifestyle";
import Training from "@/pages/training";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <CartProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:category" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/category/running" component={Running} />
        <Route path="/category/lifestyle" component={Lifestyle} />
        <Route path="/category/training" component={Training} />
        {/* <Route path="/checkout" component={CheckoutPage} /> */}
        <Route component={NotFound} />
        <Route path="/products/category/:category" component={Products} />

      </Switch>
      <Toaster />
    </CartProvider>
  );
}

export default App;
