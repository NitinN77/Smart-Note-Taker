import React from "react";
import { AppContextInterface } from './interfaces'

const AppContext = React.createContext<AppContextInterface | null>(null);

export default AppContext;
