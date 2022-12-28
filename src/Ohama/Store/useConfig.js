import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

const ConfigContext = createContext();

export function ConfigContextProvider({ children }) {
  const [config, setConfig] = useState({
    initialPoint: 10000,
    betPoint: 1000,
  });

  useEffect(() => {
    const savedConfig = JSON.parse(window.localStorage.getItem("config"));
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  /**
   * store config and save them to localStorage
   */
  const saveConfig = useCallback(
    (newConfig) => {
      setConfig(newConfig);
      window.localStorage.setItem("config", JSON.stringify(newConfig));
    },
    [setConfig]
  );

  return (
    <ConfigContext.Provider
      value={{
        config,
        setConfig,
        saveConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
