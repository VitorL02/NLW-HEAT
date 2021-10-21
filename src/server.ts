import { serverHttp } from "./app";

serverHttp.listen(3030, () =>
  console.log(`Server Rodando na porta 3030`)
);