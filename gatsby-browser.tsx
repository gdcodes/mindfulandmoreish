import React from "react";
import type { GatsbyBrowser } from "gatsby";
import { Layout } from "./src/components/Layout";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
}; 