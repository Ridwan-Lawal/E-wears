"use client";

import { persistor, store } from "@/app/_lib/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default StoreProvider;
