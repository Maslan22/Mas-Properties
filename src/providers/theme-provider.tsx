"use client";
import React, { Children } from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1B4242",
            // borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 40,
              boxShadow: "none",
              colorPrimaryActive: "#1B4242",
              //   controlOutline: "none",
              colorBorder: "#1B4242",
            },
            Input: {
              controlHeight: 45,
              boxShadow: "none",
              activeShadow: "#1B4242",
            },
            Select: {
              controlHeight: 45,
              boxShadow: "none",
              // colorBorder: "#1B4242",
              // activeShadow: "#1B4242",
              // controlOutline: "none",
            },
            InputNumber: {
              controlHeight: 45,
              boxShadow: "none",
              activeShadow: "#1B4242",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
