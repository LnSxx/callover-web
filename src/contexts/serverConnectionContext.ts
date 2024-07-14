import { createContext } from "react";
import ServerConnectionService from "../services/ServerConnectionService";

export const ServerConnectionContext = createContext(new ServerConnectionService());
