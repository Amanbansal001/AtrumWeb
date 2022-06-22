/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import AuthenticatedLayout from "../Layouts/Authenticated";
import GuestLayout from "../Layouts/Guest";
import { getProfile } from "../Utils/token";

const routes = [

  {
    route: "*",
    component: GuestLayout,

    routes: [
      {
        path: "/",
        exact: true,
        component: lazy(() => import("../View/Home")),
        isPrivate: false,

      },
      {
        path: "/login",
        exact: true,
        component: lazy(() => import("../View/Login")),
        isPrivate: false,

      },
      {
        path: "/signup",
        exact: true,
        component: lazy(() => import("../View/Signup")),
        isPrivate: false,

      },
      {
        path: "/email/confirmation",
        exact: true,
        component: lazy(() => import("../View/EmailConfirmation")),
        isPrivate: false,

      },
      {
        path: "/privacy-policy",
        exact: true,
        component: lazy(() => import("../View/PrivacyPolicy")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/m/privacy-policy",
        exact: true,
        component: lazy(() => import("../View/PrivacyPolicyM")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/condition-of-sale",
        exact: true,
        component: lazy(() => import("../View/ConditionOfSale")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/terms-and-conditions",
        exact: true,
        component: lazy(() => import("../View/TermsConditions")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/m/terms-and-conditions",
        exact: true,
        component: lazy(() => import("../View/TermsConditionsM")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/return-policy",
        exact: true,
        component: lazy(() => import("../View/ReturnPolicy")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/m/return-policy",
        exact: true,
        component: lazy(() => import("../View/ReturnPolicyM")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/shipping-policy",
        exact: true,
        component: lazy(() => import("../View/ShippingPolicy")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/m/shipping-policy",
        exact: true,
        component: lazy(() => import("../View/ShippingPolicyM")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/home",
        exact: true,
        component: lazy(() => import("../View/Home")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/new-arrivals",
        exact: true,
        component: lazy(() => import("../View/NewArrival")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/order/history",
        exact: true,
        component: lazy(() => import("../View/OrderHistory")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"My Orders"
        }
      },
      {
        path: "/order/redirect",
        exact: true,
        component: lazy(() => import("../View/OrderRedirect")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"My Orders"
        }
      },
      {
        path: "/order/checkout",
        exact: true,
        component: lazy(() => import("../View/CheckoutOrder")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Checkout"
        }
      },
      {
        path: "/do/payment",
        exact: true,
        component: lazy(() => import("../View/Payment")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/do/payment/web/:cartId",
        exact: true,
        component: lazy(() => import("../View/Payment")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/m/do/payment",
        exact: true,
        component: lazy(() => import("../View/PaymentM")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/do/payment/:cartId",
        exact: true,
        component: lazy(() => import("../View/PaymentLink")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/product/listing",
        exact: true,
        component: lazy(() => import("../View/ProductListing")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Artwork Listing"
        }
      },
      {
        path: "/product/:id",
        exact: true,
        component: lazy(() => import("../View/Product")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Artwork"
        }
      },
     
      {
        path: "/saved/address",
        exact: true,
        component: lazy(() => import("../View/SavedAddress")),
        isPrivate: true,
        isAuth: true,
        params: {
          heading:"My Address"
        }
      },
      {
        path: "/saved/card",
        exact: true,
        component: lazy(() => import("../View/SavedCard")),
        isPrivate: true,
        isAuth: true,
        params: {

        }
      },
      {
        path: "/profile/artist",
        exact: true,
        component: lazy(() => import("../View/ArtistProfile")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Artist Listing"
        }
      },
      {
        path: "/profile/artist/:id",
        exact: true,
        component: lazy(() => import("../View/ArtistProfile")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Artist"
        }
      },
      {
        path: "/auction",
        exact: true,
        component: lazy(() => import("../View/AuctionLanding")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Auction"
        }
      },
      {
        path: "/category",
        exact: true,
        component: lazy(() => import("../View/Category")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Category"
        }
      },
      {
        path: "/nft",
        exact: true,
        component: lazy(() => import("../View/NFT")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"NFT"
        }
      },
      {
        path: "/wonder-room",
        exact: true,
        component: lazy(() => import("../View/WonderRoom")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Wonder Room"
        }
      },
      {
        path: "/viewing-room",
        exact: true,
        component: lazy(() => import("../View/ViewingRoom")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Viewing Room"
        }
      },
      {
        path: "/viewing-room/:id",
        exact: true,
        component: lazy(() => import("../View/ViewingRoom")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/auction/listing",
        exact: true,
        component: lazy(() => import("../View/AuctionListing")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Auction Listing"
        }
      },
      {
        path: "/auction/:auctionId/:id",
        exact: true,
        component: lazy(() => import("../View/AuctionLanding")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Acution Landing"
        }
      },
      {
        path: "/best/seller",
        exact: true,
        component: lazy(() => import("../View/BestSeller")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Best Seller"
        }
      },
      {
        path: "/cart",
        exact: true,
        component: lazy(() => import("../View/CartLanding")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Cart"
        }
      },
      {
        path: "/dashboard",
        exact: true,
        component: lazy(() => import("../View/Account")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"My Account"
        }
      },
      {
        path: "/account",
        exact: true,
        component: lazy(() => import("../View/Account")),
        isPrivate: true,
        isAuth: true,
        params: {
          heading:"My Account"
        }
      },
      {
        path: "/order/checkout/payment",
        exact: true,
        component: lazy(() => import("../View/CheckoutPayment")),
        isPrivate: true,
        isAuth: true,
        params: {
          heading:"Checkout"
        }
      },
      {
        path: "/confirm/bid",
        exact: true,
        component: lazy(() => import("../View/ConfirmBids")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Bidding"
        }
      },
      {
        path: "/confirm/bid/:auctionId/:id",
        exact: true,
        component: lazy(() => import("../View/ConfirmBids")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Bidding"
        }
      },
      {
        path: "/faq",
        exact: true,
        component: lazy(() => import("../View/Faq")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"FAQ"
        }
      },
      {
        path: "/enquiry",
        exact: true,
        component: lazy(() => import("../View/Enquiry")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Enquiry"
        }
      },
      {
        path: "/bid/history",
        exact: true,
        component: lazy(() => import("../View/BidsHistory")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Bid History"
        }
      },
      {
        path: "/contact",
        exact: true,
        component: lazy(() => import("../View/Contactus")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Contact"
        }
      },

      {
        path: "/artist/listing",
        exact: true,
        component: lazy(() => import("../View/ArtistListing")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Artist Listing"
        }
      },

      {
        path: "/artwork",
        exact: true,
        component: lazy(() => import("../View/Artwork")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Artwork Listing"
        }
      },
      {
        path: "/aboutus",
        exact: true,
        component: lazy(() => import("../View/Aboutus")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"About Us"
        }
      },
      {
        path: "/m/aboutus",
        exact: true,
        component: lazy(() => import("../View/AboutusM")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/notification",
        exact: true,
        component: lazy(() => import("../View/Notification")),
        isPrivate: true,
        isAuth: true,
        params: {
          heading:"Notification"
        }
      },
      {
        path: "/profile",
        exact: true,
        component: lazy(() => import("../View/Profile")),
        isPrivate: true,
        isAuth: true,
        params: {
          heading:"My Profile"
        }
      },
      {
        path: "/logout",
        exact: true,
        component: lazy(() => import("../View/Logout")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        path: "/forgot/password",
        exact: true,
        component: lazy(() => import("../View/ForgotPassword")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Fogot"
        }
      },
      {
        path: "/reset/password",
        exact: true,
        component: lazy(() => import("../View/ResetPassword")),
        isPrivate: false,
        isAuth: false,
        params: {
          heading:"Reset"
        }
      },
      {
        path: "/wishlist",
        exact: true,
        component: lazy(() => import("../View/Wishlist")),
        isPrivate: true,
        isAuth: true,
        params: {
          heading:"My Wishlist"
        }
      },
      {
        path: "/webview",
        exact: true,
        component: lazy(() => import("../View/WebView")),
        isPrivate: false,
        isAuth: false,
        params: {

        }
      },
      {
        component: () => <Redirect to="/" />,
      },
    ],

  },
  {
    component: () => <Redirect to="/" />,
  },


];

export default routes;
